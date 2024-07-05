import axios from 'axios';
import { API_URL } from '../config';
import { create } from 'zustand';

interface User {
  id: number;
  key: number;
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
  setError: (errorMessage: string) => void;
  userApis: (token: string) => Promise<void>;
  deleteUserApis: (token: string, userId: number) => Promise<void>;
  addUser: (token: string, userData: Omit<User, 'id'>) => Promise<void>;
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
          Authorization: `Bearer ${token}`
        }
      });

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

  addUser: async (token, userData) => {
    try {
      const response = await axios.post(`${API_URL}/users/`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("add user dataa--------------error" ,response);

      if (response.status === 201) {
        set((state) => ({
          users: [...state.users, response.data]
        }));
      } else {
        set({ error: 'Error adding user: Invalid response from server' });
      }
    } catch (error: any) {
      if (error.response && error.response.data === 400 ) {
         console.log("error add time----",error.response.data.errors);
          set({error: error.response.data.errors});
      } else {
        set({ error: 'Error adding user' });
      }
    } 
  },

  userUpdateApis: async (token, userId, userData) => {
    try {
      const response = await axios.patch(`${API_URL}/users/${userId}/`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('user update response:--------', response);

      if (response.status === 200) {
        set((state) => ({
          users: state.users.map(user => user.id === userId ? { ...user, ...userData } : user)
        }));
      } else {
        set({ error: 'Error updating user: Invalid response from server' });
      }
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        console.log("Error update time----",error.response.data.errors);
          set({error: error.response.data.errors});
      } else {
        set({ error: 'Error updating user' });
      }
    }
  },  


  setSelectedUser: (user) => set({ selectedUser: user }),
  clearSelectedUser: () => set({ selectedUser: null }),

  setError: (errorMessage) => set({ error: errorMessage }),
}));

export default useUserStore;
