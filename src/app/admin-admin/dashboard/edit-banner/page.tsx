"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  Save,
  X,
  Image as ImageIcon,
  Link as LinkIcon,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Search,
} from "lucide-react";

interface Banner {
  id: string;
  title: string;
  imageUrl: string;
  link?: string;
  order: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EditBannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewBanner, setPreviewBanner] = useState<Banner | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    link: "",
    order: 1,
    active: true,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const router = useRouter();

  // Load banners
  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      console.log("🔄 Loading banners...");
      const response = await fetch("/api/banners");
      if (response.ok) {
        const data = await response.json();
        console.log("📥 Loaded banners:", data.length, "banners");
        setBanners(data);
      } else if (response.status === 401) {
        console.log("🔐 Unauthorized - redirecting to login");
        router.push("/admin-admin/login");
      }
    } catch (error) {
      console.error("❌ Error loading banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          imageUrl: data.url,
        }));
      } else {
        const err = await response.json().catch(() => ({} as any));
        alert(`Lỗi upload ảnh: ${err.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Lỗi upload ảnh");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.imageUrl) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const url = "/api/banners";
      const method = editingBanner ? "PUT" : "POST";
      const body = editingBanner
        ? { id: editingBanner.id, ...formData }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        loadBanners();
        setShowModal(false);
        resetForm();
        alert(
          editingBanner
            ? "Cập nhật banner thành công!"
            : "Tạo banner thành công!"
        );
      } else {
        alert("Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Có lỗi xảy ra");
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      imageUrl: banner.imageUrl,
      link: banner.link || "",
      order: banner.order,
      active: banner.active,
    });
    setShowModal(true);
  };

  const handlePreview = (banner: Banner) => {
    setPreviewBanner(banner);
    setShowPreviewModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn XÓA VĨNH VIỄN banner này?")) return;

    console.log("🗑️ Deleting banner:", id);

    try {
      const response = await fetch("/api/banners", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      console.log("📥 Delete response status:", response.status);

      if (response.ok) {
        console.log("✅ Banner deleted successfully");
        loadBanners();
        alert("Xóa banner thành công!");
      } else {
        const errorData = await response.json();
        console.error("❌ Delete failed:", errorData);
        alert("Có lỗi xảy ra: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("❌ Delete error:", error);
      alert("Có lỗi xảy ra: " + error);
    }
  };

  const handleToggleActive = async (banner: Banner) => {
    console.log(
      "🔄 Toggle Active - Banner:",
      banner.id,
      "Current active:",
      banner.active,
      "Will change to:",
      !banner.active
    );

    try {
      const requestBody = {
        id: banner.id,
        active: !banner.active,
      };

      console.log("📤 Sending PUT request:", requestBody);

      const response = await fetch("/api/banners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      console.log("📥 Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("✅ Toggle success:", result);
        loadBanners();
        alert(`Banner đã ${!banner.active ? "hiển thị" : "ẩn"}!`);
      } else {
        const errorData = await response.json();
        console.error("❌ Toggle failed:", errorData);
        alert("Có lỗi xảy ra: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Toggle error:", error);
      alert("Có lỗi xảy ra: " + error);
    }
  };

  const handleChangeOrder = async (
    banner: Banner,
    direction: "up" | "down"
  ) => {
    const newOrder = direction === "up" ? banner.order - 1 : banner.order + 1;

    try {
      const response = await fetch("/api/banners", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: banner.id,
          order: newOrder,
        }),
      });

      if (response.ok) {
        loadBanners();
      } else {
        alert("Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Order change error:", error);
      alert("Có lỗi xảy ra");
    }
  };

  const resetForm = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      imageUrl: "",
      link: "",
      order: banners.length + 1,
      active: true,
    });
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
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Quản lý Banner
        </h1>
        <p className="text-gray-600">
          Thêm, sửa, xóa banner hiển thị trên trang chủ
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ImageIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {banners.length}
              </h3>
              <p className="text-gray-600">Tổng banner</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Eye className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {banners.filter((b) => b.active).length}
              </h3>
              <p className="text-gray-600">Đang hiển thị</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-gray-100 rounded-lg">
              <EyeOff className="w-6 h-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {banners.filter((b) => !b.active).length}
              </h3>
              <p className="text-gray-600">Đã ẩn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Danh sách banner</h2>
          <p className="text-gray-600">Quản lý tất cả banner trên website</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm banner
        </button>
      </div>

      {/* Banners List */}
      <div className="space-y-4">
        {banners.map((banner) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200"
          >
            <div className="p-6">
              <div className="flex items-center space-x-6">
                {/* Banner Image */}
                <div className="w-32 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Banner Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {banner.title}
                    </h3>
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        banner.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {banner.active ? "Hiển thị" : "Ẩn"}
                    </span>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                      #{banner.order}
                    </span>
                  </div>

                  {banner.link && (
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <LinkIcon className="w-4 h-4 mr-1" />
                      <span className="truncate">{banner.link}</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-500">
                    Tạo:{" "}
                    {new Date(banner.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {/* Order Controls */}
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => handleChangeOrder(banner, "up")}
                      disabled={banner.order === 1}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleChangeOrder(banner, "down")}
                      disabled={banner.order === banners.length}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Preview Banner */}
                  <button
                    onClick={() => handlePreview(banner)}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Xem ảnh banner"
                  >
                    <Search className="w-5 h-5" />
                  </button>

                  {/* Toggle Active/Inactive */}
                  <button
                    onClick={() => handleToggleActive(banner)}
                    className={`p-2 rounded-lg transition-colors border ${
                      banner.active
                        ? "text-green-600 hover:bg-green-50 border-green-200"
                        : "text-gray-400 hover:bg-gray-50 border-gray-200"
                    }`}
                    title={
                      banner.active
                        ? "ẨN banner (không xóa)"
                        : "HIỂN THỊ banner"
                    }
                  >
                    {banner.active ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(banner)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Sửa banner"
                  >
                    <Edit className="w-5 h-5" />
                  </button>

                  {/* Delete Permanently */}
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
                    title="XÓA VĨNH VIỄN banner (không thể hoàn tác)"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {banners.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <ImageIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Chưa có banner nào
          </h3>
          <p className="text-gray-600 mb-8">
            Bắt đầu bằng cách thêm banner đầu tiên cho trang chủ
          </p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors mx-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm banner đầu tiên
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editingBanner ? "Sửa banner" : "Thêm banner mới"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề banner *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="iPhone 15 Pro Max Sale 50%"
                />
              </div>

              {/* Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link điều hướng
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  placeholder="/shop/iphone hoặc https://..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Link mà người dùng sẽ được điều hướng khi click banner
                </p>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thứ tự hiển thị
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 1,
                    })
                  }
                />
                <p className="text-xs text-gray-500 mt-1">
                  Số thứ tự hiển thị (1 = đầu tiên)
                </p>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh banner *
                </label>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="banner-upload"
                  />
                  <label
                    htmlFor="banner-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <span className="text-sm text-gray-600 font-medium">
                      {uploadingImage
                        ? "Đang tải lên..."
                        : "Click để tải ảnh banner"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Khuyến nghị: 1920x600px, PNG/JPG/WebP tối đa 7MB
                    </span>
                  </label>
                </div>

                {/* Image Preview */}
                {formData.imageUrl && (
                  <div className="mt-4">
                    <div className="relative">
                      <img
                        src={formData.imageUrl}
                        alt="Banner preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, imageUrl: "" })
                        }
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Active */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="active"
                  className="ml-3 text-sm font-medium text-gray-700"
                >
                  Hiển thị banner ngay lập tức
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingBanner ? "Cập nhật" : "Tạo banner"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {previewBanner.title}
                </h3>
                <p className="text-sm text-gray-600">
                  Xem trước banner - Order #{previewBanner.order}
                </p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image Preview */}
            <div className="p-6">
              <div className="relative aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={previewBanner.imageUrl}
                  alt={previewBanner.title}
                  className="w-full h-full object-cover"
                />

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      previewBanner.active
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {previewBanner.active ? "Đang hiển thị" : "Đã ẩn"}
                  </span>
                </div>
              </div>

              {/* Banner Info */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Thông tin banner
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Thứ tự:</span>
                      <span className="font-medium">
                        #{previewBanner.order}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trạng thái:</span>
                      <span
                        className={`font-medium ${
                          previewBanner.active
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {previewBanner.active ? "Hiển thị" : "Ẩn"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày tạo:</span>
                      <span className="font-medium">
                        {new Date(previewBanner.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {previewBanner.link && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Link điều hướng
                    </h4>
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="w-4 h-4 text-blue-600" />
                      <a
                        href={previewBanner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm break-all"
                      >
                        {previewBanner.link}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    setShowPreviewModal(false);
                    handleEdit(previewBanner);
                  }}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
