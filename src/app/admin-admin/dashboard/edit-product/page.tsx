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
  Palette,
  HardDrive,
  Percent,
  DollarSign,
  ShoppingCart,
  Star,
  Eye,
} from "lucide-react";

interface ProductVariant {
  storage: string;
  color: string;
  price: string;
  image: string;
  inStock: boolean;
  quantity: number;
}

interface Product {
  id: string;
  productName: string;
  brand: string;
  condition: string;
  slug: string;
  basePrice: string;
  currency: string;
  discount?: string;
  thumbnail: string;
  description?: string;
  promotionGeneral?: string;
  promotionStudent?: string;
  installment?: string;
  category: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  inStock: boolean;
  variants: ProductVariant[];
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
    // Basic Info
    productName: "",
    brand: "",
    condition: "99%",

    // Pricing
    basePrice: "",
    currency: "VND",
    discount: "",

    // Media & Description
    thumbnail: "",
    description: "",

    // Promotions
    promotionGeneral: "",
    promotionStudent: "",
    installment: "",

    // Metadata
    category: "",
    rating: "4.9",
    reviewCount: "0",
    featured: false,
    inStock: true,

    // Variants
    variants: [] as ProductVariant[],
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVariantImage, setUploadingVariantImage] = useState<
    string | null
  >(null);

  // Storage presets
  const STORAGE_OPTIONS = ["128GB", "256GB", "512GB", "1TB"];

  // Color and Storage selections
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [newColor, setNewColor] = useState("");

  // Matrix data for variants (color x storage combinations)
  const [variantsMatrix, setVariantsMatrix] = useState<{
    [colorStorageKey: string]: {
      color: string;
      storage: string;
      price: string;
      image: string;
      inStock: boolean;
      quantity: number;
    };
  }>({});

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

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isVariantImage = false,
    colorStorageKey?: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isVariantImage && colorStorageKey) {
      setUploadingVariantImage(colorStorageKey);
    } else {
      setUploadingImage(true);
    }

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (response.ok) {
        const result = await response.json();
        if (isVariantImage && colorStorageKey) {
          // Update variant image in matrix
          setVariantsMatrix((prev) => ({
            ...prev,
            [colorStorageKey]: {
              ...prev[colorStorageKey],
              image: result.url,
            },
          }));
        } else {
          // Update thumbnail
          setFormData({ ...formData, thumbnail: result.url });
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      if (isVariantImage) {
        setUploadingVariantImage(null);
      } else {
        setUploadingImage(false);
      }
    }
  };

  // Color management
  const addColor = () => {
    if (!newColor.trim()) {
      alert("Vui lòng nhập tên màu");
      return;
    }

    if (selectedColors.includes(newColor.trim())) {
      alert("Màu này đã tồn tại");
      return;
    }

    const updatedColors = [...selectedColors, newColor.trim()];
    setSelectedColors(updatedColors);
    setNewColor("");

    // Auto-generate matrix entries for new color
    generateMatrixEntries(updatedColors, selectedStorages);
  };

  const removeColor = (colorToRemove: string) => {
    const updatedColors = selectedColors.filter((c) => c !== colorToRemove);
    setSelectedColors(updatedColors);

    // Remove matrix entries for this color
    const newMatrix = { ...variantsMatrix };
    Object.keys(newMatrix).forEach((key) => {
      if (key.startsWith(`${colorToRemove}_`)) {
        delete newMatrix[key];
      }
    });
    setVariantsMatrix(newMatrix);
  };

  // Storage management
  const toggleStorage = (storage: string) => {
    const updatedStorages = selectedStorages.includes(storage)
      ? selectedStorages.filter((s) => s !== storage)
      : [...selectedStorages, storage];

    setSelectedStorages(updatedStorages);

    // Auto-generate matrix entries
    generateMatrixEntries(selectedColors, updatedStorages);
  };

  // Generate matrix entries automatically
  const generateMatrixEntries = (colors: string[], storages: string[]) => {
    const newMatrix = { ...variantsMatrix };

    colors.forEach((color) => {
      storages.forEach((storage) => {
        const key = `${color}_${storage}`;
        if (!newMatrix[key]) {
          newMatrix[key] = {
            color,
            storage,
            price: "",
            image: "",
            inStock: true,
            quantity: 0,
          };
        }
      });
    });

    // Remove entries that are no longer valid
    Object.keys(newMatrix).forEach((key) => {
      const [color, storage] = key.split("_");
      if (!colors.includes(color) || !storages.includes(storage)) {
        delete newMatrix[key];
      }
    });

    setVariantsMatrix(newMatrix);
  };

  // Update specific variant in matrix
  const updateVariantInMatrix = (
    colorStorageKey: string,
    field: string,
    value: any
  ) => {
    setVariantsMatrix((prev) => ({
      ...prev,
      [colorStorageKey]: {
        ...prev[colorStorageKey],
        [field]: value,
      },
    }));
  };

  // Convert matrix to variants array for API submission
  const generateVariantsFromMatrix = (): ProductVariant[] => {
    return Object.values(variantsMatrix).filter(
      (variant) => variant.price && variant.image
    );
  };

  const handleEdit = (product: Product) => {
    try {
      setFormData({
        productName: product.productName,
        brand: product.brand,
        condition: product.condition,
        basePrice: product.basePrice.toString(),
        currency: product.currency,
        discount: product.discount || "",
        thumbnail: product.thumbnail,
        description: product.description || "",
        promotionGeneral: product.promotionGeneral || "",
        promotionStudent: product.promotionStudent || "",
        installment: product.installment || "",
        category: product.category,
        rating: product.rating.toString(),
        reviewCount: product.reviewCount.toString(),
        featured: product.featured,
        inStock: product.inStock,
        variants: product.variants || [],
      });

      // Populate matrix from existing variants
      if (product.variants && product.variants.length > 0) {
        const colors = Array.from(
          new Set(product.variants.map((v) => v.color))
        );
        const storages = Array.from(
          new Set(product.variants.map((v) => v.storage))
        );

        setSelectedColors(colors);
        setSelectedStorages(storages);

        const matrix: { [key: string]: any } = {};
        product.variants.forEach((variant) => {
          const key = `${variant.color}_${variant.storage}`;
          matrix[key] = {
            color: variant.color,
            storage: variant.storage,
            price: variant.price.toString(),
            image: variant.image,
            inStock: variant.inStock,
            quantity: variant.quantity || 0,
          };
        });

        setVariantsMatrix(matrix);
      } else {
        // Reset matrix for new products
        setSelectedColors([]);
        setSelectedStorages([]);
        setVariantsMatrix({});
      }

      setEditingProduct(product);
      setShowModal(true);
    } catch (error) {
      console.error("Error editing product:", error);
      alert("Lỗi khi load dữ liệu sản phẩm");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.productName ||
      !formData.basePrice ||
      !formData.brand ||
      !formData.thumbnail
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Generate variants from matrix
    const variants = generateVariantsFromMatrix();
    if (variants.length === 0) {
      alert(
        "Vui lòng thêm ít nhất 1 variant với đầy đủ thông tin (giá và ảnh)"
      );
      return;
    }

    try {
      // Set default values for optional fields if empty
      const productData = {
        ...(editingProduct && { id: editingProduct.id }),
        ...formData,
        basePrice: formData.basePrice, // Keep as string for BigInt handling
        rating: parseFloat(formData.rating),
        reviewCount: parseInt(formData.reviewCount),

        // Set defaults for optional promotion fields
        promotionGeneral:
          formData.promotionGeneral || "Ưu đãi giảm thêm đến 200.000đ",
        promotionStudent:
          formData.promotionStudent ||
          "Sinh viên/Học sinh giảm thêm đến 300.000đ",
        installment:
          formData.installment ||
          "Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng",
        description:
          formData.description ||
          `${formData.productName} chính hãng, bảo hành 12 tháng tại các trung tâm bảo hành ủy quyền. Miễn phí giao hàng toàn quốc.`,

        variants, // Use generated variants from matrix
      };

      const method = editingProduct ? "PUT" : "POST";
      const url = "/api/products";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert(
          editingProduct
            ? "Sản phẩm đã được cập nhật!"
            : "Sản phẩm đã được tạo!"
        );
        setShowModal(false);
        resetForm();
        loadProducts();
      } else {
        const error = await response.json();
        alert(`Lỗi: ${error.error || "Không thể lưu sản phẩm"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Lỗi khi gửi form");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    try {
      const response = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Sản phẩm đã được xóa!");
        loadProducts();
      } else {
        alert("Không thể xóa sản phẩm");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Lỗi khi xóa sản phẩm");
    }
  };

  const resetForm = () => {
    setFormData({
      productName: "",
      brand: "",
      condition: "99%",
      basePrice: "",
      currency: "VND",
      discount: "",
      thumbnail: "",
      description: "",
      promotionGeneral: "",
      promotionStudent: "",
      installment: "",
      category: "",
      rating: "4.9",
      reviewCount: "0",
      featured: false,
      inStock: true,
      variants: [],
    });

    // Reset matrix data
    setSelectedColors([]);
    setSelectedStorages([]);
    setVariantsMatrix({});
    setNewColor("");

    setEditingProduct(null);
  };

  const handlePreview = (product: Product) => {
    setPreviewProduct(product);
    setShowPreviewModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Package className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Quản lý sản phẩm
                </h1>
                <p className="text-gray-600">
                  Thêm, sửa, xóa sản phẩm với variants
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Chưa có sản phẩm nào
              </h3>
              <p className="text-gray-600 mb-6">
                Thêm sản phẩm đầu tiên để bắt đầu
              </p>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
              >
                Thêm sản phẩm
              </button>
            </div>
          ) : (
            products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={product.thumbnail}
                    alt={product.productName}
                    className="w-full h-full object-contain p-4"
                  />
                  {product.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.productName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                  <p className="text-lg font-bold text-blue-600 mb-3">
                    {Number(product.basePrice)?.toLocaleString()}đ
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>⭐ {product.rating}</span>
                    <span>{product.variants?.length || 0} variants</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePreview(product)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Xem
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Sửa
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Xóa
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Create/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-8">
                  {/* Basic Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Thông tin cơ bản
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tên sản phẩm *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.productName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              productName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="iPhone 15 Pro Max"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thương hiệu *
                        </label>
                        <select
                          required
                          value={formData.brand}
                          onChange={(e) =>
                            setFormData({ ...formData, brand: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Chọn thương hiệu</option>
                          <option value="Apple">Apple</option>
                          <option value="Samsung">Samsung</option>
                          <option value="Google">Google</option>
                          <option value="Xiaomi">Xiaomi</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Danh mục *
                        </label>
                        <select
                          required
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Chọn danh mục</option>
                          <option value="iPhone">iPhone</option>
                          <option value="iPad">iPad</option>
                          <option value="MacBook">MacBook</option>
                          <option value="Apple Watch">Apple Watch</option>
                          <option value="AirPods">AirPods</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tình trạng
                        </label>
                        <select
                          value={formData.condition}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              condition: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="99%">99%</option>
                          <option value="Like New">Like New</option>
                          <option value="Chính hãng">Chính hãng</option>
                          <option value="Refurbished">Refurbished</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Thông tin giá
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giá cơ bản *
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.basePrice}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              basePrice: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="29990000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Đơn vị tiền tệ
                        </label>
                        <select
                          value={formData.currency}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              currency: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="VND">VND</option>
                          <option value="USD">USD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Giảm giá
                        </label>
                        <input
                          type="text"
                          value={formData.discount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              discount: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="-12%"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Hình ảnh chính *
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        {formData.thumbnail ? (
                          <img
                            src={formData.thumbnail}
                            alt="Thumbnail"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="thumbnail-upload"
                          className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${
                            uploadingImage ? "opacity-50" : ""
                          }`}
                        >
                          <Upload className="w-4 h-4" />
                          {uploadingImage ? "Đang tải lên..." : "Tải ảnh lên"}
                        </label>
                        <input
                          id="thumbnail-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e)}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Variants Management */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Quản lý Variants
                    </h3>

                    {/* Step 1: Storage Selection */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">
                        1. Chọn dung lượng có sẵn:
                      </h4>
                      <div className="grid grid-cols-4 gap-3">
                        {STORAGE_OPTIONS.map((storage) => (
                          <label
                            key={storage}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedStorages.includes(storage)}
                              onChange={() => toggleStorage(storage)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">
                              {storage}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Step 2: Color Management */}
                    <div className="mb-6">
                      <h4 className="font-medium text-gray-900 mb-3">
                        2. Quản lý màu sắc:
                      </h4>

                      {/* Add Color */}
                      <div className="flex gap-2 mb-4">
                        <input
                          type="text"
                          value={newColor}
                          onChange={(e) => setNewColor(e.target.value)}
                          placeholder="Nhập tên màu (Black Titanium)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onKeyPress={(e) => e.key === "Enter" && addColor()}
                        />
                        <button
                          type="button"
                          onClick={addColor}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          + Thêm màu
                        </button>
                      </div>

                      {/* Colors List */}
                      <div className="flex flex-wrap gap-2">
                        {selectedColors.map((color) => (
                          <span
                            key={color}
                            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            {color}
                            <button
                              type="button"
                              onClick={() => removeColor(color)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Step 3: Variants Matrix */}
                    {selectedColors.length > 0 &&
                      selectedStorages.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-medium text-gray-900 mb-4">
                            3. Ma trận Variants (Màu × Dung lượng):
                          </h4>

                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            {/* Header */}
                            <div className="bg-gray-50 px-4 py-2">
                              <div
                                className="grid gap-4"
                                style={{
                                  gridTemplateColumns:
                                    "200px " +
                                    selectedStorages.map(() => "1fr").join(" "),
                                }}
                              >
                                <div className="font-semibold text-gray-900">
                                  Màu sắc
                                </div>
                                {selectedStorages.map((storage) => (
                                  <div
                                    key={storage}
                                    className="font-semibold text-gray-900 text-center"
                                  >
                                    {storage}
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Variants Grid */}
                            <div className="divide-y divide-gray-200">
                              {selectedColors.map((color) => (
                                <div key={color} className="px-4 py-4">
                                  <div
                                    className="grid gap-4"
                                    style={{
                                      gridTemplateColumns:
                                        "200px " +
                                        selectedStorages
                                          .map(() => "1fr")
                                          .join(" "),
                                    }}
                                  >
                                    {/* Color Label */}
                                    <div className="flex items-center">
                                      <span className="font-medium text-gray-900">
                                        {color}
                                      </span>
                                    </div>

                                    {/* Storage Variants */}
                                    {selectedStorages.map((storage) => {
                                      const key = `${color}_${storage}`;
                                      const variant = variantsMatrix[key];

                                      return (
                                        <div
                                          key={storage}
                                          className="space-y-3 p-3 bg-gray-50 rounded-lg"
                                        >
                                          {/* Image Upload */}
                                          <div className="space-y-2">
                                            <div className="w-20 h-20 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mx-auto">
                                              {variant?.image ? (
                                                <img
                                                  src={variant.image}
                                                  alt={`${color} ${storage}`}
                                                  className="w-full h-full object-contain rounded"
                                                />
                                              ) : (
                                                <ImageIcon className="w-8 h-8 text-gray-400" />
                                              )}
                                            </div>
                                            <label
                                              htmlFor={`upload-${key}`}
                                              className={`cursor-pointer text-xs bg-blue-600 text-white px-2 py-1 rounded text-center block hover:bg-blue-700 transition-colors ${
                                                uploadingVariantImage === key
                                                  ? "opacity-50"
                                                  : ""
                                              }`}
                                            >
                                              {uploadingVariantImage === key
                                                ? "Đang tải..."
                                                : "Tải ảnh"}
                                            </label>
                                            <input
                                              id={`upload-${key}`}
                                              type="file"
                                              accept="image/*"
                                              onChange={(e) =>
                                                handleImageUpload(e, true, key)
                                              }
                                              className="hidden"
                                            />
                                          </div>

                                          {/* Price Input */}
                                          <input
                                            type="number"
                                            value={variant?.price || ""}
                                            onChange={(e) =>
                                              updateVariantInMatrix(
                                                key,
                                                "price",
                                                e.target.value
                                              )
                                            }
                                            placeholder="Giá (VND)"
                                            className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                                          />

                                          {/* Status Indicators */}
                                          <div className="flex justify-between items-center text-xs">
                                            <label className="flex items-center gap-1">
                                              <input
                                                type="checkbox"
                                                checked={
                                                  variant?.inStock !== false
                                                }
                                                onChange={(e) =>
                                                  updateVariantInMatrix(
                                                    key,
                                                    "inStock",
                                                    e.target.checked
                                                  )
                                                }
                                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                              />
                                              <span className="text-gray-600">
                                                Còn hàng
                                              </span>
                                            </label>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                    {/* Summary */}
                    {Object.keys(variantsMatrix).length > 0 && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-2">
                          Tổng kết:
                        </h5>
                        <div className="text-sm text-blue-800">
                          <p>
                            • {selectedColors.length} màu sắc ×{" "}
                            {selectedStorages.length} dung lượng ={" "}
                            {selectedColors.length * selectedStorages.length}{" "}
                            variants
                          </p>
                          <p>
                            •{" "}
                            {
                              Object.values(variantsMatrix).filter(
                                (v) => v.price && v.image
                              ).length
                            }{" "}
                            variants hoàn chỉnh (có giá + ảnh)
                          </p>
                          <p>
                            •{" "}
                            {
                              Object.values(variantsMatrix).filter(
                                (v) => !v.price || !v.image
                              ).length
                            }{" "}
                            variants chưa hoàn thành
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Instructions */}
                    {selectedColors.length === 0 &&
                      selectedStorages.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <h4 className="font-medium text-gray-900 mb-2">
                            Bắt đầu tạo variants
                          </h4>
                          <p className="text-sm">1. Chọn dung lượng có sẵn</p>
                          <p className="text-sm">2. Thêm các màu sắc</p>
                          <p className="text-sm">
                            3. Upload ảnh và nhập giá cho từng variant
                          </p>
                        </div>
                      )}
                  </div>

                  {/* Promotions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Percent className="w-5 h-5" />
                      Khuyến mãi & Ưu đãi
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Khuyến mãi chung
                        </label>
                        <input
                          type="text"
                          value={formData.promotionGeneral}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              promotionGeneral: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Ưu đãi giảm thêm đến 200.000đ (mặc định)"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Để trống sẽ tự động sử dụng: "Ưu đãi giảm thêm đến
                          200.000đ"
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Khuyến mãi sinh viên
                        </label>
                        <input
                          type="text"
                          value={formData.promotionStudent}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              promotionStudent: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Sinh viên/Học sinh giảm thêm đến 300.000đ (mặc định)"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Để trống sẽ tự động sử dụng: "Sinh viên/Học sinh giảm
                          thêm đến 300.000đ"
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thông tin trả góp
                        </label>
                        <textarea
                          value={formData.installment}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              installment: e.target.value,
                            })
                          }
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng (mặc định)"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Để trống sẽ tự động sử dụng: "Không phí chuyển đổi khi
                          trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mô tả sản phẩm
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mô tả chi tiết về sản phẩm... (sẽ auto-generate nếu để trống)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Để trống sẽ tự động tạo mô tả dựa trên tên sản phẩm và
                      thông tin bảo hành
                    </p>
                  </div>

                  {/* Metadata */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      Thông tin bổ sung
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Đánh giá
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          step="0.1"
                          value={formData.rating}
                          onChange={(e) =>
                            setFormData({ ...formData, rating: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số lượt đánh giá
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={formData.reviewCount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              reviewCount: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.inStock}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              inStock: e.target.checked,
                            })
                          }
                          className="mr-2"
                        />
                        Còn hàng
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              featured: e.target.checked,
                            })
                          }
                          className="mr-2"
                        />
                        Nổi bật
                      </label>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Save className="w-5 h-5" />
                    {editingProduct ? "Cập nhật" : "Tạo mới"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreviewModal && previewProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Chi tiết sản phẩm
                  </h2>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {previewProduct.productName}
                    </h3>
                    <p className="text-gray-600">
                      {previewProduct.brand} • {previewProduct.category}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Giá:</span>
                      <p className="font-bold text-blue-600 text-lg">
                        {Number(previewProduct.basePrice)?.toLocaleString()}đ
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Đánh giá:</span>
                      <p>
                        ⭐ {previewProduct.rating} ({previewProduct.reviewCount}{" "}
                        đánh giá)
                      </p>
                    </div>
                  </div>

                  {previewProduct.variants &&
                    previewProduct.variants.length > 0 && (
                      <div>
                        <span className="text-sm text-gray-500">Variants:</span>
                        <div className="space-y-2 mt-2">
                          {previewProduct.variants.map((variant, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={variant.image}
                                  alt={`${variant.color} ${variant.storage}`}
                                  className="w-10 h-10 object-contain rounded"
                                />
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {variant.storage} - {variant.color}
                                  </span>
                                </div>
                              </div>
                              <span className="font-semibold text-blue-600">
                                {Number(variant.price)?.toLocaleString()}đ
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {previewProduct.description && (
                    <div>
                      <span className="text-sm text-gray-500">Mô tả:</span>
                      <p className="mt-1">{previewProduct.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
