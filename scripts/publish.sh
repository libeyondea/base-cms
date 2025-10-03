#!/bin/bash

# Script để publish các packages theo thứ tự đúng

set -e

echo "📦 Publishing Base CMS Monorepo Packages"
echo "========================================"
echo ""

# Build tất cả packages
echo "🔨 Building all packages..."
npm run build
echo "✅ Build completed!"
echo ""

# Publish base-cms-dev trước (vì base-cms depend on nó)
echo "📤 Publishing @libeyondea/base-cms-dev..."
cd packages/base-cms-dev
npm publish --access public
cd ../..
echo "✅ @libeyondea/base-cms-dev published!"
echo ""

# Đợi một chút để package được sync
echo "⏳ Waiting for package to sync..."
sleep 5
echo ""

# Publish base-cms
echo "📤 Publishing @libeyondea/base-cms..."
cd packages/base-cms
npm publish --access public
cd ../..
echo "✅ @libeyondea/base-cms published!"
echo ""

echo "🎉 All packages published successfully!"
echo "========================================"
echo ""
echo "Published packages:"
echo "  - @libeyondea/base-cms-dev"
echo "  - @libeyondea/base-cms"

