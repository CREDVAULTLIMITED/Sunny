const fs = require('fs').promises;
const path = require('path');

class SecurityLogger {
    constructor(options = {}) {
        this.config = {
            logsBasePath: path.join(process.cwd(), 'logs/security'),
            maxLogSize: 10 * 1024 * 1024, // 10MB
            maxLogAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            rotateInterval: 24 * 60 * 60 * 1000, // 24 hours
            ...options
        };

        // Ensure log directories exist
        this._initializeLogDirectories();

        // Start log rotation
        this._startLogRotation();
    }

    async _initializeLogDirectories() {
        const directories = ['alerts', 'audit', 'errors', 'performance'];
        for (const dir of directories) {
            await fs.mkdir(path.join(this.config.logsBasePath, dir), { recursive: true });
        }
    }

    _startLogRotation() {
        setInterval(async () => {
            try {
                await this._rotateLogFiles();
            } catch (error) {
                console.error('Failed to rotate log files:', error);
            }
        }, this.config.rotateInterval);
    }

    async _rotateLogFiles() {
        const now = new Date();
        const cutoffTime = now.getTime() - this.config.maxLogAge;

        const directories = ['alerts', 'audit', 'errors', 'performance'];
        for (const dir of directories) {
            const dirPath = path.join(this.config.logsBasePath, dir);
            const files = await fs.readdir(dirPath);

            for (const file of files) {
                const filePath = path.join(dirPath, file);
                const stats = await fs.stat(filePath);

                // Delete old files
                if (stats.mtimeMs < cutoffTime) {
                    await fs.unlink(filePath);
                    continue;
                }

                // Rotate large files
                if (stats.size > this.config.maxLogSize) {
                    const newFilePath = path.join(
                        dirPath,
                        `${path.parse(file).name}.${now.toISOString()}.log`
                    );
                    await fs.rename(filePath, newFilePath);
                }
            }
        }
    }

    async logSecurityEvent(event) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...event,
        };

        const logFile = path.join(
            this.config.logsBasePath,
            'audit',
            `security-events-${new Date().toISOString().split('T')[0]}.log`
        );

        await fs.appendFile(
            logFile,
            JSON.stringify(logEntry) + '\n',
            'utf8'
        );
    }

    async logAlert(alert) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...alert,
        };

        const logFile = path.join(
            this.config.logsBasePath,
            'alerts',
            `security-alerts-${new Date().toISOString().split('T')[0]}.log`
        );

        await fs.appendFile(
            logFile,
            JSON.stringify(logEntry) + '\n',
            'utf8'
        );
    }

    async logError(error) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            error: {
                message: error.message,
                stack: error.stack,
                code: error.code,
            },
            context: error.context || {},
        };

        const logFile = path.join(
            this.config.logsBasePath,
            'errors',
            `security-errors-${new Date().toISOString().split('T')[0]}.log`
        );

        await fs.appendFile(
            logFile,
            JSON.stringify(logEntry) + '\n',
            'utf8'
        );
    }

    async logPerformance(metrics) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            ...metrics,
        };

        const logFile = path.join(
            this.config.logsBasePath,
            'performance',
            `security-performance-${new Date().toISOString().split('T')[0]}.log`
        );

        await fs.appendFile(
            logFile,
            JSON.stringify(logEntry) + '\n',
            'utf8'
        );
    }
}

module.exports = new SecurityLogger();
