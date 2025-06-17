#!/bin/bash

# Audit Logging Verification Script
echo "Verifying audit logging configuration..."

# Check log directories
LOG_DIRS=(
    "/var/log/sunny/security"
    "/var/log/sunny/transactions"
    "/var/log/sunny/access"
)

for dir in "${LOG_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo "❌ Log directory $dir not found"
        exit 1
    fi
    
    # Check permissions
    perms=$(stat -c "%a" "$dir")
    if [ "$perms" != "750" ]; then
        echo "❌ Incorrect permissions on $dir"
        exit 1
    fi
done

# Check log rotation
if [ ! -f "/etc/logrotate.d/sunny" ]; then
    echo "❌ Log rotation not configured"
    exit 1
fi

# Verify log shipping
if ! systemctl is-active --quiet filebeat; then
    echo "❌ Log shipping service not running"
    exit 1
fi

# Check log format
sample_log="/var/log/sunny/security/audit.log"
if [ -f "$sample_log" ]; then
    if ! grep -q "timestamp.*user_id.*action.*resource" "$sample_log"; then
        echo "❌ Invalid log format"
        exit 1
    fi
else
    echo "❌ No audit logs found"
    exit 1
fi

# Verify log monitoring
if ! curl -s http://localhost:9200/_cat/indices | grep -q "sunny-audit"; then
    echo "❌ Log monitoring not configured"
    exit 1
fi

echo "✅ Audit logging verification completed"
exit 0
