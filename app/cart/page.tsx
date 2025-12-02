"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Chip } from "@heroui/chip";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { quotationAPI } from "@/utils/server";
import { Trash2, Plus, Minus, Send, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, clearCart, getCartCount } =
    useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerMessage, setCustomerMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitEnquiry = async () => {
    if (!customerName || !customerPhone) {
      toast.error("Please fill in your name and phone number", {
        position: "top-center",
        duration: 4000,
      });
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty", {
        position: "top-center",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const enquiryData = {
        customerDetails: {
          name: customerName,
          email: customerEmail || undefined,
          phone: customerPhone,
        },
        products: cart.map((item) => ({
          productId: item.product._id,
          productName: item.product.name,
          quantity: item.quantity,
          variant: item.selectedVariant,
        })),
        message: customerMessage || undefined,
        timestamp: new Date().toISOString(),
      };

      const quotation = await quotationAPI.submitQuotationEnquiry(enquiryData);

      toast.success(
        `Enquiry submitted successfully! Your quotation number is ${quotation.quotationNumber}. We will contact you soon.`,
        {
          position: "top-center",
          duration: 5000,
        }
      );

      clearCart();
      setCustomerName("");
      setCustomerEmail("");
      setCustomerPhone("");
      setCustomerMessage("");

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      toast.error(
        "Failed to submit enquiry. Please try again or contact us directly.",
        {
          position: "top-center",
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 min-h-[60vh] flex items-center justify-center py-12">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-24 h-24 bg-secondary-50 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-12 h-12 text-secondary-400" />
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-accent tracking-tight">
              Your Cart is Empty
            </h1>
            <p className="text-secondary-600 text-lg font-light leading-relaxed">
              Explore our premium industrial products and add items to request a
              personalized quotation
            </p>
          </div>
          <Button
            as={Link}
            href="/"
            className="bg-accent text-white font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
            size="lg"
            radius="sm"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            background: "white",
            color: "#452829",
            border: "1px solid #452829",
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "white",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "white",
            },
          },
        }}
      />
      <div className="max-w-[90rem] mx-auto px-6 py-8 space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-accent tracking-tight">
            Your Cart
          </h1>
          <p className="text-secondary-600 text-lg font-light">
            {getCartCount()} item{getCartCount() !== 1 ? "s" : ""} ready for
            quotation
          </p>
          <div className="w-24 h-1 bg-accent"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {cart.map((item) => (
              <Card
                key={`${item.product._id}-${item.selectedVariant || "default"}`}
                className="border border-accent/10 shadow-xl bg-white hover:shadow-2xl transition-shadow"
                radius="lg"
              >
                <CardBody className="p-6">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-28 h-28 bg-secondary-50 rounded-xl overflow-hidden flex items-center justify-center p-3">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        width={112}
                        height={112}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-accent leading-tight">
                          {item.product.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-accent/5 text-accent border border-accent/20 font-medium text-xs"
                            radius="sm"
                          >
                            {item.product.materialOfConstruction}
                          </Chip>
                          {item.selectedVariant && (
                            <Chip
                              size="sm"
                              variant="flat"
                              className="bg-secondary-100/50 text-secondary-700 border border-secondary-200 font-medium text-xs"
                              radius="sm"
                            >
                              {item.selectedVariant}
                            </Chip>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0 bg-secondary-50 rounded-lg p-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-accent hover:bg-white min-w-8 h-8"
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-bold text-accent text-base">
                            {item.quantity}
                          </span>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            className="text-accent hover:bg-white min-w-8 h-8"
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                        <Button
                          isIconOnly
                          color="danger"
                          variant="light"
                          size="sm"
                          className="hover:bg-red-50"
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card
              className="border border-accent/10 shadow-2xl sticky top-24 bg-white"
              radius="lg"
            >
              <CardBody className="p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-accent tracking-tight">
                    Request Quotation
                  </h2>
                  <p className="text-secondary-600 font-light text-sm leading-relaxed">
                    Fill in your details to receive a personalized quote for
                    your selected products
                  </p>
                </div>

                <Divider className="bg-accent/10" />

                <div className="space-y-5">
                  <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    isRequired
                    variant="bordered"
                    classNames={{
                      label: "font-semibold text-black text-sm",
                      input: "font-medium text-base text-black",
                      inputWrapper:
                        "border-accent/20 hover:border-accent/40 focus-within:!border-accent",
                    }}
                    radius="lg"
                    size="lg"
                  />
                  <Input
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    isRequired
                    variant="bordered"
                    classNames={{
                      label: "font-semibold text-black text-sm",
                      input: "font-medium text-base text-black",
                      inputWrapper:
                        "border-accent/20 hover:border-accent/40 focus-within:!border-accent",
                    }}
                    radius="lg"
                    size="lg"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email (optional)"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    variant="bordered"
                    classNames={{
                      label: "font-semibold text-black text-sm",
                      input: "font-medium text-base text-black",
                      inputWrapper:
                        "border-accent/20 hover:border-accent/40 focus-within:!border-accent",
                    }}
                    radius="lg"
                    size="lg"
                  />
                  <Textarea
                    label="Additional Requirements"
                    placeholder="Any specific requirements or questions? (optional)"
                    value={customerMessage}
                    onChange={(e) => setCustomerMessage(e.target.value)}
                    minRows={4}
                    variant="bordered"
                    classNames={{
                      label: "font-semibold text-black text-sm",
                      input: "font-medium text-base text-black",
                      inputWrapper:
                        "border-accent/20 hover:border-accent/40 focus-within:!border-accent",
                    }}
                    radius="lg"
                  />
                </div>

                <Divider className="bg-accent/10" />

                <div className="space-y-3 flex flex-row gap-3">
                  <Button
                    className="w-full border-accent/20 text-accent hover:bg-accent/5"
                    variant="bordered"
                    size="md"
                    radius="lg"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  <Button
                    className="w-full bg-accent text-white hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
                    size="md"
                    radius="lg"
                    startContent={!isSubmitting && <Send className="size-4" />}
                    onClick={handleSubmitEnquiry}
                    isLoading={isSubmitting}
                  >
                    Submit Enquiry
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
