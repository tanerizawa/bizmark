#!/bin/bash
# Quick test script untuk check custom domain dan console errors

echo "🔍 Testing Custom Domain: https://bizmark.id/"
echo "============================================="
echo ""

# Test main domain
echo "1. Testing main domain response..."
HTTP_STATUS=$(curl -I https://bizmark.id/ 2>/dev/null | head -1)
echo "   $HTTP_STATUS"

# Test favicon
echo ""
echo "2. Testing favicon availability..."
FAVICON_STATUS=$(curl -I https://bizmark.id/favicon.svg 2>/dev/null | head -1)
echo "   $FAVICON_STATUS"

# Test CSS asset
echo ""
echo "3. Testing CSS assets..."
# Get CSS file from build
CSS_FILE=$(ls dist/assets/css/*.css 2>/dev/null | head -1 | xargs basename)
if [ ! -z "$CSS_FILE" ]; then
    CSS_STATUS=$(curl -I "https://bizmark.id/assets/css/$CSS_FILE" 2>/dev/null | head -1)
    echo "   CSS: $CSS_STATUS"
else
    echo "   CSS: No CSS file found in dist/"
fi

# Test JS asset
echo ""
echo "4. Testing JS assets..."
JS_FILE=$(ls dist/assets/js/*.js 2>/dev/null | head -1 | xargs basename)
if [ ! -z "$JS_FILE" ]; then
    JS_STATUS=$(curl -I "https://bizmark.id/assets/js/$JS_FILE" 2>/dev/null | head -1)
    echo "   JS: $JS_STATUS"
else
    echo "   JS: No JS file found in dist/"
fi

echo ""
echo "🎯 Test Complete!"
echo "✅ If all show '200 OK', website should work without console errors"
echo "❌ If any show '404', that resource is missing"

echo ""
echo "🌐 Opening website for manual check..."
open "https://bizmark.id/"
