import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Vận Chuyển - Trang Thiên Long Mobile | Miễn Phí Toàn Quốc",
  description: "Chính sách vận chuyển miễn phí toàn quốc của Trang Thiên Long Mobile - Giao hàng tận nơi, thanh toán khi nhận hàng, đổi trả trong 7 ngày, hỗ trợ 24/7.",
  keywords: "vận chuyển miễn phí, giao hàng toàn quốc, COD, đổi trả 7 ngày, freeship, Trang Thiên Long Mobile",
};

export default function ChinhSachVanChuyenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            🚚 Chính Sách Vận Chuyển
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Miễn phí vận chuyển toàn quốc - Giao hàng tận nơi an toàn và nhanh chóng
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          
          {/* Free Shipping Policy */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl mb-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
              🚚 Chính Sách Vận Chuyển Miễn Phí
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Tất cả các sản phẩm được bán ra tại <span className="font-bold text-green-700">TRANG THIÊN LONG MOBILE</span> sẽ được <span className="font-bold text-emerald-700">MIỄN PHÍ VẬN CHUYỂN toàn quốc</span>. Khi quý khách hoàn tất đơn đặt hàng, nhân viên sẽ liên lạc thông báo tình trạng đơn hàng và thời gian nhận hàng.
            </p>
          </div>

          {/* Delivery Process */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              📋 Quy Trình Giao Hàng
            </h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">📞 Xác Nhận Đơn Hàng</h4>
                    <p className="text-sm text-gray-700">Nhân viên liên hệ xác nhận thông tin và thời gian giao hàng trong vòng 2 giờ</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">📦 Chuẩn Bị & Đóng Gói</h4>
                    <p className="text-sm text-gray-700">Sản phẩm được kiểm tra chất lượng và đóng gói cẩn thận với bao bì chuyên nghiệp</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2">🚚 Vận Chuyển</h4>
                    <p className="text-sm text-gray-700">Đơn vị vận chuyển chuyên nghiệp đến tận nơi giao hàng an toàn</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">💳 Nhận Hàng & Thanh Toán</h4>
                    <p className="text-sm text-gray-700">Kiểm tra sản phẩm và thanh toán trực tiếp với shipper (COD)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              ⚠️ Lưu Ý Quan Trọng
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">🚨 Số Lần Giao Hàng</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 text-lg">•</span>
                    <span>Đơn hàng sẽ được giao <strong>tối đa 2 lần</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 text-lg">•</span>
                    <span>Lần 1 không thành công → liên hệ sắp xếp lịch giao lần 2</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 text-lg">•</span>
                    <span>Không liên lạc được trong <strong>2 ngày làm việc</strong> → đơn hàng hết hiệu lực</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🎯 Trường Hợp Nhạy Cảm</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-lg">•</span>
                    <span>Giá trị đơn hàng quá lớn</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-lg">•</span>
                    <span>Giao hàng buổi tối</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-lg">•</span>
                    <span>Địa chỉ trong ngõ hoặc có nguy hiểm</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-lg">→</span>
                    <span><strong>Sẽ liên hệ thống nhất lại thời gian cụ thể</strong></span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">📦 Khi Nhận Hàng</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Kiểm Tra Sản Phẩm</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Kiểm tra kỹ sản phẩm trước khi ký nhận</li>
                    <li>• <strong>Quay video quá trình mở hộp</strong></li>
                    <li>• Xem xét tình trạng bên ngoài và bên trong</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Hoàn Tất Giao Dịch</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Thanh toán và ký xác nhận với shipper</li>
                    <li>• <strong>Giữ lại biên lai vận chuyển</strong></li>
                    <li>• Lưu trữ hóa đơn đính kèm trong sản phẩm</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Liability Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              🛡️ Trách Nhiệm & Miễn Trừ
            </h2>

            <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-xl border border-rose-200">
              <h3 className="text-lg font-semibold text-red-800 mb-4">⚠️ Trang Thiên Long Mobile KHÔNG chịu trách nhiệm với:</h3>
              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-red-300">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-red-700">📹 Video mở hộp:</span> Những sai lệch hình thức của hàng hoá sau khi ký nhận <strong>mà không có video mở hộp làm bằng chứng</strong>
                  </p>
                </div>
                <div className="bg-white/50 p-3 rounded-lg border border-red-300">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-red-700">🚛 Rủi ro vận chuyển:</span> Các rủi ro phát sinh trong quá trình vận chuyển (va đập, ẩm ướt, tai nạn...)
                  </p>
                </div>
                <div className="bg-white/50 p-3 rounded-lg border border-red-300">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-red-700">🌦️ Yếu tố khách quan:</span> Việc giao hàng chậm trễ do thời tiết, giao thông, thiên tai...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              🔄 Quy Định Về Đổi, Trả Hàng
            </h2>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center bg-white/50 px-6 py-3 rounded-full border border-emerald-300">
                  <span className="text-3xl mr-3">🕐</span>
                  <div>
                    <p className="font-bold text-emerald-800 text-lg">7 NGÀY</p>
                    <p className="text-sm text-emerald-600">Hỗ trợ hoàn trả sản phẩm</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-700 mb-4">
                <span className="font-bold text-emerald-700">trangthienlong.com</span> hỗ trợ khách hàng hoàn trả sản phẩm trong vòng <strong>7 ngày kể từ ngày nhận hàng</strong>.
              </p>
              <div className="text-center">
                <a href="/chinh-sach-doi-tra" className="inline-flex items-center bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors">
                  <span className="mr-2">📖</span>
                  Xem Chi Tiết Chính Sách Đổi Trả
                </a>
              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📞 Hỗ Trợ Vận Chuyển 24/7
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 text-center">
                <div className="text-4xl mb-3">📞</div>
                <h4 className="font-semibold text-blue-800 mb-2">Hotline</h4>
                <p className="font-bold text-blue-600 text-lg">0939.02.1234</p>
                <p className="text-xs text-gray-600 mt-1">Hỗ trợ 24/7</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 text-center">
                <div className="text-4xl mb-3">🌐</div>
                <h4 className="font-semibold text-green-800 mb-2">Website</h4>
                <p className="font-medium text-green-600">trangthienlong.com</p>
                <p className="text-xs text-gray-600 mt-1">Online 24/7</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 text-center">
                <div className="text-4xl mb-3">📘</div>
                <h4 className="font-semibold text-purple-800 mb-2">Fanpage</h4>
                <p className="font-medium text-purple-600">Facebook TTL Mobile</p>
                <p className="text-xs text-gray-600 mt-1">Phản hồi nhanh</p>
              </div>
            </div>
          </div>

          {/* Commitment Section */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-xl font-bold text-center mb-4 text-slate-800">
              🤝 Cam Kết Vận Chuyển
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✅</span>
                    <span><strong>Miễn phí vận chuyển</strong> toàn quốc</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">⚡</span>
                    <span><strong>Giao hàng nhanh</strong> trong 1-2 ngày làm việc</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">📦</span>
                    <span><strong>Đóng gói cẩn thận</strong> đảm bảo nguyên vẹn</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🆘</span>
                    <span><strong>Hỗ trợ 24/7</strong> giải đáp thắc mắc</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">💰</span>
                    <span><strong>Hoàn tiền 100%</strong> nếu giao chậm không báo trước</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🎯</span>
                    <span><strong>Chính sách linh hoạt</strong> cho từng trường hợp</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🚚 Vận Chuyển Miễn Phí
            </h3>
            <p className="text-lg mb-6 text-purple-100">
              Trang Thiên Long Mobile cam kết dịch vụ vận chuyển miễn phí toàn quốc với chất lượng dịch vụ hàng đầu và hỗ trợ khách hàng 24/7.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Freeship Toàn Quốc - Giao Hàng Tận Nơi!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}