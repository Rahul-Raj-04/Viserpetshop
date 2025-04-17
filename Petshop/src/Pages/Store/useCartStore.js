import { create } from "zustand";
import { toast } from "react-hot-toast";
import { Baseurl } from "../../Config";

const useCartStore = create((set) => ({
  cart: { items: [], total: 0 }, // Ensure cart is never null
  wishlist: [], // Wishlist state
  username: "",
  products: [], // ✅ Store for all products
  productDetails: null, // ✅ Store for all products
  categories: [], // ✅ Add categories state
  orders: [], // Store for user orders

  fetchCategories: async () => {
    try {
      const response = await fetch(`${Baseurl}category/allcategory`);
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch categories");

      set({ categories: data.data || [] }); // ✅ Set categories in store
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  // ✅ Fetch All Products
  fetchProducts: async () => {
    try {
      const response = await fetch(`${Baseurl}Product/products`);
      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to fetch products");

      set({ products: data.data || [] });
    } catch (error) {
      console.error("Fetch Products Error:", error);
      toast.error("Failed to load products");
    }
  },
  fetchProductDetails: async (id) => {
    set({ loading: true });
    try {
      const response = await fetch(`${Baseurl}Product/product?id=${id}`);
      const data = await response.json();

      if (data.success && data.product) {
        set({ productDetails: data.product });
      } else {
        console.error("Product not found");
        set({ productDetails: null });
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      set({ productDetails: null });
    } finally {
      set({ loading: false });
    }
  },
  fetchCart: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        set({ cart: { items: [], total: 0 } }); // ✅ Reset cart when no token
        return;
      }
      const response = await fetch(`${Baseurl}cart/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      });

      const data = await response.json();

      set({
        cart: data.cart || { items: [], total: 0 },
        username: data.username,
      });
    } catch (error) {
      console.error("Fetch Cart Error:", error);
      toast.error(error.message);
    }
  },

  addToCart: async (productId, quantity = 1) => {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      toast.error("Please log in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch(`${Baseurl}cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to add product");

      set({ cart: data.cart || { items: [], total: 0 } });
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Add to Cart Error:", error);
      toast.error(error.message);
    }
  },

  // ✅ Remove Item from Cart
  removeFromCart: async (productId) => {
    try {
      const response = await fetch(`${Baseurl}cart/removeproduct`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to remove item");

      set((state) => {
        const updatedItems = state.cart.items.filter(
          (item) => item.product._id !== productId
        );

        // ✅ Manually calculate total in case API does not return it
        const newTotal = updatedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        return {
          cart: { items: updatedItems, total: newTotal },
        };
      });

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Remove Cart Error:", error);
      toast.error(error.message);
    }
  },

  fetchWishlist: async () => {
    try {
      const authToken = localStorage.getItem("accessToken");
      if (!authToken) return;

      const response = await fetch(`${Baseurl}wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch wishlist");

      set({ wishlist: data.wishlist?.products || [] });
    } catch (error) {
      console.error("Fetch Wishlist Error:", error);
      toast.error(error.message);
      set({ wishlist: [] });
    }
  },

  // ✅ Add to Wishlist
  addToWishlist: async (productId) => {
    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      toast.error("Please log in to add items to your wishlist.");
      return;
    }

    try {
      const response = await fetch(`${Baseurl}wishlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to add to wishlist");

      set((state) => ({
        wishlist: [
          ...state.wishlist,
          data.wishlist.products[data.wishlist.products.length - 1],
        ],
      }));

      toast.success("Product added to wishlist!");
    } catch (error) {
      console.error("Add to Wishlist Error:", error);
      toast.error(error.message);
    }
  },

  // ✅ Remove from Wishlist
  removeFromWishlist: async (productId) => {
    try {
      const response = await fetch(`${Baseurl}wishlist/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to remove from wishlist");

      set((state) => ({
        wishlist: state.wishlist.filter((product) => product._id !== productId),
      }));

      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Remove Wishlist Error:", error);
      toast.error(error.message);
    }
  },

  getUserOrders: async () => {
    try {
      const authToken = localStorage.getItem("accessToken");
      if (!authToken) {
        set({ orders: [] });
        return toast.error("Please log in to view orders.");
      }

      const response = await fetch(`${Baseurl}order/my-orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch orders");

      set({ orders: data || [] });
    } catch (error) {
      console.error("Error fetching user orders:", error);
      toast.error("Failed to load orders");
    }
  },
}));

export default useCartStore;
