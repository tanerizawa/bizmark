#!/bin/bash
# Monitor script untuk custom domain www.bizmark.id

echo "🔍 Monitoring Custom Domain: www.bizmark.id"
echo "====================================================="
echo ""

# Function to check SSL
check_ssl() {
    echo "⏳ Testing SSL Certificate..."
    if curl -I https://www.bizmark.id/ --max-time 10 &>/dev/null; then
        echo "✅ SSL Certificate: WORKING"
        echo "🌐 Website: https://www.bizmark.id/"
        return 0
    else
        echo "❌ SSL Certificate: NOT READY"
        return 1
    fi
}

# Function to check DNS
check_dns() {
    echo "🔍 Checking DNS Configuration..."
    if dig +short www.bizmark.id | grep -q "tanerizawa.github.io"; then
        echo "✅ DNS CNAME: CORRECT (www.bizmark.id → tanerizawa.github.io)"
    else
        echo "❌ DNS CNAME: INCORRECT"
    fi
}

# Main monitoring
echo "Starting monitoring..."
echo ""

# Check DNS first
check_dns
echo ""

# Check SSL
if check_ssl; then
    echo ""
    echo "🎉 CUSTOM DOMAIN READY!"
    echo "✅ Website accessible: https://www.bizmark.id"
    echo "✅ All WhatsApp CTAs should work"
    echo "✅ Mobile responsive active"
    open "https://www.bizmark.id"
else
    echo ""
    echo "⏳ Custom domain belum ready. Check lagi dalam 5-10 menit."
    echo "💡 Pastikan sudah follow steps di CUSTOM_DOMAIN_FIX.md"
    echo ""
    echo "🔄 Monitoring akan auto-retry setiap 2 menit..."
    
    # Auto retry loop
    for i in {1..10}; do
        echo "🔄 Retry $i/10 - Waiting 2 minutes..."
        sleep 120
        echo ""
        if check_ssl; then
            echo "🎉 SUCCESS! Custom domain now working!"
            open "https://www.bizmark.id"
            break
        fi
    done
fi
