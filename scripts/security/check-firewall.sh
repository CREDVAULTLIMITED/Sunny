#!/bin/bash

# Firewall Configuration Check Script
echo "Checking firewall configuration..."

# Check if firewall is enabled
if command -v ufw >/dev/null 2>&1; then
    if ufw status | grep -q "Status: active"; then
        echo "✅ Firewall is active"
    else
        echo "❌ Firewall is not active"
        exit 1
    fi
elif command -v firewall-cmd >/dev/null 2>&1; then
    if firewall-cmd --state | grep -q "running"; then
        echo "✅ Firewall is active"
    else
        echo "❌ Firewall is not active"
        exit 1
    fi
else
    echo "❌ No supported firewall found"
    exit 1
fi

# Check required ports
required_ports=(443 27017 6379)
for port in "${required_ports[@]}"; do
    if ufw status | grep -q "$port/tcp"; then
        echo "✅ Port $port is configured"
    else
        echo "❌ Port $port is not configured"
        exit 1
    fi
done

# Check network segmentation
if ip addr show docker0 >/dev/null 2>&1; then
    echo "✅ Docker network segmentation exists"
else
    echo "❌ Docker network segmentation missing"
    exit 1
fi

echo "✅ Firewall configuration check completed successfully"
exit 0
