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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionTimer, setSessionTimer] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Auth check on mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  // Load stats
  useEffect(() => {
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated]);

  const checkAuthentication = async () => {
    try {
      // Check if admin token exists and is valid
      const response = await fetch("/api/admin/status");

      if (response.ok) {
        setIsAuthenticated(true);
        startSessionTimer();
      } else {
        // Not authenticated, redirect to login
        router.push("/admin-admin/login");
        return;
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      router.push("/admin-admin/login");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const startSessionTimer = () => {
    // Clear existing timer
    if (sessionTimer) {
      clearTimeout(sessionTimer);
    }

    // Get login time from localStorage
    const loginTime = localStorage.getItem("admin-login-time");
    if (!loginTime) {
      // No login time found, redirect to login
      router.push("/admin-admin/login");
      return;
    }

    const loginTimestamp = parseInt(loginTime);
    const currentTime = Date.now();
    const elapsedTime = currentTime - loginTimestamp;
    const oneHour = 3600000; // 1 hour in milliseconds

    if (elapsedTime >= oneHour) {
      // Already expired, logout immediately
      handleSessionExpiry();
      return;
    }

    // Set timer for remaining time
    const remainingTime = oneHour - elapsedTime;
    const timer = setTimeout(() => {
      handleSessionExpiry();
    }, remainingTime);

    setSessionTimer(timer);
  };

  const handleSessionExpiry = async () => {
    alert("Phiên đăng nhập đã hết hạn sau 1 tiếng. Vui lòng đăng nhập lại!");

    try {
      // Logout and clear token
      await fetch("/api/auth", { method: "DELETE" });
    } catch (error) {
      console.error("Logout error:", error);
    }

    // Clear login time from localStorage
    localStorage.removeItem("admin-login-time");

    // Dispatch logout event to hide edit buttons immediately
    window.dispatchEvent(new CustomEvent("admin-logout"));

    // Redirect to login
    router.push("/admin-admin/login");
  };

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
      // Clear session timer
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }

      await fetch("/api/auth", { method: "DELETE" });

      // Clear login time from localStorage
      localStorage.removeItem("admin-login-time");

      // Dispatch logout event to hide edit buttons immediately
      window.dispatchEvent(new CustomEvent("admin-logout"));

      router.push("/admin-admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (sessionTimer) {
        clearTimeout(sessionTimer);
      }
    };
  }, [sessionTimer]);

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

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null;
  }

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
