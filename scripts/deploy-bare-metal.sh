#!/usr/bin/env bash
# Bare Metal Deployment Script for Sunny Payment Gateway
# This script sets up the payment gateway on physical hardware

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
DEPLOYMENT_ROOT="/opt/sunny"
DATA_DIR="/data/sunny"
LOG_DIR="/var/log/sunny"
HSM_CONFIG_DIR="/etc/sunny/hsm"
SSL_DIR="/etc/sunny/ssl"
BACKUP_DIR="/backup/sunny"

# Hardware configuration
PRIMARY_NIC="eth0"
BACKUP_NIC="eth1"
HSM_NIC="eth2"

# Load balancer IPs
LB_VIP="10.0.0.100"
LB1_IP="10.0.0.101"
LB2_IP="10.0.0.102"

# Database configuration
DB_PRIMARY="10.0.0.200"
DB_SECONDARY="10.0.0.201"
DB_ARBITER="10.0.0.202"

# HSM configuration
HSM_PRIMARY="10.0.0.150"
HSM_SECONDARY="10.0.0.151"

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo -e "${RED}Error: Please run as root${NC}"
    exit 1
fi

# Function to check system requirements
check_system_requirements() {
    echo -e "${YELLOW}Checking system requirements...${NC}"
    
    # Check CPU
    CPU_CORES=$(nproc)
    if [ "$CPU_CORES" -lt 16 ]; then
        echo -e "${RED}Error: Insufficient CPU cores. Minimum 16 required, found $CPU_CORES${NC}"
        exit 1
    fi
    
    # Check RAM
    TOTAL_RAM=$(free -g | awk '/^Mem:/{print $2}')
    if [ "$TOTAL_RAM" -lt 64 ]; then
        echo -e "${RED}Error: Insufficient RAM. Minimum 64GB required, found ${TOTAL_RAM}GB${NC}"
        exit 1
    }
    
    # Check storage
    ROOT_SPACE=$(df -BG / | awk 'NR==2 {print $4}' | sed 's/G//')
    if [ "$ROOT_SPACE" -lt 100 ]; then
        echo -e "${RED}Error: Insufficient storage space. Minimum 100GB required, found ${ROOT_SPACE}GB${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}System requirements check passed${NC}"
}

# Function to configure network
configure_network() {
    echo -e "${YELLOW}Configuring network interfaces...${NC}"
    
    # Configure bonding for NICs
    cat > /etc/systemd/network/bond0.netdev << EOF
[NetDev]
Name=bond0
Kind=bond

[Bond]
Mode=active-backup
MIIMonitorSec=1s
EOF
    
    # Configure primary NIC
    cat > /etc/systemd/network/primary.network << EOF
[Match]
Name=$PRIMARY_NIC

[Network]
Bond=bond0
EOF
    
    # Configure backup NIC
    cat > /etc/systemd/network/backup.network << EOF
[Match]
Name=$BACKUP_NIC

[Network]
Bond=bond0
EOF
    
    # Configure HSM network
    cat > /etc/systemd/network/hsm.network << EOF
[Match]
Name=$HSM_NIC

[Network]
Address=$HSM_PRIMARY/24
EOF
    
    # Restart networking
    systemctl restart systemd-networkd
    
    echo -e "${GREEN}Network configuration completed${NC}"
}

# Function to setup HSM
setup_hsm() {
    echo -e "${YELLOW}Setting up HSM configuration...${NC}"
    
    # Create HSM directories
    mkdir -p "$HSM_CONFIG_DIR"
    
    # Generate HSM configuration
    cat > "$HSM_CONFIG_DIR/hsm.conf" << EOF
HSM_VENDOR=thales
HSM_IP=$HSM_PRIMARY
HSM_BACKUP_IP=$HSM_SECONDARY
HSM_PORT=1500
HSM_TIMEOUT=30
HSM_RETRY_COUNT=3
HSM_KEY_STORE=/data/sunny/hsm/keys
EOF
    
    # Set proper permissions
    chmod 600 "$HSM_CONFIG_DIR/hsm.conf"
    
    echo -e "${GREEN}HSM configuration completed${NC}"
}

# Function to setup storage
setup_storage() {
    echo -e "${YELLOW}Setting up storage...${NC}"
    
    # Create required directories
    mkdir -p "$DEPLOYMENT_ROOT" "$DATA_DIR" "$LOG_DIR" "$BACKUP_DIR"
    
    # Set up logical volumes if needed
    if ! lvdisplay | grep -q "sunny-data"; then
        pvcreate /dev/sdb
        vgcreate sunny-vg /dev/sdb
        lvcreate -L 100G -n sunny-data sunny-vg
        mkfs.xfs /dev/sunny-vg/sunny-data
    fi
    
    # Add to fstab
    if ! grep -q "$DATA_DIR" /etc/fstab; then
        echo "/dev/sunny-vg/sunny-data $DATA_DIR xfs defaults,noatime 0 0" >> /etc/fstab
        mount -a
    fi
    
    echo -e "${GREEN}Storage setup completed${NC}"
}

# Function to deploy application
deploy_application() {
    echo -e "${YELLOW}Deploying Sunny Payment Gateway...${NC}"
    
    # Copy application files
    cp -r ./src/* "$DEPLOYMENT_ROOT/"
    
    # Set up systemd service
    cat > /etc/systemd/system/sunny.service << EOF
[Unit]
Description=Sunny Payment Gateway
After=network.target

[Service]
Type=simple
User=sunny
Group=sunny
WorkingDirectory=$DEPLOYMENT_ROOT
Environment=NODE_ENV=production
Environment=DATA_DIR=$DATA_DIR
Environment=LOG_DIR=$LOG_DIR
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
LimitNOFILE=1000000

[Install]
WantedBy=multi-user.target
EOF
    
    # Reload systemd and enable service
    systemctl daemon-reload
    systemctl enable sunny
    
    echo -e "${GREEN}Application deployment completed${NC}"
}

# Function to configure monitoring
setup_monitoring() {
    echo -e "${YELLOW}Setting up monitoring...${NC}"
    
    # Install node exporter for Prometheus
    if ! command -v node_exporter &> /dev/null; then
        wget https://github.com/prometheus/node_exporter/releases/download/v1.3.1/node_exporter-1.3.1.linux-amd64.tar.gz
        tar xvfz node_exporter-*.tar.gz
        mv node_exporter-*/node_exporter /usr/local/bin/
        rm -rf node_exporter-*
    fi
    
    # Set up node exporter service
    cat > /etc/systemd/system/node_exporter.service << EOF
[Unit]
Description=Node Exporter
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/node_exporter
Restart=always

[Install]
WantedBy=multi-user.target
EOF
    
    systemctl daemon-reload
    systemctl enable node_exporter
    systemctl start node_exporter
    
    echo -e "${GREEN}Monitoring setup completed${NC}"
}

# Function to configure network security
configure_network_security() {
    echo -e "${YELLOW}Configuring network security...${NC}"
    
    # Configure firewall rules
    iptables -F
    iptables -P INPUT DROP
    iptables -P FORWARD DROP
    iptables -P OUTPUT DROP
    
    # Allow established connections
    iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    
    # Allow loopback
    iptables -A INPUT -i lo -j ACCEPT
    iptables -A OUTPUT -o lo -j ACCEPT
    
    # Allow HSM communication only from specific IPs
    iptables -A INPUT -s $HSM_PRIMARY -p tcp --dport 1500 -j ACCEPT
    iptables -A OUTPUT -d $HSM_PRIMARY -p tcp --dport 1500 -j ACCEPT
    if [ ! -z "$HSM_SECONDARY" ]; then
        iptables -A INPUT -s $HSM_SECONDARY -p tcp --dport 1500 -j ACCEPT
        iptables -A OUTPUT -d $HSM_SECONDARY -p tcp --dport 1500 -j ACCEPT
    fi
    
    # Allow load balancer communication
    iptables -A INPUT -s $LB1_IP,LB2_IP -p tcp --dport 443 -j ACCEPT
    iptables -A OUTPUT -d $LB1_IP,LB2_IP -p tcp --dport 443 -j ACCEPT
    
    # Allow database communication
    iptables -A INPUT -s $DB_PRIMARY,$DB_SECONDARY,$DB_ARBITER -p tcp --dport 27017 -j ACCEPT
    iptables -A OUTPUT -d $DB_PRIMARY,$DB_SECONDARY,$DB_ARBITER -p tcp --dport 27017 -j ACCEPT
    
    # Save firewall rules
    iptables-save > /etc/iptables/rules.v4
    
    # Enable IP forwarding for load balancing
    echo 1 > /proc/sys/net/ipv4/ip_forward
    
    # Configure network segregation
    ip link add name card-data type veth peer name payment-gateway
    ip netns add cde
    ip link set card-data netns cde
    
    echo -e "${GREEN}Network security configuration completed${NC}"
}

# Configure secure logging
configure_logging() {
    echo -e "${YELLOW}Configuring secure logging...${NC}"
    
    # Create log directories with secure permissions
    mkdir -p $LOG_DIR/app
    mkdir -p $LOG_DIR/hsm
    mkdir -p $LOG_DIR/audit
    chown -R root:root $LOG_DIR
    chmod -R 0600 $LOG_DIR
    
    # Configure rsyslog for secure logging
    cat > /etc/rsyslog.d/sunny.conf << EOF
# Sunny Payment Gateway Logging
\$FileCreateMode 0600
\$DirCreateMode 0700

# Application logs
local0.* $LOG_DIR/app/application.log
# HSM logs
local1.* $LOG_DIR/hsm/hsm.log
# Audit logs
local2.* $LOG_DIR/audit/audit.log
EOF
    
    # Configure logrotate
    cat > /etc/logrotate.d/sunny << EOF
$LOG_DIR/*/*.log {
    daily
    rotate 90
    compress
    delaycompress
    notifempty
    missingok
    create 0600 root root
    postrotate
        /usr/lib/rsyslog/rsyslog-rotate
    endscript
}
EOF
    
    systemctl restart rsyslog
    echo -e "${GREEN}Secure logging configuration completed${NC}"
}

# Main deployment flow
main() {
    echo -e "${YELLOW}Starting Sunny Payment Gateway bare metal deployment...${NC}"
    
    # Run all setup functions
    check_system_requirements
    configure_network
    setup_hsm
    setup_storage
    deploy_application
    setup_monitoring
    configure_network_security
    configure_logging
    
    echo -e "${GREEN}Deployment completed successfully!${NC}"
    echo -e "${YELLOW}Please verify the deployment by running the validation tests${NC}"
}

# Run main function
main
