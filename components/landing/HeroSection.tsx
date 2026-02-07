/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { ArrowRight, Factory, Shield, Truck, Headphones } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-wide"
                style={{
                  background: "rgba(14, 165, 233, 0.1)",
                  color: "#0ea5e9",
                }}
              >
                Premium Industrial Solutions
              </span>
              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                style={{ color: "#0f172a" }}
              >
                Engineering Excellence, One Product at a Time
              </h1>
              <p
                className="text-lg md:text-xl font-light leading-relaxed max-w-xl"
                style={{ color: "#64748b" }}
              >
                Discover our comprehensive catalog of high-quality industrial
                packaging solutions, engineered for durability and performance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as={Link}
                className="font-bold shadow-xl hover:shadow-2xl transition-all px-8"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #0284c7)",
                  color: "white",
                }}
                endContent={<ArrowRight className="w-5 h-5" />}
                href="#products"
                radius="sm"
                size="lg"
              >
                Browse Catalog
              </Button>
              <Button
                as={Link}
                className="border-2 font-semibold backdrop-blur-sm px-8"
                style={{
                  borderColor: "rgba(14, 165, 233, 0.5)",
                  color: "#0ea5e9",
                }}
                href="/cart"
                radius="sm"
                size="lg"
                variant="bordered"
              >
                Request Quote
              </Button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 pt-8"
              style={{ borderTop: "1px solid rgba(14, 165, 233, 0.2)" }}
            >
              <div>
                <p
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "#0ea5e9" }}
                >
                  50+
                </p>
                <p className="text-sm font-medium" style={{ color: "#64748b" }}>
                  Products
                </p>
              </div>
              <div>
                <p
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "#0ea5e9" }}
                >
                  10+
                </p>
                <p className="text-sm font-medium" style={{ color: "#64748b" }}>
                  Years Experience
                </p>
              </div>
              <div>
                <p
                  className="text-3xl md:text-4xl font-bold"
                  style={{ color: "#0ea5e9" }}
                >
                  50+
                </p>
                <p className="text-sm font-medium" style={{ color: "#64748b" }}>
                  Happy Clients
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl blur-3xl transform rotate-6"
                style={{ background: "rgba(14, 165, 233, 0.1)" }}
              />
              <div
                className="relative backdrop-blur-md rounded-3xl p-8"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(14, 165, 233, 0.2)",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: "rgba(14, 165, 233, 0.1)" }}
                  >
                    <Factory
                      className="w-12 h-12 mx-auto mb-3"
                      style={{ color: "#0ea5e9" }}
                    />
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#0f172a" }}
                    >
                      Industrial Grade
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: "rgba(14, 165, 233, 0.1)" }}
                  >
                    <Shield
                      className="w-12 h-12 mx-auto mb-3"
                      style={{ color: "#0ea5e9" }}
                    />
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#0f172a" }}
                    >
                      Quality Assured
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: "rgba(14, 165, 233, 0.1)" }}
                  >
                    <Truck
                      className="w-12 h-12 mx-auto mb-3"
                      style={{ color: "#0ea5e9" }}
                    />
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#0f172a" }}
                    >
                      Fast Delivery
                    </p>
                  </div>
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{ background: "rgba(14, 165, 233, 0.1)" }}
                  >
                    <Headphones
                      className="w-12 h-12 mx-auto mb-3"
                      style={{ color: "#0ea5e9" }}
                    />
                    <p
                      className="font-semibold text-sm"
                      style={{ color: "#0f172a" }}
                    >
                      24/7 Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          fill="none"
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
