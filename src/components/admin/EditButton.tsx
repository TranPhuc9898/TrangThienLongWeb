"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { useAdminEdit } from "@/contexts/AdminEditContext";

interface EditButtonProps {
  componentName: string;
  onEdit: () => void;
  className?: string;
}

const EditButton = ({
  componentName,
  onEdit,
  className = "",
}: EditButtonProps) => {
  const { isAdminLoggedIn } = useAdminEdit();
  const [isHovered, setIsHovered] = useState(false);

  if (!isAdminLoggedIn) return null;

  return (
    <div className={`absolute top-4 right-4 z-50 ${className}`}>
      <button
        onClick={onEdit}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 border-2 border-white"
        title={`Edit ${componentName}`}
      >
        <Edit className="w-5 h-5" />

        {/* Tooltip */}
        {isHovered && (
          <div className="absolute top-12 right-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Edit {componentName}
          </div>
        )}
      </button>
    </div>
  );
};

export default EditButton;
