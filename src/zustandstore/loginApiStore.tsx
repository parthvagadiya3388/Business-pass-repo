import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';

interface UserState {
  username_or_email: string;
  password: string;
  error: string;
  setUsernameOrEmail: (username_or_email: string) => void;
  setPassword: (password: string) => void;
  login: (navigate: Function) => Promise<void>;
}

const useLoginStore = create<UserState>((set) => ({

  username_or_email: 'admin',
  password: '',
  error: '',
  setUsernameOrEmail: (username_or_email) => set({ username_or_email }),
  setPassword: (password) => set({ password }),

  login: async (navigate) => {
    try {
      const { username_or_email, password } = useLoginStore.getState();
      const response = await axios.post(`${API_URL}/login/`, { username_or_email, password });

      console.log("store login----------",response);

      if (response.status === 200) {
        const token = response.data.tokens.access;
        navigate(`/userpage?token=${token}`);
      }
    } catch (error: any) {
      set({ error: 'Invalid username/email or password' });
    }
  }
}));

export default useLoginStore;
