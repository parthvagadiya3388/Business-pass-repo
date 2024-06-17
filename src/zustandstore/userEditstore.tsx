import { create } from "zustand";

type UserEditStore = {
  selectedUser: any; 
  setSelectedUser: (user: any) => void; 
  setIsEdit: (isEdit: boolean) => void;
};

const useUserEditStore = create<UserEditStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
  isEdit: false,
  setIsEdit: (isEdit) => set({ isEdit: isEdit }),
}));

export default useUserEditStore;