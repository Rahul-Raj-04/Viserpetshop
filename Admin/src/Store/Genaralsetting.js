/* eslint-disable no-unused-vars */
import axios from "axios";
import { create } from "zustand";
import { Baseurl } from "../Config";
import { toast } from "react-hot-toast";

const useGenarlStore = create((set) => ({
  blogs: [],
  banners: [],
  customers: [],
  loading: false,
  error: null,
  editBanner: null,

  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(Baseurl + "blog");
      set({ blogs: response.data.blogs, loading: false });
    } catch (error) {
      console.error("❌ Error fetching blogs:", error);
      set({ error: "Failed to fetch blogs", loading: false });
      toast.error("Failed to fetch blogs. Please try again.");
    }
  },

  addBlog: async (sections, images, metaData = {}) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("sections", JSON.stringify(sections));
  
      images.forEach((image) => {
        formData.append("images", image);
      });
  
      // ✅ Match the schema field names
      if (metaData.metaTitle) {
        formData.append("metaTitle", metaData.metaTitle);
      }
      if (metaData.metaDescription) {
        formData.append("metaDescription", metaData.metaDescription);
      }
      if (metaData.metaKeywords) {
        formData.append("metakeywords", JSON.stringify(metaData.metaKeywords)); // not metaTags
      }
  
      const response = await axios.post(Baseurl + "blog/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      set((state) => ({
        blogs: [...state.blogs, response.data.blog],
        loading: false,
      }));
  
      toast.success("Blog added successfully!");
    } catch (error) {
      console.error("❌ Error adding blog:", error);
      set({ error: "Failed to add blog", loading: false });
      toast.error("Failed to add blog. Please try again.");
    }
  },
  
  deleteBlog: async (blogId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(Baseurl + `blog/delete?id=${blogId}`);

      if (response.data.success) {
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog._id !== blogId), // Remove deleted blog
          loading: false,
        }));
        toast.success("Blog deleted successfully!"); // Success toast
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("❌ Error deleting blog:", error);
      set({ error: "Failed to delete blog", loading: false });
      toast.error("Failed to delete blog. Please try again."); // Error toast
    }
  },

  fetchBanners: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(Baseurl + "banner");
      set({ banners: response.data.data, loading: false });
    } catch (error) {
      console.error("❌ Error fetching banners:", error);
      set({ error: "Failed to fetch banners", loading: false });
      toast.error("Failed to fetch banners. Please try again.");
    }
  },

  // Add Banner
  addBanner: async (bannerData, imageFile) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("title", bannerData.title);
      formData.append("subtitle", bannerData.subtitle);
      formData.append("link", bannerData.link);
      formData.append("isActive", bannerData.isActive);
      formData.append("displayOrder", bannerData.displayOrder);
      formData.append("place", bannerData.place);
      formData.append("type", bannerData.type);
      formData.append("image", imageFile);

      const response = await axios.post(Baseurl + "banner/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set((state) => ({
        banners: [...state.banners, response.data.data],
        loading: false,
      }));

      toast.success("Banner added successfully!");
    } catch (error) {
      console.error("❌ Error adding banner:", error);

      let errorMessage = "Failed to add banner";
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorMessage = error.response.data.message; // Backend error message
      }

      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
    }
  },

  // Delete Banner
  deleteBanner: async (bannerId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(
        Baseurl + `banner/delete/${bannerId}`
      );

      if (response.data.success) {
        set((state) => ({
          banners: state.banners.filter((banner) => banner._id !== bannerId),
          loading: false,
        }));
        toast.success("Banner deleted successfully!");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("❌ Error deleting banner:", error);
      set({ error: "Failed to delete banner", loading: false });
      toast.error("Failed to delete banner. Please try again.");
    }
  },

  setEditBanner: (banner) => set({ editBanner: banner }),

  // 🔁 Update Banner
  updateBanner: async (bannerId, updatedData, imageFile) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("subtitle", updatedData.subtitle);
      formData.append("link", updatedData.link);
      formData.append("isActive", updatedData.isActive);
      formData.append("displayOrder", updatedData.displayOrder);
      formData.append("place", updatedData.place);
      formData.append("type", updatedData.type);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.patch(
        `${Baseurl}banner/edit/${bannerId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Replace updated banner in state
      set((state) => ({
        banners: state.banners.map((b) =>
          b._id === bannerId ? response.data.data : b
        ),
        editBanner: null,
        loading: false,
      }));

      toast.success("Banner updated successfully!");
    } catch (error) {
      console.error("❌ Error updating banner:", error);
      set({ error: "Failed to update banner", loading: false });
      toast.error("Failed to update banner. Please try again.");
    }
  },

  fetchCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${Baseurl}user/alluser`);
      const data = await response.json();
      set({ customers: data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  deleteCustomer: async (id) => {
    try {
      const response = await fetch(`${Baseurl}user/delete?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        set((state) => ({
          customers: state.customers.filter((user) => user._id !== id),
        }));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  },
}));

export default useGenarlStore;
