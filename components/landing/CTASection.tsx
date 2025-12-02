"use client";

import { Button } from "@heroui/button";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-accent text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto">
            Contact us today for a personalized quotation on our premium
            industrial packaging solutions. Our team is ready to help you find
            the perfect products for your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              as={Link}
              className="bg-white text-accent font-bold hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all px-8"
              endContent={<ArrowRight className="w-5 h-5" />}
              href="/cart"
              radius="sm"
              size="lg"
            >
              Request Quotation
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-white/20">
            s{" "}
            <a
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              href="mailto:info@navkar.com"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">info@navkar.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
