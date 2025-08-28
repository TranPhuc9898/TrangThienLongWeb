import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hướng Dẫn Mua Hàng - Trang Thiên Long Mobile | Đặt Hàng Dễ Dàng",
  description: "Hướng dẫn mua hàng chi tiết tại Trang Thiên Long Mobile - Đặt hàng online dễ dàng, thanh toán COD, giao hàng miễn phí toàn quốc.",
  keywords: "hướng dẫn mua hàng, đặt hàng online, cách mua iPhone, iPad, mua hàng COD, Trang Thiên Long Mobile",
};

export default function HuongDanMuaHangPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            🛍️ Hướng Dẫn Mua Hàng
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Quy trình đặt hàng đơn giản, nhanh chóng chỉ với vài bước đơn giản
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-6 rounded-xl mb-8 border-l-4 border-teal-500">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
              🎯 Mua Hàng Tại Trang Thiên Long Mobile
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Chỉ với <span className="font-bold text-teal-700">4 bước đơn giản</span>, bạn có thể sở hữu ngay sản phẩm Apple chính hãng với giá tốt nhất thị trường.
            </p>
          </div>

          {/* Shopping Steps */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              📝 Quy Trình Mua Hàng
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">1</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">🔍 Chọn Sản Phẩm</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-blue-700 mb-2">Duyệt Sản Phẩm</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Xem danh mục iPhone, iPad, Mac, Apple Watch</li>
                          <li>• So sánh giá và thông số kỹ thuật</li>
                          <li>• Đọc đánh giá và mô tả chi tiết</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-700 mb-2">Lựa Chọn Phiên Bản</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Chọn dung lượng phù hợp</li>
                          <li>• Chọn màu sắc yêu thích</li>
                          <li>• Xem tình trạng còn hàng</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">2</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">🛒 Thêm Vào Giỏ Hàng</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">Cấu Hình Sản Phẩm</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Chọn số lượng cần mua</li>
                          <li>• Thêm phụ kiện đi kèm (nếu có)</li>
                          <li>• Áp dụng mã giảm giá (nếu có)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-green-700 mb-2">Kiểm Tra Giỏ Hàng</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Xem lại sản phẩm đã chọn</li>
                          <li>• Kiểm tra tổng tiền</li>
                          <li>• Cập nhật số lượng nếu cần</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">3</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-orange-800 mb-3">📋 Điền Thông Tin</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2">Thông Tin Cá Nhân</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Họ tên đầy đủ</li>
                          <li>• Số điện thoại liên hệ</li>
                          <li>• Email (để nhận thông báo)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-orange-700 mb-2">Địa Chỉ Giao Hàng</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Tỉnh/Thành phố</li>
                          <li>• Quận/Huyện, Phường/Xã</li>
                          <li>• Địa chỉ cụ thể</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">4</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-purple-800 mb-3">✅ Xác Nhận Đơn Hàng</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-purple-700 mb-2">Chọn Phương Thức</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Thanh toán khi nhận hàng (COD)</li>
                          <li>• Chuyển khoản ngân hàng</li>
                          <li>• Mua trả góp (nếu hỗ trợ)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-700 mb-2">Hoàn Tất Đặt Hàng</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Nhấn "Đặt hàng" để hoàn tất</li>
                          <li>• Nhận mã đơn hàng</li>
                          <li>• Chờ nhân viên liên hệ xác nhận</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              💳 Phương Thức Thanh Toán
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 text-center">
                <div className="text-4xl mb-3">💵</div>
                <h3 className="font-semibold text-green-800 mb-2">Thanh Toán COD</h3>
                <p className="text-sm text-gray-600 mb-3">Thanh toán khi nhận hàng</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ An toàn, tiện lợi</li>
                  <li>✓ Kiểm tra hàng trước khi trả tiền</li>
                  <li>✓ Không mất phí</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 text-center">
                <div className="text-4xl mb-3">🏦</div>
                <h3 className="font-semibold text-blue-800 mb-2">Chuyển Khoản</h3>
                <p className="text-sm text-gray-600 mb-3">Chuyển khoản ngân hàng</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Nhanh chóng</li>
                  <li>✓ Ưu tiên xử lý đơn</li>
                  <li>✓ Giảm giá 1-2%</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 text-center">
                <div className="text-4xl mb-3">🏧</div>
                <h3 className="font-semibold text-purple-800 mb-2">Trả Góp</h3>
                <p className="text-sm text-gray-600 mb-3">Trả góp 0% lãi suất</p>
                <ul className="text-xs text-gray-500 space-y-1">
                  <li>✓ Lãi suất 0%</li>
                  <li>✓ Thủ tục đơn giản</li>
                  <li>✓ Duyệt nhanh</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shopping Tips */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              💡 Mẹo Mua Hàng Thông Minh
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-500">
                  <h4 className="font-medium text-amber-800 mb-2">🕐 Thời Điểm Tốt Nhất</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Khuyến mãi cuối tháng</li>
                    <li>• Black Friday, 11/11, 12/12</li>
                    <li>• Ra mắt sản phẩm mới (giảm giá model cũ)</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-medium text-green-800 mb-2">💰 Tiết Kiệm Chi Phí</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• So sánh giá với các cửa hàng khác</li>
                    <li>• Đăng ký nhận thông báo khuyến mãi</li>
                    <li>• Mua kèm combo để được giảm giá</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-medium text-blue-800 mb-2">🔍 Kiểm Tra Kỹ</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Xem kỹ thông số kỹ thuật</li>
                    <li>• Đọc chính sách bảo hành</li>
                    <li>• Kiểm tra tình trạng còn hàng</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-medium text-purple-800 mb-2">📞 Liên Hệ Hỗ Trợ</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Gọi hotline để được tư vấn</li>
                    <li>• Chat online để hỏi nhanh</li>
                    <li>• Nhắn tin Facebook để được hỗ trợ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-xl font-bold text-center mb-4 text-slate-800">
              📞 Hỗ Trợ Mua Hàng 24/7
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-2xl mb-2">📞</div>
                <p className="font-bold text-red-600 text-lg">0939.02.1234</p>
                <p className="text-sm text-gray-600">Tư vấn miễn phí</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-2xl mb-2">💬</div>
                <p className="font-semibold text-blue-600">Chat Online</p>
                <p className="text-sm text-gray-600">Phản hồi trong 5 phút</p>
              </div>
              <div className="bg-white/50 p-4 rounded-lg">
                <div className="text-2xl mb-2">🏪</div>
                <p className="font-semibold text-green-600">Mua Tại Cửa Hàng</p>
                <p className="text-sm text-gray-600">15i Trần Phú, Q.5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🛍️ Mua Hàng Dễ Dàng
            </h3>
            <p className="text-lg mb-6 text-teal-100">
              Với quy trình đặt hàng đơn giản và hỗ trợ tận tình, mua sắm tại Trang Thiên Long Mobile chưa bao giờ dễ dàng đến thế!
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Chỉ 4 Bước - Có Ngay Sản Phẩm Apple!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}