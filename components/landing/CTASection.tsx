"use client";

export default function CTASection() {
  return (
    <section
      className="py-20 text-white relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0ea5e9, #0284c7)" }}
    >
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
          <div className="text-4xl text-white/90 md:text-5xl font-bold tracking-tight">
            Ready to Get Started?
          </div>
          <p className="text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto">
            Contact us today for a personalized quotation on our premium
            industrial packaging solutions. Our team is ready to help you find
            the perfect products for your needs.
          </p>
        </div>
      </div>
    </section>
  );
}
