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
      <section className="py-20 bg-secondary-50/30">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <div className="h-8 w-48 rounded-lg mx-auto bg-secondary-200 animate-pulse" />
            <div className="h-12 w-96 rounded-lg mx-auto bg-secondary-200 animate-pulse" />
            <div className="h-6 w-64 rounded-lg mx-auto bg-secondary-200 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-2xl bg-secondary-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-secondary-50/30">
        <div className="container mx-auto px-6">
          <Alert
            className="max-w-2xl mx-auto shadow-lg border border-red-200"
            color="danger"
            radius="lg"
            variant="flat"
          >
            <div className="space-y-2">
              <p className="font-bold text-lg">Error Loading Products</p>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold tracking-wide">
            Complete Catalog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-accent tracking-tight">
            All Products
          </h2>
          <p className="text-secondary-600 text-lg font-light max-w-2xl mx-auto">
            Browse our complete range of industrial packaging solutions
          </p>
          <div className="w-24 h-1 bg-accent mx-auto mt-4" />
        </div>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
