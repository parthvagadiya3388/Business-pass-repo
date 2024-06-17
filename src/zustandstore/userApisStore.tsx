import axios from 'axios';
import { API_URL } from '../config';
import { create } from 'zustand';

interface User {
  id: number;
  name: string;
  email: string;
  country: string;
  phone_number: string; 
  user_type: string;
  status: string;
}

interface UserState {
  users: User[];
  error: string;
  userApis: (token: string) => Promise<void>;
  deleteUserApis: (token: string, userId: number) => Promise<void>;
  userUpdateApis: (token: string, userId: number, userData: Partial<User>) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  clearSelectedUser: () => void;
  selectedUser: User | null;
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  error: '',
  selectedUser: null,

  userApis: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("--------userllist----------", response.data.message);

      if (response.data && Array.isArray(response.data.data)) {
        set({ users: response.data.data, error: '' });
      } else {
        set({ error: 'Invalid data format' });
      }
    } catch (error) {
      set({ error: 'Error fetching data' });
    }
  },

  deleteUserApis: async (token, userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({
        users: state.users.filter(user => user.id !== userId)
      }));
    } catch (error) {
      set({ error: 'Error deleting user' });
    }
  },

  userUpdateApis: async (token, userId, userData) => {
    try {
      await axios.patch(`${API_URL}/users/${userId}/`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      set((state) => ({
        users: state.users.map(user => user.id === userId ? { ...user, ...userData } : user)
      }));
    } catch (error) {
      set({ error: 'Error updating user' });
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
  clearSelectedUser: () => set({ selectedUser: null }),
}));

export default useUserStore;
