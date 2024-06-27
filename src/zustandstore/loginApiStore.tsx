import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';

interface UserState {
  username_or_email: string;
  password: string;
  error: string;
  usernameError: string;
  passwordError: string;
  isAuthenticated: boolean;
  setUsernameOrEmail: (username_or_email: string) => void;
  setPassword: (password: string) => void;
  login: (navigate: Function) => Promise<void>;
  logout: () => void;
}

const useLoginStore = create<UserState>((set) => ({
  username_or_email: '',
  password: '',
  error: '',
  usernameError: '',
  passwordError: '',
  isAuthenticated: !!localStorage.getItem('token'), 
  setUsernameOrEmail: (username_or_email) => set({ username_or_email, usernameError: '', error: '' }),
  setPassword: (password) => set({ password, passwordError: '', error: '' }),

  login: async (navigate) => {
    try {
      const { username_or_email, password } = useLoginStore.getState();
      const response = await axios.post(`${API_URL}/login/`, { username_or_email, password });

      console.log("login responces-----------",response.data);

      if (response.status === 200) {
        const token = response.data.tokens.access;
        const username = response.data.username;
        const email = response.data.email;
        localStorage.setItem('token', token);
        localStorage.setItem('username',username);
        localStorage.setItem('email',email);
        set({ isAuthenticated: true });
        navigate(`/userlist`);
      }
      
    } catch (error: any) {
      if (error.response && error.response.status === 400 && error.response.data) {
        const { username_or_email, password } = error.response.data;
        set({
          usernameError: username_or_email ? username_or_email[0] : '',
          passwordError: password ? password[0] : '',
        });
      } else {
        set({ error: 'Invalid username/email or password' });
      }
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    set({ isAuthenticated: false, username_or_email: '', password: '', error: '', usernameError: '', passwordError: '' });
  }
}));

export default useLoginStore;
