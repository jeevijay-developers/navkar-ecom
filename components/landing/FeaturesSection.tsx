"use client";

import { Card, CardBody } from "@heroui/card";
import { Factory, Shield, Truck, Clock, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: Factory,
    title: "Industrial Grade",
    description:
      "Premium materials built to withstand demanding industrial environments",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Rigorous testing and quality control for every product",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep nationwide",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Efficient processing and manufacturing timelines",
  },
  {
    icon: Award,
    title: "Certified Products",
    description: "ISO certified manufacturing processes and materials",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Dedicated support team for all your queries and needs",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20" style={{ backgroundColor: "#0d0d0d" }}>
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <span
            className="inline-block px-4 py-2 rounded-full text-sm font-semibold tracking-wide"
            style={{ background: "rgba(250, 142, 0, 0.1)", color: "#fa8e00" }}
          >
            Why Choose Us
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #fa8e00, #d43800)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Built for Excellence
          </h2>
          <p
            className="text-lg font-light max-w-2xl mx-auto"
            style={{ color: "#b0b0b0" }}
          >
            We deliver premium industrial packaging solutions with unmatched
            quality and service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-2xl transition-all duration-300 group"
              style={{
                backgroundColor: "#1a1a1a",
                border: "1px solid rgba(250, 142, 0, 0.2)",
              }}
              radius="lg"
            >
              <CardBody className="p-8 space-y-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300"
                  style={{ backgroundColor: "rgba(250, 142, 0, 0.1)" }}
                >
                  <feature.icon
                    className="w-7 h-7 transition-colors duration-300"
                    style={{ color: "#fa8e00" }}
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold" style={{ color: "#ffffff" }}>
                  {feature.title}
                </h3>
                <p
                  className="font-light leading-relaxed"
                  style={{ color: "#b0b0b0" }}
                >
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
