import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Trang Thien Long Mobile - Apple Products Specialist",
  description: "Learn about Trang Thien Long Mobile - over 14 years of experience providing authentic iPhones, iPads, and Macs at the best prices. Trust, quality, and official warranty.",
  keywords: "about Trang Thien Long Mobile, Apple store, authentic iPhone, iPad, Mac",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            About Us
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Over 14 years of building trust through authentic Apple products
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-xl mb-8 border-l-4 border-blue-500">
            <p className="text-lg leading-relaxed text-gray-700">
              <span className="font-bold text-blue-700">TRANG THIEN LONG MOBILE</span> currently operates under the domain name{" "}
              <span className="font-bold text-purple-700">trangthienlong.com</span>. All information published on this website is official and provided directly by our store. We take full responsibility for this information.
            </p>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Trang Thien Long Mobile
          </h2>

          {/* Timeline Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-8 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                2009
              </div>
              <p className="text-lg text-gray-700">
                The year <span className="font-bold text-green-700">Trang Thien Long Mobile</span> was established, not just as a mobile phone store, but as a trusted destination for those seeking excellence in Apple technology.
              </p>
            </div>
            <p className="text-gray-600 ml-16">
              With over a decade of experience, we have become one of the most reputable wholesale suppliers, providing millions of products to hundreds of mobile phone stores nationwide.
            </p>
          </div>

          {/* Trust Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              🛡️ Trust is Our Highlight
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">✅ Quality Commitment</h3>
                <p className="text-gray-700">
                  At Trang Thien Long Mobile, we always prioritize customer trust. With our commitment to product and service quality, we are proud to be a place where you can shop with confidence.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-3">🔍 Thorough Inspection</h3>
                <p className="text-gray-700">
                  Every product is thoroughly inspected before reaching customers, ensuring the best experience for everyone.
                </p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📱 Quality and Diversity
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
                Our store specializes not only in iPhones but also offers a full range of modern technology devices. From iPads, MacBooks, iMacs to various accessories, we always update the latest and highest quality models from official brands.
              </p>
            </div>
          </div>

          {/* Service Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              🎯 Professional and Dedicated Service
            </h2>

            <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200 mb-6">
              <p className="text-gray-700 mb-4">
                Our staff are not only technology experts but also dedicated friends, always ready to advise and support you in every situation.
              </p>
              <p className="text-gray-700">
                From product consulting to after-sales support, we are committed to providing you with an unforgettable shopping experience.
              </p>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              💰 Reasonable Prices
            </h2>

            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-200 mb-6">
              <p className="text-gray-700 mb-4">
                With the name <span className="font-bold text-teal-700">"Trang Thien Long Mobile"</span>, we are committed to providing products at reasonable prices, offering you the best choices at the most affordable costs.
              </p>
              <p className="text-gray-700">
                You no longer have to worry about purchasing Apple products at uncompetitive prices, because at Trang Thien Long Mobile, we always prioritize quality and pricing.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📚 Website Content
            </h2>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 mb-6">
              <p className="text-gray-700 mb-4">
                Trang Thien Long Mobile contains information about all iPhone product lines and other Apple products we carry. In addition, our website also provides knowledge articles related to all Apple products.
              </p>
              <div className="bg-white/50 p-4 rounded-lg border border-indigo-300">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Copyright notice:</span> Articles are created by us and we kindly request that anyone copying them provide proper attribution. All content is protected through the DMCA.COM global copyright protection system.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🌟 Trang Thien Long Mobile
            </h3>
            <p className="text-lg mb-6 text-blue-100">
              If you are looking for a reliable place to shop for technology, come to Trang Thien Long Mobile. We are proud to be a reputable address, bringing you quality products and the best service.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Where Trust and Quality Meet!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
