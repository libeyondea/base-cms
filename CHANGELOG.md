# Changelog

All notable changes to this project will be documented in this file.

## [1.0.7] - 2025-10-03

### Changed

#### 🔄 Restructured to Monorepo

- **BREAKING CHANGE**: Restructured project into monorepo with workspaces
- Created two separate packages:
    - `@libeyondea/base-cms`: Main library with components and utilities
    - `@libeyondea/base-cms-dev`: Development dependencies bundle

#### ✨ New Package: @libeyondea/base-cms-dev

Created a new package that bundles all development dependencies:

- TypeScript & type definitions
- Build tools (Vite, Rollup plugins)
- Linting tools (ESLint & plugins)
- Formatting tools (Prettier & plugins)

#### 📦 Benefits

**For Users:**

- Simplified installation (2 packages instead of 20+)
- Consistent dev tool versions
- Cleaner package.json
- Reduced version conflict issues

**For Maintainers:**

- Centralized dev dependency management
- Better version control
- Easier testing and maintenance

#### 📝 Migration Guide

**Before (v1.0.6 and earlier):**

```bash
npm install @libeyondea/base-cms
# Then manually install all dev dependencies
```

**After (v1.0.7+):**

```bash
npm install @libeyondea/base-cms
npm install --save-dev @libeyondea/base-cms-dev
```

### Documentation

- Added comprehensive USAGE.md with monorepo workflow
- Updated README.md with workspace structure
- Added detailed package READMEs for both packages

### Project Structure

```
base-cms/
├── packages/
│   ├── base-cms/          # Main library
│   └── base-cms-dev/      # Dev dependencies
└── package.json           # Workspace root
```

---

## Previous Versions

See git history for changes in versions prior to 1.0.7.
