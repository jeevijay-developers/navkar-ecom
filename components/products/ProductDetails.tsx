"use client";

import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Divider } from "@heroui/divider";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";

import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart, updateQuantity, removeFromCart, isInCart, cart } =
    useCart();
  const [selectedVariant, _setSelectedVariant] = useState<string | undefined>(
    undefined
  );

  const inCart = isInCart(product._id);
  const cartItem = cart.find((item) => item.product._id === product._id);
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addToCart(product, 1, selectedVariant);
  };

  const handleIncrement = () => {
    updateQuantity(product._id, cartQuantity + 1);
  };

  const handleDecrement = () => {
    if (cartQuantity === 1) {
      removeFromCart(product._id);
    } else {
      updateQuantity(product._id, cartQuantity - 1);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="border border-accent/10 shadow-2xl bg-white" radius="lg">
        <CardBody className="p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative bg-secondary-50 rounded-xl p-8 flex items-center justify-center">
              <Image
                alt={product.name}
                className="object-contain"
                height={450}
                src={product.imageUrl}
                width="100%"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-accent mb-3 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <Divider className="my-6 bg-accent/20" />
              </div>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-semibold text-secondary-500 mb-2 uppercase tracking-wide">
                    Material of Construction
                  </p>
                  <Chip
                    className="bg-accent/5 text-accent border border-accent/20 font-medium px-4 py-5"
                    radius="sm"
                    size="lg"
                    variant="flat"
                  >
                    {product.materialOfConstruction}
                  </Chip>
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary-500 mb-2 uppercase tracking-wide">
                    Cap Type
                  </p>
                  <Chip
                    className="bg-secondary-100/50 text-secondary-700 border border-secondary-200 font-medium px-4 py-5"
                    radius="sm"
                    size="lg"
                    variant="flat"
                  >
                    {product.capType}
                  </Chip>
                </div>
                {product.description && (
                  <div>
                    <p className="text-sm font-semibold text-secondary-500 mb-2 uppercase tracking-wide">
                      Description
                    </p>
                    <p className="text-secondary-700 leading-relaxed text-base">
                      {product.description}
                    </p>
                  </div>
                )}
              </div>

              <Divider className="my-6 bg-accent/20" />

              {/* Add to Cart Section */}
              <div className="space-y-4">
                {!inCart ? (
                  <Button
                    className="w-fit bg-accent text-white font-bold hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                    size="lg"
                    startContent={<ShoppingCart className="w-5 h-5" />}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="w-fit flex items-center gap-3">
                      <div className="flex items-center gap-0 border-2 border-accent rounded-lg overflow-hidden flex-1">
                        <Button
                          isIconOnly
                          className="bg-transparent text-accent hover:bg-accent/5 min-w-[48px] h-[48px] rounded-none border-r border-accent"
                          radius="none"
                          size="lg"
                          onClick={handleDecrement}
                        >
                          <Minus className="w-5 h-5" />
                        </Button>
                        <div className="flex-1 h-[48px] mx-10 flex items-center justify-center text-accent font-bold text-lg bg-white">
                          {cartQuantity}
                        </div>
                        <Button
                          isIconOnly
                          className="bg-transparent text-accent hover:bg-accent/5 min-w-[48px] h-[48px] rounded-none border-l border-accent"
                          radius="none"
                          size="lg"
                          onClick={handleIncrement}
                        >
                          <Plus className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-green-600 text-sm font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Added to cart</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {product.variants && product.variants.length > 0 && (
        <Card
          className="border border-accent/10 shadow-2xl bg-white"
          radius="lg"
        >
          <CardBody className="p-8 md:p-10">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-accent mb-2 tracking-tight">
                Product Specifications
              </h2>
              <p className="text-secondary-600 font-light">
                Available variants and technical details
              </p>
            </div>
            <Divider className="mb-6 bg-accent/20" />
            <div className="overflow-x-auto">
              <Table
                aria-label="Product variants table"
                className="min-w-full"
                classNames={{
                  wrapper: "bg-white shadow-none",
                  th: "bg-accent text-white font-bold uppercase text-xs tracking-wider",
                  td: "text-secondary-700 font-medium py-4 bg-white",
                  tr: "hover:bg-secondary-50/50 transition-colors",
                }}
              >
                <TableHeader>
                  <TableColumn>SIZE LABEL</TableColumn>
                  <TableColumn>BRIMFUL CAPACITY</TableColumn>
                  <TableColumn>NECK SIZE</TableColumn>
                  <TableColumn>TOTAL HEIGHT</TableColumn>
                  <TableColumn>DIAMETER</TableColumn>
                  <TableColumn>LABEL HEIGHT</TableColumn>
                  <TableColumn>STANDARD WEIGHT</TableColumn>
                </TableHeader>
                <TableBody>
                  {product.variants.map((variant, index) => (
                    <TableRow
                      key={index}
                      className="hover:bg-secondary-50/50 transition-colors border-b border-secondary-100"
                    >
                      <TableCell className="font-bold text-accent">
                        {variant.sizeLabel}
                      </TableCell>
                      <TableCell>{variant.brimfulCapacity}</TableCell>
                      <TableCell>{variant.neckSize}</TableCell>
                      <TableCell>{variant.totalHeight}</TableCell>
                      <TableCell>{variant.diameter}</TableCell>
                      <TableCell>{variant.labelHeight}</TableCell>
                      <TableCell>{variant.standardWeight}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
