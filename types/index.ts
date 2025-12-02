import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

/**
 * Product Variant Type
 */
export interface ProductVariant {
  sizeLabel: string;
  brimfulCapacity: string;
  neckSize: string;
  totalHeight: string;
  diameter: string;
  labelHeight: string;
  standardWeight: string;
}

/**
 * Product Type
 */
export interface Product {
  _id: string;
  name: string;
  materialOfConstruction: string;
  capType: string;
  imageUrl: string;
  imagePublicId: string;
  description?: string;
  variants: ProductVariant[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Quotation Item Type
 */
export interface QuotationItem {
  productId: string;
  productName: string;
  productImageUrl: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant?: ProductVariant;
  notes?: string;
}

/**
 * Quotation Pricing Type
 */
export interface QuotationPricing {
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discount: number;
  total: number;
}

/**
 * User Details Type
 */
export interface UserDetails {
  name: string;
  email?: string;
  phone: string;
  companyName?: string;
  address?: string;
}

/**
 * Quotation Type
 */
export interface Quotation {
  _id: string;
  quotationNumber: string;
  userId?: string;
  userDetails: UserDetails;
  items: QuotationItem[];
  pricing: QuotationPricing;
  status: "draft" | "sent" | "accepted" | "rejected";
  validUntil: string;
  notes?: string;
  pdfUrl?: string;
  pdfPublicId?: string;
  whatsappUserStatus?: {
    sent: boolean;
    sentAt?: string;
    messageId?: string;
    error?: string;
  };
  whatsappCompanyStatus?: {
    sent: boolean;
    sentAt?: string;
    messageId?: string;
    error?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
