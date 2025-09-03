"use client";

import { useState, useEffect, useMemo } from "react";
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
  Percent,
  DollarSign,
  Star,
  Eye,
  Smartphone,
  Monitor,
  Camera,
  Zap,
  Battery,
} from "lucide-react";

// Import iPhone specifications database
import { 
  getSpecsByModel, 
  getAvailableModels,
  formatSpecsForDisplay
} from '@/constants/iphone-specs';

interface ProductVariant {
  storage: string;
  color: string;
  price: string;
  image?: string;
  inStock: boolean;
  quantity: number;
}

interface Product {
  id: string;
  productName: string;
  brand: string;
  condition: string;
  slug: string;
  tag?: string; // ✅ Add tag field
  regionCode?: string; // NEW: Region code (LL/A, VN/A)
  series?: string; // NEW: iPhone series
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
  colors?: { color: string; images: string[] }[];
  regionPrices?: { regionCode: string; price: string }[];
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
    brand: "Apple",
    condition: "99%", // 99%, New, Refurbished
    slug: "",
    tag: "", // ✅ NEW: Auto-fill from productName
    regionCode: "", // NEW: Region code (LL/A, VN/A) for iPhone 14+
    series: "", // NEW: iPhone series
    iphoneModel: "", // NEW: iPhone model for auto-fill specs
    technicalSpecs: "", // NEW: Technical specifications

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
    regionPrices: [] as { regionCode: string; price: string }[],
  });

  // Helpers: VND formatting
  const formatVND = (numStr: string) => {
    if (!numStr) return "";
    const digits = numStr.replace(/\D/g, "");
    return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const parseDigits = (formatted: string) => formatted.replace(/\D/g, "");

  // ✅ ADD: Handle product name change and auto-fill tag
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData({
      ...formData,
      productName: newName,
      tag: newName, // ✅ Auto-fill tag = productName
    });
  };

  // ✅ LOADING STATE: Prevent double submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Storage presets  
  const STORAGE_OPTIONS = ["64GB", "128GB", "256GB", "512GB", "1TB"];

  // iPhone model options from specs database
  const IPHONE_MODELS = getAvailableModels();

  // Handle iPhone model selection and auto-fill specs
  const handleiPhoneModelChange = (selectedModel: string) => {
    // Generate slug from model and condition
    const generateSlug = (model: string, condition: string) => {
      if (!model) return "";
      
      // Remove special characters and normalize
      const modelSlug = model
        .toLowerCase()
        .replace(/\s+/g, "-");
      
      const conditionSlug = condition
        .toLowerCase()
        .replace(/[%()]/g, "")
        .replace(/\s+/g, "-");
      
      return `${modelSlug}-${conditionSlug}`;
    };
    
    // Generate product name from model and condition
    const generateProductName = (model: string, condition: string) => {
      if (!model) return "";
      return `${model} ${condition}`;
    };
    
    const newProductName = generateProductName(selectedModel, formData.condition);
    const newSlug = generateSlug(selectedModel, formData.condition);
    
    setFormData({
      ...formData,
      iphoneModel: selectedModel,
      technicalSpecs: selectedModel ? JSON.stringify(formatSpecsForDisplay(getSpecsByModel(selectedModel)!)) : "",
      productName: newProductName,
      tag: newProductName, // Auto-fill tag from productName
      slug: newSlug
    });
  };;
  // Handle condition change to update product name and slug
  const handleConditionChange = (newCondition: string) => {
    // Generate slug from model and condition
    const generateSlug = (model: string, condition: string) => {
      if (!model) return "";
      
      // Remove special characters and normalize
      const modelSlug = model
        .toLowerCase()
        .replace(/\s+/g, "-");
      
      const conditionSlug = condition
        .toLowerCase()
        .replace(/[%()]/g, "")
        .replace(/\s+/g, "-");
      
      return `${modelSlug}-${conditionSlug}`;
    };
    
    // Generate product name from model and condition
    const generateProductName = (model: string, condition: string) => {
      if (!model) return "";
      return `${model} ${condition}`;
    };
    
    // Only update if we have an iPhone model selected
    if (formData.iphoneModel) {
      const newProductName = generateProductName(formData.iphoneModel, newCondition);
      const newSlug = generateSlug(formData.iphoneModel, newCondition);
      
      setFormData({
        ...formData,
        condition: newCondition,
        productName: newProductName,
        tag: newProductName, // Auto-fill tag from productName
        slug: newSlug
      });
    } else {
      // Just update condition if no model is selected yet
      setFormData({
        ...formData,
        condition: newCondition
      });
    }
  };

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
      image?: string;
      inStock: boolean;
      quantity: number;
    };
  }>({});
  // ✅ STAGING AREA: Store images before upload
  const [colorGalleries, setColorGalleries] = useState<
    Record<string, string[]>
  >({});
  const [stagingImages, setStagingImages] = useState<
    Record<string, { file: File; preview: string }[]>
  >({});
  // ✅ STAGING THUMBNAIL: Store main image before upload
  const [stagingThumbnail, setStagingThumbnail] = useState<{
    file: File;
    preview: string;
  } | null>(null);
  const [invalidVariantKeys, setInvalidVariantKeys] = useState<Set<string>>(
    new Set()
  );
  const [defaultRowPrice, setDefaultRowPrice] = useState<
    Record<string, string>
  >({});
  
  // 🔍 NEW: Search and sort states  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "date" | "featured">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const router = useRouter();
  
  // 🔍 Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    
    // Search filter
    if (searchQuery) {
      filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.slug?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case "name":
          compareValue = a.productName.localeCompare(b.productName);
          break;
        case "price":
          compareValue = Number(a.basePrice) - Number(b.basePrice);
          break;
        case "featured":
          compareValue = (a.featured ? 1 : 0) - (b.featured ? 1 : 0);
          break;
        case "date":
        default:
          // Assuming products have an ID that increases with time
          compareValue = Number(a.id) - Number(b.id);
          break;
      }
      
      return sortOrder === "asc" ? compareValue : -compareValue;
    });
    
    return sorted;
  }, [products, searchQuery, sortBy, sortOrder]);

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

  // ✅ NEW: Handle thumbnail to staging area (no upload yet)
  const handleThumbnailStaging = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0]; // Only take the first file for thumbnail
    const preview = URL.createObjectURL(file);

    // Cleanup previous staging thumbnail
    if (stagingThumbnail?.preview) {
      URL.revokeObjectURL(stagingThumbnail.preview);
    }

    setStagingThumbnail({ file, preview });
  };

  // ✅ NEW: Handle images to staging area (no upload yet)
  const handleColorImagesStaging = (
    color: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentStaging = stagingImages[color] || [];
    const currentUploaded = colorGalleries[color] || [];
    const totalCurrent = currentStaging.length + currentUploaded.length;
    const remainingSlots = 5 - totalCurrent;
    
    if (remainingSlots <= 0) {
      alert("Đã đạt tối đa 5 ảnh cho màu này. Vui lòng xóa ảnh cũ trước khi thêm mới.");
      return;
    }

    const newStagingImages: { file: File; preview: string }[] = [];
    
    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      const file = files[i];
      const preview = URL.createObjectURL(file);
      newStagingImages.push({ file, preview });
    }

    if (newStagingImages.length > 0) {
      setStagingImages((prev) => ({
        ...prev,
        [color]: [...currentStaging, ...newStagingImages],
      }));
    }
  };

  // ✅ NEW: Remove uploaded image from color gallery
  const removeUploadedImageFromColor = (color: string, imageIndex: number) => {
    setColorGalleries((prev) => {
      const current = prev[color] || [];
      const updated = current.filter((_, index) => index !== imageIndex);
      return {
        ...prev,
        [color]: updated,
      };
    });
  };

  // ✅ NEW: Remove staging image from color
  const removeStagingImageFromColor = (color: string, imageIndex: number) => {
    setStagingImages((prev) => {
      const current = prev[color] || [];
      // Cleanup object URL to prevent memory leak
      if (current[imageIndex]?.preview) {
        URL.revokeObjectURL(current[imageIndex].preview);
      }
      const updated = current.filter((_, index) => index !== imageIndex);
      return {
        ...prev,
        [color]: updated,
      };
    });
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

  const applyPriceForColor = (color: string) => {
    const price = defaultRowPrice[color] || "";
    if (!price) return;
    setVariantsMatrix((prev) => {
      const next = { ...prev };
      selectedStorages.forEach((storage) => {
        const key = `${color}_${storage}`;
        if (next[key]) next[key] = { ...next[key], price };
      });
      return next;
    });
  };

  const handleEdit = (product: Product) => {
    try {
      setFormData({
        productName: product.productName,
        brand: product.brand,
        condition: product.condition,
        slug: product.slug || "",
        tag: product.tag || product.productName,
        regionCode: (product as any).regionCode || "",
        series: (product as any).series || "",
        iphoneModel: (product as any).iphoneModel || "",
        technicalSpecs: (product as any).technicalSpecs || "",
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
        regionPrices: (product as any).regionPrices || [],
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

      // ✅ Load existing color galleries from product.colors
      if (product.colors && product.colors.length > 0) {
        const galleries: Record<string, string[]> = {};
        product.colors.forEach((colorData) => {
          galleries[colorData.color] = colorData.images || [];
        });
        setColorGalleries(galleries);
      } else {
        // Reset galleries for new products
        setColorGalleries({});
      }

      setEditingProduct(product);
      setShowModal(true);
    } catch (error) {
      console.error("Error editing product:", error);
      alert("Lỗi khi load dữ liệu sản phẩm");
    }
  };

  // ✅ NEW: Upload staging thumbnail to server
  const uploadStagingThumbnail = async (): Promise<string | null> => {
    if (!stagingThumbnail) return null;
    
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", stagingThumbnail.file);
      
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      
      if (response.ok) {
        const result = await response.json();
        return result?.url || null;
      }
    } catch (error) {
      console.error("Failed to upload staging thumbnail:", error);
    }
    
    return null;
  };

  // ✅ NEW: Upload staging images to server
  const uploadStagingImages = async (): Promise<Record<string, string[]>> => {
    const uploadedGalleries: Record<string, string[]> = {};
    
    for (const [color, stagingFiles] of Object.entries(stagingImages)) {
      const uploadedUrls: string[] = [];
      
      for (const { file } of stagingFiles) {
        try {
          const formDataUpload = new FormData();
          formDataUpload.append("file", file);
          
          const response = await fetch("/api/upload", {
            method: "POST",
            body: formDataUpload,
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result?.url) {
              uploadedUrls.push(result.url);
            }
          }
        } catch (error) {
          console.error(`Failed to upload staging image for color ${color}:`, error);
        }
      }
      
      if (uploadedUrls.length > 0) {
        uploadedGalleries[color] = uploadedUrls;
      }
    }
    
    return uploadedGalleries;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ PREVENT DOUBLE SUBMISSION
    if (isSubmitting) return;
    
    // 🔍 VALIDATION: Check required fields
    if (!formData.productName?.trim()) {
      alert("Vui lòng nhập tên sản phẩm");
      return;
    }
    
    if (!formData.category) {
      alert("Vui lòng chọn danh mục sản phẩm");
      return;
    }
    
    if (!formData.basePrice || parseDigits(formData.basePrice) === "0") {
      alert("Vui lòng nhập giá sản phẩm");
      return;
    }
    
    setIsSubmitting(true);

      try {
        // ✅ UPLOAD STAGING THUMBNAIL AND IMAGES FIRST
        const newThumbnailUrl = await uploadStagingThumbnail();
        const newUploadedGalleries = await uploadStagingImages();

        // Nới lỏng để luôn tạo được nếu bạn muốn test nhanh
        // Điền fallback cho các trường bắt buộc nếu trống
        const fallbackName = formData.productName || "Sản phẩm mới";
        const fallbackCategory = formData.category || "iPhone";
        // 🔴 FIX: Không hardcode iPhone 14 Pro, dùng thumbnail hiện tại hoặc để trống
        const fallbackThumb = newThumbnailUrl || formData.thumbnail || "";
        const fallbackBasePrice = parseDigits(formData.basePrice || "") || "0";
        const fallbackBrand = formData.brand || "Apple";
        const storages = selectedStorages.length > 0 ? selectedStorages : ["128GB"];
        const colors = selectedColors.length > 0 ? selectedColors : ["Default"];
        setInvalidVariantKeys(new Set());

        // Tạo variants từ ma trận; nếu thiếu giá thì dùng basePrice làm mặc định
        const variants: ProductVariant[] = [];
        colors.forEach((color) => {
          storages.forEach((storage) => {
            const key = `${color}_${storage}`;
            const cell = variantsMatrix[key];
            const priceStr = cell?.price ? String(cell.price) : fallbackBasePrice;
            variants.push({
              color,
              storage,
              price: priceStr,
              inStock: cell?.inStock !== false,
              quantity: cell?.quantity || 0,
            });
          });
        });

        // Set default values for optional fields if empty
        const productData = {
          ...(editingProduct && { id: editingProduct.id }),
          ...formData,
          productName: fallbackName,
          brand: fallbackBrand,
          category: fallbackCategory,
          thumbnail: fallbackThumb,
          basePrice: fallbackBasePrice, // Keep as string for BigInt handling
          rating: parseFloat(formData.rating),
          reviewCount: parseInt(formData.reviewCount),
          // Only include regionCode for iPhone 14+
          regionCode: (formData.category === "iPhone" && 
                      formData.series && 
                      parseInt(formData.series.replace("iPhone ", "")) >= 14) 
                      ? formData.regionCode : null,

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
          colors: Object.entries({
            ...colorGalleries,
            ...newUploadedGalleries,
          }).map(([color, images]) => ({
            color,
            images: (Array.isArray(images) ? images : []).slice(0, 5),
          })),
        };

        const method = editingProduct ? "PUT" : "POST";
        const url = "/api/products";

        const response = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });

        if (response.ok) {
          // 🟢 SUCCESS: Product saved successfully
          const result = await response.json();
          console.log("Product saved successfully:", result);
          
          alert(
            editingProduct
              ? "Sản phẩm đã được cập nhật thành công!"
              : "Sản phẩm đã được tạo thành công!"
          );
          
          // ✅ CLEANUP: Clear staging images and thumbnail after successful submit
          setStagingImages({});
          if (stagingThumbnail?.preview) {
            URL.revokeObjectURL(stagingThumbnail.preview);
          }
          setStagingThumbnail(null);
          // Clean up object URLs to prevent memory leaks
          Object.values(stagingImages).forEach((files) => {
            files.forEach(({ preview }) => URL.revokeObjectURL(preview));
          });
          
          setShowModal(false);
          resetForm();
          loadProducts();
        } else {
          // 🔴 ERROR: Log detailed error info
          const error = await response.json();
          console.error("Error saving product:", {
            status: response.status,
            error: error,
            productData: productData
          });
          
          // Show more detailed error message
          const errorMessage = error.details || error.error || "Không thể lưu sản phẩm";
          alert(`Lỗi khi ${editingProduct ? 'cập nhật' : 'tạo'} sản phẩm:\n${errorMessage}\n\nVui lòng kiểm tra console để xem chi tiết.`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Lỗi khi gửi form");
      } finally {
        // ✅ ALWAYS RESET LOADING STATE
        setIsSubmitting(false);
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
      brand: "Apple",
      condition: "99%",
      slug: "",
      tag: "",
      regionCode: "",
      series: "",
      iphoneModel: "",
      technicalSpecs: "",
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
      regionPrices: [],
    });

    // Reset matrix data
    setSelectedColors([]);
    setSelectedStorages([]);
    setVariantsMatrix({});
    setColorGalleries({});
    setNewColor("");

    // ✅ CLEANUP: Clear staging images, thumbnail and object URLs
    Object.values(stagingImages).forEach((files) => {
      files.forEach(({ preview }) => URL.revokeObjectURL(preview));
    });
    setStagingImages({});
    if (stagingThumbnail?.preview) {
      URL.revokeObjectURL(stagingThumbnail.preview);
    }
    setStagingThumbnail(null);

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

        {/* 🔍 Search and Sort Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm theo tên, danh mục, thương hiệu..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Ngày tạo</option>
                <option value="name">Tên sản phẩm</option>
                <option value="price">Giá</option>
                <option value="featured">Nổi bật</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title={sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
          
          {/* Results count */}
          {searchQuery && (
            <div className="mt-3 text-sm text-gray-600">
              Tìm thấy {filteredAndSortedProducts.length} sản phẩm
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.length === 0 ? (
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
            filteredAndSortedProducts.map((product) => (
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
                    {(product as any).regionCode && ` (${(product as any).regionCode})`}
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
                          onChange={handleProductNameChange} // ✅ Use new handler
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="iPhone 15 Pro Max"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Thương hiệu *
                        </label>
                        <input
                          type="text"
                          readOnly
                          value="Apple"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tag tìm kiếm *
                          <span className="text-xs text-gray-500 ml-2">
                            (Tự động từ tên sản phẩm)
                          </span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.tag}
                          onChange={(e) =>
                            setFormData({ ...formData, tag: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="iPhone 15 Pro Max"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Danh mục *
                        </label>
                        <select
                          required
                          value={formData.category}
                          onChange={(e) => {
                            const category = e.target.value;
                            setFormData({
                              ...formData,
                              category,
                              series: "", // Reset series when category changes
                              regionCode: "", // Reset region code
                            });
                          }}
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
                      
                      {/* iPhone Series - Only show for iPhone category */}
                      {formData.category === "iPhone" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dòng iPhone
                          </label>
                          <select
                            value={formData.series}
                            onChange={(e) => {
                              const series = e.target.value;
                              setFormData({
                                ...formData,
                                series,
                                // Only enable region code for iPhone 14+
                                regionCode: series && parseInt(series.replace("iPhone ", "")) < 14 ? "" : formData.regionCode,
                              });
                            }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Chọn dòng iPhone</option>
                            <option value="iPhone 11">iPhone 11</option>
                            <option value="iPhone 12">iPhone 12</option>
                            <option value="iPhone 13">iPhone 13</option>
                            <option value="iPhone 14">iPhone 14</option>
                            <option value="iPhone 15">iPhone 15</option>
                            <option value="iPhone 16">iPhone 16</option>
                          </select>
                        </div>
                      )}

                      {/* iPhone Model - Only show for iPhone category */}
                      {formData.category === "iPhone" && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Smartphone className="w-4 h-4 inline mr-1" />
                            Model iPhone *
                            <span className="text-xs text-gray-500 ml-2">
                              (Tự động điền thông số kỹ thuật)
                            </span>
                          </label>
                          <select
                            required
                            value={formData.iphoneModel}
                            onChange={(e) => handleiPhoneModelChange(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Chọn model iPhone</option>
                            {IPHONE_MODELS.map((model) => (
                              <option key={model} value={model}>
                                {model}
                              </option>
                            ))}
                          </select>
                          {formData.iphoneModel && (
                            <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                              <Zap className="w-4 h-4" />
                              Thông số kỹ thuật đã được tự động điền
                            </div>
                          )}
                        </div>
                      )}

                      {/* Region Code - Only for iPhone 14+ */}
                      {formData.category === "iPhone" && 
                       formData.series && 
                       parseInt(formData.series.replace("iPhone ", "")) >= 14 && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mã vùng
                            <span className="text-xs text-gray-500 ml-2">
                              (iPhone 14+ có giá khác nhau theo mã vùng)
                            </span>
                          </label>
                          <select
                            value={formData.regionCode}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                regionCode: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Chọn mã vùng</option>
                            <option value="VN/A">VN/A (Việt Nam)</option>
                            <option value="LL/A">LL/A (Mỹ)</option>
                            <option value="ZP/A">ZP/A (Hong Kong)</option>
                            <option value="CH/A">CH/A (Trung Quốc)</option>
                            <option value="J/A">J/A (Nhật Bản)</option>
                          </select>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tình trạng
                        </label>
                        <select
                          value={formData.condition}
                          onChange={(e) => handleConditionChange(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="99%">99% (Like New)</option>
                          <option value="New">Mới 100%</option>
                          <option value="Refurbished">Refurbished (Tân trang)</option>
                        </select>
                      </div>
                      
                      {/* Slug (Auto-generated) */}
                      {formData.slug && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slug URL
                            <span className="text-xs text-gray-500 ml-2">
                              (Tự động tạo từ Model + Tình trạng)
                            </span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={formData.slug}
                              readOnly
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 pr-10"
                              placeholder="iphone-15-pro-99-like-new"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            URL sản phẩm: /shop/product/{formData.slug}
                          </p>
                        </div>
                      )}
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
                          type="text"
                          inputMode="numeric"
                          required
                          value={formatVND(formData.basePrice)}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              basePrice: parseDigits(e.target.value),
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="30.000.000"
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
                    
                    {/* Region-based Pricing - Only for iPhone 14+ with region code */}
                    {formData.category === "iPhone" && 
                     formData.series && 
                     parseInt(formData.series.replace("iPhone ", "")) >= 14 && 
                     formData.regionCode && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Giá theo mã vùng (tùy chọn)
                        </h4>
                        <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600 mb-2">
                            Bạn có thể thiết lập giá khác nhau cho từng mã vùng. Nếu không thiết lập, sẽ sử dụng giá cơ bản.
                          </p>
                          {["VN/A", "LL/A", "ZP/A", "CH/A", "J/A"].map((code) => (
                            <div key={code} className="flex items-center gap-2">
                              <span className="w-16 text-sm font-medium">{code}:</span>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={formatVND(formData.regionPrices?.find(rp => rp.regionCode === code)?.price || "")}
                                onChange={(e) => {
                                  const price = parseDigits(e.target.value);
                                  const updatedPrices = [...(formData.regionPrices || [])];
                                  const existingIndex = updatedPrices.findIndex(rp => rp.regionCode === code);
                                  
                                  if (price) {
                                    if (existingIndex >= 0) {
                                      updatedPrices[existingIndex].price = price;
                                    } else {
                                      updatedPrices.push({ regionCode: code, price });
                                    }
                                  } else if (existingIndex >= 0) {
                                    updatedPrices.splice(existingIndex, 1);
                                  }
                                  
                                  setFormData({
                                    ...formData,
                                    regionPrices: updatedPrices,
                                  });
                                }}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder={code === "VN/A" ? "Giá cao hơn" : code === "LL/A" ? "Giá rẻ hơn" : "Giá tùy chọn"}
                              />
                              <span className="text-sm text-gray-500">
                                {code === "VN/A" ? "(Việt Nam)" :
                                 code === "LL/A" ? "(Mỹ)" :
                                 code === "ZP/A" ? "(Hong Kong)" :
                                 code === "CH/A" ? "(Trung Quốc)" : "(Nhật Bản)"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Thumbnail */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Hình ảnh chính *
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                        {stagingThumbnail?.preview || formData.thumbnail ? (
                          <div className="relative w-full h-full">
                            <img
                              src={stagingThumbnail?.preview || formData.thumbnail}
                              alt="Thumbnail"
                              className="w-full h-full object-contain rounded-lg"
                            />
                            {stagingThumbnail?.preview && (
                              <div className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs px-1 rounded">
                                Preview
                              </div>
                            )}
                            {formData.thumbnail && !stagingThumbnail?.preview && (
                              <div className="absolute bottom-0 left-0 bg-green-500 text-white text-xs px-1 rounded">
                                Uploaded
                              </div>
                            )}
                          </div>
                        ) : (
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="thumbnail-upload"
                          className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          {stagingThumbnail ? "Thay ảnh khác" : "Tải ảnh lên"}
                        </label>
                        <input
                          id="thumbnail-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleThumbnailStaging}
                          className="hidden"
                        />
                        {stagingThumbnail && (
                          <button
                            type="button"
                            onClick={() => {
                              URL.revokeObjectURL(stagingThumbnail.preview);
                              setStagingThumbnail(null);
                            }}
                            className="ml-2 inline-flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            <X className="w-4 h-4" />
                            Xóa
                          </button>
                        )}
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
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addColor();
                            }
                          }}
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

                      {selectedColors.length > 0 && (
                        <div className="mt-4 space-y-4">
                          {selectedColors.map((color) => (
                            <div
                              key={`gal-${color}`}
                              className="border rounded-lg p-3"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">
                                  Bộ ảnh cho màu: {color}
                                </span>
                                <label
                                  htmlFor={`upload-color-${color}`}
                                  className={`cursor-pointer text-xs px-3 py-1 rounded transition-colors ${
                                    ((colorGalleries[color] || []).length + (stagingImages[color] || []).length) >= 5
                                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                                      : "bg-blue-600 text-white hover:bg-blue-700"
                                  }`}
                                >
                                  {((colorGalleries[color] || []).length + (stagingImages[color] || []).length) >= 5
                                    ? `Đã đủ 5 ảnh (${(colorGalleries[color] || []).length + (stagingImages[color] || []).length}/5)`
                                    : `Thêm ảnh (${(colorGalleries[color] || []).length + (stagingImages[color] || []).length}/5)`}
                                </label>
                                <input
                                  id={`upload-color-${color}`}
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={(e) =>
                                    handleColorImagesStaging(color, e)
                                  }
                                  className="hidden"
                                />
                              </div>
                              <div className="grid grid-cols-5 gap-2">
                                {/* Display uploaded images first */}
                                {(colorGalleries[color] || [])
                                  .map((url, i) => (
                                    <div key={`uploaded-${i}`} className="relative group">
                                      <img
                                        src={url}
                                        alt="uploaded img"
                                        className="w-16 h-16 object-cover rounded border-2 border-green-500"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeUploadedImageFromColor(color, i)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 shadow-lg"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                      <div className="absolute bottom-0 left-0 bg-green-500 text-white text-xs px-1 rounded">
                                        Uploaded
                                      </div>
                                    </div>
                                  ))}
                                
                                {/* Display staging images */}
                                {(stagingImages[color] || [])
                                  .slice(0, 5 - (colorGalleries[color] || []).length)
                                  .map((item, i) => (
                                    <div key={`staging-${i}`} className="relative group">
                                      <img
                                        src={item.preview}
                                        alt="preview img"
                                        className="w-16 h-16 object-cover rounded border-2 border-blue-500"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => removeStagingImageFromColor(color, i)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 shadow-lg"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                      <div className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs px-1 rounded">
                                        Preview
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
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
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="font-medium text-gray-900">
                                      {color}
                                    </span>
                                    <input
                                      type="text"
                                      inputMode="numeric"
                                      placeholder="Giá mặc định cho màu"
                                      className="px-2 py-1 text-xs border rounded"
                                      value={formatVND(
                                        defaultRowPrice[color] || ""
                                      )}
                                      onChange={(e) =>
                                        setDefaultRowPrice({
                                          ...defaultRowPrice,
                                          [color]: parseDigits(e.target.value),
                                        })
                                      }
                                    />
                                    <button
                                      type="button"
                                      className="text-xs px-2 py-1 bg-blue-600 text-white rounded"
                                      onClick={() => applyPriceForColor(color)}
                                    >
                                      Áp cho hàng màu
                                    </button>
                                  </div>
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
                                    {/* Color Label (left spacer) */}
                                    <div />

                                    {/* Storage Variants */}
                                    {selectedStorages.map((storage) => {
                                      const key = `${color}_${storage}`;
                                      const variant = variantsMatrix[key];

                                      return (
                                        <div
                                          key={storage}
                                          className="space-y-3 p-3 bg-gray-50 rounded-lg"
                                        >
                                          {/* Ảnh dùng theo bộ ảnh của màu - không hiển thị gì tại đây */}

                                          {/* Price Input */}
                                          <input
                                            type="text"
                                            inputMode="numeric"
                                            value={formatVND(
                                              variant?.price || ""
                                            )}
                                            onChange={(e) =>
                                              updateVariantInMatrix(
                                                key,
                                                "price",
                                                parseDigits(e.target.value)
                                              )
                                            }
                                            placeholder="Giá (VND)"
                                            className={`w-full px-2 py-1 text-xs border rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent ${
                                              invalidVariantKeys.has(key)
                                                ? "border-red-500"
                                                : "border-gray-300"
                                            }`}
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
                                (v) => v.price
                              ).length
                            }{" "}
                            variants hoàn chỉnh (có giá)
                          </p>
                          <p>
                            •{" "}
                            {
                              Object.values(variantsMatrix).filter(
                                (v) => !v.price
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

                  {/* Technical Specifications - Only show for iPhone with selected model */}
                  {formData.category === "iPhone" && formData.iphoneModel && (
                    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                          <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                            📱 Thông Số Kỹ Thuật
                          </h3>
                          <p className="text-sm text-gray-600">
                            {formData.iphoneModel} - Tự động điền từ cơ sở dữ liệu
                          </p>
                        </div>
                      </div>

                      {(() => {
                        const specs = getSpecsByModel(formData.iphoneModel);
                        if (!specs) return null;

                        return (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Display Section */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Monitor className="w-5 h-5 text-blue-600" />
                                <h4 className="font-semibold text-blue-800">Màn Hình</h4>
                              </div>
                              <div className="space-y-2 pl-7">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Kích thước:</span>
                                  <span className="text-sm font-medium">{specs.display.size}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Độ phân giải:</span>
                                  <span className="text-sm font-medium">{specs.display.resolution}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Tần số quét:</span>
                                  <span className="text-sm font-medium">{specs.display.refreshRate}</span>
                                </div>
                              </div>
                            </div>

                            {/* Camera Section */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Camera className="w-5 h-5 text-green-600" />
                                <h4 className="font-semibold text-green-800">Camera</h4>
                              </div>
                              <div className="space-y-2 pl-7">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Chính:</span>
                                  <span className="text-sm font-medium">{specs.camera.main}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Góc rộng:</span>
                                  <span className="text-sm font-medium">{specs.camera.ultrawide}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Zoom:</span>
                                  <span className="text-sm font-medium">{specs.camera.zoom}</span>
                                </div>
                              </div>
                            </div>

                            {/* Performance Section */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-5 h-5 text-purple-600" />
                                <h4 className="font-semibold text-purple-800">Hiệu Năng</h4>
                              </div>
                              <div className="space-y-2 pl-7">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Chip:</span>
                                  <span className="text-sm font-medium">{specs.performance.chip}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">RAM:</span>
                                  <span className="text-sm font-medium">{specs.performance.ram}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">AnTuTu:</span>
                                  <span className="text-sm font-medium">{specs.performance.benchmark.antutu}</span>
                                </div>
                              </div>
                            </div>

                            {/* Battery & Connectivity Section */}
                            <div className="space-y-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Battery className="w-5 h-5 text-orange-600" />
                                <h4 className="font-semibold text-orange-800">Pin & Kết Nối</h4>
                              </div>
                              <div className="space-y-2 pl-7">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Dung lượng pin:</span>
                                  <span className="text-sm font-medium">{specs.battery.capacity}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Thời gian sử dụng:</span>
                                  <span className="text-sm font-medium">{specs.battery.life}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600">Cổng kết nối:</span>
                                  <span className="text-sm font-medium">{specs.connectivity.port}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      <div className="mt-6 pt-4 border-t border-blue-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            Dữ liệu được cập nhật tự động từ KyThuat database
                          </div>
                          <div className="text-xs text-gray-500">
                            Model: {formData.iphoneModel}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${
                      isSubmitting
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        {editingProduct ? "Cập nhật" : "Tạo mới"}
                      </>
                    )}
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
