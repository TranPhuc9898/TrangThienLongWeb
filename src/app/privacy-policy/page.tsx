import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Trang Thien Long Mobile | Customer Information Protection",
  description: "Privacy policy of Trang Thien Long Mobile - Committed to protecting customer personal information. Collection, use and data security in compliance with Vietnamese law.",
  keywords: "privacy policy, information protection, Trang Thien Long Mobile, customer privacy",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            🔒 Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
            Commitment to protecting personal information and customer privacy
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">

          {/* Company Info Section */}
          <div className="bg-gradient-to-r from-cyan-100 to-blue-100 p-6 rounded-xl mb-8 border-l-4 border-cyan-500">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent">
              🏢 Who We Are
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              <span className="font-bold text-cyan-700">Website address:</span> https://trangthienlong.com
            </p>
            <p className="text-gray-700">
              We are the official website of <span className="font-bold text-blue-700">TRANG THIEN LONG MOBILE</span> store. In addition to product introduction, our website has e-commerce functionality for customers to easily shop online.
            </p>
          </div>

          {/* Privacy Policy Overview */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              🛡️ Privacy Policy Details
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
              <p className="text-gray-700 mb-4">
                This privacy policy explains how we receive, use and (in certain cases) disclose your personal information.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-teal-700">Protecting personal data</span> and building trust with customers is very important. We only collect necessary information related to transactions and comply with Vietnamese law.
              </p>
            </div>
          </div>

          {/* Data Collection Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              📊 Personal Information Collection
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">📝 Information We Collect</h3>
                <p className="text-gray-700 mb-3">
                  We collect, store and process your information for the purchasing process and order-related notifications:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Title, name, gender, date of birth</li>
                  <li>Email, address, delivery address, phone number</li>
                  <li>Payment details, card or bank account information</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">🎯 Purpose of Use</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    <li>Process orders</li>
                    <li>Provide customer service</li>
                    <li>Manage accounts</li>
                    <li>Verify online transactions</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">📤 Information Sharing</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                    <li>Courier services (delivery)</li>
                    <li>Market research (anonymized)</li>
                    <li>Law enforcement (when required)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 p-4 rounded-lg border border-yellow-300">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-amber-700">💡 Note:</span> If you do not wish to receive marketing information from us, you can opt out at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              🔐 Information Security
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-50 to-rose-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-lg font-semibold text-red-800 mb-3">⚡ Security Measures</h3>
                <p className="text-gray-700 mb-4">
                  We have appropriate technical and security measures to prevent unauthorized access, loss or damage to your information.
                </p>
                <div className="bg-white/50 p-4 rounded-lg border border-red-300">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-red-700">⚠️ Warning:</span> We advise against sending payment information via email. We are not responsible for loss when exchanging information over the internet.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-300">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">🚫 Strictly Prohibited</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Using programs or tools to interfere with the system</li>
                  <li>Changing the data structure of the website</li>
                  <li>Spreading or propagating destructive activities</li>
                </ul>
                <p className="text-sm text-amber-700 mt-3 font-medium">
                  Any violation will result in loss of rights and legal prosecution if necessary.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-4 rounded-lg border border-slate-300">
                <p className="text-gray-700 text-sm">
                  <span className="font-semibold">📋 Legal information:</span> All transaction information is kept confidential, but when law enforcement agencies require it, we will provide information as regulated.
                </p>
              </div>
            </div>
          </div>

          {/* Customer Rights Section */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              👤 Customer Rights
            </h2>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <h4 className="font-semibold text-emerald-800">Access Data</h4>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">✏️</div>
                  <h4 className="font-semibold text-emerald-800">Edit</h4>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🛑</div>
                  <h4 className="font-semibold text-emerald-800">Stop Marketing</h4>
                </div>
              </div>
              <p className="text-gray-700">
                You have the right to request access and correction of errors in your personal data free of charge. At any time, you can request to stop using data for marketing purposes.
              </p>
            </div>
          </div>

          {/* Legal Section */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-xl border border-slate-300">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">⚖️ Legal Terms</h3>
            <p className="text-gray-700 mb-4">
              The conditions, terms and content of this website are governed by <span className="font-bold text-slate-700">Vietnamese law</span> and Vietnamese courts have jurisdiction to review.
            </p>
            <p className="text-sm text-gray-600">
              Above are all current privacy policies of TRANG THIEN LONG MOBILE. We hope you will understand if any unfortunate incidents occur.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              🔒 Absolute Security
            </h3>
            <p className="text-lg mb-6 text-cyan-100">
              Trang Thien Long Mobile is committed to protecting customers' personal information with the most advanced security measures.
            </p>
            <div className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-full font-bold text-lg inline-block">
              Your Information is Securely Protected!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
