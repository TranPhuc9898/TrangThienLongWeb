import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy - Trang Thien Long Mobile | Free 30 Days",
  description: "Flexible return policy at Trang Thien Long Mobile - Free returns for 30 days, shipping cost support, 100% refund. Committed to Apple quality.",
  keywords: "return policy, iPhone warranty, Apple returns, refund, free 30 days, Trang Thien Long Mobile",
};

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            🔄 Return & Refund Policy
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            The most thoughtful shopping experience and customer service
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">

          {/* Introduction */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl mb-8 border-l-4 border-green-500">
            <p className="text-lg leading-relaxed text-gray-700">
              This return policy is established by <span className="font-bold text-green-700">Trang Thien Long Mobile</span> to provide the most thoughtful shopping experience and customer service.
            </p>
          </div>

          {/* 30 Day Policy Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              🛡️ Return for Manufacturer Defects
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">⭐ 30-Day Policy</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-lg">✅</span>
                    <span><strong>Free exchange within the first 30 days</strong> for equivalent products: same model, same capacity, same warranty period</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-lg">💰</span>
                    <span>If out of stock, <strong className="text-green-700">100% refund</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2 text-lg">🚚</span>
                    <span>Support <strong>shipping costs</strong> for all defect cases within 30 days</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-300">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">📞 Return Instructions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-amber-700 mb-2">Step 1: Contact</h4>
                    <p className="text-sm text-gray-600">Call hotline <span className="font-bold text-red-600">+84 939.02.1234</span> for detailed instructions</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-700 mb-2">Step 2: Prepare</h4>
                    <p className="text-sm text-gray-600">Log out of all accounts, prepare device as instructed</p>
                  </div>
                </div>
                <div className="mt-4 bg-white/50 p-4 rounded-lg border border-amber-300">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold text-amber-700">⚠️ Shipping note:</span> DO NOT declare product value, DO NOT use express shipping. Device must be logged out of all accounts before shipping.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Non-Defective Return Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              🔄 Return for Non-Defective Products
            </h2>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">📱 Applicable Products</h3>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">📱</div>
                  <p className="text-sm text-purple-700">Phones</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🎧</div>
                  <p className="text-sm text-purple-700">Speakers, Headphones</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">💻</div>
                  <p className="text-sm text-purple-700">Laptops, Tablets</p>
                </div>
              </div>
              <div className="bg-white/50 p-4 rounded-lg border border-purple-300">
                <p className="text-gray-700">
                  If customers want to exchange for a different product or return: TRANG THIEN LONG MOBILE will inspect the device condition and notify the <span className="font-bold text-purple-700">product buy-back value</span> at the store.
                </p>
              </div>
            </div>
          </div>

          {/* User Error Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              ⚠️ User-Caused Defects
            </h2>

            <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-4">🚫 Cases NOT Covered by Warranty</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Physical Damage</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Not maintaining 100% original shape</li>
                    <li>• Strong impact, dents</li>
                    <li>• Water damage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-2">Warranty Conditions</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Does not meet manufacturer warranty conditions</li>
                    <li>• Unauthorized software modifications</li>
                    <li>• Improper use</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/50 p-4 rounded-lg border border-red-300">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-red-700">💡 Solution:</span> Trang Thien Long Mobile supports transferring products to the manufacturer's Service Center or our service center, and customers pay for repairs.
                </p>
              </div>
            </div>
          </div>

          {/* Important Notes Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              📋 Important Notes
            </h2>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-medium text-blue-800 mb-2">📝 Order Information</h4>
                <p className="text-sm text-gray-700">
                  We only accept orders when accurate information about address and phone number is provided.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h4 className="font-medium text-amber-800 mb-2">🚚 Delivery</h4>
                <p className="text-sm text-gray-700">
                  Some sensitive cases (high value, evening delivery, alley addresses) will be contacted to agree on specific delivery times.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg border-l-4 border-red-500">
                <h4 className="font-medium text-red-800 mb-2">📹 Product Inspection</h4>
                <p className="text-sm text-gray-700">
                  Please carefully inspect products before signing and <strong>record a video during unboxing</strong>. Unboxing video is important evidence to ensure your rights.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-l-4 border-green-500">
                <h4 className="font-medium text-green-800 mb-2">⏰ Delayed Delivery</h4>
                <p className="text-sm text-gray-700">
                  In case of delayed delivery without prior notice, customers may refuse delivery and we will <strong>refund the full amount</strong> within 7 days.
                </p>
              </div>
            </div>
          </div>

          {/* Commitment Section */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-xl font-bold text-center mb-4 text-slate-800">
              🤝 Our Commitment
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✅</span>
                    <span>Products <strong>exactly as advertised</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">📋</span>
                    <span>Complete <strong>invoice and official warranty</strong></span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">🚚</span>
                    <span>Support <strong>shipping costs</strong> for product defects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">💰</span>
                    <span>Refund within <strong>7 days</strong> for late delivery</span>
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
              🔄 Flexible Returns
            </h3>
            <p className="text-lg mb-6 text-green-100">
              Trang Thien Long Mobile is committed to flexible return policies and dedicated customer support in all cases.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Free Returns Within 30 Days!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
