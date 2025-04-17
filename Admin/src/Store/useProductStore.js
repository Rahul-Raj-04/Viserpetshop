/* eslint-disable no-unused-vars */
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { Baseurl } from "../Config";

const useProductStore = create((set) => ({
  loading: false,
  categories: [],
  websiteSettings: null,
  products: [],
  totalProducts: 0,
  editCategory: null,
  singleProduct: null,

  addProduct: async (product) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();

      for (const key in product) {
        if (key !== "image") {
          formData.append(key, product[key]);
        }
      }

      if (product.image && Array.isArray(product.image)) {
        product.image.forEach((file) => formData.append("image", file));
      } else if (product.image) {
        formData.append("image", product.image);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(
        `${Baseurl}Product/add`,
        formData,
        config
      );
      toast.success("Product added successfully!");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product.");
      return { success: false };
    }
  },
  uploadProductsCSV: async (csvData) => {
    try {
      if (!csvData || !Array.isArray(csvData) || csvData.length === 0) {
        throw new Error("CSV data is empty or invalid.");
      }
  
      const response = await axios.post(`${Baseurl}Product/bulk-upload`, {
        products: csvData,
      });
  
      if (response.status === 201) {
        toast.success("Products uploaded successfully!");
        await useProductStore.getState().fetchProducts(); // Refresh product list
        return { success: true };
      } else {
        throw new Error("Bulk upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload products.");
      return { success: false };
    }
  },
  
  updateProduct: async (product, id) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();

      // Append all non-image fields
      for (const key in product) {
        if (key !== "image" && key !== "imageFile" && key !== "tags") {
          formData.append(key, product[key]);
        }
      }

      // Append tags (if it's an array)
      if (Array.isArray(product.tags)) {
        product.tags.forEach((tag) => {
          formData.append("tags[]", tag);
        });
      }

      // Append image files (not image URLs)
      if (product.imageFile && Array.isArray(product.imageFile)) {
        product.imageFile.forEach((file) => {
          if (file instanceof File) {
            formData.append("image", file);
          }
        });
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.patch(
        `${Baseurl}Product/update?id=${id}`,
        formData,
        config
      );

      toast.success("Product updated successfully!");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
      return { success: false };
    }
  },
  setSingleProduct: (product) => set({ singleProduct: product }),
  fetchSingleProduct: async (id) => {
    try {
      const { data } = await axios.get(`${Baseurl}Product/product?id=${id}`);
      if (data.success) {
        set({ singleProduct: data.product }); // store it in Zustand
        return { success: true, product: data.data };
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch product");
      return { success: false };
    }
  },

  fetchProducts: async () => {
    try {
      const { data } = await axios.get(`${Baseurl}Product/products`);
      if (data.success) {
        set({ products: data.data, totalProducts: data.total });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load products");
      console.error("Error fetching products:", error);
    }
  },
  deleteProduct: async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}Product/delete?id=${id}`);
      if (data.success) {
        set((state) => ({
          products: state.products.filter((product) => product._id !== id),
        }));
        toast.success("Product deleted successfully!");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete product");
      console.error("Error deleting product:", error);
    }
  },
  deleteMultipleProducts: async (ids) => {
    try {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new Error("Invalid request, provide an array of product IDs");
      }

      const res = await axios.delete(`${Baseurl}Product/multiple-delete`, {
        data: { ids }, // ✅ Pass `ids` in the `data` property
      });

      if (res.data.success) {
        set((state) => ({
          products: state.products.filter((p) => !ids.includes(p._id)),
        }));
        toast.success("Products deleted successfully!");
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete products");
      console.error("Error deleting multiple products:", error);
    }
  },

  // ✅ Categories Fetch
  fetchCategories: async () => {
    try {
      const { data } = await axios.get(`${Baseurl}category/allcategory`);
      set({ categories: data.data });
    } catch (error) {
      toast.error("Failed to load categories");
      console.error("Error fetching categories:", error);
    }
  },

  // ✅ Category Add
  addCategory: async (formData) => {
    try {
      const res = await axios.post(`${Baseurl}category/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.success) {
        set((state) => ({ categories: [...state.categories, res.data.data] }));
        toast.success("Category added successfully!");
      }
    } catch (error) {
      toast.error("Failed to add category");
      console.error("Error adding category:", error);
    }
  },
  setEditCategory: (category) => set({ editCategory: category }),

  updateCategory: async (categoryId, updatedData, imageFile) => {
    set({ loading: true, error: null });
    try {
      const formData = new FormData();
      if (updatedData.name) formData.append("name", updatedData.name);
      if (updatedData.slug) formData.append("slug", updatedData.slug);
      if (updatedData.description)
        formData.append("description", updatedData.description);
      if (updatedData.parent) formData.append("parent", updatedData.parent);
      if (typeof updatedData.isCreateAsParentCategory !== "undefined") {
        formData.append(
          "isCreateAsParentCategory",
          updatedData.isCreateAsParentCategory
        );
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.patch(
        `${Baseurl}category/update/${categoryId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === categoryId ? response.data.data : cat
        ),
        editCategory: null,
        loading: false,
      }));

      toast.success("Category updated successfully!");
    } catch (error) {
      console.error("❌ Error updating category:", error);
      set({ error: "Failed to update category", loading: false });
      toast.error("Failed to update category. Please try again.");
    }
  },
  addBulkCategories: async (categories) => {
    try {
      if (!Array.isArray(categories) || categories.length === 0) {
        throw new Error("Please provide an array of categories");
      }

      const res = await axios.post(`${Baseurl}category/bulk-upload`, {
        categories,
      });

      if (res.data && res.data.success) {
        set((state) => ({
          categories: [...state.categories, ...res.data.data],
        }));
        toast.success("Categories uploaded successfully!");
      } else {
        throw new Error(res.data.message || "Bulk upload failed");
      }
    } catch (error) {
      toast.error(error.message || "Failed to upload categories");
      console.error("Error uploading bulk categories:", error);
    }
  },
  // ✅ Category Delete
  deleteCategory: async (id) => {
    try {
      await axios.delete(`${Baseurl}category/delete?id=${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
      }));
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete category");
      console.error("Error deleting category:", error);
    }
  },

  deleteMultipleCategory: async (ids) => {
    try {
      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        throw new Error("Invalid request, provide an array of product IDs");
      }

      const res = await axios.delete(`${Baseurl}Product/multiple-delete`, {
        data: { ids }, // ✅ Pass `ids` in the `data` property
      });

      if (res.data.success) {
        set((state) => ({
          products: state.products.filter((p) => !ids.includes(p._id)),
        }));
        toast.success("Products deleted successfully!");
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete products");
      console.error("Error deleting multiple products:", error);
    }
  },

  fetchWebsiteSettings: async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        toast.error("Unauthorized: No access token found");
        return null;
      }

      const res = await axios.get(`${Baseurl}website`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data) {
        set({ websiteSettings: res.data }); // Store settings in Zustand state
        return res.data;
      } else {
        throw new Error("Failed to fetch website settings");
      }
    } catch (error) {
      toast.error("Failed to load website settings");
      console.error("Error fetching website settings:", error);
      return null;
    }
  },
  updateWebsiteSettings: async (formData) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const res = await axios.patch(`${Baseurl}website/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.data && res.data.success) {
        toast.success("Website settings updated successfully!");
        set({ websiteSettings: res.data.settings });
        return res.data.settings;
      } else {
        throw new Error(res.data.message || "Failed to update settings");
      }
    } catch (error) {
      toast.error("Failed to update website settings");
      console.error("Error updating website settings:", error);
      return null;
    }
  },

  // Inside your Zustand store
}));

export default useProductStore;
