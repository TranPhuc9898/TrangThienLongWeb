"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AdminEditContextType {
  isAdminLoggedIn: boolean;
  editMode: boolean;
  setEditMode: (mode: boolean) => void;
  checkAdminStatus: () => Promise<void>;
}

const AdminEditContext = createContext<AdminEditContextType | null>(null);

export const useAdminEdit = () => {
  const context = useContext(AdminEditContext);
  if (!context) {
    throw new Error("useAdminEdit must be used within AdminEditProvider");
  }
  return context;
};

interface AdminEditProviderProps {
  children: ReactNode;
}

export const AdminEditProvider = ({ children }: AdminEditProviderProps) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const checkAdminStatus = async () => {
    try {
      const response = await fetch("/api/admin/status");
      setIsAdminLoggedIn(response.ok);
      if (response.ok) {
        console.log("👑 Admin is logged in - Edit mode available");
      }
    } catch (error) {
      console.log("❌ Admin not logged in");
      setIsAdminLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAdminStatus();

    // Check admin status every 30 seconds
    const interval = setInterval(checkAdminStatus, 30000);

    // Listen for logout events
    const handleLogout = () => {
      console.log("🚪 Admin logout detected - hiding edit buttons");
      setIsAdminLoggedIn(false);
      setEditMode(false);
      // Also recheck admin status to be sure
      setTimeout(checkAdminStatus, 100);
    };

    // Listen for storage changes (logout from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "admin-login-time" && e.newValue === null) {
        handleLogout();
      }
    };

    // Listen for custom logout event
    window.addEventListener("admin-logout", handleLogout);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener("admin-logout", handleLogout);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value = {
    isAdminLoggedIn,
    editMode,
    setEditMode,
    checkAdminStatus,
  };

  return (
    <AdminEditContext.Provider value={value}>
      {children}
    </AdminEditContext.Provider>
  );
};
