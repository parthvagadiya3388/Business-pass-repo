import { create } from "zustand";

interface UserState {
  name: string;
  email: string;
  country: string;
  phone_number: string;
  key: string;
  user_type: string;
  username_or_email: any;
  password: any;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setCountry: (country: string) => void;
  setPhoneNumber: (phone_number: string) => void;
  setKey: (key: string) => void;
  setUserType: (user_type: string) => void;
  setUsername_or_email: (username_or_email: any) => void;
  setPassword: (password: any) => void;
}

const useStore = create<UserState>((set) => ({
  name: '',
  email: '',
  country: '',
  phone_number: '',
  key: '',
  user_type: '',
  username_or_email: '',
  password: '',
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setCountry: (country) => set({ country }),
  setPhoneNumber: (phone_number) => set({ phone_number }),
  setKey: (key) => set({ key }),
  setUserType: (user_type) => set({ user_type }),
  setUsername_or_email: (username_or_email) => set({ username_or_email :username_or_email }),
  setPassword: (password) => set({ password: password })
}));

export default useStore;
