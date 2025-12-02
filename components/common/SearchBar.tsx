"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@heroui/input";
import { Card, CardBody } from "@heroui/card";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";
import { productAPI } from "@/utils/server";

interface Product {
  _id: string;
  name: string;
  materialOfConstruction: string;
  capType: string;
  imageUrl: string;
  variants?: Array<{ sizeLabel: string }>;
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Search products when debounced query changes
  useEffect(() => {
    const searchProducts = async () => {
      if (!debouncedSearchQuery.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const products = await productAPI.searchProducts(
          debouncedSearchQuery,
          5
        );
        setResults(products);
        setIsOpen(products.length > 0);
        setSelectedIndex(-1);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
        setIsOpen(false);
      } finally {
        setIsLoading(false);
      }
    };

    searchProducts();
  }, [debouncedSearchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          window.location.href = `/products/${results[selectedIndex]._id}`;
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (results.length > 0) setIsOpen(true);
        }}
        startContent={
          <Search className="w-4 h-4 text-secondary-400 flex-shrink-0" />
        }
        endContent={
          searchQuery && (
            <button
              onClick={handleClearSearch}
              className="text-secondary-400 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )
        }
        classNames={{
          base: "w-full",
          mainWrapper: "h-10",
          input: "text-sm !text-secondary-900",
          inputWrapper:
            "border border-secondary-200 !bg-white shadow-sm h-10 focus-within:!border-white",
        }}
        aria-label="Search products"
      />

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card
          className="absolute top-full mt-2 w-full z-50 shadow-lg border border-secondary-200 max-h-[400px] overflow-hidden bg-white"
          radius="sm"
        >
          <CardBody className="p-0 bg-white">
            {isLoading ? (
              <div className="p-4 text-center text-secondary-600 text-sm bg-white">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-secondary-200 bg-white">
                {results.map((product, index) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    onClick={handleResultClick}
                    className={`flex items-center gap-3 p-3 bg-white hover:bg-secondary-50 transition-colors ${
                      selectedIndex === index ? "!bg-accent/10" : ""
                    }`}
                  >
                    <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-secondary-100">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-secondary-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-secondary-600 truncate">
                        {product.materialOfConstruction} • {product.capType}
                      </p>
                      {product.variants && product.variants.length > 0 && (
                        <p className="text-xs text-secondary-500 mt-0.5">
                          {product.variants.length} variant
                          {product.variants.length !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-secondary-600 text-sm bg-white">
                No products found
              </div>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
}
