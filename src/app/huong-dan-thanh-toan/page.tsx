import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Truck, Info } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Hướng Dẫn Thanh Toán | Trang Thiên Long Mobile',
  description: 'Tìm hiểu các hình thức thanh toán tại Trang Thiên Long Mobile - COD, chuyển khoản ngân hàng và các phương thức khác.',
}

export default function HuongDanThanhToanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            💳 Hướng Dẫn Thanh Toán
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            TRANG THIÊN LONG MOBILE sẽ hướng dẫn về các hình thức thanh toán cho các quý khách lần đầu tiên mua hàng của chúng tôi ở trên website.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">

          {/* Payment Methods Overview */}
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl mb-8 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              💳 Hướng Dẫn Thanh Toán Cơ Bản
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Chúng tôi cung cấp nhiều hình thức thanh toán linh hoạt để đáp ứng nhu cầu của quý khách hàng.
            </p>
          </div>

          {/* COD Payment Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              🚚 Thanh Toán Khi Nhận Hàng (COD)
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3">📦 Quy Trình COD</h3>
              <p className="text-gray-700 mb-4">
                Quý khách chỉ trả tiền sau khi nhận được hàng từ nhân viên giao hàng.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-lg border border-green-300">
                  <h4 className="font-medium text-green-700 mb-2">✅ Ưu Điểm</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Tiện lợi và an toàn</li>
                    <li>• Kiểm tra hàng trước khi thanh toán</li>
                    <li>• Không cần chuyển tiền trước</li>
                  </ul>
                </div>
                <div className="bg-white/50 p-4 rounded-lg border border-green-300">
                  <h4 className="font-medium text-green-700 mb-2">📝 Lưu Ý</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Chuẩn bị đủ tiền mặt</li>
                    <li>• Kiểm tra kỹ sản phẩm</li>
                    <li>• Giữ hóa đơn và phiếu bảo hành</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Transfer Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🏦 Thanh Toán Chuyển Khoản Ngân Hàng
            </h2>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">💳 Thông Tin Chuyển Khoản</h3>
              <div className="bg-white/50 p-4 rounded-lg border border-purple-300 mb-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">🏛️ Ngân Hàng</h4>
                    <p className="text-sm text-gray-700">TMCP Kỹ Thương Việt Nam (Techcombank)</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">👤 Chủ Tài Khoản</h4>
                    <p className="text-sm text-gray-700">[Đang cập nhật]</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">🔢 Số Tài Khoản</h4>
                    <p className="text-sm text-gray-700">[Đang cập nhật]</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">📝 Nội Dung CK</h4>
                    <p className="text-sm text-gray-700">[Tên] + [Số Điện Thoại]</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-4 rounded-lg border border-yellow-300">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-amber-700">⚠️ Lưu ý:</span> Vui lòng ghi rõ nội dung chuyển khoản theo định dạng: [Tên] + [Số Điện Thoại] để chúng tôi có thể xác nhận đơn hàng nhanh chóng.
                </p>
              </div>
            </div>
          </div>

          {/* Future Payment Methods */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🚀 Các Phương Thức Thanh Toán Khác
            </h2>
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
              <p className="text-gray-700 mb-4">
                Trang Thiên Long Mobile sẽ tích hợp các phương thức thanh toán khác trong thời gian tới để tối ưu trải nghiệm mua hàng của quý khách.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/50 rounded-lg border border-orange-300">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-medium text-orange-700">Ví Điện Tử</h4>
                  <p className="text-sm text-gray-600">MoMo, ZaloPay, VNPay</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg border border-orange-300">
                  <div className="text-2xl mb-2">💳</div>
                  <h4 className="font-medium text-orange-700">Thẻ Tín Dụng</h4>
                  <p className="text-sm text-gray-600">Visa, Mastercard, JCB</p>
                </div>
                <div className="text-center p-4 bg-white/50 rounded-lg border border-orange-300">
                  <div className="text-2xl mb-2">📲</div>
                  <h4 className="font-medium text-orange-700">QR Pay</h4>
                  <p className="text-sm text-gray-600">Quét mã thanh toán</p>
                </div>
              </div>
            </div>
          </div>

          {/* Thank You Section */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">🙏 Cám Ơn Quý Khách</h3>
            <p className="text-gray-700 mb-4">
              Xin trân trọng cám ơn Quý Khách đã đọc hướng dẫn thanh toán của chúng tôi.
            </p>
            <p className="text-sm text-gray-600">
              Nếu sau khi thực hiện việc thanh toán và Quý khách cảm thấy không vừa lòng với sản phẩm và muốn tiến hành đổi trả thì vui lòng truy cập:{" "}
              <Link href="/chinh-sach-doi-tra" className="text-blue-600 hover:text-blue-800 font-medium">
                Chính Sách Đổi Trả Sản Phẩm
              </Link>
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              💳 Thanh Toán Linh Hoạt
            </h3>
            <p className="text-lg mb-6 text-blue-100">
              Trang Thiên Long Mobile cung cấp nhiều hình thức thanh toán tiện lợi và an toàn cho khách hàng.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Thanh Toán Dễ Dàng - An Toàn 100%!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}