"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Package,
  Image as ImageIcon,
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
  Plus,
  Eye,
  Edit,
  ArrowRight,
  Download,
  FileSpreadsheet,
} from "lucide-react";

interface Stats {
  products: {
    total: number;
    inStock: number;
    featured: number;
  };
  banners: {
    total: number;
    active: number;
  };
  recentActivity: Array<{
    id: string;
    type: "product" | "banner";
    action: "created" | "updated" | "deleted";
    title: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    products: { total: 0, inStock: 0, featured: 0 },
    banners: { total: 0, active: 0 },
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load products
      const productsResponse = await fetch("/api/products");
      if (productsResponse.ok) {
        const data = await productsResponse.json();
        // Fix: API returns { products: array, pagination: object }
        const products = data.products || [];
        setStats((prev) => ({
          ...prev,
          products: {
            total: products.length,
            inStock: products.filter((p: any) => p.inStock).length,
            featured: products.filter((p: any) => p.featured).length,
          },
        }));
      } else if (productsResponse.status === 401) {
        router.push("/admin-admin/login");
        return;
      }

      // Load banners
      const bannersResponse = await fetch("/api/banners");
      if (bannersResponse.ok) {
        const banners = await bannersResponse.json();
        setStats((prev) => ({
          ...prev,
          banners: {
            total: banners.length,
            active: banners.filter((b: any) => b.active).length,
          },
        }));
      }

      // Mock recent activity for now
      setStats((prev) => ({
        ...prev,
        recentActivity: [
          {
            id: "1",
            type: "product",
            action: "created",
            title: "iPhone 15 Pro Max",
            timestamp: new Date().toISOString(),
          },
          {
            id: "2",
            type: "banner",
            action: "updated",
            title: "Summer Sale Banner",
            timestamp: new Date(Date.now() - 3600000).toISOString(),
          },
        ],
      }));
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleMerchantExport = async () => {
    setExporting(true);
    try {
      const response = await fetch("/api/export/google-merchant", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      // Create blob from response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create download link
      const a = document.createElement("a");
      a.href = url;
      a.download = `google-merchant-feed-${new Date().getTime()}.xlsx`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert("✅ Export thành công! File đã được tải xuống.");
    } catch (error) {
      console.error("Export error:", error);
      alert("❌ Lỗi export! Vui lòng thử lại.");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Chào mừng đến với Admin Dashboard! 👋
        </h1>
        <p className="text-gray-600">
          Tổng quan về cửa hàng và quản lý nội dung website
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Products Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng sản phẩm</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.products.total}
              </p>
              <p className="text-sm text-green-600 mt-1">
                {stats.products.inStock} còn hàng
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        {/* Banners Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Banner hoạt động
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.banners.active}
              </p>
              <p className="text-sm text-blue-600 mt-1">
                /{stats.banners.total} tổng banner
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <ImageIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        {/* Featured Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Sản phẩm nổi bật
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.products.featured}
              </p>
              <p className="text-sm text-yellow-600 mt-1">Hiển thị homepage</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        {/* Views (Mock) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Lượt xem hôm nay
              </p>
              <p className="text-3xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-green-600 mt-1">+12% so với hôm qua</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Thao tác nhanh
          </h3>
          <div className="space-y-3">
            <Link
              href="/admin-admin/dashboard/edit-product"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Quản lý sản phẩm
                  </h4>
                  <p className="text-sm text-gray-600">
                    Thêm, sửa, xóa sản phẩm
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href="/admin-admin/dashboard/edit-banner"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg mr-3">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Quản lý Banner
                  </h4>
                  <p className="text-sm text-gray-600">
                    Cập nhật banner trang chủ
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>

            <Link
              href="/"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg mr-3">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Xem trang chủ</h4>
                  <p className="text-sm text-gray-600">
                    Kiểm tra website frontend
                  </p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </Link>

            <button
              onClick={handleGoogleMerchantExport}
              disabled={exporting}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
            >
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg mr-3">
                  <FileSpreadsheet className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {exporting ? "Đang Export..." : "Google Merchant Export"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Tải file XLSX cho Google Merchant Center
                  </p>
                </div>
              </div>
              {exporting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600"></div>
              ) : (
                <Download className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-sm border p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Hoạt động gần đây
          </h3>
          <div className="space-y-4">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`p-2 rounded-lg mr-3 ${
                      activity.type === "product"
                        ? "bg-blue-100"
                        : "bg-purple-100"
                    }`}
                  >
                    {activity.type === "product" ? (
                      <Package
                        className={`w-4 h-4 ${
                          activity.type === "product"
                            ? "text-blue-600"
                            : "text-purple-600"
                        }`}
                      />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action === "created"
                        ? "Đã tạo"
                        : activity.action === "updated"
                        ? "Đã cập nhật"
                        : "Đã xóa"}{" "}
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.timestamp).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Chưa có hoạt động nào</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Add Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-sm p-8 text-white"
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Bắt đầu thêm nội dung mới</h3>
          <p className="text-blue-100 mb-6">
            Tạo sản phẩm hoặc banner mới để cập nhật website của bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/admin-admin/dashboard/edit-product"
              className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Thêm sản phẩm mới
            </Link>
            <Link
              href="/admin-admin/dashboard/edit-banner"
              className="flex items-center px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Thêm banner mới
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
