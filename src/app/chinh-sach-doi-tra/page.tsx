import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Đổi Trả - Trang Thiên Long Mobile | Miễn Phí 30 Ngày",
  description: "Chính sách đổi trả linh hoạt tại Trang Thiên Long Mobile - Miễn phí đổi 30 ngày đầu, hỗ trợ chi phí vận chuyển, hoàn tiền 100%. Cam kết chất lượng Apple.",
  keywords: "chính sách đổi trả, bảo hành iPhone, đổi trả Apple, hoàn tiền, miễn phí 30 ngày, Trang Thiên Long Mobile",
};

export default function ChinhSachDoiTraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            🔄 Chính Sách Đổi Trả
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Trải nghiệm mua sắm và hậu mãi khách hàng một cách chu đáo nhất
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl mb-8 border-l-4 border-green-500">
            <p className="text-lg leading-relaxed text-gray-700">
              Chính sách đổi trả này được <span className="font-bold text-green-700">Trang Thiên Long Mobile</span> đặt ra để mang đến trải nghiệm mua sắm và hậu mãi khách hàng một cách chu đáo nhất.
            </p>
          </div>

          {/* 30 Day Policy Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              🛡️ Đổi Trả Sản Phẩm Lỗi Do Nhà Sản Xuất
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">⭐ Chính Sách 30 Ngày</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-lg">✅</span>
                    <span><strong>Miễn phí đổi trong 30 ngày đầu</strong> sử dụng sản phẩm tương đương: cùng model, cùng dung lượng, cùng thời gian bảo hành</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-lg">💰</span>
                    <span>Trong trường hợp không còn hàng, <strong className="text-green-700">hoàn lại tiền 100%</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-lg">🚚</span>
                    <span>Hỗ trợ khách hàng <strong>chi phí vận chuyển</strong> với tất cả trường hợp lỗi trong 30 ngày</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-300">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">📞 Hướng Dẫn Đổi Trả</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-amber-700 mb-2">Bước 1: Liên Hệ</h4>
                    <p className="text-sm text-gray-600">Gọi tổng đài <span className="font-bold text-red-600">0939.02.1234</span> để được hướng dẫn chi tiết</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-700 mb-2">Bước 2: Chuẩn Bị</h4>
                    <p className="text-sm text-gray-600">Thoát hết tài khoản, chuẩn bị máy theo hướng dẫn</p>
                  </div>
                </div>
                <div className="mt-4 bg-white/50 p-4 rounded-lg border border-amber-300">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-amber-700">⚠️ Lưu ý gửi hàng:</span> KHÔNG khai giá trị sản phẩm, KHÔNG chuyển hỏa tốc. Máy phải thoát hết tài khoản trước khi gửi về.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Non-Defective Return Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🔄 Đổi Trả Sản Phẩm Không Có Lỗi
            </h2>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">📱 Sản Phẩm Áp Dụng</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <p className="text-sm text-purple-700">Điện thoại</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🎧</div>
                  <p className="text-sm text-purple-700">Loa, tai nghe</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">💻</div>
                  <p className="text-sm text-purple-700">Laptop, tablet</p>
                </div>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-purple-300">
                <p className="text-gray-700">
                  Khách hàng muốn đổi sang sản phẩm khác hoặc trả sản phẩm: TRANG THIÊN LONG MOBILE sẽ kiểm tra tình trạng máy và thông báo về <span className="font-bold text-purple-700">giá trị thu lại sản phẩm</span> ngay tại cửa hàng.
                </p>
              </div>
            </div>
          </div>

          {/* User Error Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              ⚠️ Sản Phẩm Lỗi Do Người Sử Dụng
            </h2>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-4">🚫 Các Trường Hợp KHÔNG Được Bảo Hành</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Hư Hỏng Vật Lý</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Không giữ nguyên 100% hình dạng ban đầu</li>
                    <li>• Va chạm mạnh, móp méo</li>
                    <li>• Bị vào nước</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Điều Kiện Bảo Hành</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Không đủ điều kiện bảo hành hãng</li>
                    <li>• Can thiệp phần mềm trái phép</li>
                    <li>• Sử dụng sai quy cách</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/50 p-4 rounded-lg border border-red-300">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-red-700">💡 Giải pháp:</span> Trang Thiên Long Mobile hỗ trợ chuyển sản phẩm đến Trung Tâm Bảo Hành của hãng hoặc trung tâm bảo hành của chúng tôi và khách hàng chịu phí sửa chữa.
                </p>
              </div>
            </div>
          </div>

          {/* Important Notes Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              📋 Lưu Ý Quan Trọng
            </h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-medium text-blue-800 mb-2">📝 Thông Tin Đặt Hàng</h4>
                <p className="text-sm text-gray-700">
                  Chúng tôi chỉ chấp nhận đơn đặt hàng khi cung cấp đủ thông tin chính xác về địa chỉ, số điện thoại.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-medium text-amber-800 mb-2">🚚 Giao Hàng</h4>
                <p className="text-sm text-gray-700">
                  Một số trường hợp nhạy cảm (giá trị lớn, giao buổi tối, địa chỉ trong ngõ) sẽ được liên hệ để thống nhất thời gian giao hàng cụ thể.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-medium text-red-800 mb-2">📹 Kiểm Tra Hàng</h4>
                <p className="text-sm text-gray-700">
                  Xin Quý Khách vui lòng kiểm tra hàng hóa thật kỹ trước khi ký nhận và <strong>quay video trong quá trình mở hộp sản phẩm</strong>. Video mở hộp là bằng chứng quan trọng để đảm bảo quyền lợi của bạn.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-medium text-green-800 mb-2">⏰ Giao Hàng Chậm Trễ</h4>
                <p className="text-sm text-gray-700">
                  Trong trường hợp giao hàng chậm trễ mà không báo trước, quý khách có thể không nhận hàng và chúng tôi sẽ <strong>hoàn trả toàn bộ số tiền</strong> trong vòng 7 ngày.
                </p>
              </div>
            </div>
          </div>

          {/* Commitment Section */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-xl font-bold text-center mb-4 text-slate-800">
              🤝 Cam Kết Của Chúng Tôi
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Hàng hóa <strong>đúng như thông tin</strong> đăng tải</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">📋</span>
                    <span>Có <strong>đầy đủ hóa đơn, bảo hành chính thức</strong></span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🚚</span>
                    <span>Hỗ trợ <strong>chi phí vận chuyển</strong> cho lỗi sản phẩm</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">💰</span>
                    <span>Hoàn tiền trong <strong>7 ngày</strong> nếu giao hàng chậm</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🔄 Đổi Trả Linh Hoạt
            </h3>
            <p className="text-lg mb-6 text-green-100">
              Trang Thiên Long Mobile cam kết chính sách đổi trả linh hoạt và hỗ trợ khách hàng tận tình trong mọi trường hợp.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Miễn Phí Đổi Trả 30 Ngày Đầu!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}