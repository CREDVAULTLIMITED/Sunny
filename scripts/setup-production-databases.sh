#!/bin/bash

# Production Database Setup Script
echo "Setting up Production Databases..."

# Load environment variables
set -a
source ../.env
set +a

# MongoDB Setup
echo "Setting up MongoDB..."

# Create MongoDB users
mongo admin --eval "
  db.createUser({
    user: '$DB_USER',
    pwd: '$DB_PASSWORD',
    roles: [
      { role: 'userAdminAnyDatabase', db: 'admin' },
      { role: 'readWriteAnyDatabase', db: 'admin' }
    ]
  })
"

# Enable MongoDB Authentication
sudo tee /etc/mongod.conf > /dev/null << EOL
security:
  authorization: enabled

net:
  ssl:
    mode: requireSSL
    PEMKeyFile: /etc/ssl/mongodb.pem
    CAFile: /etc/ssl/ca.pem

replication:
  replSetName: "rs0"

storage:
  dbPath: /var/lib/mongodb
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log
EOL

# Generate MongoDB SSL certificates
openssl req -newkey rsa:4096 -nodes -keyout /etc/ssl/mongodb.key -out /etc/ssl/mongodb.csr -subj "/CN=mongodb"
openssl x509 -req -in /etc/ssl/mongodb.csr -signkey /etc/ssl/mongodb.key -out /etc/ssl/mongodb.crt
cat /etc/ssl/mongodb.key /etc/ssl/mongodb.crt > /etc/ssl/mongodb.pem
chmod 600 /etc/ssl/mongodb.pem

# Redis Setup
echo "Setting up Redis..."

# Configure Redis with SSL and password
sudo tee /etc/redis/redis.conf > /dev/null << EOL
bind 127.0.0.1
port 6379
requirepass $REDIS_PASSWORD
maxmemory 2gb
maxmemory-policy allkeys-lru
appendonly yes
appendfsync everysec
tls-cert-file /etc/ssl/redis.crt
tls-key-file /etc/ssl/redis.key
tls-ca-cert-file /etc/ssl/ca.crt
EOL

# Generate Redis SSL certificates
openssl req -newkey rsa:4096 -nodes -keyout /etc/ssl/redis.key -out /etc/ssl/redis.csr -subj "/CN=redis"
openssl x509 -req -in /etc/ssl/redis.csr -signkey /etc/ssl/redis.key -out /etc/ssl/redis.crt

# Set proper permissions
chmod 600 /etc/ssl/redis.key
chmod 644 /etc/ssl/redis.crt

# Backup Configuration
echo "Setting up automated backups..."

# Create backup script
cat > scripts/backup-databases.sh << 'EOL'
#!/bin/bash

# Backup MongoDB
mongodump --ssl --host localhost --username $DB_USER --password $DB_PASSWORD --out /backup/mongodb/$(date +%Y%m%d)

# Backup Redis
redis-cli -a $REDIS_PASSWORD --rdb /backup/redis/dump-$(date +%Y%m%d).rdb

# Compress backups
tar -czf /backup/mongodb-$(date +%Y%m%d).tar.gz /backup/mongodb/$(date +%Y%m%d)
tar -czf /backup/redis-$(date +%Y%m%d).tar.gz /backup/redis/dump-$(date +%Y%m%d).rdb

# Clean up old backups (keep last 7 days)
find /backup -name "*.tar.gz" -mtime +7 -delete
EOL

chmod +x scripts/backup-databases.sh

# Add backup script to crontab (run daily at 2 AM)
(crontab -l 2>/dev/null; echo "0 2 * * * /home/sam/Downloads/Sunny-main/scripts/backup-databases.sh") | crontab -

echo "Database setup completed successfully!"
