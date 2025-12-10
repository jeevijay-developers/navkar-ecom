"use client";

import ProductCard from "./ProductCard";

import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-light" style={{ color: "#b0b0b0" }}>
          No products found
        </p>
        <p className="text-sm mt-2" style={{ color: "#808080" }}>
          Check back soon for new additions
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
