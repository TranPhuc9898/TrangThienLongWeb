  Flow hoạt động:

  1. Admin dashboard → Add sản phẩm → API POST /api/products
  2. Upload ảnh → Lưu vào public/uploads/ với tên unique
  3. Database → Lưu product record với đường dẫn ảnh
  4. Trang chủ → Fetch data từ API GET /api/products
  5. Next.js Image component → Render ảnh từ URL

  Vấn đề trước khi fix:

  - Database có record ✅
  - File ảnh tồn tại ✅
  - Next.js Image optimization FAIL ❌
  - → 400 Bad Request → Ảnh không hiển thị trên trang chủ

  Sau khi fix next.config.mjs:

  - Domain trangmobile.com được allow ✅
  - Next.js Image optimization HOẠT ĐỘNG ✅
  - Ảnh sẽ hiển thị đúng trên trang chủ ✅
`
  KẾT QUẢ MONG ĐỢI:

  ĐÚNG RỒI - Khi bạn vào admin dashboard thêm sản phẩm thành công:
  1. Ảnh upload vào public/uploads/
  2. Database lưu thành công
  3. Trang chủ sẽ HIỂN THỊ ảnh đó ra không còn lỗi 400
  4. Next.js Image component render bình thường

  Fix next.config.mjs đã giải quyết được vấn đề hiển thị ảnh trên trang chủ.