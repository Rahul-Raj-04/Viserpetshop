import { create } from "zustand";
import { toast } from "react-hot-toast";
import { Baseurl } from "../../Config"; // Ensure correct base URL
import axios from "axios";

const useAuthStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  settings: null, // Store website settings

  // ✅ Login Function
  login: async (emailOrPhone, password) => {
    try {
      const response = await fetch(`${Baseurl}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return false;
      }

      // ✅ Store accessToken & refreshToken
      set({
        authUser: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });

      // ✅ Save to localStorage for persistence
      localStorage.setItem("authUser", JSON.stringify(result.user));
      localStorage.setItem("accessToken", result.accessToken);

      toast.success("Login successful!");
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
      return false;
    }
  },

  // ✅ Logout Function
  logout: async () => {
    try {
      const response = await fetch(`${Baseurl}user/logout`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // ✅ Token bhejo
        },
      });

      if (!response.ok) {
        toast.error("Logout failed!");
        return;
      }

      // ✅ Remove user data from state & storage
      set({ authUser: null, accessToken: null });

      localStorage.removeItem("authUser");
      localStorage.removeItem("accessToken");

      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Something went wrong.");
    }
  },

  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await fetch(`${Baseurl}user/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Failed to change password");
        return false;
      }

      toast.success("Password changed successfully!");
      return true;
    } catch (error) {
      console.error("Change password error:", error);
      toast.error("Something went wrong. Please try again.");
      return false;
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await fetch(`${Baseurl}user/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return false;
      }

      toast.success("Password reset link sent to your email.");
      return true;
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Something went wrong. Please try again.");
      return false;
    }
  },

  // ✅ Reset Password
  resetPassword: async (id, token, newPassword) => {
    try {
      const response = await fetch(
        `${Baseurl}user/reset-password?id=${id}&token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message);
        return false;
      }

      toast.success("Password reset successfully!");
      return true;
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Something went wrong. Please try again.");
      return false;
    }
  },
  fetchSettings: async () => {
    try {
      const response = await fetch(`${Baseurl}website`);
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      set({ settings: result });
    } catch (error) {
      console.error("Fetch settings error:", error);
      toast.error("Failed to load website settings");
    }
  },

  sendContactForm: async ({ name, email, number, message }) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${Baseurl}website/sendform`, {
        name,
        email,
        number,
        message,
      });

      if (response.data.success) {
        toast.success("Message sent successfully!");
      } else {
        throw new Error(response.data.message || "Failed to send message");
      }

      set({ loading: false });
    } catch (error) {
      console.error("❌ Error sending contact form:", error);
      set({ error: "Failed to send message", loading: false });
      toast.error("Failed to send message. Please try again.");
    }
  },
}));

export default useAuthStore;
