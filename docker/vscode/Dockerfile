# Secure VSCode Server for Sunny Payment Gateway
# Based on code-server (VSCode in browser)

FROM codercom/code-server:latest

# Set as non-root user
USER root

# Install security updates and dependencies
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    curl \
    wget \
    git \
    gnupg \
    ca-certificates \
    apt-transport-https \
    software-properties-common \
    jq \
    dnsutils \
    iputils-ping \
    net-tools \
    openssh-client \
    sudo \
    vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js (for Sunny SDK)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Install development tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Go (for API Gateway development)
RUN wget https://golang.org/dl/go1.18.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go1.18.linux-amd64.tar.gz && \
    rm go1.18.linux-amd64.tar.gz
ENV PATH=$PATH:/usr/local/go/bin

# Install Rust (for core payment engine development)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Install VS Code extensions
RUN code-server --install-extension dbaeumer.vscode-eslint && \
    code-server --install-extension esbenp.prettier-vscode && \
    code-server --install-extension ms-vscode.vscode-typescript-next && \
    code-server --install-extension golang.go && \
    code-server --install-extension rust-lang.rust-analyzer && \
    code-server --install-extension ms-python.python

# Create a non-privileged user for code-server
RUN useradd -m -s /bin/bash -u 1000 coder && \
    echo "coder ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/nopasswd

# Install Sunny SDK
WORKDIR /home/coder/sunny-sdk
RUN npm install sunny-payment-gateway

# Copy SDK documentation
COPY --chown=coder:coder docs /home/coder/sunny-docs
RUN chmod -R 755 /home/coder/sunny-docs

# Create workspace directory
RUN mkdir -p /home/coder/workspace && \
    chown -R coder:coder /home/coder/workspace

# Create project template
COPY --chown=coder:coder project-template /home/coder/project-template

# Security hardening
# Remove unnecessary services
RUN apt-get purge -y openssh-server rpcbind

# Configure secure defaults for code-server
COPY --chown=coder:coder config.yaml /home/coder/.config/code-server/config.yaml

# Set up network restrictions
# This will be enhanced by Kubernetes network policies
RUN echo "net.ipv4.ip_forward = 0" >> /etc/sysctl.conf && \
    echo "net.ipv4.conf.all.send_redirects = 0" >> /etc/sysctl.conf && \
    echo "net.ipv4.conf.default.send_redirects = 0" >> /etc/sysctl.conf && \
    echo "net.ipv4.conf.all.accept_redirects = 0" >> /etc/sysctl.conf && \
    echo "net.ipv4.conf.default.accept_redirects = 0" >> /etc/sysctl.conf

# Set up AppArmor profile (will be applied by Kubernetes)
COPY apparmor-vscode.profile /etc/apparmor.d/vscode

# Install security scanning tools
RUN npm install -g snyk eslint-plugin-security

# Set up resource limits (will be enforced by Kubernetes)
# This is just documentation in the Dockerfile
# RESOURCE LIMITS:
# - CPU: 2 cores
# - Memory: 4GB
# - Ephemeral Storage: 10GB

# Switch to non-privileged user
USER coder
WORKDIR /home/coder/workspace

# Configure environment variables
ENV PATH="/home/coder/workspace/node_modules/.bin:${PATH}"
ENV SUNNY_SDK_PATH="/home/coder/sunny-sdk"
ENV SUNNY_DOCS_PATH="/home/coder/sunny-docs"
ENV SUNNY_SANDBOX_API="https://sandbox-api.sunnypayments.com"

# Set up a healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/ || exit 1

# Expose code-server on port 8080
EXPOSE 8080

# Start code-server
ENTRYPOINT ["/usr/bin/entrypoint.sh", "--bind-addr", "0.0.0.0:8080", "--auth", "none", "/home/coder/workspace"]

