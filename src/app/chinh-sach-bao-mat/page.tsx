import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật - Trang Thiên Long Mobile | Bảo Vệ Thông Tin Khách Hàng",
  description: "Chính sách bảo mật của Trang Thiên Long Mobile - Cam kết bảo vệ thông tin cá nhân khách hàng. Thu thập, sử dụng và bảo mật dữ liệu tuân thủ pháp luật Việt Nam.",
  keywords: "chính sách bảo mật, bảo vệ thông tin, Trang Thiên Long Mobile, quyền riêng tư khách hàng",
};

export default function ChinhSachBaoMatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            🔒 Chính Sách Bảo Mật
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
            Cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          
          {/* Company Info Section */}
          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-xl mb-8 border-l-4 border-cyan-500">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">
              🏢 Chúng Tôi Là Ai?
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              <span className="font-bold text-cyan-700">Địa chỉ website:</span> https://trangthienlong.com.vn
            </p>
            <p className="text-gray-700">
              Chúng tôi là website đại diện của cửa hàng điện thoại di động <span className="font-bold text-blue-700">TRANG THIÊN LONG MOBILE</span>. Bên cạnh chức năng giới thiệu sản phẩm, website còn có chức năng thương mại điện tử để khách hàng dễ dàng mua sắm trực tuyến.
            </p>
          </div>

          {/* Privacy Policy Overview */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              🛡️ Chi Tiết Chính Sách Bảo Mật
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
              <p className="text-gray-700 mb-4">
                Chính sách bảo mật sẽ giải thích cách chúng tôi tiếp nhận, sử dụng và (trong trường hợp nào đó) tiết lộ thông tin cá nhân của Quý khách.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-teal-700">Bảo vệ dữ liệu cá nhân</span> và gây dựng niềm tin cho quý khách là vấn đề rất quan trọng. Chúng tôi chỉ thu thập những thông tin cần thiết liên quan đến giao dịch mua bán và tuân thủ pháp luật Việt Nam.
              </p>
            </div>
          </div>

          {/* Data Collection Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📊 Thu Thập Thông Tin Cá Nhân
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">📝 Thông Tin Thu Thập</h3>
                <p className="text-gray-700 mb-3">
                  Chúng tôi thu thập, lưu trữ và xử lý thông tin của bạn cho quá trình mua hàng và thông báo liên quan đến đơn hàng:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Danh hiệu, tên, giới tính, ngày sinh</li>
                  <li>Email, địa chỉ, địa chỉ giao hàng, số điện thoại</li>
                  <li>Chi tiết thanh toán, thông tin thẻ hoặc tài khoản ngân hàng</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">🎯 Mục Đích Sử Dụng</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    <li>Xử lý đơn đặt hàng</li>
                    <li>Cung cấp dịch vụ khách hàng</li>
                    <li>Quản lý tài khoản</li>
                    <li>Xác minh giao dịch trực tuyến</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">📤 Chia Sẻ Thông Tin</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    <li>Chuyển phát nhanh (giao hàng)</li>
                    <li>Nghiên cứu thị trường (ẩn danh)</li>
                    <li>Cơ quan pháp luật (khi yêu cầu)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-4 rounded-lg border border-yellow-300">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-amber-700">💡 Lưu ý:</span> Nếu quý khách không muốn nhận thông tin tiếp thị từ chúng tôi, có thể từ chối bất cứ lúc nào.
                </p>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              🔐 Bảo Mật Thông Tin
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">⚡ Biện Pháp Bảo Mật</h3>
                <p className="text-gray-700 mb-4">
                  Chúng tôi có biện pháp thích hợp về kỹ thuật và an ninh để ngăn chặn truy cập trái phép, mất mát hoặc thiệt hại thông tin của bạn.
                </p>
                <div className="bg-white/50 p-4 rounded-lg border border-red-300">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-red-700">⚠️ Lưu ý:</span> Khuyên không đưa thông tin thanh toán qua email. Chúng tôi không chịu trách nhiệm về mất mát khi trao đổi thông tin qua internet.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-300">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">🚫 Nghiêm Cấm</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Sử dụng chương trình, công cụ can thiệp vào hệ thống</li>
                  <li>Làm thay đổi cấu trúc dữ liệu website</li>
                  <li>Phát tán, truyền bá hoạt động phá hoại</li>
                </ul>
                <p className="text-sm text-amber-700 mt-3 font-medium">
                  Mọi vi phạm sẽ bị tước bỏ quyền lợi và truy tố trước pháp luật nếu cần thiết.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-4 rounded-lg border border-slate-300">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">📋 Thông tin pháp lý:</span> Mọi thông tin giao dịch được bảo mật nhưng khi cơ quan pháp luật yêu cầu, chúng tôi sẽ cung cấp thông tin theo quy định.
                </p>
              </div>
            </div>
          </div>

          {/* Customer Rights Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              👤 Quyền Lợi Khách Hàng
            </h2>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <h4 className="font-semibold text-emerald-800">Truy Cập Dữ Liệu</h4>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">✏️</div>
                  <h4 className="font-semibold text-emerald-800">Chỉnh Sửa</h4>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🛑</div>
                  <h4 className="font-semibold text-emerald-800">Ngưng Tiếp Thị</h4>
                </div>
              </div>
              <p className="text-gray-700">
                Quý khách có quyền yêu cầu truy cập, sửa lại sai sót trong dữ liệu cá nhân mà không mất phí. Bất cứ lúc nào cũng có thể yêu cầu ngưng sử dụng dữ liệu cho mục đích tiếp thị.
              </p>
            </div>
          </div>

          {/* Legal Section */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">⚖️ Điều Khoản Pháp Lý</h3>
            <p className="text-gray-700 mb-4">
              Các điều kiện, điều khoản và nội dung của trang web này được điều chỉnh bởi <span className="font-bold text-slate-700">luật pháp Việt Nam</span> và tòa án Việt Nam có thẩm quyền xem xét.
            </p>
            <p className="text-sm text-gray-600">
              Bên trên là toàn bộ các chính sách bảo mật hiện tại của TRANG THIÊN LONG MOBILE, rất hy vọng quý khách sẽ hiểu cho chúng tôi nếu như có xảy ra những sự cố đáng tiếc.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🔒 Bảo Mật Tuyệt Đối
            </h3>
            <p className="text-lg mb-6 text-cyan-100">
              Trang Thiên Long Mobile cam kết bảo vệ thông tin cá nhân của khách hàng với các biện pháp bảo mật tiên tiến nhất.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Thông Tin Của Bạn Được Bảo Vệ An Toàn!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}