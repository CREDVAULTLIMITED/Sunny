import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-cover" />
        <div className="profile-info">
          <div className="profile-avatar">
            <img src={user.avatar} alt={user.name} />
          </div>
          <div className="profile-meta">
            <div className="profile-name">
              <h2>{user.name}</h2>
              {user.verified && <span className="verified-badge">✓</span>}
            </div>
            <div className="profile-handle">{user.handle}</div>
            <div className="profile-bio">{user.bio}</div>
          </div>
        </div>
        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">{user.posts}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat">
            <span className="stat-value">{user.following}</span>
            <span className="stat-label">Following</span>
          </div>
        </div>
      </div>
      
      <div className="profile-tabs">
        <button className="tab active">Posts</button>
        <button className="tab">Replies</button>
        <button className="tab">Media</button>
        <button className="tab">Likes</button>
      </div>
    </div>
  );
};

export default UserProfile;
