import type { Metadata } from 'next'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { FileText, Shield, AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Điều Khoản Sử Dụng | Trang Thiên Long Mobile',
  description: 'Điều khoản sử dụng website và dịch vụ của Trang Thiên Long Mobile. Tìm hiểu các quyền và nghĩa vụ khi sử dụng dịch vụ của chúng tôi.',
}

export default function DieuKhoanSuDungPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-rose-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-pink-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            ⚖️ Điều Khoản Sử Dụng
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-red-100 max-w-3xl mx-auto leading-relaxed">
            Điều khoản và điều kiện sử dụng website thương mại điện tử của Trang Thiên Long Mobile
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">

        {/* Definitions Section */}
        <Card className="mb-8">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center text-blue-800">
              <Info className="w-6 h-6 mr-3" />
              Định Nghĩa
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Website này:</h4>
                <p className="text-gray-600 leading-relaxed">
                  Là một trang thông tin có tích hợp nền tảng thương mại điện tử thuộc sở hữu của Cửa Hàng Điện Thoại TRANG THIÊN LONG MOBILE, đồng thời cung cấp một số bài viết liên quan đến sản phẩm và kiến thức công nghệ.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Điều khoản sử dụng:</h4>
                <p className="text-gray-600 leading-relaxed">
                  Chính là tài liệu này, hoặc có thể gọi là Điều khoản chung.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Tài nguyên:</h4>
                <p className="text-gray-600 leading-relaxed">
                  Là các thông tin, hình ảnh, tệp âm thanh, phim, … hay bất cứ thông tin và/hoặc tư liệu nào trên website này.
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Người sử dụng:</h4>
                <p className="text-gray-600 leading-relaxed">
                  Là bất cứ ai có thể truy cập vào website này để sử dụng website và/hoặc tài nguyên trên website, trong Điều khoản có thể được gọi hay xưng hô là "Bạn".
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Modification Rights */}
        <Card className="mb-8">
          <CardHeader className="bg-green-50">
            <CardTitle className="flex items-center text-green-800">
              <Shield className="w-6 h-6 mr-3" />
              Quyền Thay Đổi Nội Dung Điều Khoản
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Ngoài ra, khi sử dụng các dịch vụ cụ thể, bạn và Website TRANG THIÊN LONG MOBILE sẽ phụ thuộc vào các điều khoản bổ sung và bất kỳ hướng dẫn hay quy tắc nào áp dụng cho các dịch vụ đó. Tất cả các hướng dẫn hay quy tắc đó theo đây đều được coi là một phần cấu thành tham chiếu tới Điều khoản sử dụng.
              </p>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Nếu bất kỳ điều khoản nào trong Điều Khoản Sử Dụng xung đột với những điều khoản trong các hướng dẫn hoặc quy tắc, hoặc điều khoản bổ sung đó, thì những điều khoản trong Thỏa Thuận này sẽ quyết định.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        {/* Usage Restrictions */}
        <Card className="mb-8">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center text-red-800">
              <XCircle className="w-6 h-6 mr-3" />
              Hạn Chế Sử Dụng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-gray-600 mb-6 leading-relaxed">
              TRANG THIÊN LONG MOBILE không chấp nhận bất kỳ việc sử dụng website và/hoặc tài nguyên nào của website vào một trong những việc sau:
            </p>

            <div className="grid gap-4">
              {[
                "Chống phá nhà nước CHXHCN Việt Nam.",
                "Xâm phạm quyền tự do cá nhân của người khác; và/hoặc làm nhục, phỉ báng, bôi nhọ người khác; và/hoặc gây phương hại hay gây bất lợi cho người khác.",
                "Gây rối trật tự công cộng; và/hoặc phạm pháp hình sự.",
                "Truyền bá và phân phối thông tin cá nhân của bên thứ ba mà không được sự chấp thuận của họ.",
                "Truyền đi những tập tin máy tính bị nhiễm virus gây hư hại hoạt động của các máy tính khác.",
                "Sử dụng các loại robot, nhện máy (spiders) và/hoặc bất kỳ thiết bị tự động nào, và/hoặc tự tay theo dõi và thu thập tài nguyên của website cho bất kỳ mục đích tái sử dụng mà không được sự cho phép trước bằng văn bản của chúng tôi.",
                "Sử dụng bất kỳ thiết bị, phần mềm và/hoặc tiến trình nào nhằm xâm phạm hoặc cố ý xâm phạm đến hoạt động của website.",
                "Bất kỳ hành động nào mà chúng tôi cho rằng không thích hợp."
              ].map((restriction, index) => (
                <div key={index} className="flex items-start p-4 bg-red-50 border border-red-200 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-red-800 text-sm leading-relaxed">{restriction}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Liability Exclusion */}
        <Card className="mb-12">
          <CardHeader className="bg-orange-50">
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="w-6 h-6 mr-3" />
              Loại Trừ Trách Nhiệm
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {[
                {
                  title: "Liên kết website bên thứ ba:",
                  content: "Website của TRANG THIÊN LONG MOBILE có thể kết nối tới các website của các hãng thứ ba, và các liên kết website này chỉ dành cho mục đích cung cấp đường dẫn đến các nguồn thông tin có thể hữu ích đối với người sử dụng website của chúng tôi. Và chúng tôi không chịu trách nhiệm đối với nội dung, sản phẩm, dịch vụ của các website kết nối bao gồm sự chính xác, hoàn chỉnh, độ tin cậy của các thông tin trên website của các bên thứ ba."
                },
                {
                  title: "Tính chính xác của thông tin:",
                  content: "Chúng tôi không đảm bảo cho tính chính xác, đầy đủ hay phù hợp cho các mục đích của người sử dụng, tuy nhiên chúng tôi cố gắng hết sức để đáp ứng yêu cầu đó. Khi bạn sử dụng những tài nguyên từ website, bạn phải tự chấp nhận những rủi ro từ việc sử dụng đó. Các tài nguyên chỉ mang tính tham khảo."
                },
                {
                  title: "Bảo mật máy chủ:",
                  content: "Máy chủ lưu trữ website này có thể bị nhiễm virus hay những thành phần khác có thể gây hại cho máy tính hay tài sản của bạn khi truy cập và/hoặc sử dụng website và/hoặc tài nguyên của website này. Chúng tôi sẽ không chịu trách nhiệm cho bất kỳ sự mất mát hay hư hỏng nảy sinh do sự sử dụng, sự truy cập hay không thể sử dụng, truy cập website này."
                },
                {
                  title: "Tạm hoãn dịch vụ:",
                  content: "Website có thể tạm hoãn và/hoặc dừng những dịch vụ được cung cấp bất cứ khi nào và không cần thông báo trước. Chúng tôi sẽ không chịu trách nhiệm cho bất kỳ hư hỏng nảy sinh do bất kỳ sự sửa đổi hay thay đổi nội dung hoặc không thể sử dụng website này, kể cả trong trường hợp đã báo trước cho chúng tôi."
                },
                {
                  title: "Tính hiệu lực của sản phẩm và dịch vụ:",
                  content: "Sản phẩm và dịch vụ được trình bày trong website này không mặc nhiên có hiệu lực vào mọi thời điểm và tại mọi địa điểm. Sự giới thiệu sản phẩm hay dịch vụ trong website này không ám chỉ rằng sản phẩm hay dịch vụ này sẽ có giá trị bất cứ lúc nào ở địa điểm xác định của người sử dụng website."
                }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-3">{item.title}</h4>
                  <p className="text-orange-800 text-sm leading-relaxed">{item.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            <strong>Lưu ý quan trọng:</strong> Khi bạn sử dụng website này, bạn đã đồng ý với tất cả các điều khoản và điều kiện được nêu trong tài liệu này. Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử dụng website và dịch vụ của chúng tôi.
          </AlertDescription>
        </Alert>

        {/* Contact Information */}
        <Card className="mb-8">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Cần Hỗ Trợ Thêm?
            </h3>
            <p className="text-gray-600 mb-6">
              Nếu bạn có bất kỳ câu hỏi nào về điều khoản sử dụng này, vui lòng liên hệ với chúng tôi để được hỗ trợ tốt nhất.
            </p>
            <Button asChild variant="outline" className="mr-4">
              <Link href="/lien-he">
                Liên Hệ Hỗ Trợ
              </Link>
            </Button>
          </CardContent>
        </Card>

          {/* Footer Legal Notice */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">📋 Thông Tin Pháp Lý</h3>
            <p className="text-gray-700 mb-4">
              © 2024 <span className="font-bold text-slate-700">Trang Thiên Long Mobile</span>. Tất cả quyền được bảo lưu.
            </p>
            <p className="text-sm text-gray-600">
              Điều khoản sử dụng có thể được cập nhật mà không cần thông báo trước. Vui lòng thường xuyên kiểm tra để cập nhật những thay đổi mới nhất.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ⚖️ Tuân Thủ Pháp Luật
            </h3>
            <p className="text-lg mb-6 text-red-100">
              Trang Thiên Long Mobile cam kết tuân thủ đầy đủ các quy định pháp luật Việt Nam và bảo vệ quyền lợi khách hàng.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Minh Bạch - Uy Tín - Đáng Tin Cậy!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}