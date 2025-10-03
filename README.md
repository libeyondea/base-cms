# Base CMS

Base CMS library for React

## Packages

This monorepo contains two packages:

### [@libeyondea/base-cms](./packages/base-cms)

Main library package containing all React components, hooks, layouts, and utilities for building CMS applications.

### [@libeyondea/base-cms-dev](./packages/base-cms-dev)

Development dependencies package that bundles all the dev tools needed for working with `@libeyondea/base-cms`.

## Quick Start

### For Users

Install both packages:

```bash
# Install the main library
npm install @libeyondea/base-cms

# Install dev dependencies (instead of installing each one individually)
npm install --save-dev @libeyondea/base-cms-dev
```

### For Development

Clone and install:

```bash
git clone https://github.com/libeyondea/base-cms.git
cd base-cms
npm install
```

## Scripts

- `npm run dev` - Start development server for base-cms package
- `npm run build` - Build all packages
- `npm run build:cms` - Build only the base-cms package
- `npm run lint` - Lint all packages
- `npm run preview` - Preview the built base-cms package

## Workspace Structure

```
base-cms/
├── packages/
│   ├── base-cms/          # Main library package
│   │   ├── src/           # Source code
│   │   ├── dist/          # Build output
│   │   └── package.json
│   └── base-cms-dev/      # Dev dependencies package
│       └── package.json
├── package.json           # Root package.json with workspaces
└── README.md
```

## Benefits of This Structure

1. **Simplified Installation**: Users only need to install 2 packages instead of 20+ dev dependencies
2. **Version Consistency**: All dev tools are versioned together
3. **Easier Maintenance**: Update dev dependencies in one place
4. **Better Developer Experience**: Cleaner package.json in user projects

## License

MIT

## Author

Nguyen Thuc
