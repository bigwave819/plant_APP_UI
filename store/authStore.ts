import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}


interface AuthState {
  user: any;
  token: string | null;
  isLoading: boolean;

  register: (
    payload: RegisterPayload
  ) => Promise<{ success: boolean; error?: string }>;

  login: (
    payload: LoginPayload
  ) => Promise<{ success: boolean; error?: string }>;

  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({

  user: null,
  token: null,
  isLoading: false,


  register: async ({ name, email, password }) => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        "https://plant-api-0yg7.onrender.com/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token });

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      set({ isLoading: false });
    }
  },

  // check auth

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem("user")
      const user = userJson ? JSON.parse(userJson) : null;

      set({token, user })
    } catch (error) {
      console.error('Auth Check Failed', error);
      
    }
  },
  // LOGIN
  login: async ({ email, password }) => {
    set({ isLoading: true });

    try {
      const response = await fetch(
        "https://plant-api-0yg7.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Something went wrong");

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({ user: data.user, token: data.token });

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token"),
    await AsyncStorage.removeItem('user'),
    set({ token: null, user: null })
  }

}));
