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
          background: "#1a1a1a",
          border: "1px solid rgba(250, 142, 0, 0.2)",
        }}
      >
        <CardBody className="p-0">
          <div
            className="relative overflow-hidden"
            style={{ background: "#0d0d0d" }}
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
              style={{ color: "#ffffff" }}
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
                  background: "rgba(250, 142, 0, 0.15)",
                  color: "#fa8e00",
                  border: "1px solid rgba(250, 142, 0, 0.3)",
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
                  background: "#0d0d0d",
                  color: "#b0b0b0",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {product.capType}
              </Chip>
            </div>
            {product.variants && product.variants.length > 0 && (
              <p className="text-sm font-medium" style={{ color: "#b0b0b0" }}>
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
              background: "linear-gradient(135deg, #fa8e00, #d43800)",
              color: "#ffffff",
            }}
          >
            View Details
          </Button>
          {inCart ? (
            <div
              className="flex items-center gap-0 rounded-lg overflow-hidden"
              style={{ border: "2px solid rgba(250, 142, 0, 0.3)" }}
            >
              <Button
                isIconOnly
                className="min-w-[36px] h-[36px] rounded-none"
                radius="none"
                size="sm"
                style={{
                  background: "#0d0d0d",
                  color: "#fa8e00",
                  borderRight: "1px solid rgba(250, 142, 0, 0.3)",
                }}
                onClick={handleDecrement}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div
                className="min-w-[40px] h-[36px] flex items-center justify-center font-bold text-sm"
                style={{ color: "#ffffff", background: "#0d0d0d" }}
              >
                {cartQuantity}
              </div>
              <Button
                isIconOnly
                className="min-w-[36px] h-[36px] rounded-none"
                radius="none"
                size="sm"
                style={{
                  background: "#0d0d0d",
                  color: "#fa8e00",
                  borderLeft: "1px solid rgba(250, 142, 0, 0.3)",
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
                background: "rgba(250, 142, 0, 0.15)",
                color: "#fa8e00",
                border: "1px solid rgba(250, 142, 0, 0.3)",
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
