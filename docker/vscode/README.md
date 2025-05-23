# Secure VSCode Integration for Sunny Payment Gateway

This directory contains the necessary files to deploy a secure, containerized VSCode environment for Sunny Payment Gateway developers.

## Overview

The VSCode integration provides developers with a web-based, pre-configured development environment that includes:

- Sunny SDK and dependencies
- Payment API integration tools
- Testing frameworks
- Security scanning tools

## Security Features

This implementation follows a security-first approach:

- Containerized isolation for each user session
- Zero Trust security model implementation
- Strict network policies and micro-segmentation
- AppArmor profile for additional container security
- Resource limits to prevent DoS attacks
- Read-only access to SDKs and documentation
- Restricted network access to only necessary endpoints
- Multi-factor authentication integration
- Comprehensive audit logging

## Components

- `Dockerfile`: Defines the secure VSCode container image
- `config.yaml`: Configuration for the code-server instance
- `apparmor-vscode.profile`: AppArmor security profile
- `kubernetes/`: Kubernetes manifests for deployment
  - `vscode-deployment.yaml`: Main deployment configuration
  - `vscode-rbac.yaml`: Role-based access control

## Deployment

### Prerequisites

- Kubernetes cluster with RBAC enabled
- Namespace `sunny-developer` created
- Secret `vscode-password` containing the initial password

### Deployment Steps

1. Build the Docker image:
   ```bash
   docker build -t sunny/vscode-secure:latest .
   ```

2. Push to your container registry:
   ```bash
   docker push your-registry/sunny/vscode-secure:latest
   ```

3. Apply the Kubernetes configurations:
   ```bash
   kubectl apply -f kubernetes/vscode-rbac.yaml
   kubectl apply -f kubernetes/vscode-deployment.yaml
   ```

4. Access the VSCode environment:
   ```bash
   # Port forward the service
   kubectl port-forwar

