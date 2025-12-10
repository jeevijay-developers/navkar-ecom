"use client";

import { Alert } from "@heroui/alert";

import ProductGrid from "./ProductGrid";

import { Product } from "@/types";

interface AllProductsSectionProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export default function AllProductsSection({
  products,
  loading,
  error,
}: AllProductsSectionProps) {
  if (loading) {
    return (
      <section className="py-20" style={{ background: "#0d0d0d" }}>
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <div
              className="h-8 w-48 rounded-lg mx-auto animate-pulse"
              style={{ background: "#1a1a1a" }}
            />
            <div
              className="h-12 w-96 rounded-lg mx-auto animate-pulse"
              style={{ background: "#1a1a1a" }}
            />
            <div
              className="h-6 w-64 rounded-lg mx-auto animate-pulse"
              style={{ background: "#1a1a1a" }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-2xl animate-pulse"
                style={{ background: "#1a1a1a" }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20" style={{ background: "#0d0d0d" }}>
        <div className="container mx-auto px-6">
          <Alert
            className="max-w-2xl mx-auto shadow-lg"
            color="danger"
            radius="lg"
            variant="flat"
            style={{
              background: "#1a1a1a",
              border: "1px solid rgba(250, 142, 0, 0.2)",
            }}
          >
            <div className="space-y-2">
              <p className="font-bold text-lg" style={{ color: "#ffffff" }}>
                Error Loading Products
              </p>
              <p className="text-sm font-medium" style={{ color: "#b0b0b0" }}>
                {error}
              </p>
            </div>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" style={{ background: "#0d0d0d" }}>
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wide"
            style={{ background: "rgba(250, 142, 0, 0.15)", color: "#fa8e00" }}
          >
            Complete Catalog
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #fa8e00, #d43800)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            All Products
          </h2>
          <p
            className="text-lg font-light max-w-2xl mx-auto"
            style={{ color: "#b0b0b0" }}
          >
            Browse our complete range of industrial packaging solutions
          </p>
          <div
            className="w-24 h-1 mx-auto mt-4"
            style={{ background: "linear-gradient(135deg, #fa8e00, #d43800)" }}
          />
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
