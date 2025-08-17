import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Trang Thiên Long",
  description: "Admin management panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}

