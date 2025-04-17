/* eslint-disable no-unused-vars */
import { create } from "zustand";

import toast from "react-hot-toast";
import { Baseurl } from "../Config";
import axios from "axios";

const useOrderStore = create((set, get) => ({
  order: null,
  status: "",
  orders: [],
  filteredOrders: [],
  transactions: [],
  selectedTransaction: null,
  loading: false,
  error: "",
  searchQuery: "",
  selectedStatus: "",

  fetchOrder: async (id) => {
    try {
      const res = await fetch(`${Baseurl}order/orders/${id}`);
      const data = await res.json();
      set({ order: data, status: data.status });
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  },

  changeStatus: (newStatus) => {
    set({ status: newStatus });
  },

  saveStatus: async (orderId) => {
    const { status, order } = get();
    try {
      const res = await fetch(`${Baseurl}order/update?orderId=${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update order status");
      }

      set({ order: { ...order, status } });
      toast.success("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.message || "Failed to update order status!");
    }
  },
  fetchOrders: async () => {
    set({ loading: true, error: "" });
    try {
      const response = await axios.get(`${Baseurl}order`);
      set({ orders: response.data, filteredOrders: response.data });
    } catch (err) {
      set({ error: "Failed to load orders" });
    } finally {
      set({ loading: false });
    }
  },

  filterOrders: () => {
    const { orders, searchQuery, selectedStatus } = get();
    let filtered = orders;

    if (searchQuery) {
      filtered = filtered.filter((order) =>
        order.orderID.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    set({ filteredOrders: filtered });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterOrders();
  },

  setSelectedStatus: (status) => {
    set({ selectedStatus: status });
    get().filterOrders();
  },

  fetchTransactions: async () => {
    set({ loading: true, error: "" });
    try {
      const response = await axios.get(`${Baseurl}transaction/all`);
      set({ transactions: response.data.data });
    } catch (err) {
      set({ error: "Failed to load transactions" });
    } finally {
      set({ loading: false });
    }
  },
  fetchTransactionById: async (transactionId) => {
    try {
      const response = await axios.get(
        `${Baseurl}transaction?id=${transactionId}`
      );

      if (response.data && response.data.data) {
        set({ selectedTransaction: response.data.data }); // ✅ Sirf selectedTransaction update ho raha hai
      } else {
        set({ error: "Transaction not found" });
      }
    } catch (err) {
      set({ error: "Failed to load transaction" });
    }
  },
  setSelectedTransaction: (transaction) => {
    set({ selectedTransaction: transaction }); // Direct transaction store karna
  },
}));

export default useOrderStore;
