import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giới Thiệu Về Trang Thiên Long Mobile - Chuyên Apple Products",
  description: "Tìm hiểu về Trang Thiên Long Mobile - hơn 14 năm kinh nghiệm cung cấp iPhone, iPad, Mac chính hãng với giá tốt nhất. Uy tín, chất lượng, bảo hành chính thống.",
  keywords: "giới thiệu Trang Thiên Long Mobile, cửa hàng Apple, iPhone chính hãng, iPad, Mac",
};

export default function GioiThieuPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Giới Thiệu Về Chúng Tôi
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Hành trình hơn 14 năm xây dựng niềm tin với khách hàng qua chất lượng sản phẩm Apple chính hãng
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl mb-8 border-l-4 border-blue-500">
            <p className="text-lg leading-relaxed text-gray-700">
              <span className="font-bold text-blue-700">TRANG THIÊN LONG MOBILE</span> hiện tại đang hoạt động trên tên miền mang tên{" "}
              <span className="font-bold text-purple-700">trangthienlong.com</span>. Tất cả các thông tin được đăng tải trong website này là chính thống và do chính cửa hàng của chúng tôi đưa ra. Chúng tôi hoàn toàn chịu trách nhiệm với các thông tin này.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Giới Thiệu Trang Thiên Long Mobile
          </h2>
          
          {/* Timeline Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-8 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                2009
              </div>
              <p className="text-lg text-gray-700">
                Năm <span className="font-bold text-green-700">Trang Thiên Long Mobile</span> ra đời, không chỉ là một cửa hàng điện thoại di động, mà còn là một điểm đến tin cậy cho những ai đang tìm kiếm sự tuyệt vời trong công nghệ của Apple.
              </p>
            </div>
            <p className="text-gray-600 ml-16">
              Với hơn một thập kỷ kinh nghiệm, chúng tôi đã trở thành một trong những đơn vị giao máy sỉ uy tín nhất, cung cấp hàng triệu sản phẩm cho hàng trăm cửa hàng điện thoại di động trên khắp cả nước.
            </p>
          </div>

          {/* Trust Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              🛡️ Sự Tin Cậy Là Điểm Nhấn
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">✅ Cam Kết Chất Lượng</h3>
                <p className="text-gray-700">
                  Tại Trang Thiên Long Mobile, chúng tôi luôn đặt sự tin cậy của khách hàng lên hàng đầu. Với cam kết về chất lượng sản phẩm và dịch vụ, chúng tôi tự hào là nơi bạn có thể yên tâm mua sắm.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">🔍 Kiểm Tra Kỹ Lưỡng</h3>
                <p className="text-gray-700">
                  Từng sản phẩm đều được kiểm tra kỹ lưỡng trước khi đến tay khách hàng, đảm bảo mang lại trải nghiệm tốt nhất cho mọi người.
                </p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📱 Chất Lượng Và Sự Đa Dạng
            </h2>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">📱</div>
                  <h4 className="font-semibold text-purple-800">iPhone</h4>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💻</div>
                  <h4 className="font-semibold text-purple-800">MacBook</h4>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">⌚</div>
                  <h4 className="font-semibold text-purple-800">Apple Watch</h4>
                </div>
              </div>
              <p className="text-gray-700">
                Cửa hàng của chúng tôi không chỉ chuyên về iPhone, mà còn cung cấp đầy đủ các thiết bị công nghệ hiện đại khác. Từ iPad, Macbook, iMac cho đến các loại phụ kiện, chúng tôi luôn cập nhật những mẫu mới nhất và chất lượng nhất từ các thương hiệu chính quy.
              </p>
            </div>
          </div>

          {/* Service Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🎯 Dịch Vụ Chuyên Nghiệp Và Tận Tâm
            </h2>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200 mb-6">
              <p className="text-gray-700 mb-4">
                Đội ngũ nhân viên của chúng tôi không chỉ là những chuyên gia trong lĩnh vực công nghệ, mà còn là những người bạn tận tâm, luôn sẵn sàng tư vấn và hỗ trợ bạn trong mọi trường hợp.
              </p>
              <p className="text-gray-700">
                Từ khâu tư vấn sản phẩm đến hỗ trợ sau bán hàng, chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm khó quên.
              </p>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              💰 Giá Cả Hợp Lý
            </h2>
            
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200 mb-6">
              <p className="text-gray-700 mb-4">
                Với tên gọi <span className="font-bold text-teal-700">"Trang Thiên Long Mobile"</span>, chúng tôi cam kết cung cấp các sản phẩm với giá cả hợp lý, mang đến cho bạn sự lựa chọn tốt nhất với chi phí hợp lý nhất.
              </p>
              <p className="text-gray-700">
                Bạn sẽ không còn phải lo lắng về việc mua sắm các sản phẩm của Apple với mức giá không cạnh tranh, vì tại Trang Thiên Long Mobile, chúng tôi luôn đặt chất lượng và giá cả lên hàng đầu.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📚 Nội Dung Website Trang Thiên Long Mobile
            </h2>
            
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-6">
              <p className="text-gray-700 mb-4">
                Trang Thiên Long Mobile sẽ chứa đựng các thông tin về tất cả các dòng sản phẩm iPhone và các sản phẩm khác của thương hiệu Apple mà chúng tôi đang kinh doanh. Bên cạnh đó, website của chúng tôi cũng sẽ cung cấp các bài viết kiến thức liên quan đến tất cả các sản phẩm của Apple.
              </p>
              <div className="bg-white/50 p-4 rounded-lg border border-indigo-300">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Lưu ý về bản quyền:</span> Các bài viết được chính chúng tôi thực hiện và mong muốn các bên nếu có sao chép vui lòng dẫn nguồn. Các nội dung được bảo vệ thông qua hệ thống bảo vệ bản quyền toàn cầu DMCA.COM.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🌟 Trang Thiên Long Mobile
            </h3>
            <p className="text-lg mb-6 text-blue-100">
              Nếu bạn đang tìm kiếm một nơi tin cậy để mua sắm công nghệ, hãy đến với Trang Thiên Long Mobile. Chúng tôi tự hào là địa chỉ uy tín, mang đến cho bạn những sản phẩm chất lượng và dịch vụ tốt nhất.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Nơi Mang Đến Sự Tin Cậy và Chất Lượng!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}