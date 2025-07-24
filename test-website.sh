#!/bin/bash
# Test script untuk memverifikasi website setelah custom domain dihapus

echo "🔍 Testing GitHub Pages URL..."
echo "URL: https://tanerizawa.github.io/bizmark/"
echo ""

# Test if site is accessible
curl -I https://tanerizawa.github.io/bizmark/ 2>/dev/null | head -1

echo ""
echo "🌐 Opening website in browser..."
open "https://tanerizawa.github.io/bizmark/"

echo ""
echo "✅ If you see 'HTTP/2 200 OK' above, website is working!"
echo "🚨 If you see redirect or other error, custom domain is still configured"
