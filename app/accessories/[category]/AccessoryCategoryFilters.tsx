"use client";
import { ActiveFilters } from "@/components/active-filters";

interface AccessoryCategoryFiltersProps {
  brand: string;
  category: string;
  categoryName: string;
}

export default function AccessoryCategoryFilters({ brand, category, categoryName }: AccessoryCategoryFiltersProps) {
  return (
    <ActiveFilters
      filters={{
        brands: brand ? [brand] : [],
        categories: ["Accessories"],
        subcategories: [categoryName],
        features: [],
        priceRange: [0, 300000] as [number, number],
      }}
      onRemoveFilter={(type: string, value?: string) => {
        if (type === "brand" && value === brand) {
          window.location.href = `/accessories/${category}`;
        }
      }}
      onClearAll={() => {
        window.location.href = `/accessories/${category}`;
      }}
    />
  );
}
