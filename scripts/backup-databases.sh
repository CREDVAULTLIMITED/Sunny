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
