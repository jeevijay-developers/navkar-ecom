import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-[4.5rem]">{children}</main>
            <footer className="w-full bg-accent text-white">
              <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* Brand */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-white text-accent px-2 py-1 rounded-lg text-xl font-black">
                        N
                      </span>
                      <span className="font-black text-2xl">NAVKAR</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed max-w-md">
                      Premium industrial packaging solutions engineered for
                      excellence. Quality products backed by years of expertise
                      in the industry.
                    </p>
                  </div>
                  {/* Contact */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Contact</h4>
                    <ul className="space-y-2 text-white/70 text-sm">
                      <li>+91 98765 43210</li>
                      <li>info@navkar.com</li>
                      <li>Mumbai, India</li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/50 text-sm">
                  <p>
                    © {new Date().getFullYear()} Navkar. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
