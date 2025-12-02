"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { ArrowRight, Factory, Shield, Truck, Headphones } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent via-accent/95 to-accent/90 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium tracking-wide">
                Premium Industrial Solutions
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white/90">
                Engineering Excellence,{" "}
                <span className="text-white/90">One Product at a Time</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed max-w-xl">
                Discover our comprehensive catalog of high-quality industrial
                packaging solutions, engineered for durability and performance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                as={Link}
                className="bg-white text-accent font-bold hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all px-8"
                endContent={<ArrowRight className="w-5 h-5" />}
                href="#products"
                radius="sm"
                size="lg"
              >
                Browse Catalog
              </Button>
              <Button
                as={Link}
                className="border-2 border-white/30 text-white font-semibold hover:bg-white/10 backdrop-blur-sm px-8"
                href="/cart"
                radius="sm"
                size="lg"
                variant="bordered"
              >
                Request Quote
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <p className="text-3xl md:text-4xl font-bold">50+</p>
                <p className="text-sm text-white/70 font-medium">Products</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">10+</p>
                <p className="text-sm text-white/70 font-medium">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold">500+</p>
                <p className="text-sm text-white/70 font-medium">
                  Happy Clients
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 rounded-3xl blur-3xl transform rotate-6" />
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-2xl p-6 text-center">
                    <Factory className="w-12 h-12 mx-auto mb-3 text-white/90" />
                    <p className="font-semibold text-sm">Industrial Grade</p>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-6 text-center">
                    <Shield className="w-12 h-12 mx-auto mb-3 text-white/90" />
                    <p className="font-semibold text-sm">Quality Assured</p>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-6 text-center">
                    <Truck className="w-12 h-12 mx-auto mb-3 text-white/90" />
                    <p className="font-semibold text-sm">Fast Delivery</p>
                  </div>
                  <div className="bg-white/20 rounded-2xl p-6 text-center">
                    <Headphones className="w-12 h-12 mx-auto mb-3 text-white/90" />
                    <p className="font-semibold text-sm">24/7 Support</p>
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
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
