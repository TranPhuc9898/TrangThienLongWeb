"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  ImageIcon,
  BarChart3,
  Settings,
  Home,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface SidebarItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
  count?: number;
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    products: 0,
    banners: 0,
    views: 0,
  });
  const router = useRouter();
  const pathname = usePathname();

  // Load stats
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Load products count
      const productsResponse = await fetch("/api/products");
      if (productsResponse.ok) {
        const products = await productsResponse.json();
        setStats((prev) => ({ ...prev, products: products.length }));
      }

      // Load banners count
      const bannersResponse = await fetch("/api/banners");
      if (bannersResponse.ok) {
        const banners = await bannersResponse.json();
        setStats((prev) => ({ ...prev, banners: banners.length }));
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin-admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const sidebarItems: SidebarItem[] = [
    {
      icon: BarChart3,
      label: "Tổng quan",
      href: "/admin-admin/dashboard",
    },
    {
      icon: Package,
      label: "Quản lý sản phẩm",
      href: "/admin-admin/dashboard/edit-product",
      count: stats.products,
    },
    {
      icon: ImageIcon,
      label: "Quản lý Banner",
      href: "/admin-admin/dashboard/edit-banner",
      count: stats.banners,
    },
    {
      icon: Settings,
      label: "Cài đặt",
      href: "/admin-admin/dashboard/settings",
    },
  ];

  const Sidebar = ({ mobile = false }) => (
    <div
      className={`${
        mobile ? "block lg:hidden" : "hidden lg:block"
      } w-64 bg-white border-r border-gray-200`}
    >
      <div className="h-full flex flex-col">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Package className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="px-4 py-4 border-t border-gray-200 space-y-2">
          <Link
            href="/"
            className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 mr-3" />
            <span className="font-medium">Trang chủ</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="relative"
          >
            <Sidebar mobile />
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <Package className="w-6 h-6 text-blue-600 mr-2" />
              <h1 className="text-lg font-bold text-gray-900">Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}


