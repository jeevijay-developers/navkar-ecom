"use client";

import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link as HeroUILink } from "@heroui/link";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Phone, Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/#products" },
];

export function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroUINavbar
      maxWidth="full"
      className="border-b border-accent/10 bg-white/98 backdrop-blur-lg shadow-sm fixed top-0 z-50"
      shouldHideOnScroll={false}
      height="4.5rem"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-accent"
        />
      </NavbarContent>

      {/* Brand */}
      <NavbarBrand>
        <Link
          href="/"
          className="font-black text-2xl md:text-3xl text-accent tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <Image
            src="/navkarEcom.png"
            alt="NAVKAR Logo"
            width={70}
            height={70}
            className="object-contain"
            priority
          />
        <span className="font-black text-2xl">NAVKAR</span>
        </Link>
      </NavbarBrand>

      {/* Center Nav Items */}
      <NavbarContent className="hidden md:flex gap-8" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <HeroUILink
              as={Link}
              href={item.href}
              color="foreground"
              className="text-secondary-700 font-medium hover:text-accent transition-colors text-base relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
            </HeroUILink>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Side Actions */}
      <NavbarContent justify="end" className="gap-4">
        {/* Cart Icon with Badge */}
        <NavbarItem>
          <Badge
            content={cartCount > 99 ? "99+" : cartCount}
            color="success"
            placement="top-right"
            size="sm"
            isInvisible={cartCount === 0}
            classNames={{
              badge: "min-w-[18px] h-[18px] text-[8px] font-bold",
            }}
          >
            <Button
              as={Link}
              href="/cart"
              isIconOnly
              variant="light"
              className="text-accent hover:bg-accent/5"
              size="md"
              radius="sm"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Badge>
        </NavbarItem>

        {/* CTA Button */}
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            href="/cart"
            className="bg-accent text-white font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
            size="md"
            radius="sm"
          >
            Get Quote
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-6 bg-white/98 backdrop-blur-lg">
        {navItems.map((item, index) => (
          <NavbarMenuItem key={item.href}>
            <HeroUILink
              as={Link}
              href={item.href}
              className="w-full text-lg font-medium text-secondary-700 hover:text-accent py-3 border-b border-accent/10"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </HeroUILink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="pt-4">
          <Button
            as={Link}
            href="/cart"
            className="w-full bg-accent text-white font-semibold"
            size="lg"
            radius="sm"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Quote
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
}
