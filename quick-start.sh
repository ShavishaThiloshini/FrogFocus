#!/bin/bash

# FrogFocus Quick Start - Windows & Mac/Linux
# This script helps you get started quickly

echo "🐸 FrogFocus Quick Start Setup"
echo "==============================="
echo ""

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install from https://nodejs.org"
    exit 1
fi

echo "✓ Node.js found: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo "✓ Dependencies installed!"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example"
    cp .env.example .env.local
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local with your Supabase credentials"
    echo "   Get them from: https://supabase.com/dashboard"
    echo ""
fi

echo "🚀 Ready to start development!"
echo ""
echo "Next steps:"
echo "1. Add your Supabase URL and key to .env.local"
echo "2. Run: npm run dev"
echo "3. Follow the README.md for Supabase setup"
echo ""
echo "Happy studying! 💚"
