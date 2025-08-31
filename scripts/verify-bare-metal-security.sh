#!/bin/bash
# Security verification script for bare metal deployment

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
HSM_CONFIG="/etc/sunny/hsm/config.yml"
NETWORK_CONFIG="/etc/sunny/network/config.yml"
SECURITY_CONFIG="/etc/sunny/security/config.yml"

# Function to check HSM configuration
check_hsm_security() {
    echo -e "${YELLOW}Checking HSM security configuration...${NC}"
    
    # Verify HSM connections
    if ! hsm-verify --primary; then
        echo -e "${RED}Primary HSM verification failed${NC}"
        return 1
    fi
    
    if ! hsm-verify --secondary; then
        echo -e "${RED}Secondary HSM verification failed${NC}"
        return 1
    fi
    
    # Check key synchronization
    if ! hsm-sync --verify; then
        echo -e "${RED}HSM key synchronization check failed${NC}"
        return 1
    fi
    
    # Verify key usage
    if ! hsm-test --operation encrypt --key payment-key; then
        echo -e "${RED}HSM encryption test failed${NC}"
        return 1
    fi
    
    echo -e "${GREEN}HSM security checks passed${NC}"
    return 0
}

# Function to check network security
check_network_security() {
    echo -e "${YELLOW}Checking network security...${NC}"
    
    # Check firewall rules
    if ! iptables-save | grep -q "DROP"; then
        echo -e "${RED}Default DROP policy not configured in firewall${NC}"
        return 1
    fi
    
    # Verify network segregation
    if ! ip netns list | grep -q "cde"; then
        echo -e "${RED}Card Data Environment network namespace not found${NC}"
        return 1
    fi
    
    # Check TLS configuration
    if ! openssl s_client -connect localhost:443 -tls1_3 > /dev/null 2>&1; then
        echo -e "${RED}TLS 1.3 not properly configured${NC}"
        return 1
    fi
    
    echo -e "${GREEN}Network security checks passed${NC}"
    return 0
}

# Function to check physical security monitoring
check_physical_security() {
    echo -e "${YELLOW}Checking physical security systems...${NC}"
    
    # Check access control system
    if ! systemctl is-active --quiet access-control; then
        echo -e "${RED}Access control system not running${NC}"
        return 1
    fi
    
    # Check CCTV system
    if ! systemctl is-active --quiet cctv-monitor; then
        echo -e "${RED}CCTV monitoring system not running${NC}"
        return 1
    fi
    
    # Check environmental monitoring
    if ! systemctl is-active --quiet environmental-monitor; then
        echo -e "${RED}Environmental monitoring system not running${NC}"
        return 1
    fi
    
    echo -e "${GREEN}Physical security checks passed${NC}"
    return 0
}

# Function to check backup and recovery
check_backup_recovery() {
    echo -e "${YELLOW}Checking backup and recovery systems...${NC}"
    
    # Check backup status
    if ! systemctl is-active --quiet backup-service; then
        echo -e "${RED}Backup service not running${NC}"
        return 1
    fi
    
    # Verify recent backups
    if ! find /backup/sunny -type f -mtime -1 | grep -q .; then
        echo -e "${RED}No recent backups found${NC}"
        return 1
    fi
    
    # Check replication status
    if ! mongo --eval "rs.status()" | grep -q "\"ok\" : 1"; then
        echo -e "${RED}Database replication check failed${NC}"
        return 1
    fi
    
    echo -e "${GREEN}Backup and recovery checks passed${NC}"
    return 0
}

# Main execution
echo "Starting security verification for bare metal deployment..."

# Run all checks
check_hsm_security || exit 1
check_network_security || exit 1
check_physical_security || exit 1
check_backup_recovery || exit 1

echo -e "${GREEN}All security verification checks passed successfully${NC}"

# Generate verification report
REPORT_FILE="/var/log/sunny/security/verification-$(date +%Y%m%d).log"
{
    echo "Security Verification Report - $(date)"
    echo "====================================="
    echo "HSM Status: VERIFIED"
    echo "Network Security: VERIFIED"
    echo "Physical Security: VERIFIED"
    echo "Backup & Recovery: VERIFIED"
    echo "====================================="
} > "$REPORT_FILE"

# Set secure permissions on report
chmod 600 "$REPORT_FILE"

exit 0
