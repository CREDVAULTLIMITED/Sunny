#!/bin/bash

# Network Segmentation Verification Script
echo "Verifying network segmentation..."

# Check Docker networks
if ! docker network ls | grep -q "payment_network"; then
    echo "❌ Payment network not found"
    exit 1
fi

if ! docker network ls | grep -q "frontend_network"; then
    echo "❌ Frontend network not found"
    exit 1
fi

# Check network isolation
if ! docker network inspect payment_network | grep -q "Internal": true; then
    echo "❌ Payment network is not properly isolated"
    exit 1
fi

# Verify VLAN configuration
if ip link show | grep -q "vlan"; then
    echo "✅ VLAN configuration exists"
else
    echo "⚠️ No VLAN configuration found"
fi

# Check network policies
if [ -f "/etc/network/security-policies.conf" ]; then
    echo "✅ Network security policies configured"
else
    echo "❌ Network security policies missing"
    exit 1
fi

echo "✅ Network segmentation verification completed"
exit 0
