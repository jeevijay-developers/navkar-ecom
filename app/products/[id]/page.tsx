"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import Link from "next/link";

import { productAPI } from "@/utils/server";
import { Product } from "@/types";
import ProductDetails from "@/components/products/ProductDetails";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id || typeof params.id !== "string") {
        setError("Invalid product ID");
        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await productAPI.getProductById(params.id);

        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 space-y-8 py-8">
        <div className="h-10 w-48 rounded-lg bg-secondary-200 animate-pulse" />
        <div className="h-[600px] rounded-2xl bg-secondary-200 animate-pulse" />
        <div className="h-96 rounded-2xl bg-secondary-200 animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 space-y-6 py-8">
        <div className="max-w-3xl mx-auto">
          <Alert
            className="shadow-lg border border-red-200"
            color="danger"
            radius="lg"
            variant="flat"
          >
            <div className="space-y-2">
              <p className="font-bold text-lg">Error Loading Product</p>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </Alert>
          <Button
            as={Link}
            className="bg-accent text-white font-semibold shadow-md hover:shadow-lg mt-6"
            href="/"
            radius="sm"
            size="lg"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 space-y-6 py-8">
        <div className="max-w-3xl mx-auto">
          <Alert
            className="shadow-lg border border-yellow-200"
            color="warning"
            radius="lg"
            variant="flat"
          >
            <div className="space-y-2">
              <p className="font-bold text-lg">Product Not Found</p>
              <p className="text-sm font-medium">
                The product you&aposre looking for doesn&apost exist.
              </p>
            </div>
          </Alert>
          <Button
            as={Link}
            className="bg-accent text-white font-semibold shadow-md hover:shadow-lg mt-6"
            href="/"
            radius="sm"
            size="lg"
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 space-y-8 py-8">
      <Button
        as={Link}
        className="text-accent font-semibold hover:bg-accent/5"
        href="/"
        size="md"
        startContent={<span>←</span>}
        variant="light"
      >
        Back to Products
      </Button>
      <ProductDetails product={product} />
    </div>
  );
}
