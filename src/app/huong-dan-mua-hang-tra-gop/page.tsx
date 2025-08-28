import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Building2, Smartphone, CheckCircle, AlertCircle, Phone, Users } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Hướng Dẫn Mua Hàng Trả Góp | Trang Thiên Long Mobile',
  description: 'Tìm hiểu các hình thức mua hàng trả góp tại Trang Thiên Long Mobile - Thẻ tín dụng 0% lãi suất, trả góp qua ngân hàng và trả góp qua iCloud.',
}

export default function HuongDanTraGopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            💳 Hướng Dẫn Mua Hàng Trả Góp
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Chương trình và các hình thức mua hàng trả góp được áp dụng cho tất cả các khách hàng có nhu cầu mua trả góp tại TRANG THIÊN LONG MOBILE.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">

          {/* Overview Section */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl mb-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
              💳 Các Hình Thức Mua Hàng Trả Góp
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Hiện tại đang có 3 chương trình mua hàng trả góp được triển khai ở hệ thống của chúng tôi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="font-semibold text-blue-800 mb-2">Thẻ Tín Dụng</h3>
              <Badge className="bg-red-100 text-red-800 border-red-300">LÃI SUẤT 0%</Badge>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200 text-center">
              <div className="text-4xl mb-4">🏦</div>
              <h3 className="font-semibold text-green-800 mb-2">Qua Ngân Hàng</h3>
              <Badge className="bg-green-100 text-green-800 border-green-300">KHÔNG CẦN TRẢ TRƯỚC</Badge>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 text-center">
              <div className="text-4xl mb-4">☁️</div>
              <h3 className="font-semibold text-purple-800 mb-2">Qua iCloud</h3>
              <Badge className="bg-purple-100 text-purple-800 border-purple-300">CHẤP NHẬN NỢ XẤU</Badge>
            </div>
          </div>

          {/* Credit Card Installment */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              💳 Trả Góp Thông Qua Thẻ Tín Dụng Ngân Hàng (LÃI SUẤT 0%)
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200 mb-6">
              <p className="text-gray-700 leading-relaxed">
                Đây được xem là một trong những chương trình được rất nhiều bạn tham gia do tính tiện dụng và đặc biệt với <span className="font-bold text-blue-700">LÃI SUẤT 0%</span> rất hấp dẫn.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  Yêu Cầu Tham Gia Chương Trình:
                </h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Sở hữu thẻ tín dụng (Credit Card) của bất kỳ ngân hàng nào liên kết với TRANG THIÊN LONG MOBILE.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Trong trường hợp các bạn chưa có thẻ tín dụng, phía Trang Thiên Long Mobile có thể hỗ trợ các bạn với bên ngân hàng lên hồ sơ và phát hành thẻ một cách nhanh nhất.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                  Qui Định Chương Trình:
                </h4>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li>• Khách hàng cần đọc kỹ thể lệ Chương trình trả góp của Ngân hàng áp dụng</li>
                  <li>• Các ngân hàng đối tác: Sacombank, Nam Á Bank, Citi Bank, Standard Chartered, VIB, Shinhan Bank, ANZ</li>
                  <li>• Mỗi đơn hàng chỉ được có duy nhất 01 sản phẩm có giá trị phải từ 3.000.000đ trở lên</li>
                  <li>• Mỗi Khách hàng được tham gia chương trình nhiều lần miễn sao tổng giá trị các đơn hàng không vượt quá hạn mức thẻ tín dụng</li>
                  <li>• Đơn hàng tham gia chương trình trả góp sẽ không được đổi trả (Trừ sản phẩm lỗi và theo quy định đổi trả của chúng tôi)</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-2">Ngân hàng đối tác liên kết:</h5>
              <div className="flex flex-wrap gap-2">
                {['Sacombank', 'Nam Á Bank', 'Citi Bank', 'Standard Chartered', 'VIB', 'Shinhan Bank', 'ANZ'].map((bank) => (
                  <Badge key={bank} variant="outline" className="text-blue-700 border-blue-300">
                    {bank}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Bank Installment */}
          <div className="mb-8">
            <div className="bg-green-50 p-6 rounded-t-xl border border-green-200">
              <h3 className="flex items-center text-green-800 text-xl font-bold">
                <Building2 className="w-6 h-6 mr-3" />
                Trả Góp Thông Qua Ngân Hàng Không Cần Trả Trước
              </h3>
            </div>
            <div className="p-8 bg-white rounded-b-xl border-l border-r border-b border-green-200">
            <p className="text-gray-600 mb-6 leading-relaxed">
              Chương trình này khá linh hoạt không yêu cầu trả trước nhưng các bạn sẽ phải làm việc với bên phía ngân hàng.
            </p>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                Yêu Cầu Tham Gia Chương Trình:
              </h4>
              <p className="text-gray-600">
                Giấy Căn Cước Công Dân (CCCD) có thời hạn trong 15 năm.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Các Bước Tham Gia Chương Trình:</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">1</div>
                  <p className="text-gray-600">Khách hàng lựa chọn sản phẩm trên Web và đến trực tiếp cửa hàng xem sản phẩm phù hợp.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">2</div>
                  <p className="text-gray-600">Sử dụng loại thẻ Tín dụng ngân hàng phù hợp với đơn vị mà chúng tôi đang liên kết.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">3</div>
                  <div className="text-gray-600">
                    <p className="mb-2">Điền đơn "Đăng Kí Trả Góp" nhân viên Thu ngân cung cấp khách hàng.</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Đối với Citi Bank khách phải gởi tin nhắn lấy link đăng kí và hoàn tất đăng kí thì mới xem là hợp lệ.</li>
                      <li>• Đối với VIB phải liên hệ trong vòng 5 ngày với tổng đài để thực hiện chuyển đổi đăng kí Trả góp.</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">4</div>
                  <p className="text-gray-600">
                    Tiến hành "Thanh Toán" nhân viên thu ngân sẽ tiến hành thanh toán số tiền mà khách hàng yêu cầu nhưng không thấp hơn số tiền Tối thiểu mà Ngân hàng quy định (Tối thiểu 3.000.000 đồng, riêng Sacombank là 2.000.000 đồng).
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* iCloud Installment */}
          <div className="mb-12">
            <div className="bg-purple-50 p-6 rounded-t-xl border border-purple-200">
              <h3 className="flex items-center text-purple-800 text-xl font-bold">
                <Smartphone className="w-6 h-6 mr-3" />
                Trả Góp Với Cửa Hàng Qua iCloud (Thanh Toán Trước 50% – Chấp Nhận Cả Nợ Xấu)
              </h3>
            </div>
            <div className="p-8 bg-white rounded-b-xl border-l border-r border-b border-purple-200">
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 mb-6">
              <p className="text-purple-800 font-medium">
                Đây là hình thức trả góp đột phá và đặc biệt chỉ có tại TRANG THIÊN LONG MOBILE. Đối với chương trình này tất cả các khách hàng đang bị nợ xấu đều được cửa hàng chúng tôi xét duyệt để đậu với một yêu cầu duy nhất.
              </p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 text-purple-600 mr-2" />
                Yêu Cầu Tham Gia Chương Trình:
              </h4>
              <p className="text-gray-600 font-medium">
                Thanh Toán Trước 50% Giá Trị Máy Cần Mua.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Các Bước Tham Gia Chương Trình Mua Hàng Trả Góp Thông Qua iCloud:</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">1</div>
                  <p className="text-gray-600">Khách hàng lựa chọn sản phẩm trên Web và đến trực tiếp cửa hàng xem sản phẩm phù hợp.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">2</div>
                  <p className="text-gray-600">Phía cửa hàng sẽ đăng nhập iCloud vào máy của các bạn để đảm bảo được quyền can thiệp tối cao nhất nhằm đảm bảo cho các tình huống bất cập dẫn đến thiệt hại cho phía cửa hàng.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">3</div>
                  <p className="text-gray-600">Khách hàng cần thanh toán 50% giá trị của máy và sau đó lựa chọn các phương án thời gian trả góp phù hợp.</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold mr-4 mt-1">4</div>
                  <p className="text-gray-600">Sau khi hoàn tất quá trình trả góp, chúng tôi sẽ thoát iCloud và chính thức hoàn thành việc mua hàng trả góp với khách một cách tốt đẹp.</p>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <div className="bg-gray-50 p-6 rounded-t-xl border border-gray-200">
              <h3 className="flex items-center text-gray-800 text-xl font-bold">
                <Phone className="w-6 h-6 mr-3" />
                Các Câu Hỏi Khi Mua Hàng Trả Góp Tại Trang Thiên Long Mobile
              </h3>
            </div>
            <div className="p-8 bg-white rounded-b-xl border-l border-r border-b border-gray-200">
            <div className="space-y-6">
              {[
                {
                  q: "Tôi có cần chứng minh thu nhập, thế chấp tài sản hoặc cần công chứng giấy tờ khi mua trả góp không?",
                  a: "Khách hàng mua Trả góp tại TRANG THIÊN LONG MOBILE sẽ không cần phải thế chấp nhà cửa/xe cộ/tài sản… để mua sản phẩm, chỉ cần cung cấp các giấy tờ cá nhân mà công ty tài chính hoặc ngân hàng yêu cầu. Khách hàng không cần chuẩn bị các bản công chứng giấy tờ, chỉ cần mang bản gốc đến cửa hàng, nhân viên chúng tôi sẽ hỗ trợ scan lại thông tin để gửi thẩm định."
                },
                {
                  q: "Tôi không có hộ khẩu ở TP. Hà Nội, TP. Hồ Chí Minh có thể mua trả góp được không?",
                  a: "Dịch vụ trả góp tại Trang Thiên Long Mobile hỗ trợ khách hàng có hộ khẩu ở 63 tỉnh thành trên cả nước (còn trừ một số huyện chưa được hỗ trợ)."
                },
                {
                  q: "Tôi đem theo bản sao có thể làm hồ sơ được không?",
                  a: "Bạn có thể đem theo bản sao để đến cửa hàng chúng tôi làm hồ sơ trả góp, tuy nhiên phải mang theo bản gốc để đối chiếu."
                },
                {
                  q: "Mua trả góp có nhận được khuyến mãi như khi mua bình thường không?",
                  a: "Mọi chương trình khuyến mãi mà chúng tôi đang áp dụng cho khách mua tại cửa hàng cũng áp dụng khi mua trả góp."
                },
                {
                  q: "Khách hàng mua trả góp có xuất hóa đơn công ty được không?",
                  a: "Có thể xuất hoá đơn theo tên Khách hàng / Tên chủ thẻ tín dụng."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6">
                  <h5 className="font-semibold text-gray-900 mb-3">{faq.q}</h5>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* Conclusion */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">🎆 Kết Luận</h3>
            <p className="text-gray-700">
              Bên trên là hướng dẫn mua hàng trả góp của chúng tôi, các hình thức trả góp bên trên hiện đang được áp dụng cho tất cả các cửa hàng trong hệ thống của <span className="font-bold text-slate-700">Trang Thiên Long Mobile</span>.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              💳 Trả Góp Linh Hoạt
            </h3>
            <p className="text-lg mb-6 text-green-100">
              Trang Thiên Long Mobile cung cấp nhiều hình thức trả góp linh hoạt với lãi suất ưu đãi nhất thị trường.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Trả Góp 0% Lãi Suất - Dễ Dàng Sở Hữu!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}