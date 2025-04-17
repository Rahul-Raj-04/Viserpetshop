import axios from "axios";
import { create } from "zustand";

import { toast } from "react-hot-toast";
import { Baseurl } from "../../Config";

const useGenarlStore = create((set) => ({
  blogs: [],
  singleBlog: null,
  loading: false,
  error: null,
  banners: [],
  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(Baseurl + "blog"); // Adjust API endpoint
      set({ blogs: response.data.blogs, loading: false });
    } catch (error) {
      console.error("❌ Error fetching blogs:", error);
      set({ error: "Failed to fetch blogs", loading: false });
      toast.error("Failed to fetch blogs. Please try again."); // Error toast
    }
  },
  fetchSingleBlog: async (blogId) => {
    set({ loading: true, error: null, singleBlog: null });
    try {
      const url = `${Baseurl}blog/single?id=${blogId}`;
      console.log("🚀 Fetching from API:", url);

      const response = await axios.get(url);

      console.log("✅ API Response:", response.data);

      if (response.data.success && response.data.blog) {
        set({ singleBlog: response.data.blog, loading: false });
      } else {
        throw new Error("Blog data not found");
      }
    } catch (error) {
      console.error("❌ Error fetching blog:", error);
      set({ error: "Failed to fetch blog", loading: false });
      toast.error("Failed to fetch blog. Please try again.");
    }
  },

  fetchBanners: async () => {
    set({ loading: true, error: null });

    try {
      const url = `${Baseurl}banner`; // No filters or query params
      console.log("Fetching All Banners from:", url);

      const response = await axios.get(url);
      set({ banners: response.data.data, loading: false });
    } catch (error) {
      console.error("❌ Error fetching banners:", error);
      set({ error: "Failed to fetch banners", loading: false });
      toast.error("Failed to fetch banners. Please try again.");
    }
  },
}));

export default useGenarlStore;
