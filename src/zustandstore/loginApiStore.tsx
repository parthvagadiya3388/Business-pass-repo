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

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const localUser = users.find((user: any) =>
        (user.email === username_or_email || user.name === username_or_email) && user.password === password
      );

      if (localUser) {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5NTc1MjA0LCJpYXQiOjE3MTk1NzE2MDQsImp0aSI6ImQxOWY4NmE3ZDVjNjQ5NTA4ZmJmZDY0NTA4ZGFkNjk0IiwidXNlcl9pZCI6MX0.eAPQdXsRA3GJF7_FmUznpke1bgHV60yTMk4K4ZnR26M';
        localStorage.setItem('token', token);
        set({ isAuthenticated: true });
        navigate('/userlist');

        const username = localUser.name;
        const email = localUser.email;
        const phone = localUser.phone_number;
        const country = localUser.country;
        const user_type = localUser.user_type;

        localStorage.setItem('username',username);
        localStorage.setItem('email',email);  
        localStorage.setItem('phone',phone);  
        localStorage.setItem('country',country);  
        localStorage.setItem('user_type',user_type);  

      } 
      else{
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
    localStorage.removeItem('phone');
    localStorage.removeItem('country');
    localStorage.removeItem('user_type');
    set({ isAuthenticated: false, username_or_email: '', password: '', error: '', usernameError: '', passwordError: '' });
  }
}));

export default useLoginStore;
