import { useState, useEffect } from "react";
import { getCompanyBrand } from "@/lib/companyBrands";

interface CompanyLogoProps {
  company: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-14 h-14 text-lg",
};

export function CompanyLogo({ company, size = "md", className = "" }: CompanyLogoProps) {
  const [imageError, setImageError] = useState(false);
  const brand = getCompanyBrand(company);
  const sizeClass = sizeClasses[size];

  // Important: Reset error state when switching between different companies
  useEffect(() => {
    setImageError(false);
  }, [company]);

  // 1. Match your specific file names exactly as they appear in your 'public' folder
  const getImagePath = (name: string) => {
    const n = name.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (n === "goldmansachs") return "/logos/Goldmansachs.png"; // Matches your capitalized file
    return `/logos/${n}.png`;
  };

  const imagePath = getImagePath(company);

  return (
    <div
      className={`rounded-xl flex items-center justify-center font-bold shadow-sm border border-border/10 overflow-hidden shrink-0 ${sizeClass} ${className}`}
      style={
        imageError
          ? { background: `linear-gradient(135deg, ${brand.bg}, ${brand.bg}dd)`, color: brand.text }
          : { background: "#FFFFFF" }
      }
    >
      {!imageError ? (
        <img
          src={imagePath}
          alt={`${company} logo`}
          className="w-full h-full object-contain p-1.5"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="drop-shadow-md select-none uppercase">
          {company.charAt(0)}
        </span>
      )}
    </div>
  );
}