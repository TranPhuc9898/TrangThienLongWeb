import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Không tìm thấy trang | Trang Thiên Long Mobile',
  description: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển'
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center px-6 py-12 max-w-md mx-auto">
        <div className="mb-8">
          <span className="text-9xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
            404
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Không tìm thấy trang
        </h1>
        
        <p className="text-gray-600 mb-8">
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn yêu cầu. 
          Trang có thể đã bị xóa hoặc địa chỉ URL không chính xác.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Về trang chủ
          </Link>
          
          <Link 
            href="/iphone" 
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            Xem iPhone mới
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Bạn cần hỗ trợ? Liên hệ hotline:{' '}
            <a href="tel:0905888999" className="text-blue-600 hover:underline">
              0905.888.999
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}