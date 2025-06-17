#!/bin/bash

# Production Readiness Verification Script
echo "🚀 Starting Production Readiness Verification..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check result and display
check_result() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1${NC}"
        return 0
    else
        echo -e "${RED}✗ $1${NC}"
        return 1
    fi
}

# Check warnings
check_warning() {
    if [ $? -eq 0 ]; then
        echo -e "${YELLOW}⚠ $1${NC}"
        return 0
    else
        echo -e "${RED}✗ $1${NC}"
        return 1
    fi
}

# Function to check if service exists
check_service() {
    if systemctl is-enabled "$1" >/dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

echo "🔍 Running comprehensive production verification..."

echo "1. Security Compliance Checks..."
# Run PCI DSS compliance verification
./scripts/verify-pci-compliance.sh
check_result "PCI DSS Compliance" || exit 1

echo "2. SSL/TLS Configuration..."
# Verify SSL certificates
if [ -f "docker/production/ssl/certificate.crt" ] && [ -f "docker/production/ssl/private.key" ]; then
    # Check certificate expiration
    EXPIRY=$(openssl x509 -enddate -noout -in docker/production/ssl/certificate.crt | cut -d= -f2)
    EXPIRY_EPOCH=$(date -d "$EXPIRY" +%s)
    NOW_EPOCH=$(date +%s)
    DAYS_REMAINING=$(( ($EXPIRY_EPOCH - $NOW_EPOCH) / 86400 ))
    
    if [ $DAYS_REMAINING -lt 30 ]; then
        echo -e "${YELLOW}⚠ SSL Certificate expires in $DAYS_REMAINING days${NC}"
    else
        check_result "SSL certificates are valid for $DAYS_REMAINING days"
    fi

    # Verify certificate strength
    KEY_SIZE=$(openssl x509 -in docker/production/ssl/certificate.crt -noout -text | grep "Public-Key:" | grep -o "[0-9]*")
    if [ "$KEY_SIZE" -lt 2048 ]; then
        echo -e "${RED}✗ SSL certificate key size ($KEY_SIZE bits) is less than 2048 bits${NC}"
        exit 1
    fi
    check_result "SSL certificate strength verified"
else
    echo -e "${RED}✗ SSL certificates not found${NC}"
    exit 1
fi

echo "3. Encryption Configuration..."
# Verify encryption settings
node scripts/security/verify-encryption.js
check_result "Encryption settings" || exit 1

echo "4. Database Security..."
# Check MongoDB encryption and authentication
node scripts/security/verify-database-security.js
check_result "Database security configuration" || exit 1

echo "5. Monitoring Setup..."
# Verify monitoring services
if [ -f "monitoring/alert-rules.yml" ]; then
    # Check monitoring configuration
    node scripts/security/verify-monitoring.js
    check_result "Monitoring configuration"
    
    # Verify alert rules
    if grep -q "pci_compliance" monitoring/alert-rules.yml; then
        check_result "PCI compliance monitoring rules"
    else
        check_warning "PCI compliance monitoring rules not found"
    fi
else
    echo -e "${RED}✗ Monitoring configuration not found${NC}"
    exit 1
fi

echo "6. Backup Configuration..."
# Verify backup settings
if [ -f "scripts/backup-databases.sh" ]; then
    # Check backup encryption
    if grep -q "encryption" scripts/backup-databases.sh; then
        check_result "Backup encryption configured"
    else
        echo -e "${RED}✗ Backup encryption not configured${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ Backup script not found${NC}"
    exit 1
fi

echo "7. Access Control..."
# Verify access control settings
node scripts/security/verify-access-controls.js
check_result "Access control configuration" || exit 1

echo "8. Audit Logging..."
# Check audit logging configuration
./scripts/security/verify-audit-logging.sh
check_result "Audit logging configuration" || exit 1

echo "9. Network Security..."
# Verify network security settings
./scripts/security/verify-network-segments.sh
check_result "Network security configuration" || exit 1

echo "10. Key Management..."
# Check key rotation and management
node scripts/security/verify-key-management.js
check_result "Key management configuration" || exit 1

echo "Generating Production Readiness Report..."
# Generate detailed report
node scripts/generate-readiness-report.js

# Final verification
echo -e "\n🔍 Final Production Readiness Check"
FAILURES=$(grep "✗" logs/production-readiness.log 2>/dev/null | wc -l)
WARNINGS=$(grep "⚠" logs/production-readiness.log 2>/dev/null | wc -l)

if [ $FAILURES -eq 0 ]; then
    if [ $WARNINGS -eq 0 ]; then
        echo -e "${GREEN}✓ All production readiness checks passed${NC}"
        echo "🎉 System is ready for production deployment!"
        exit 0
    else
        echo -e "${YELLOW}⚠ Production readiness checks passed with $WARNINGS warnings${NC}"
        echo "⚠️ Review warnings in logs/production-readiness.log before deployment"
        exit 0
    fi
else
    echo -e "${RED}✗ Production readiness checks failed with $FAILURES failures and $WARNINGS warnings${NC}"
    echo "❌ System is not ready for production deployment"
    echo "📋 Review logs/production-readiness.log for details"
    exit 1
fi