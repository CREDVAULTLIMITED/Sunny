import Redis from 'ioredis';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import type { IUser } from './User';
import type { Session as SharedSession } from '@sunny/shared-types';

export interface SessionConfig {
  accessTokenExpiry: number;
  refreshTokenExpiry: number;
  jwtSecret: string;
  redisClient: Redis;
}

export interface DeviceInfo {
  userAgent: string;
  ip: string;
  location?: string;
  deviceId?: string;
}

export interface SessionData {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  deviceInfo: DeviceInfo;
  createdAt: Date;
  lastAccessAt: Date;
  expiresAt: Date;
  isActive: boolean;
}

export class SessionManager {
  private redis: Redis;
  private jwtSecret: string;
  private accessTokenExpiry: number; // in seconds
  private refreshTokenExpiry: number; // in seconds

  constructor(config: SessionConfig) {
    this.redis = config.redisClient;
    this.jwtSecret = config.jwtSecret;
    this.accessTokenExpiry = config.accessTokenExpiry;
    this.refreshTokenExpiry = config.refreshTokenExpiry;
  }

  /**
   * Create a new session for a user
   */
  async createSession(user: IUser, deviceInfo: DeviceInfo): Promise<SharedSession> {
    const sessionId = this.generateSessionId();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + this.refreshTokenExpiry * 1000);

    // Generate tokens
    const accessToken = this.generateAccessToken(user, sessionId);
    const refreshToken = this.generateRefreshToken(user, sessionId);

    // Create session data
    const sessionData: SessionData = {
      id: sessionId,
      userId: user._id.toString(),
      accessToken,
      refreshToken,
      deviceInfo,
      createdAt: now,
      lastAccessAt: now,
      expiresAt,
      isActive: true
    };

    // Store in Redis with TTL
    const sessionKey = this.getSessionKey(sessionId);
    const userSessionsKey = this.getUserSessionsKey(user._id.toString());

    await Promise.all([
      // Store session data
      this.redis.setex(
        sessionKey,
        this.refreshTokenExpiry,
        JSON.stringify(sessionData)
      ),
      
      // Add to user's session list
      this.redis.sadd(userSessionsKey, sessionId),
      this.redis.expire(userSessionsKey, this.refreshTokenExpiry),

      // Store refresh token mapping
      this.redis.setex(
        this.getRefreshTokenKey(refreshToken),
        this.refreshTokenExpiry,
        sessionId
      )
    ]);

    // Update user's last login
    await user.updateOne({
      $set: {
        lastLoginAt: now,
        lastLoginIP: deviceInfo.ip
      }
    });

    // Clean up old sessions (keep only 5 most recent)
    await this.cleanupOldSessions(user._id.toString());

    return {
      id: sessionId,
      userId: user._id.toString(),
      user: user.toJSON() as any,
      accessToken,
      refreshToken,
      expiresAt,
      device: deviceInfo
    };
  }

  /**
   * Validate and retrieve session by access token
   */
  async validateAccessToken(accessToken: string): Promise<SessionData | null> {
    try {
      const decoded = jwt.verify(accessToken, this.jwtSecret) as any;
      const sessionData = await this.getSession(decoded.sessionId);
      
      if (!sessionData || !sessionData.isActive) {
        return null;
      }

      // Update last access time
      await this.updateLastAccess(sessionData.id);
      
      return sessionData;
    } catch (error) {
      return null;
    }
  }

  /**
   * Refresh session using refresh token
   */
  async refreshSession(refreshToken: string): Promise<SharedSession | null> {
    try {
      // Get session ID from refresh token
      const sessionId = await this.redis.get(this.getRefreshTokenKey(refreshToken));
      if (!sessionId) {
        return null;
      }

      const sessionData = await this.getSession(sessionId);
      if (!sessionData || !sessionData.isActive) {
        return null;
      }

      // Verify refresh token
      const decoded = jwt.verify(refreshToken, this.jwtSecret) as any;
      if (decoded.sessionId !== sessionId) {
        return null;
      }

      // Generate new tokens
      const newAccessToken = this.generateAccessToken(
        { _id: sessionData.userId } as any,
        sessionId
      );
      const newRefreshToken = this.generateRefreshToken(
        { _id: sessionData.userId } as any,
        sessionId
      );

      // Update session
      const updatedSessionData: SessionData = {
        ...sessionData,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        lastAccessAt: new Date()
      };

      // Store updated session
      await Promise.all([
        this.redis.setex(
          this.getSessionKey(sessionId),
          this.refreshTokenExpiry,
          JSON.stringify(updatedSessionData)
        ),
        
        // Update refresh token mapping
        this.redis.del(this.getRefreshTokenKey(refreshToken)),
        this.redis.setex(
          this.getRefreshTokenKey(newRefreshToken),
          this.refreshTokenExpiry,
          sessionId
        )
      ]);

      return {
        id: sessionId,
        userId: sessionData.userId,
        user: null as any, // Will be populated by auth service
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresAt: sessionData.expiresAt,
        device: sessionData.deviceInfo
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Get session by ID
   */
  async getSession(sessionId: string): Promise<SessionData | null> {
    try {
      const sessionJson = await this.redis.get(this.getSessionKey(sessionId));
      if (!sessionJson) {
        return null;
      }
      
      const sessionData = JSON.parse(sessionJson) as SessionData;
      
      // Check if session is expired
      if (new Date() > new Date(sessionData.expiresAt)) {
        await this.destroySession(sessionId);
        return null;
      }
      
      return sessionData;
    } catch (error) {
      return null;
    }
  }

  /**
   * Get all active sessions for a user
   */
  async getUserSessions(userId: string): Promise<SessionData[]> {
    try {
      const sessionIds = await this.redis.smembers(this.getUserSessionsKey(userId));
      const sessions: SessionData[] = [];
      
      for (const sessionId of sessionIds) {
        const session = await this.getSession(sessionId);
        if (session && session.isActive) {
          sessions.push(session);
        } else {
          // Clean up invalid session ID
          await this.redis.srem(this.getUserSessionsKey(userId), sessionId);
        }
      }
      
      return sessions.sort((a, b) => 
        new Date(b.lastAccessAt).getTime() - new Date(a.lastAccessAt).getTime()
      );
    } catch (error) {
      return [];
    }
  }

  /**
   * Destroy a specific session
   */
  async destroySession(sessionId: string): Promise<void> {
    try {
      const sessionData = await this.getSession(sessionId);
      if (!sessionData) {
        return;
      }

      await Promise.all([
        // Remove session data
        this.redis.del(this.getSessionKey(sessionId)),
        
        // Remove from user's session list
        this.redis.srem(this.getUserSessionsKey(sessionData.userId), sessionId),
        
        // Remove refresh token mapping
        this.redis.del(this.getRefreshTokenKey(sessionData.refreshToken))
      ]);
    } catch (error) {
      console.error('Error destroying session:', error);
    }
  }

  /**
   * Destroy all sessions for a user
   */
  async destroyAllUserSessions(userId: string): Promise<void> {
    try {
      const sessionIds = await this.redis.smembers(this.getUserSessionsKey(userId));
      
      for (const sessionId of sessionIds) {
        await this.destroySession(sessionId);
      }
      
      // Clean up user sessions key
      await this.redis.del(this.getUserSessionsKey(userId));
    } catch (error) {
      console.error('Error destroying user sessions:', error);
    }
  }

  /**
   * Update last access time for a session
   */
  private async updateLastAccess(sessionId: string): Promise<void> {
    try {
      const sessionData = await this.getSession(sessionId);
      if (sessionData) {
        sessionData.lastAccessAt = new Date();
        await this.redis.setex(
          this.getSessionKey(sessionId),
          this.refreshTokenExpiry,
          JSON.stringify(sessionData)
        );
      }
    } catch (error) {
      console.error('Error updating last access:', error);
    }
  }

  /**
   * Clean up old sessions, keeping only the 5 most recent
   */
  private async cleanupOldSessions(userId: string): Promise<void> {
    try {
      const sessions = await this.getUserSessions(userId);
      
      if (sessions.length > 5) {
        // Sort by last access time and keep only 5 most recent
        const sessionsToRemove = sessions.slice(5);
        
        for (const session of sessionsToRemove) {
          await this.destroySession(session.id);
        }
      }
    } catch (error) {
      console.error('Error cleaning up sessions:', error);
    }
  }

  /**
   * Generate a secure session ID
   */
  private generateSessionId(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Generate JWT access token
   */
  private generateAccessToken(user: IUser | { _id: any }, sessionId: string): string {
    return jwt.sign(
      {
        userId: user._id.toString(),
        sessionId,
        type: 'access'
      },
      this.jwtSecret,
      {
        expiresIn: this.accessTokenExpiry,
        issuer: 'sunny-payments',
        audience: 'sunny-api'
      }
    );
  }

  /**
   * Generate JWT refresh token
   */
  private generateRefreshToken(user: IUser | { _id: any }, sessionId: string): string {
    return jwt.sign(
      {
        userId: user._id.toString(),
        sessionId,
        type: 'refresh'
      },
      this.jwtSecret,
      {
        expiresIn: this.refreshTokenExpiry,
        issuer: 'sunny-payments',
        audience: 'sunny-api'
      }
    );
  }

  /**
   * Redis key generators
   */
  private getSessionKey(sessionId: string): string {
    return `session:${sessionId}`;
  }

  private getUserSessionsKey(userId: string): string {
    return `user_sessions:${userId}`;
  }

  private getRefreshTokenKey(refreshToken: string): string {
    return `refresh_token:${this.hashToken(refreshToken)}`;
  }

  /**
   * Hash token for secure storage
   */
  private hashToken(token: string): string {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Get session statistics
   */
  async getSessionStats(): Promise<{
    totalActiveSessions: number;
    activeUsers: number;
  }> {
    try {
      const keys = await this.redis.keys('session:*');
      const userKeys = await this.redis.keys('user_sessions:*');
      
      return {
        totalActiveSessions: keys.length,
        activeUsers: userKeys.length
      };
    } catch (error) {
      return {
        totalActiveSessions: 0,
        activeUsers: 0
      };
    }
  }

  /**
   * Cleanup expired sessions (should be run periodically)
   */
  async cleanupExpiredSessions(): Promise<number> {
    try {
      const sessionKeys = await this.redis.keys('session:*');
      let cleanedCount = 0;

      for (const sessionKey of sessionKeys) {
        const sessionJson = await this.redis.get(sessionKey);
        if (sessionJson) {
          const session = JSON.parse(sessionJson) as SessionData;
          if (new Date() > new Date(session.expiresAt)) {
            await this.destroySession(session.id);
            cleanedCount++;
          }
        }
      }

      return cleanedCount;
    } catch (error) {
      console.error('Error cleaning up expired sessions:', error);
      return 0;
    }
  }
}
