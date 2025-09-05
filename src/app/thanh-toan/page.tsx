/** @format */

"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useVietnamLocations } from "@/lib/hooks/useVietnamLocations";
import { useEffect, useState } from "react";
import type { District, Ward } from "@/types/useVietnamLocations.type";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useAppSelector } from "@/lib/hooks/redux";
import { RootState } from "@/lib/store";

const schema = z.object({
  fullName: z.string().min(2, "Họ và tên phải có ít nhất 2 ký tự"),
  phone: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 số")
    .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
  email: z.string().optional().or(z.literal("")),
  province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(1, "Vui lòng chọn xã/phường/thị trấn"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  note: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ThanhToanPage() {
  const { data: locations, isLoading } = useVietnamLocations();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  
  // Lấy dữ liệu giỏ hàng từ Redux
  const { cart, totalPrice, adjustedTotalPrice } = useAppSelector(
    (state: RootState) => state.carts
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      province: "",
      district: "",
      ward: "",
      address: "",
      note: "",
    },
  });

  const selectedProvince = watch("province");
  const selectedDistrict = watch("district");
  const formValues = watch(); // Watch all form values to check if form is complete

  // Check if all required fields are filled
  const isFormValid = !!(
    formValues.fullName &&
    formValues.phone &&
    formValues.province &&
    formValues.district &&
    formValues.ward &&
    formValues.address
  );

  // Reset districts và wards khi chọn province mới
  useEffect(() => {
    if (locations && selectedProvince) {
      // Convert selectedProvince (string) to number để so sánh với code
      const provinceCode = parseInt(selectedProvince);
      const found = locations.find((p: any) => p.code === provinceCode);
      setDistricts(found ? found.districts : []);
      setWards([]);
      // Reset district và ward khi chọn province mới
      setValue("district", "");
      setValue("ward", "");
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [locations, selectedProvince, setValue]);

  // Reset wards khi chọn district mới
  useEffect(() => {
    if (districts && selectedDistrict) {
      // Convert selectedDistrict (string) to number để so sánh với code
      const districtCode = parseInt(selectedDistrict);
      const found = districts.find((d: any) => d.code === districtCode);
      setWards(found ? found.wards : []);
      // Reset ward khi chọn district mới
      setValue("ward", "");
    } else {
      setWards([]);
    }
  }, [districts, selectedDistrict, setValue]);
  const onSubmit = async (data: FormData) => {
    console.log("🔄 Starting submission...");
    setIsSubmitting(true);
    setSuccessMessage(""); // Clear any previous success message
    console.log("✅ isSubmitting set to true");

    try {
      console.log("📝 Form data:", data);

      const orderData = {
        ...data,
        cart: cart, // Include cart information
        totalPrice: totalPrice,
        adjustedTotalPrice: adjustedTotalPrice
      };

      console.log("📦 Order data:", orderData);

      const response = await fetch("/api/sendOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log("🚀 API Response:", result);

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Gửi đơn hàng thất bại");
      }

      // Show success message and confetti animation
      setSuccessMessage("🎉 Đặt hàng thành công! Đã gửi thông tin về Slack.");
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setSuccessMessage(""); // Clear success message after animation
      }, 5000);

      // Reset form after successful submission
      reset();

      // Also reset the location dropdowns
      setDistricts([]);
      setWards([]);
    } catch (error: any) {
      console.error("💥 Lỗi gửi đơn:", error.message || error);
      alert("🚨 Có lỗi xảy ra khi gửi đơn hàng:\n" + error.message);
    } finally {
      console.log("🔄 Setting isSubmitting to false");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
        >
          {successMessage}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* THÔNG TIN THANH TOÁN */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-red-700 mb-6 uppercase">
            THÔNG TIN THANH TOÁN
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-4">
              <label className="font-semibold">Họ và tên *</label>
              <input
                {...register("fullName")}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Nhập họ và tên"
              />
              {errors.fullName && (
                <span className="text-red-500 text-xs">
                  {errors.fullName.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold">Địa chỉ email (tuỳ chọn)</label>
              <input
                {...register("email")}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Nhập địa chỉ email"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold">Số điện thoại *</label>
              <input
                {...register("phone")}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Nhập số điện thoại"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold">Tỉnh/Thành phố *</label>
              <select
                {...register("province")}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Chọn Tỉnh/Thành phố</option>
                {locations &&
                  locations.map((p) => (
                    <option key={p.code} value={p.code.toString()}>
                      {p.name}
                    </option>
                  ))}
              </select>
              {errors.province && (
                <span className="text-red-500 text-xs">
                  {errors.province.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold">Quận/Huyện *</label>
              <select
                {...register("district")}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={!selectedProvince || districts.length === 0}
              >
                <option value="">
                  {!selectedProvince
                    ? "Chọn Tỉnh/Thành phố trước"
                    : districts.length === 0
                    ? "Đang tải..."
                    : "Chọn Quận/Huyện"}
                </option>
                {districts &&
                  districts.map((d) => (
                    <option key={d.code} value={d.code.toString()}>
                      {d.name}
                    </option>
                  ))}
              </select>
              {errors.district && (
                <span className="text-red-500 text-xs">
                  {errors.district.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold">Xã/Phường/Thị trấn *</label>
              <select
                {...register("ward")}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={!selectedDistrict || wards.length === 0}
              >
                <option value="">
                  {!selectedDistrict
                    ? "Chọn Quận/Huyện trước"
                    : wards.length === 0
                    ? "Đang tải..."
                    : "Chọn Xã/Phường/Thị trấn"}
                </option>
                {wards &&
                  wards.map((w) => (
                    <option key={w.code} value={w.code.toString()}>
                      {w.name}
                    </option>
                  ))}
              </select>
              {errors.ward && (
                <span className="text-red-500 text-xs">
                  {errors.ward.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold">Địa chỉ *</label>
              <input
                {...register("address")}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Nhập địa chỉ cụ thể. Số nhà, tên đường..."
              />
              {errors.address && (
                <span className="text-red-500 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold">
                Ghi chú đơn hàng (tuỳ chọn)
              </label>
              <textarea
                {...register("note")}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                rows={3}
              />
            </div>

            <div className="flex justify-end mt-6">
              <motion.button
                type="submit"
                className="bg-red-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-800 transition disabled:opacity-50 relative overflow-hidden"
                disabled={
                  isSubmitting || isLoading || !isFormValid || !cart || cart.items.length === 0
                }
                whileHover={{ scale: !isSubmitting && isFormValid ? 1.05 : 1 }}
                whileTap={{ scale: !isSubmitting && isFormValid ? 0.95 : 1 }}
                animate={
                  isSubmitting
                    ? {
                        background: ["#b91c1c", "#dc2626", "#b91c1c"],
                        transition: { repeat: Infinity, duration: 1 },
                      }
                    : {}
                }
              >
                {isSubmitting && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  />
                )}
                <span className="relative z-10">
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      />
                      ĐANG GỬI...
                    </div>
                  ) : isLoading ? (
                    "ĐANG TẢI..."
                  ) : !cart || cart.items.length === 0 ? (
                    "CHƯA CÓ SẢN PHẨM"
                  ) : !isFormValid ? (
                    "VUI LÒNG ĐIỀN ĐỦ THÔNG TIN"
                  ) : (
                    "ĐẶT HÀNG"
                  )}
                </span>
              </motion.button>
            </div>
          </form>
        </div>

        {/* THÔNG TIN SẢN PHẨM */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-red-700 mb-6 uppercase">
            THÔNG TIN SẢN PHẨM
          </h2>

          {cart && cart.items.length > 0 ? (
            <div className="space-y-6">
              {/* Danh sách sản phẩm trong giỏ hàng */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {cart.items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.srcUrl}
                        alt={item.name}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900">
                        {item.name}
                      </h4>
                      <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                        {item.regionCode && (
                          <p>Mã vùng: <span className="font-medium">{item.regionCode}</span></p>
                        )}
                        {item.condition && (
                          <p>Tình trạng: <span className="font-medium">{item.condition}</span></p>
                        )}
                        {(item.storage || item.attributes?.[0]) && (
                          <p>Dung lượng: <span className="font-medium">{item.storage || item.attributes[0]}</span></p>
                        )}
                        {(item.color || item.attributes?.[1]) && (
                          <p>Màu sắc: <span className="font-medium">{item.color || item.attributes[1]}</span></p>
                        )}
                        <p>Số lượng: <span className="font-medium">{item.quantity}</span></p>
                      </div>
                    </div>
                    <div className="text-right">
                      {item.discount.percentage > 0 || item.discount.amount > 0 ? (
                        <>
                          <p className="text-sm font-bold text-blue-600">
                            {item.discount.percentage > 0 
                              ? Math.round(item.price - (item.price * item.discount.percentage) / 100).toLocaleString("vi-VN")
                              : (item.price - item.discount.amount).toLocaleString("vi-VN")}đ
                          </p>
                          <p className="text-xs text-gray-400 line-through">
                            {item.price.toLocaleString("vi-VN")}đ
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-bold text-blue-600">
                          {item.price.toLocaleString("vi-VN")}đ
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Tóm tắt đơn hàng
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{totalPrice.toLocaleString("vi-VN")}đ</span>
                  </div>
                  {totalPrice !== adjustedTotalPrice && (
                    <div className="flex justify-between text-green-600">
                      <span>Giảm giá:</span>
                      <span>-{(totalPrice - adjustedTotalPrice).toLocaleString("vi-VN")}đ</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span className="text-green-600">Miễn phí</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-red-600">
                      {Math.round(adjustedTotalPrice).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    (Đã bao gồm VAT)
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Chưa có sản phẩm được chọn</p>
              <p className="text-sm text-gray-400 mt-2">
                Hãy chọn sản phẩm từ trang shop để tiếp tục
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={typeof window !== "undefined" ? window.innerWidth : 1200}
          height={typeof window !== "undefined" ? window.innerHeight : 800}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
    </div>
  );
}
