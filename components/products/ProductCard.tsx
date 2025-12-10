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
        className="h-full border border-accent/10 hover:border-accent/30 transition-all duration-300 shadow-lg hover:shadow-2xl bg-white overflow-hidden"
        radius="lg"
      >
        <CardBody className="p-0">
          <div className="relative overflow-hidden bg-secondary-50">
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
            <h3 className="text-xl font-bold text-accent line-clamp-2 leading-tight tracking-tight min-h-[3.5rem]">
              {product.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              <Chip
                className="bg-accent/5 text-accent border border-accent/20 font-medium"
                radius="sm"
                size="sm"
                variant="flat"
              >
                {product.materialOfConstruction}
              </Chip>
              <Chip
                className="bg-secondary-100/50 text-secondary-700 border border-secondary-200 font-medium"
                radius="sm"
                size="sm"
                variant="flat"
              >
                {product.capType}
              </Chip>
            </div>
            {product.variants && product.variants.length > 0 && (
              <p className="text-sm text-secondary-500 font-medium">
                {product.variants.length} variant
                {product.variants.length > 1 ? "s" : ""} available
              </p>
            )}
          </div>
        </CardBody>
        <CardFooter className="pt-0 px-6 pb-6 flex gap-3">
          <Button
            as={Link}
            className="flex-1 bg-accent text-white font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
            href={`/products/${product._id}`}
            radius="sm"
            size="md"
          >
            View Details
          </Button>
          {inCart ? (
            <div className="flex items-center gap-0 border-2 border-gray-200 rounded-lg overflow-hidden">
              <Button
                isIconOnly
                className="bg-transparent text-gray-600 hover:bg-gray-50 min-w-[36px] h-[36px] rounded-none border-r border-gray-200"
                radius="none"
                size="sm"
                onClick={handleDecrement}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="min-w-[40px] h-[36px] flex items-center justify-center text-gray-600 font-bold text-sm bg-white">
                {cartQuantity}
              </div>
              <Button
                isIconOnly
                className="bg-transparent text-gray-600 hover:bg-gray-50 min-w-[36px] h-[36px] rounded-none border-l border-gray-200"
                radius="none"
                size="sm"
                onClick={handleIncrement}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button
              isIconOnly
              className="bg-accent/10 text-accent hover:bg-orange-600 hover:!text-white font-semibold transition-all shadow-md hover:shadow-lg"
              radius="sm"
              size="md"
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
