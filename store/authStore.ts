import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: any;
  token: string | null;
  isLoading: boolean;
  register: (payload: RegisterPayload) => Promise<{ success: boolean; error?: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,

  register: async ({ name, email, password }) => {
    set({ isLoading: true });
    try {
      const response = await fetch('https://plant-api-0yg7.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Something went wrong');

      // Save to async storage
      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('token', data.token);

      set({
        token: data.token,
        user: data.user,
        isLoading: false,
      });

      return { success: true };
    } catch (err: any) {
      set({ isLoading: false });
      return { success: false, error: err.message };
    }
  },
}));
