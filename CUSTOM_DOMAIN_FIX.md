# 🔧 Custom Domain Fix Guide - www.bizmark.id

## ✅ Current DNS Status (CORRECT)
```
www.bizmark.id → CNAME → tanerizawa.github.io
tanerizawa.github.io → A records:
  - 185.199.108.153
  - 185.199.109.153  
  - 185.199.110.153
  - 185.199.111.153
```

## 🚨 Issue Identified
SSL Certificate tidak valid untuk `www.bizmark.id` - GitHub Pages perlu regenerate certificate

## 🛠️ Fix Steps (EXECUTE IN ORDER)

### Step 1: Remove Custom Domain (Temporary)
1. Go to: https://github.com/tanerizawa/bizmark/settings/pages
2. Scroll to "Custom domain" section
3. **CLEAR** the field (remove `www.bizmark.id`)
4. Click **Save**
5. **Wait 2-3 minutes**

### Step 2: Re-add Custom Domain  
1. In same page, "Custom domain" field
2. Enter: `www.bizmark.id` (with www)
3. Click **Save**
4. **Wait 5-10 minutes** for SSL certificate generation

### Step 3: Enable HTTPS
1. After Step 2, you'll see option "Enforce HTTPS"
2. **Check the box** "Enforce HTTPS"
3. Click **Save**

### Step 4: Verify
- Test: https://www.bizmark.id
- Should show PT. Timur Cakrawala Konsultan website
- SSL should be valid (green lock icon)

## ⏱️ Timeline
- Step 1-2: 5-10 minutes
- SSL Certificate generation: 10-24 hours (usually 10-30 minutes)
- Total expected time: 15-60 minutes

## 🎯 Expected Final Result
✅ https://www.bizmark.id → Working with SSL
✅ https://bizmark.id → Redirect to www.bizmark.id  
✅ All WhatsApp CTAs functional
✅ Mobile responsive
✅ SEO optimized
