// src/lib/companyBrands.ts

export const companyBrands: Record<string, {
  bg: string;
  text: string;
  logo: string;
  gradient?: string;
}> = {
  Amazon: {
    bg: "#FF9900",
    text: "#000000", // Fixed text color for visibility
    logo: "amazon",
    gradient: "from-[#FF9900] to-[#FF6600]",
  },
  Google: {
    bg: "#4285F4",
    text: "#FFFFFF",
    logo: "google",
    gradient: "from-[#4285F4] to-[#0F9D58]",
  },
  Microsoft: {
    bg: "#00A4EF",
    text: "#FFFFFF",
    logo: "microsoft",
    gradient: "from-[#00A4EF] to-[#7FBA00]",
  },
  "SalesCode.ai": {
    bg: "#6366F1",
    text: "#FFFFFF",
    logo: "salescode",
    gradient: "from-[#6366F1] to-[#8B5CF6]",
  },
  "S&P Global": {
    bg: "#CC0000",
    text: "#FFFFFF",
    logo: "sp",
    gradient: "from-[#CC0000] to-[#990000]",
  },
  VISA: {
    bg: "#1A1F71",
    text: "#FFFFFF",
    logo: "visa",
    gradient: "from-[#1A1F71] to-[#F7B600]",
  },
  Accenture: {
    bg: "#A100FF",
    text: "#FFFFFF",
    logo: "accenture",
    gradient: "from-[#A100FF] to-[#7500C0]",
  },
  Adobe: {
    bg: "#FF0000",
    text: "#FFFFFF",
    logo: "adobe",
    gradient: "from-[#FF0000] to-[#CC0000]",
  },
  Flipkart: {
    bg: "#F7D716",
    text: "#2874F0",
    logo: "flipkart",
    gradient: "from-[#2874F0] to-[#0D47A1]",
  },
  "Goldman Sachs": {
    bg: "#7399C6",
    text: "#FFFFFF",
    logo: "gs",
    gradient: "from-[#7399C6] to-[#4A6FA5]",
  },
  Rippling: {
    bg: "#FFD700",
    text: "#000000",
    logo: "rippling",
    gradient: "from-[#FFD700] to-[#FFAB00]",
  },
  Default: {
    bg: "#059669",
    text: "#FFFFFF",
    logo: "default",
    gradient: "from-primary to-primary/80",
  },
};

export function getCompanyBrand(company: string) {
  // Normalize checking to handle cases like "Amazon" vs "Amazon India" if needed
  // For now, exact match or fallback
  return companyBrands[company] || companyBrands.Default;
}
