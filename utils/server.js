const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Generic API request handler
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Request failed for ${endpoint}:`, error);
    throw error;
  }
}

/**
 * Product API Methods
 */
export const productAPI = {
  /**
   * Get all products
   */
  getProducts: async () => {
    return apiRequest("/products");
  },

  /**
   * Get product by ID
   */
  getProductById: async (id) => {
    return apiRequest(`/products/${id}`);
  },

  /**
   * Create a new product
   */
  createProduct: async (data) => {
    return apiRequest("/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Update a product
   */
  updateProduct: async (id, data) => {
    return apiRequest(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete a product
   */
  deleteProduct: async (id) => {
    return apiRequest(`/products/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Bulk upload products from file
   */
  bulkUploadProducts: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return apiRequest("/products/bulk-upload", {
      method: "POST",
      body: formData,
    });
  },
};

/**
 * Quotation API Methods
 */
export const quotationAPI = {
  /**
   * Create a new quotation
   */
  createQuotation: async (data) => {
    return apiRequest("/quotations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Get all quotations
   */
  getQuotations: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/quotations?${queryString}` : "/quotations";
    return apiRequest(endpoint);
  },

  /**
   * Get quotation by ID
   */
  getQuotationById: async (id) => {
    return apiRequest(`/quotations/${id}`);
  },

  /**
   * Get quotation PDF
   */
  getQuotationPDF: async (id) => {
    const url = `${BASE_URL}/quotations/${id}/pdf`;
    return url; // Returns the URL to redirect to
  },

  /**
   * Resend quotation via WhatsApp
   */
  resendWhatsApp: async (id, options = {}) => {
    return apiRequest(`/quotations/${id}/resend-whatsapp`, {
      method: "POST",
      body: JSON.stringify(options),
    });
  },

  /**
   * Submit quotation enquiry with PDF generation and email
   */
  submitQuotationEnquiry: async (enquiryData) => {
    try {
      // First create the quotation in the backend
      const quotationPayload = {
        userDetails: {
          name: enquiryData.customerDetails.name,
          phone: enquiryData.customerDetails.phone,
          email: enquiryData.customerDetails.email,
        },
        items: enquiryData.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          variant: product.variant || {},
          unitPrice: 0, // Price will be added by backend/admin
          notes: product.productName,
        })),
        notes: enquiryData.message || "Customer enquiry from website",
      };

      const response = await apiRequest("/quotations", {
        method: "POST",
        body: JSON.stringify(quotationPayload),
      });

      const quotation = response.quotation;

      // Now send email via Web3Forms with quotation details
      const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORM_ACCESS_KEY;

      if (!web3formsKey) {
        console.warn("Web3Forms access key not configured");
        return quotation;
      }

      const formData = new FormData();
      formData.append("access_key", web3formsKey);
      formData.append(
        "subject",
        `New Quotation Request - ${quotation.quotationNumber}`
      );
      formData.append("from_name", enquiryData.customerDetails.name);
      formData.append(
        "email",
        enquiryData.customerDetails.email || "noreply@navkar.com"
      );
      formData.append("name", enquiryData.customerDetails.name);
      formData.append("phone", enquiryData.customerDetails.phone);

      // Build product details for email
      const productDetails = enquiryData.products
        .map(
          (p, i) =>
            `${i + 1}. ${p.productName} - Quantity: ${p.quantity}${p.variant ? ` (${p.variant})` : ""}`
        )
        .join("\n");

      formData.append(
        "message",
        `Quotation Number: ${quotation.quotationNumber}\n\nCustomer Details:\nName: ${enquiryData.customerDetails.name}\nPhone: ${enquiryData.customerDetails.phone}\nEmail: ${enquiryData.customerDetails.email || "Not provided"}\n\nProducts Requested:\n${productDetails}\n\nAdditional Message:\n${enquiryData.message || "None"}\n\nQuotation ID: ${quotation._id}`
      );

      // Send to Web3Forms
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      return quotation;
    } catch (error) {
      console.error("Error submitting quotation enquiry:", error);
      throw error;
    }
  },
};

// Default export with all API methods
export default {
  productAPI,
  quotationAPI,
};
