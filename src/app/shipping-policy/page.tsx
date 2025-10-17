import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy - Trang Thien Long Mobile | Free Nationwide Shipping",
  description: "Free nationwide shipping policy of Trang Thien Long Mobile - Home delivery, cash on delivery, 7-day returns, 24/7 support.",
  keywords: "free shipping, nationwide delivery, COD, 7-day returns, freeship, Trang Thien Long Mobile",
};

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            🚚 Shipping Policy
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Free nationwide shipping - Safe and fast home delivery
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">

          {/* Free Shipping Policy */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl mb-8 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
              🚚 Free Shipping Policy
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">
              All products sold at <span className="font-bold text-green-700">TRANG THIEN LONG MOBILE</span> will have <span className="font-bold text-emerald-700">FREE NATIONWIDE SHIPPING</span>. When you complete an order, staff will contact you to notify order status and delivery time.
            </p>
          </div>

          {/* Delivery Process */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              📋 Delivery Process
            </h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">📞 Order Confirmation</h4>
                    <p className="text-sm text-gray-700">Staff will contact to confirm information and delivery time within 2 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">📦 Prepare & Package</h4>
                    <p className="text-sm text-gray-700">Products are quality checked and carefully packaged with professional packaging</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-2">🚚 Shipping</h4>
                    <p className="text-sm text-gray-700">Professional courier service delivers safely to your location</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">💳 Receive & Pay</h4>
                    <p className="text-sm text-gray-700">Inspect product and pay directly to shipper (COD)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              ⚠️ Important Notes
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-3">🚨 Delivery Attempts</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 text-lg">•</span>
                    <span>Orders will be delivered <strong>maximum 2 times</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 text-lg">•</span>
                    <span>1st attempt unsuccessful → contact to arrange 2nd delivery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-600 mr-2 text-lg">•</span>
                    <span>Cannot contact within <strong>2 business days</strong> → order expires</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">🎯 Sensitive Cases</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-lg">•</span>
                    <span>Very high order value</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-lg">•</span>
                    <span>Evening delivery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2 text-lg">•</span>
                    <span>Alley addresses or risky locations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-lg">→</span>
                    <span><strong>Will contact to agree on specific time</strong></span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">📦 Upon Receiving</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Product Inspection</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Carefully inspect product before signing</li>
                    <li>• <strong>Record unboxing video</strong></li>
                    <li>• Check external and internal condition</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Complete Transaction</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pay and sign confirmation with shipper</li>
                    <li>• <strong>Keep shipping receipt</strong></li>
                    <li>• Store invoice included in product</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Liability Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              🛡️ Liability & Exemptions
            </h2>

            <div className="bg-gradient-to-br from-rose-50 to-red-50 p-6 rounded-xl border border-rose-200">
              <h3 className="text-lg font-semibold text-red-800 mb-4">⚠️ Trang Thien Long Mobile is NOT responsible for:</h3>
              <div className="space-y-3">
                <div className="bg-white/50 p-3 rounded-lg border border-red-300">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-red-700">📹 Unboxing video:</span> Product appearance discrepancies after signing <strong>without unboxing video as evidence</strong>
                  </p>
                </div>
                <div className="bg-white/50 p-3 rounded-lg border border-red-300">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-red-700">🚛 Shipping risks:</span> Risks during shipping (impact, moisture, accidents...)
                  </p>
                </div>
                <div className="bg-white/50 p-3 rounded-lg border border-red-300">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-red-700">🌦️ External factors:</span> Delivery delays due to weather, traffic, natural disasters...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              🔄 Return & Exchange Policy
            </h2>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
              <div className="text-center mb-4">
                <div className="inline-flex items-center bg-white/50 px-6 py-3 rounded-full border border-emerald-300">
                  <span className="text-3xl mr-3">🕐</span>
                  <div>
                    <p className="font-bold text-emerald-800 text-lg">7 DAYS</p>
                    <p className="text-sm text-emerald-600">Product return support</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-700 mb-4">
                <span className="font-bold text-emerald-700">trangthienlong.com</span> supports product returns within <strong>7 days from receipt</strong>.
              </p>
              <div className="text-center">
                <a href="/return-policy" className="inline-flex items-center bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors">
                  <span className="mr-2">📖</span>
                  View Detailed Return Policy
                </a>
              </div>
            </div>
          </div>

          {/* Support Channels */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              📞 24/7 Shipping Support
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 text-center">
                <div className="text-4xl mb-3">📞</div>
                <h4 className="font-semibold text-blue-800 mb-2">Hotline</h4>
                <p className="font-bold text-blue-600 text-lg">+84 939.02.1234</p>
                <p className="text-xs text-gray-600 mt-1">24/7 Support</p>
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
                <p className="text-xs text-gray-600 mt-1">Quick Response</p>
              </div>
            </div>
          </div>

          {/* Commitment Section */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-xl font-bold text-center mb-4 text-slate-800">
              🤝 Shipping Commitment
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✅</span>
                    <span><strong>Free nationwide shipping</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">⚡</span>
                    <span><strong>Fast delivery</strong> in 1-2 business days</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">📦</span>
                    <span><strong>Careful packaging</strong> ensures integrity</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🆘</span>
                    <span><strong>24/7 support</strong> for inquiries</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">💰</span>
                    <span><strong>100% refund</strong> for delayed delivery without notice</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🎯</span>
                    <span><strong>Flexible policies</strong> for each case</span>
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
              🚚 Free Shipping
            </h3>
            <p className="text-lg mb-6 text-purple-100">
              Trang Thien Long Mobile is committed to free nationwide shipping with top-quality service and 24/7 customer support.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Free Nationwide Shipping - Home Delivery!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
