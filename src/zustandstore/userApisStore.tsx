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
}

const useUserStore = create<UserState>((set) => ({
  users: [],
  error: '',

  userApis: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/users/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("--------userllist----------",response.data.message);

      if (response.data && Array.isArray(response.data.data)) {
        set({ users: response.data.data, error: '' });
      } else {
        set({ error: 'Invalid data format' });
      }
    } catch (error) {
      set({ error: 'Error fetching data' });
    }
  },
}));

export default useUserStore;
