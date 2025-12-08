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
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/context/CartContext";
import { SearchBar } from "@/components/common/SearchBar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/products" },
];

export function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeroUINavbar
      className="border-b border-accent/10 bg-white/98 backdrop-blur-lg shadow-sm fixed top-0 z-50 py-3"
      height="4rem"
      isMenuOpen={isMenuOpen}
      maxWidth="2xl"
      shouldHideOnScroll={false}
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
          className="font-black text-2xl md:text-3xl text-accent tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
          href="/"
        >
          <Image
            priority
            alt="NAVKAR Logo"
            className="object-contain"
            height={70}
            src="/navkarEcom.png"
            width={70}
          />
        </Link>
      </NavbarBrand>
      {/* Center Nav Items */}
      <NavbarContent className="hidden md:flex gap-8" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.href}>
            <HeroUILink
              as={Link}
              className="text-secondary-700 font-medium hover:text-accent transition-colors text-base relative group"
              color="foreground"
              href={item.href}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </HeroUILink>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right Side Actions */}
      <NavbarContent className="gap-4" justify="end">
        {/* Search Bar - Desktop */}
        <NavbarContent
          className="hidden md:flex flex-1 max-w-md"
          justify="center"
        >
          <SearchBar />
        </NavbarContent>
        {/* Cart Icon with Badge */}
        <NavbarItem>
          <Badge
            classNames={{
              badge: "min-w-[18px] h-[18px] text-[8px] font-bold",
            }}
            color="success"
            content={cartCount > 99 ? "99+" : cartCount}
            isInvisible={cartCount === 0}
            placement="top-right"
            size="sm"
          >
            <Button
              isIconOnly
              as={Link}
              className="text-accent hover:bg-accent/5"
              href="/cart"
              radius="sm"
              size="md"
              variant="light"
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Badge>
        </NavbarItem>

        {/* CTA Button */}
        <NavbarItem className="hidden sm:flex">
          <Button
            as={Link}
            className="bg-accent text-white font-semibold hover:bg-accent/90 transition-all shadow-md hover:shadow-lg"
            href="/cart"
            radius="sm"
            size="md"
          >
            Get Quote
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="pt-6 bg-white/98 backdrop-blur-lg">
        {/* Search Bar - Mobile */}
        <div className="px-4 pb-4 border-b border-accent/10">
          <SearchBar />
        </div>

        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <HeroUILink
              as={Link}
              className="w-full text-lg font-medium text-secondary-700 hover:text-accent py-3 border-b border-accent/10"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </HeroUILink>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem className="pt-4">
          <Button
            as={Link}
            className="w-full bg-accent text-white font-semibold"
            href="/cart"
            radius="sm"
            size="lg"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Quote
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
}
