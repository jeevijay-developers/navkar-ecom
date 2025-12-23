"use client";

import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import Link from "next/link";
import { ShoppingCart, ArrowRight, Plus, Minus } from "lucide-react";

import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { addToCart, updateQuantity, removeFromCart, isInCart, cart } =
    useCart();
  const featuredProducts = products.slice(0, 4);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section
      className="py-20"
      style={{ backgroundColor: "#ffffff" }}
      id="products"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="space-y-4">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wide"
              style={{
                background: "rgba(14, 165, 233, 0.1)",
                color: "#0ea5e9",
              }}
            >
              Featured Products
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Popular Products
            </h2>
            <p
              className="text-lg font-light max-w-xl"
              style={{ color: "#64748b" }}
            >
              Explore our most sought-after industrial packaging solutions
            </p>
          </div>
          <Button
            as={Link}
            className="font-semibold self-start md:self-auto"
            style={{ color: "#0ea5e9" }}
            endContent={<ArrowRight className="w-5 h-5" />}
            href="/products"
            variant="light"
          >
            View All Products
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => {
            const inCart = isInCart(product._id);
            const cartItem = cart.find(
              (item) => item.product._id === product._id
            );
            const cartQuantity = cartItem?.quantity || 0;

            return (
              <Card
                key={product._id}
                className="shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                }}
                radius="lg"
              >
                <CardBody className="p-0">
                  <div
                    className="relative overflow-hidden h-56"
                    style={{ backgroundColor: "#f8fafc" }}
                  >
                    <Image
                      alt={product.name}
                      className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300 p-4"
                      height={224}
                      radius="none"
                      src={product.imageUrl}
                      width="100%"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3
                      className="text-lg font-bold line-clamp-2 min-h-[3.5rem] leading-tight"
                      style={{ color: "#0f172a" }}
                    >
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Chip
                        className="font-medium text-xs"
                        style={{
                          background: "rgba(14, 165, 233, 0.1)",
                          color: "#0ea5e9",
                          border: "1px solid rgba(14, 165, 233, 0.2)",
                        }}
                        radius="sm"
                        size="sm"
                        variant="flat"
                      >
                        {product.materialOfConstruction}
                      </Chip>
                    </div>
                    {product.variants && product.variants.length > 0 && (
                      <p
                        className="text-sm font-medium"
                        style={{ color: "#64748b" }}
                      >
                        {product.variants.length} variant
                        {product.variants.length > 1 ? "s" : ""} available
                      </p>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        as={Link}
                        className="flex-1 text-white font-semibold transition-all"
                        style={{
                          background:
                            "linear-gradient(135deg, #0ea5e9, #0284c7)",
                        }}
                        href={`/products/${product._id}`}
                        radius="sm"
                        size="sm"
                      >
                        View Details
                      </Button>
                      {inCart ? (
                        <div
                          className="flex items-center gap-0 rounded-lg overflow-hidden"
                          style={{
                            border: "2px solid rgba(14, 165, 233, 0.3)",
                          }}
                        >
                          <Button
                            isIconOnly
                            className="min-w-[32px] h-[32px] rounded-none"
                            style={{
                              backgroundColor: "transparent",
                              color: "#64748b",
                              borderRight: "1px solid rgba(14, 165, 233, 0.2)",
                            }}
                            radius="none"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (cartQuantity === 1) {
                                removeFromCart(product._id);
                              } else {
                                updateQuantity(product._id, cartQuantity - 1);
                              }
                            }}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <div
                            className="min-w-[36px] h-[32px] flex items-center justify-center font-bold text-xs"
                            style={{
                              backgroundColor: "#ffffff",
                              color: "#0ea5e9",
                            }}
                          >
                            {cartQuantity}
                          </div>
                          <Button
                            isIconOnly
                            className="min-w-[32px] h-[32px] rounded-none"
                            style={{
                              backgroundColor: "transparent",
                              color: "#64748b",
                              borderLeft: "1px solid rgba(14, 165, 233, 0.2)",
                            }}
                            radius="none"
                            size="sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              updateQuantity(product._id, cartQuantity + 1);
                            }}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          isIconOnly
                          className="transition-all"
                          style={{
                            backgroundColor: "rgba(14, 165, 233, 0.1)",
                            color: "#0ea5e9",
                          }}
                          radius="sm"
                          size="sm"
                          onClick={() => addToCart(product, 1)}
                        >
                          <ShoppingCart className="w-4 h-4 " />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
