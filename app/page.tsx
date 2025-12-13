"use client";

import { useEffect, useState } from "react";

import { productAPI } from "@/utils/server";
import { Product } from "@/types";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import CTASection from "@/components/landing/CTASection";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getProducts();

        setProducts(data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-0">
        {/* Hero Skeleton */}
        <div className="bg-gray-50 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="h-6 w-40 rounded-full bg-gray-200 animate-pulse" />
                <div className="h-16 w-full rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-16 w-3/4 rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-20 w-full rounded-lg bg-gray-200 animate-pulse" />
                <div className="flex gap-4">
                  <div className="h-12 w-40 rounded-lg bg-gray-200 animate-pulse" />
                  <div className="h-12 w-40 rounded-lg bg-gray-200 animate-pulse" />
                </div>
              </div>
              <div className="h-[400px] rounded-2xl bg-gray-200 animate-pulse" />
            </div>
          </div>
        </div>
        {/* Products Skeleton */}
        <div className="py-20 max-w-7xl mx-auto px-6">
          <div className="space-y-4 text-center mb-12">
            <div className="h-10 w-64 rounded-lg mx-auto bg-gray-200 animate-pulse" />
            <div className="h-6 w-96 rounded-lg mx-auto bg-gray-200 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-80 rounded-xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Products */}
      <FeaturedProducts products={products.slice(0, 4)} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
