/** @format */
import { useQuery } from "@tanstack/react-query";
import { VietnamLocationData } from "../../types/useVietnamLocations.type";

export const useVietnamLocations = () => {
  return useQuery({
    queryKey: ["vietnam-locations"],
    queryFn: async (): Promise<VietnamLocationData> => {
      const response = await fetch(
        "https://provinces.open-api.vn/api/?depth=3"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch Vietnam locations");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour - data địa lý ít thay đổi
    gcTime: 1000 * 60 * 60 * 24, // 24 hours cache
    retry: 2,
  });
};
