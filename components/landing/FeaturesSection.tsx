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
    <section className="py-20 bg-secondary-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold tracking-wide">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-accent tracking-tight">
            Built for Excellence
          </h2>
          <p className="text-secondary-600 text-lg font-light max-w-2xl mx-auto">
            We deliver premium industrial packaging solutions with unmatched
            quality and service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-accent/10 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white group"
              radius="lg"
            >
              <CardBody className="p-8 space-y-4">
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <feature.icon
                    className="w-7 h-7 text-accent group-hover:!text-white transition-colors duration-300"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold text-accent">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 font-light leading-relaxed">
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
