"use client";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import Link from "next/link";
import { ShoppingCart, Plus, Minus } from "lucide-react";

import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, removeFromCart, isInCart, cart } =
    useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product._id, cartQuantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartQuantity === 1) {
      removeFromCart(product._id);
    } else {
      updateQuantity(product._id, cartQuantity - 1);
    }
  };

  const inCart = isInCart(product._id);
  const cartItem = cart.find((item) => item.product._id === product._id);
  const cartQuantity = cartItem?.quantity || 0;

  return (
    <div className="block h-full group">
      <Card
        className="h-full transition-all duration-300 shadow-lg hover:shadow-2xl overflow-hidden"
        radius="lg"
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
        }}
      >
        <CardBody className="p-0">
          <div
            className="relative overflow-hidden"
            style={{ background: "#f8fafc" }}
          >
            <Image
              alt={product.name}
              className="object-contain group-hover:scale-105 transition-transform duration-300"
              height={240}
              radius="none"
              src={product.imageUrl}
              width="100%"
            />
          </div>
          <div className="p-6 space-y-4">
            <h3
              className="text-xl font-bold line-clamp-2 leading-tight tracking-tight min-h-[3.5rem]"
              style={{ color: "#0f172a" }}
            >
              {product.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                className="font-medium"
                radius="sm"
                size="sm"
                variant="flat"
                style={{
                  background: "rgba(14, 165, 233, 0.1)",
                  color: "#0ea5e9",
                  border: "1px solid rgba(14, 165, 233, 0.2)",
                }}
              >
                {product.materialOfConstruction}
              </Chip>
              <Chip
                className="font-medium"
                radius="sm"
                size="sm"
                variant="flat"
                style={{
                  background: "#f8fafc",
                  color: "#64748b",
                  border: "1px solid #e2e8f0",
                }}
              >
                {product.capType}
              </Chip>
            </div>
            {product.variants && product.variants.length > 0 && (
              <p className="text-sm font-medium" style={{ color: "#64748b" }}>
                {product.variants.length} variant
                {product.variants.length > 1 ? "s" : ""} available
              </p>
            )}
          </div>
        </CardBody>
        <CardFooter className="pt-0 px-6 pb-6 flex gap-3">
          <Button
            as={Link}
            className="flex-1 font-semibold transition-all shadow-md hover:shadow-lg"
            href={`/products/${product._id}`}
            radius="sm"
            size="md"
            style={{
              background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
              color: "#ffffff",
            }}
          >
            View Details
          </Button>
          {inCart ? (
            <div
              className="flex items-center gap-0 rounded-lg overflow-hidden"
              style={{ border: "2px solid rgba(14, 165, 233, 0.3)" }}
            >
              <Button
                isIconOnly
                className="min-w-[36px] h-[36px] rounded-none"
                radius="none"
                size="sm"
                style={{
                  background: "#f8fafc",
                  color: "#0ea5e9",
                  borderRight: "1px solid rgba(14, 165, 233, 0.3)",
                }}
                onClick={handleDecrement}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div
                className="min-w-[40px] h-[36px] flex items-center justify-center font-bold text-sm"
                style={{ color: "#0ea5e9", background: "#ffffff" }}
              >
                {cartQuantity}
              </div>
              <Button
                isIconOnly
                className="min-w-[36px] h-[36px] rounded-none"
                radius="none"
                size="sm"
                style={{
                  background: "#f8fafc",
                  color: "#0ea5e9",
                  borderLeft: "1px solid rgba(14, 165, 233, 0.3)",
                }}
                onClick={handleIncrement}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              isIconOnly
              className="font-semibold transition-all shadow-md hover:shadow-lg"
              radius="sm"
              size="md"
              style={{
                background: "rgba(14, 165, 233, 0.1)",
                color: "#0ea5e9",
                border: "1px solid rgba(14, 165, 233, 0.2)",
              }}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
