# Development Commands Reference

## 🚀 Quick Start Commands

### Development Servers (Individual Apps)
Run these commands from the workspace root (`sunny/`):

```bash
# Marketing Website (localhost:3000)
pnpm run dev:marketing

# Institutions Portal (localhost:3003) 
pnpm run dev:institutions

# Business Dashboard (localhost:3001)
pnpm run dev:business

# User Dashboard (localhost:3002)
pnpm run dev:user

# Admin Dashboard (localhost:3004)
pnpm run dev:admin

# Developer Portal (localhost:3005)
pnpm run dev:developer
```

### Build Commands
```bash
# Build individual apps
pnpm run build:marketing
pnpm run build:institutions
pnpm run build:business
pnpm run build:user
pnpm run build:admin
pnpm run build:developer

# Build all packages (shared components, utilities, etc.)
pnpm run build:packages
```

### Alternative App-Specific Commands
If you want to run commands from within a specific app directory:

```bash
# Navigate to the app
cd apps/marketing
cd apps/institutions-portal
cd apps/business-dashboard
cd apps/user-dashboard
cd apps/admin-dashboard
cd apps/developer-portal

# Then run
pnpm run dev    # Start development server
pnpm run build  # Build for production
pnpm run lint   # Run linting
```

## 📱 App Ports Reference

| App | Port | URL |
|-----|------|-----|
| Marketing Website | 3000 | http://localhost:3000 |
| Business Dashboard | 3001 | http://localhost:3001 |
| User Dashboard | 3002 | http://localhost:3002 |
| Institutions Portal | 3003 | http://localhost:3003 |
| Admin Dashboard | 3004 | http://localhost:3004 |
| Developer Portal | 3005 | http://localhost:3005 |

## 🛠️ Package Development

### Shared Package Development
```bash
# Build all shared packages
pnpm run build:packages

# Build specific package
cd packages/ui && pnpm run build
cd packages/auth && pnpm run build
cd packages/api-client && pnpm run build
```

### Installing Dependencies
```bash
# Install all dependencies (from root)
pnpm install

# Install for specific app
pnpm install --filter @sunny/marketing
pnpm install --filter @sunny/institutions-portal

# Add dependency to specific app
pnpm add <package> --filter @sunny/marketing
```

## 🎯 Pro Tips

1. **Run Multiple Apps**: You can run multiple development servers simultaneously by opening multiple terminals
2. **Shared CSS**: All apps use shared styles from `@sunny/ui` package
3. **Workspace Linking**: Changes to shared packages are automatically reflected in apps
4. **Port Conflicts**: If ports are busy, edit the port in each app's `package.json`

## 🐛 Troubleshooting

If you get "command not found" errors:
1. Make sure you're in the workspace root (`sunny/`)
2. Run `pnpm install` to ensure all dependencies are installed
3. Check that the app exists in the `apps/` directory

If development server won't start:
1. Check if port is already in use: `netstat -an | findstr :3000`
2. Kill existing processes if needed
3. Try running with `--ignore-scripts` flag if installation fails
