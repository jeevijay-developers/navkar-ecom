"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Spinner } from "@heroui/spinner";
import { Alert } from "@heroui/alert";
import { Skeleton } from "@heroui/skeleton";
import { Button } from "@heroui/button";
import { productAPI } from "@/utils/server";
import { Product } from "@/types";
import ProductDetails from "@/components/products/ProductDetails";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
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
            color="danger"
            variant="flat"
            className="shadow-lg border border-red-200"
            radius="lg"
          >
            <div className="space-y-2">
              <p className="font-bold text-lg">Error Loading Product</p>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </Alert>
          <Button
            as={Link}
            href="/"
            className="bg-accent text-white font-semibold shadow-md hover:shadow-lg mt-6"
            size="lg"
            radius="sm"
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
            color="warning"
            variant="flat"
            className="shadow-lg border border-yellow-200"
            radius="lg"
          >
            <div className="space-y-2">
              <p className="font-bold text-lg">Product Not Found</p>
              <p className="text-sm font-medium">
                The product you're looking for doesn't exist.
              </p>
            </div>
          </Alert>
          <Button
            as={Link}
            href="/"
            className="bg-accent text-white font-semibold shadow-md hover:shadow-lg mt-6"
            size="lg"
            radius="sm"
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
        href="/"
        variant="light"
        className="text-accent font-semibold hover:bg-accent/5"
        size="md"
        startContent={<span>←</span>}
      >
        Back to Products
      </Button>
      <ProductDetails product={product} />
    </div>
  );
}
