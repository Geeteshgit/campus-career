import { create } from "zustand";
import { Role } from "./types/auth.types";

type UserData = {
  id: string;
  name: string;
  role: Role;
};

type AuthStore = {
  user: UserData | null;
  authLoading: boolean;

  login: (user: UserData | null) => void;
  logout: () => void;
  setAuthLoading: (authLoading: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  authLoading: false,
  login: (user) =>
    set({
      user,
      authLoading: false,
    }),
  logout: () =>
    set({
      user: null,
      authLoading: false,
    }),
  setAuthLoading: (authLoading) => set({ authLoading }),
}));
