import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Users, CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Liên Hệ | Trang Thiên Long Mobile',
  description: 'Liên hệ với Trang Thiên Long Mobile qua hotline, email hoặc ghé thăm cửa hàng. Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.',
}

export default function LienHePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            📞 Liên Hệ Với Chúng Tôi
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
            Nếu các bạn đang gặp những thắc mắc về các bài viết hoặc sản phẩm, hãy liên hệ với cửa hàng TRANG THIÊN LONG MOBILE thông qua các hình thức sau đây:
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">

          {/* Contact Information Overview */}
          <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-6 rounded-xl mb-8 border-l-4 border-teal-500">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
              📞 Thông Tin Liên Hệ
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của quý khách hàng.
            </p>
          </div>

          {/* Contact Methods Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              📡 Các Cách Thức Liên Hệ
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Address */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200 text-center">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-lg font-semibold text-red-800 mb-3">Địa Chỉ Cửa Hàng</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  15i Trần Phú, Phường 4, Quận 5, Thành phố Hồ Chí Minh
                </p>
                <Badge className="bg-red-100 text-red-800 border-red-200">Chi Nhánh Chính</Badge>
              </div>

              {/* Phone */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Hotline</h3>
                <p className="text-xl font-bold text-green-600 mb-2">
                  0939.02.1234
                </p>
                <p className="text-gray-700 text-sm mb-3">
                  Hỗ trợ 24/7 - Gọi ngay để được tư vấn
                </p>
                <Badge className="bg-green-100 text-green-800 border-green-200">Miễn Phí</Badge>
              </div>

              {/* Email */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Email</h3>
                <p className="text-lg font-semibold text-blue-600 mb-2">
                  trangthienlong88@gmail.com
                </p>
                <p className="text-gray-700 text-sm mb-3">
                  Gửi email để được hỗ trợ chi tiết
                </p>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">Phản Hồi Nhanh</Badge>
              </div>
            </div>
          </div>

        {/* Response Time Section */}
        <Card className="mb-12">
          <CardHeader className="bg-orange-50">
            <CardTitle className="flex items-center text-orange-800">
              <Clock className="w-6 h-6 mr-3" />
              Thời Gian Liên Hệ Cửa Hàng Trang Thiên Long Mobile
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Khi tiếp nhận được thư thắc mắc của tất cả các bạn, TRANG THIÊN LONG MOBILE sẽ cố gắng phản hồi một cách nhanh chóng nhất có thể. Các thắc mắc sẽ được phản hồi từ phía chúng tôi, sẽ là các vấn đề được nêu ở mục bên dưới.
            </p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold text-orange-800 mb-2">
                Thời Gian Xử Lý
              </h4>
              <p className="text-2xl font-bold text-orange-600">
                30 phút - 72 tiếng
              </p>
              <p className="text-orange-700 text-sm mt-2">
                Tùy thuộc vào độ phức tạp của câu hỏi
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Guidelines */}
        <Card className="mb-12">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center text-blue-800">
              <Users className="w-6 h-6 mr-3" />
              Nội Dung Liên Hệ TRANG THIÊN LONG MOBILE
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Chúng tôi sẽ phản hồi:</strong> Các thông điệp mang tính chất hỗ trợ, xây dựng và hợp tác.
                </AlertDescription>
              </Alert>

              <Alert>
                <MessageCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Chúng tôi không phản hồi:</strong> Các nội dung mang tính chất ngoài luồng hoặc không phù hợp.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Các câu hỏi được hỗ trợ:
                  </h4>
                  <ul className="text-green-700 text-sm space-y-2">
                    <li>• Tư vấn sản phẩm và giá cả</li>
                    <li>• Hướng dẫn mua hàng trực tuyến</li>
                    <li>• Chính sách bảo hành và đổi trả</li>
                    <li>• Thông tin về chương trình khuyến mãi</li>
                    <li>• Hỗ trợ kỹ thuật và bảo hành</li>
                  </ul>
                </div>

                <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Phone className="w-5 h-5 mr-2" />
                    Cách liên hệ hiệu quả:
                  </h4>
                  <ul className="text-blue-700 text-sm space-y-2">
                    <li>• Gọi hotline để được hỗ trợ nhanh chóng</li>
                    <li>• Email để gửi câu hỏi chi tiết</li>
                    <li>• Ghé thăm cửa hàng để trải nghiệm trực tiếp</li>
                    <li>• Nêu rõ sản phẩm hoặc dịch vụ quan tâm</li>
                    <li>• Cung cấp thông tin liên lạc chính xác</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Store Hours */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Giờ Hoạt Động Cửa Hàng
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { address: "15i Trần Phú, Q.5 (Chi Nhánh Chính)", time: "08:00AM - 10:00PM" },
                { address: "87b Lê Văn Duyệt, Bình Thạnh", time: "09:30AM - 08:30PM" },
                { address: "02 Hồ Văn Leo, Biên Hòa", time: "08:00AM - 08:00PM" }
              ].map((branch, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">{branch.address}</h4>
                  <p className="text-blue-600 font-medium">{branch.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Thank You Message */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-6">
            Xin cám ơn tất cả các bạn đã quan tâm đến website của chúng tôi!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link href="tel:0939021234">
                <Phone className="w-5 h-5 mr-2" />
                Gọi Ngay: 0939.02.1234
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="mailto:trangthienlong88@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Gửi Email
              </Link>
            </Button>
          </div>
        </div>

        {/* Map placeholder (optional) */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <h4 className="font-semibold text-gray-900 mb-4 text-center">Vị Trí Cửa Hàng</h4>
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                Bản đồ Google Maps sẽ được tích hợp tại đây
              </p>
              <p className="text-sm text-gray-400 mt-2">
                15i Trần Phú, Phường 4, Quận 5, TP.HCM
              </p>
            </div>
          </CardContent>
        </Card>

          {/* Thank You Message */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">🙏 Cám Ơn Quý Khách</h3>
            <p className="text-gray-700">
              Xin cám ơn tất cả các bạn đã quan tâm đến website của chúng tôi! Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ quý khách một cách tốt nhất.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              📞 Hỗ Trợ 24/7
            </h3>
            <p className="text-lg mb-6 text-teal-100">
              Trang Thiên Long Mobile cam kết hỗ trợ khách hàng 24/7 với đội ngũ nhân viên chuyên nghiệp và tận tâm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="tel:0939021234" className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block hover:bg-yellow-300 transition-colors">
                📞 Gọi Ngay: 0939.02.1234
              </Link>
              <Link href="mailto:trangthienlong88@gmail.com" className="bg-white/20 text-white px-8 py-3 rounded-full font-bold text-lg inline-block hover:bg-white/30 transition-colors">
                ✉️ Gửi Email Ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}