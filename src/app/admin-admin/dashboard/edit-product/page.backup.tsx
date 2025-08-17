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
  Package,
  Image as ImageIcon,
  Search,
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  gallery: string;
  discount?: string;
  storage?: string;
  colors?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EditProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    price: "",
    description: "",
    category: "",
    rating: "4.5",
    reviewCount: "0",
    inStock: true,
    gallery: [] as string[],
    featured: false,
  });
  const [uploadingImage, setUploadingImage] = useState(false);
  const router = useRouter();

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else if (response.status === 401) {
        router.push("/admin-admin/login");
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          gallery: [...prev.gallery, data.url],
        }));
      } else {
        alert("Lỗi upload ảnh");
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

    const productData = {
      ...formData,
      price: parseInt(formData.price),
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      gallery: formData.gallery,
    };

    try {
      const url = editingProduct ? "/api/products" : "/api/products";
      const method = editingProduct ? "PUT" : "POST";
      const body = editingProduct
        ? { id: editingProduct.id, ...productData }
        : productData;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        loadProducts();
        setShowModal(false);
        resetForm();
        alert(
          editingProduct ? "Cập nhật thành công!" : "Tạo sản phẩm thành công!"
        );
      } else {
        alert("Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Có lỗi xảy ra");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      brand: product.brand,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      rating: product.rating.toString(),
      reviewCount: product.reviewCount.toString(),
      inStock: product.inStock,
      gallery: JSON.parse(product.gallery || "[]"),
      featured: product.featured,
    });
    setShowModal(true);
  };

  const handlePreview = (product: Product) => {
    setPreviewProduct(product);
    setShowPreviewModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        loadProducts();
        alert("Xóa thành công!");
      } else {
        alert("Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Có lỗi xảy ra");
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      brand: "",
      price: "",
      description: "",
      category: "",
      rating: "4.5",
      reviewCount: "0",
      inStock: true,
      gallery: [],
      featured: false,
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
          Quản lý sản phẩm
        </h1>
        <p className="text-gray-600">
          Thêm, sửa, xóa sản phẩm trong cửa hàng của bạn
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {products.length}
              </h3>
              <p className="text-gray-600">Tổng sản phẩm</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {products.filter((p) => p.inStock).length}
              </h3>
              <p className="text-gray-600">Còn hàng</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {products.filter((p) => p.featured).length}
              </h3>
              <p className="text-gray-600">Nổi bật</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Danh sách sản phẩm
          </h2>
          <p className="text-gray-600">Quản lý tất cả sản phẩm của bạn</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" />
          Thêm sản phẩm
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200"
          >
            {/* Product Image */}
            <div className="aspect-square bg-gray-50 rounded-t-xl overflow-hidden">
              {JSON.parse(product.gallery || "[]")[0] ? (
                <img
                  src={JSON.parse(product.gallery)[0]}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                  {product.title}
                </h3>
                {product.featured && (
                  <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                    Nổi bật
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-3">{product.brand}</p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-blue-600">
                  {product.price.toLocaleString()}đ
                </span>
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    product.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product.inStock ? "Còn hàng" : "Hết hàng"}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => handlePreview(product)}
                  className="w-full flex items-center justify-center px-3 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium"
                  title="Xem chi tiết sản phẩm"
                >
                  <Search className="w-4 h-4 mr-1" />
                  Xem
                </button>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Chưa có sản phẩm nào
          </h3>
          <p className="text-gray-600 mb-8">
            Bắt đầu bằng cách thêm sản phẩm đầu tiên cho cửa hàng của bạn
          </p>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors mx-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Thêm sản phẩm đầu tiên
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
                {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
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
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tên sản phẩm *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="iPhone 15 Pro Max..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thương hiệu *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    placeholder="Apple"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá (VND) *
                  </label>
                  <input
                    type="number"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="25000000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="">Chọn danh mục</option>
                    <option value="iPhone">iPhone</option>
                    <option value="iPad">iPad</option>
                    <option value="MacBook">MacBook</option>
                    <option value="Apple Watch">Apple Watch</option>
                    <option value="AirPods">AirPods</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Mô tả chi tiết về sản phẩm..."
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh sản phẩm
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="w-10 h-10 text-gray-400 mb-3" />
                    <span className="text-sm text-gray-600 font-medium">
                      {uploadingImage
                        ? "Đang tải lên..."
                        : "Click để tải ảnh lên"}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF tối đa 10MB
                    </span>
                  </label>
                </div>

                {/* Image Preview */}
                {formData.gallery.length > 0 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">
                    {formData.gallery.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Preview ${index}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              gallery: formData.gallery.filter(
                                (_, i) => i !== index
                              ),
                            })
                          }
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="flex items-center space-x-8">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) =>
                      setFormData({ ...formData, inStock: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Còn hàng
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    Sản phẩm nổi bật
                  </span>
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
                  {editingProduct ? "Cập nhật" : "Tạo mới"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && previewProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {previewProduct.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {previewProduct.brand} - Xem chi tiết sản phẩm
                </p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Product Preview */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Images */}
                <div>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                    {JSON.parse(previewProduct.gallery || "[]")[0] ? (
                      <img
                        src={JSON.parse(previewProduct.gallery)[0]}
                        alt={previewProduct.title}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Gallery Images */}
                  {JSON.parse(previewProduct.gallery || "[]").length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {JSON.parse(previewProduct.gallery).slice(1, 5).map((url: string, index: number) => (
                        <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={url}
                            alt={`${previewProduct.title} ${index + 2}`}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {previewProduct.title}
                    </h2>
                    <p className="text-gray-600 text-lg">{previewProduct.brand}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-blue-600">
                      {previewProduct.price.toLocaleString()}đ
                    </span>
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        previewProduct.inStock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {previewProduct.inStock ? "Còn hàng" : "Hết hàng"}
                    </span>
                    {previewProduct.featured && (
                      <span className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full font-medium">
                        Nổi bật
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(previewProduct.rating) ? "text-yellow-400" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-600 ml-2">
                      {previewProduct.rating} ({previewProduct.reviewCount} đánh giá)
                    </span>
                  </div>

                  {previewProduct.description && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Mô tả sản phẩm</h4>
                      <p className="text-gray-700 leading-relaxed">
                        {previewProduct.description}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <span className="text-sm text-gray-600">Danh mục:</span>
                      <p className="font-medium">{previewProduct.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Slug:</span>
                      <p className="font-medium text-blue-600">{previewProduct.slug}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Ngày tạo:</span>
                      <p className="font-medium">
                        {new Date(previewProduct.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Cập nhật:</span>
                      <p className="font-medium">
                        {new Date(previewProduct.updatedAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>
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
                    handleEdit(previewProduct);
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
