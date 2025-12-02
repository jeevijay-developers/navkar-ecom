"use client";

import { useEffect, useState } from "react";
import { productAPI } from "@/utils/server";
import { Product } from "@/types";
import AllProductsSection from "@/components/products/AllProductsSection";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productAPI.getProducts();
        setProducts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <AllProductsSection products={products} loading={loading} error={error} />
    </div>
  );
}
