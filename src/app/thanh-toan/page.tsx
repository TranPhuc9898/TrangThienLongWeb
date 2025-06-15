/** @format */

"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useVietnamLocations } from "@/lib/hooks/useVietnamLocations";
import { useEffect, useState } from "react";
import type { District, Ward } from "@/types/useVietnamLocations.type";
import sendOrderToSlack from "../api/sendOrder";

const schema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ và tên"),
  phone: z.string().min(1, "Vui lòng nhập số điện thoại"),
  email: z
    .union([
      z.string().trim().toLowerCase().email("Email không hợp lệ"),
      z.literal(""),
    ])
    .optional(),
  province: z.string().min(1, "Chọn tỉnh/thành phố"),
  district: z.string().min(1, "Chọn quận/huyện"),
  ward: z.string().min(1, "Chọn xã/phường/thị trấn"),
  address: z.string().min(1, "Nhập địa chỉ cụ thể"),
  note: z.string().optional(),
  shipToAnother: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export default function ThanhToanPage() {
  const { data: locations, isLoading } = useVietnamLocations();
  console.log("🚀 ~ ThanhToanPage ~ data:", locations);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
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
      shipToAnother: false,
    },
  });

  const selectedProvince = watch("province");
  const selectedDistrict = watch("district");

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
    try {
      const response = await fetch("/api/sendOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("🚀 ~ onSubmit ~ response:", response);

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Gửi đơn hàng thất bại");
      }

      alert("🎉 Đặt hàng thành công! Đã gửi về Slack.");
    } catch (error: any) {
      console.error("💥 Lỗi gửi đơn:", error.message || error);
      alert("🚨 Có lỗi xảy ra khi gửi đơn hàng:\n" + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-xl font-bold text-red-700 mb-6 uppercase">
        THÔNG TIN THANH TOÁN
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
            <span className="text-red-500 text-xs">{errors.email.message}</span>
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
            <span className="text-red-500 text-xs">{errors.phone.message}</span>
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
            <span className="text-red-500 text-xs">{errors.ward.message}</span>
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
        <div className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            {...register("shipToAnother")}
            className="w-4 h-4 border rounded"
          />
          <label className="font-semibold">Giao hàng tới địa chỉ khác?</label>
        </div>
        <div className="flex flex-col gap-4 col-span-2">
          <label className="font-semibold">Ghi chú đơn hàng (tuỳ chọn)</label>
          <textarea
            {...register("note")}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-red-700 text-white font-bold py-2 px-8 rounded hover:bg-red-800 transition"
            disabled={isLoading}
          >
            {isLoading ? "ĐANG TẢI..." : "ĐẶT HÀNG"}
          </button>
        </div>
      </form>
    </div>
  );
}
