import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Hành - Trang Thiên Long Mobile | Bảo Hành 24 Tháng",
  description: "Chính sách bảo hành siêu ưu việt của Trang Thiên Long Mobile - Máy mới 24 tháng, máy cũ 12 tháng. Miễn phí cài đặt phần mềm, game và ứng dụng cho Mac.",
  keywords: "chính sách bảo hành, bảo hành 24 tháng, bảo hành iPhone, iPad, MacBook, Apple, Trang Thiên Long Mobile",
};

export default function ChinhSachBaoHanhPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-rose-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            🛡️ Chính Sách Bảo Hành
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            Hình thức bảo hành siêu ưu việt dành cho máy mới 100% và cả máy cũ 99%
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-xl mb-8 border-l-4 border-orange-500">
            <p className="text-lg leading-relaxed text-gray-700">
              <span className="font-bold text-orange-700">TRANG THIÊN LONG MOBILE</span> là đơn vị duy nhất có hình thức bảo hành siêu ưu việt dành cho máy mới 100% và cả máy cũ 99%.
            </p>
          </div>

          {/* Warranty Duration */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ⏰ Thời Gian Bảo Hành Áp Dụng
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4">💎 Máy Mới (100%)</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-700 mb-2">24</div>
                  <p className="text-green-600 font-semibold">THÁNG BẢO HÀNH</p>
                  <div className="mt-4 bg-white/50 p-3 rounded-lg border border-green-300">
                    <p className="text-sm text-gray-700">Thời gian bảo hành dài nhất thị trường</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">💫 Máy Cũ (99%)</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-700 mb-2">12</div>
                  <p className="text-blue-600 font-semibold">THÁNG BẢO HÀNH</p>
                  <div className="mt-4 bg-white/50 p-3 rounded-lg border border-blue-300">
                    <p className="text-sm text-gray-700">Chất lượng được kiểm định kỹ lưỡng</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-r from-yellow-100 to-amber-100 p-4 rounded-lg border border-yellow-300">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-amber-700">⚠️ Khách hàng lưu ý:</span> Không tự ý cập nhật phần mềm, để tránh những lỗi phần mềm không đáng có!
              </p>
            </div>
          </div>

          {/* Free Software Support */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              💻 Hỗ Trợ Phần Mềm Miễn Phí
            </h2>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🖥️</div>
                  <h4 className="font-semibold text-purple-800">MacBook</h4>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🖤</div>
                  <h4 className="font-semibold text-purple-800">iMac</h4>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⚙️</div>
                  <h4 className="font-semibold text-purple-800">Phần Mềm</h4>
                </div>
              </div>
              <p className="text-gray-700 text-center">
                <span className="font-bold text-purple-700">TRANG THIÊN LONG MOBILE</span> hỗ trợ cài đặt phần mềm, game và các ứng dụng <strong>miễn phí</strong> cho khách hàng mua Macbook, iMac tại cửa hàng.
              </p>
            </div>
          </div>

          {/* Warranty Principles */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              📋 Nguyên Tắc Bảo Hành
            </h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border-l-4 border-teal-500">
                <h4 className="font-medium text-teal-800 mb-2">🔧 Quy Trình Bảo Hành</h4>
                <p className="text-sm text-gray-700">
                  Sản phẩm được bảo hành miễn phí nếu còn thời hạn bảo hành tính từ ngày khách hàng mua hàng.
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-medium text-blue-800 mb-2">🔄 Hình Thức Bảo Hành</h4>
                <p className="text-sm text-gray-700">
                  Sản phẩm được bảo hành bằng hình thức: <strong>Sửa chữa → Thay thế → Đổi máy tương đương</strong> theo đúng trình tự.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-medium text-green-800 mb-2">⏰ Thời Hạn Chuyển Giao</h4>
                <p className="text-sm text-gray-700">
                  Khi đổi sản phẩm, thời hạn bảo hành còn lại của sản phẩm cũ được chuyển sang sản phẩm tương đương + gia hạn thêm thời gian gửi tại trung tâm bảo hành.
                </p>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h4 className="font-medium text-orange-800 mb-2">📍 Phạm Vi Áp Dụng</h4>
                <p className="text-sm text-gray-700">
                  Chính sách bảo hành chỉ áp dụng cho các sản phẩm do <span className="font-bold text-orange-700">TRANG THIÊN LONG MOBILE</span> cung cấp.
                </p>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              💰 Chính Sách Đổi Trả Đặc Biệt
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-200">
                <h3 className="text-lg font-semibold text-rose-800 mb-3">💎 Máy Mới 100%</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Trường hợp máy không bị lỗi phần cứng do nhà sản xuất, nếu khách hàng có nhu cầu đổi trả:
                </p>
                <div className="bg-white/50 p-3 rounded-lg border border-rose-300">
                  <p className="text-center font-bold text-rose-700">
                    Thu phí 15% giá máy
                  </p>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    Theo giá bán tại thời điểm đổi trả
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">💫 Máy Cũ 99%</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Đối với máy cũ, chính sách đổi trả linh hoạt:
                </p>
                <div className="bg-white/50 p-3 rounded-lg border border-green-300">
                  <p className="text-center font-bold text-green-700">
                    Nhập lại 100% giá
                  </p>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    Tại thời điểm đổi trả hoặc đổi sang sản phẩm khác
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gradient-to-r from-amber-100 to-yellow-100 p-4 rounded-lg border border-amber-300">
              <p className="text-sm text-gray-700 text-center">
                <span className="font-semibold text-amber-700">📖 Lưu ý:</span> Quý khách vui lòng đọc kỹ điều kiện bảo hành và đổi trả trong 15 ngày bên dưới
              </p>
            </div>
          </div>

          {/* Warranty Conditions */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ⚖️ Điều Kiện Bảo Hành
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <h3 className="text-lg font-semibold text-indigo-800 mb-4">✅ Điều Kiện Được Bảo Hành</h3>
                
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="font-medium text-indigo-700 mb-2">📋 Bảo Hành Chung</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Lỗi vật liệu và gia công trong điều kiện sử dụng bình thường</li>
                      <li>• Máy còn nguyên tem bảo hành</li>
                      <li>• Có phiếu bảo hành (nếu có)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-700 mb-2">🆕 Bảo Hành 30 Ngày</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Hư hỏng phần cứng do lỗi nhà sản xuất</li>
                      <li>• Máy không có dấu hiệu tác động bên ngoài</li>
                      <li>• Đổi máy tương đương trong 30 ngày</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-4">❌ Không Được Bảo Hành Khi</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">🚫 Hư Hỏng Vật Lý</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Máy bị rơi vỡ, va đập, cong vênh, móp méo</li>
                      <li>• Trầy xước, lõm và vỡ ở các cổng</li>
                      <li>• Bị ẩm mốc, cháy chập, vào nước</li>
                      <li>• Dung dịch hoá chất xâm nhập</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">⚠️ Can Thiệp Bên Ngoài</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Tự ý can thiệp vào phần cứng</li>
                      <li>• Tháo mở máy, nâng cấp không được phép</li>
                      <li>• Root, Unlock Bootloader, Jailbreak</li>
                      <li>• Tem bảo hành bị rách, vỡ, sửa đổi</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 bg-white/50 p-4 rounded-lg border border-red-300">
                  <h4 className="font-medium text-red-700 mb-2">📄 Vấn Đề Giấy Tờ</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• IMEI trên máy và phiếu bảo hành không trùng khớp</li>
                    <li>• Phiếu bảo hành tự ý sửa đổi, gạch xoá, rách nát</li>
                    <li>• Mất phiếu bảo hành hoặc không xác định được nguồn gốc</li>
                    <li>• Số serial bị xoá mờ hoặc mất</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              📝 Lưu Ý Quan Trọng Cho Khách Hàng
            </h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-500">
                <h4 className="font-medium text-amber-800 mb-2">🔌 Về Sạc và Phụ Kiện</h4>
                <p className="text-sm text-gray-700">
                  Quý khách không nên sử dụng sạc không theo đúng quy chuẩn của nhà sản xuất (sẽ gây lỗi nguồn sản phẩm).
                </p>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-medium text-blue-800 mb-2">💾 Về Dữ Liệu Cá Nhân</h4>
                <p className="text-sm text-gray-700">
                  Vui lòng tự sao lưu tất cả dữ liệu cá nhân trước khi mang sản phẩm tới bảo hành. Trong quá trình bảo hành, chúng tôi sẽ không chịu trách nhiệm về mọi mất mát dữ liệu.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-medium text-red-800 mb-2">🔐 Về Tài Khoản Bảo Mật</h4>
                <p className="text-sm text-gray-700">
                  Đối với sản phẩm có tài khoản bảo mật (iCloud, Samsung Account, MiCloud), khi đến bảo hành vui lòng chịu trách nhiệm đăng xuất tài khoản. Chúng tôi không áp dụng bảo hành khi tài khoản/mật khẩu không hợp lệ.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h4 className="font-medium text-purple-800 mb-2">⚠️ Về Can Thiệp Phần Mềm</h4>
                <p className="text-sm text-gray-700">
                  Các trường hợp tự ý up ROM, chạy phần mềm khác, Root máy, can thiệp phần mềm ngoài hệ thống - chúng tôi xin phép từ chối bảo hành.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-medium text-green-800 mb-2">📋 Khi Đi Bảo Hành</h4>
                <p className="text-sm text-gray-700">
                  Khách hàng khi đi bảo hành yêu cầu mang theo phiếu bảo hành để được hỗ trợ nhanh chóng và chính xác nhất.
                </p>
              </div>
            </div>
          </div>

          {/* Service Hours */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-xl font-bold text-center mb-4 text-slate-800">
              🕒 Thời Gian Tiếp Nhận Bảo Hành
            </h3>
            <p className="text-center text-gray-700 mb-4">
              Vui lòng liên hệ trước qua HOTLINE hoặc lưu ý thời gian bảo hành để không mất thời gian chờ đợi.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div className="bg-white/50 p-3 rounded-lg">
                <p className="font-semibold text-slate-700">Thứ 2 - Thứ 7</p>
                <p className="text-slate-600">12:00PM - 18:00PM</p>
              </div>
              <div className="bg-white/50 p-3 rounded-lg">
                <p className="font-semibold text-slate-700">Chủ Nhật</p>
                <p className="text-slate-600">12:00PM - 16:00PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🛡️ Bảo Hành Siêu Ưu Việt
            </h3>
            <p className="text-lg mb-6 text-orange-100">
              Trang Thiên Long Mobile tự hào là đơn vị duy nhất cung cấp chính sách bảo hành ưu việt nhất thị trường với cam kết chất lượng tuyệt đối.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Máy Mới 24 Tháng - Máy Cũ 12 Tháng!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}