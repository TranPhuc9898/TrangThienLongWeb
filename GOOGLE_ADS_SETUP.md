# 🎯 Google Ads Setup Guide

## ✅ ĐÃ HOÀN THÀNH

### 1. Performance Optimization
- ✅ Thêm indexes vào Prisma schema (category, slug, series, inStock, etc.)
- ✅ Tạo in-memory cache layer (`src/lib/cache.ts`)
- ✅ Optimize API routes với caching (5-10 phút TTL)
- ✅ Apply Prisma migration

### 2. Google Ads Integration
- ✅ Google Ads script đã được setup trong `layout.tsx`
- ✅ Conversion ID: `AW-785944712`
- ✅ Tạo analytics utility (`src/lib/analytics.ts`)
- ✅ Tracking được integrate vào:
  - Product view (product detail page)
  - Add to cart
  - Begin checkout
  - Purchase conversion

---

## 🚀 BƯỚC TIẾP THEO (CẦN LÀM)

### Step 1: Lấy Conversion Label từ Google Ads

1. **Đăng nhập Google Ads**
   - Vào https://ads.google.com
   - Account ID: `785944712`

2. **Tạo Conversion Action**
   - Tools & Settings > Measurement > Conversions
   - Click **+ New conversion action**
   - Chọn **Website**

3. **Setup Purchase Conversion**
   ```
   Category: Purchase
   Conversion name: "Purchase" hoặc "Mua hàng"
   Value: Use transaction-specific value
   Count: Every conversion
   Conversion window: 30 days
   Attribution model: Last click
   ```

4. **Lấy Conversion Label**
   - Sau khi tạo xong, sẽ có code snippet
   - Tìm dòng có `send_to: 'AW-785944712/XXXXX'`
   - `XXXXX` là conversion label cần lấy

5. **Update code**
   - Mở file: `src/lib/analytics.ts`
   - Tìm dòng 105: `send_to: 'AW-785944712/YOUR_CONVERSION_LABEL'`
   - Thay `YOUR_CONVERSION_LABEL` bằng label vừa lấy
   - Ví dụ: `send_to: 'AW-785944712/AbC123XyZ'`

---

### Step 2: Deploy lên VPS

```bash
# 1. Build project
npm run build

# 2. Upload lên VPS (sử dụng scp, rsync, hoặc git)
# Ví dụ với git:
git add .
git commit -m "Add performance optimization & Google Ads tracking"
git push origin main

# 3. Trên VPS, pull code và restart
cd /path/to/project
git pull
npm install
npm run build
pm2 restart all  # hoặc systemctl restart your-service
```

---

### Step 3: Test Tracking

#### A. Cài Google Tag Assistant Extension
- Chrome Extension: [Google Tag Assistant](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)

#### B. Test từng event

1. **Test Product View**
   - Vào product detail page
   - Mở Console (F12)
   - Xem log: `📊 Tracked product view: iPhone 15 Pro Max`
   - Check Google Tag Assistant: Event `view_item`

2. **Test Add to Cart**
   - Click "Thêm vào giỏ"
   - Check console: `🛒 Tracked add to cart: iPhone 15`
   - Event: `add_to_cart`

3. **Test Begin Checkout**
   - Vào trang thanh toán
   - Check console: `💳 Tracked begin checkout: 25000000`
   - Event: `begin_checkout`

4. **Test Purchase** (QUAN TRỌNG NHẤT)
   - Điền form và submit đơn hàng
   - Check console: `✅ Tracked purchase: ORDER-xxxxx`
   - Event: `conversion` và `purchase`

#### C. Verify trong Google Ads
- Vào Google Ads > Tools > Conversions
- Click vào conversion vừa tạo
- Check "Recent conversions" (có thể mất 3-24h để hiển thị)

---

### Step 4: Setup Google Ads Campaigns

#### A. Performance Max Campaign (Recommend)
```
Campaign type: Performance Max
Goal: Sales/Conversions
Budget: 200.000 VND/day (bắt đầu thấp)
Bidding: Maximize conversions

Assets:
- Images: Product photos từ website
- Headlines: "iPhone 15 Pro Max Giá Tốt | Trả Góp 0%"
- Descriptions: Use product descriptions
- Final URL: https://yourdomain.com/shop
```

#### B. Search Campaign
```
Campaign type: Search
Goal: Website traffic/Conversions
Budget: 100.000 VND/day

Keywords:
- mua iphone 15 pro max
- iphone chính hãng tphcm
- điện thoại apple giá rẻ
- iphone trả góp 0%

Ad copy:
Headline 1: iPhone 15 Pro Max Chính Hãng
Headline 2: Giá Tốt Nhất | Trả Góp 0%
Headline 3: Giao Hàng 2H TPHCM
Description: Bảo hành 12 tháng, đổi mới trong 30 ngày
```

#### C. Dynamic Remarketing
- Sử dụng Google Merchant feed đã có
- Target users đã xem sản phẩm nhưng chưa mua
- Budget: 50.000 VND/day

---

## 📊 EXPECTED RESULTS

### Performance Improvements
- **Trước:** Load ảnh 10s+
- **Sau:** Load ảnh 1-2s (lần đầu), <500ms (cached)

### Conversion Tracking
- View Item: ~100-500 events/day
- Add to Cart: ~10-50 events/day
- Begin Checkout: ~5-20 events/day
- Purchase: ~1-10 conversions/day

### Campaign Performance (after 1 month)
- CTR: 2-5%
- Conversion Rate: 1-3%
- ROAS: 300-500% (3-5x return on ad spend)

---

## 🐛 TROUBLESHOOTING

### Issue 1: Tracking không hoạt động
```
✅ Check: Google Ads ID đúng chưa (AW-785944712)
✅ Check: Console có logs không?
✅ Check: window.gtag có tồn tại không? (F12 > Console > window.gtag)
✅ Check: Ad blocker đã tắt chưa?
```

### Issue 2: VPS vẫn chậm
```bash
# Check disk space
df -h

# Check memory
free -m

# Clear logs
sudo journalctl --vacuum-time=7d

# Optimize images
npm install sharp
# Use Next.js Image optimization
```

### Issue 3: Cache không work
```
✅ Check: Redis có chạy không? (nếu dùng Redis)
✅ Check: Memory cache logs trong console
✅ Clear cache: Restart Node.js process
```

---

## 📞 SUPPORT

Nếu gặp vấn đề:
1. Check logs trong Console (F12)
2. Check Google Ads > Tools > Conversions > Diagnostics
3. Verify với Google Tag Assistant
4. Đọc docs: https://support.google.com/google-ads/answer/6331304

---

## 🎯 CHECKLIST

- [ ] Lấy Conversion Label từ Google Ads
- [ ] Update `src/lib/analytics.ts` với label
- [ ] Deploy lên VPS
- [ ] Test tracking với Google Tag Assistant
- [ ] Verify conversions trong Google Ads
- [ ] Setup campaign (Performance Max hoặc Search)
- [ ] Monitor performance sau 3-7 ngày
- [ ] Optimize campaign based on data

---

**Good luck! 🚀**