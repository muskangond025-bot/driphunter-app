import { Product } from "@/data/mockData";

export interface FilterState {
  inStockOnly: boolean;
  selectedPriceRanges: string[];
  minPrice: number;
  maxPrice: number;
  selectedBrands: string[];
  selectedCategories: string[];
  selectedSubCategories: string[];
  selectedTypes: string[];
  selectedSizes: string[];
  selectedGenders: string[];
  selectedColours: string[];
  selectedMaterials: string[];
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query) return products;
  
  const lowerQuery = query.toLowerCase();
  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(lowerQuery) ||
      product.brand.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      (product.subCategory && product.subCategory.toLowerCase().includes(lowerQuery))
    );
  });
}

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  return products.filter((product) => {
    if (filters.inStockOnly && !product.inStock) return false;

    if (filters.selectedPriceRanges.length > 0) {
      const matchPrice = filters.selectedPriceRanges.some((range) => {
        if (range === "under-2000") return product.price < 2000;
        if (range === "2000-5000") return product.price >= 2000 && product.price <= 5000;
        if (range === "5000-10000") return product.price >= 5000 && product.price <= 10000;
        if (range === "over-10000") return product.price > 10000;
        return true;
      });
      if (!matchPrice) return false;
    }

    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    if (filters.selectedBrands.length > 0) {
      const matchBrand = filters.selectedBrands.some((b) => {
        const bNorm = b.toLowerCase().replace(/[^a-z0-9]/g, "");
        const pNorm = product.brand.toLowerCase().replace(/[^a-z0-9]/g, "");
        return pNorm.includes(bNorm) || bNorm.includes(pNorm);
      });
      if (!matchBrand) return false;
    }

    if (filters.selectedCategories.length > 0) {
      if (!filters.selectedCategories.includes(product.category.toLowerCase())) return false;
    }

    if (filters.selectedSubCategories.length > 0) {
      if (!product.subCategory || !filters.selectedSubCategories.includes(product.subCategory.toLowerCase())) return false;
    }

    if (filters.selectedTypes.length > 0) {
      const isLimited = product.isLimited || false;
      const matchType = filters.selectedTypes.some((t) => {
        if (t === "limited" && isLimited) return true;
        if (t === "general" && !isLimited) return true;
        return false;
      });
      if (!matchType) return false;
    }

    if (filters.selectedSizes.length > 0) {
      if (!product.sizes || !product.sizes.some((s) => filters.selectedSizes.includes(s.toUpperCase()))) return false;
    }

    if (filters.selectedGenders.length > 0) {
      if (!product.gender || !filters.selectedGenders.includes(product.gender.toLowerCase())) return false;
    }

    if (filters.selectedColours.length > 0) {
      if (!product.colors || !product.colors.some((c) => filters.selectedColours.includes(c.toLowerCase()))) return false;
    }

    if (filters.selectedMaterials.length > 0) {
      if (!product.material || !filters.selectedMaterials.includes(product.material.toLowerCase())) return false;
    }

    return true;
  });
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  return [...products].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    }
    if (sortBy === "price-high") {
      return b.price - a.price;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return (b.trendingScore || 0) - (a.trendingScore || 0); // Featured
  });
}

export function getFilterCounts(products: Product[]) {
  return {
    getCountForBrand: (b: string) => products.filter(p => p.brand.toLowerCase() === b.toLowerCase()).length,
    getCountForCategory: (c: string) => products.filter(p => p.category.toLowerCase() === c.toLowerCase()).length,
    getCountForSubCategory: (sc: string) => products.filter(p => p.subCategory?.toLowerCase() === sc.toLowerCase()).length,
    getCountForType: (t: string) => products.filter(p => t === "limited" ? p.isLimited : !p.isLimited).length,
    getCountForSize: (s: string) => products.filter(p => p.sizes?.some(sz => sz.toUpperCase() === s.toUpperCase())).length,
    getCountForGender: (g: string) => products.filter(p => p.gender?.toLowerCase() === g.toLowerCase()).length,
    getCountForColour: (c: string) => products.filter(p => p.colors?.some(col => col.toLowerCase() === c.toLowerCase())).length,
    getCountForMaterial: (m: string) => products.filter(p => p.material?.toLowerCase() === m.toLowerCase()).length,
    getCountForPriceRange: (range: string) => {
      if (range === "under-2000") return products.filter(p => p.price < 2000).length;
      if (range === "2000-5000") return products.filter(p => p.price >= 2000 && p.price <= 5000).length;
      if (range === "5000-10000") return products.filter(p => p.price >= 5000 && p.price <= 10000).length;
      if (range === "over-10000") return products.filter(p => p.price > 10000).length;
      return 0;
    },
    inStockCount: products.filter(p => p.inStock).length
  };
}
