import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  name: string;
  enrollmentNumber: string;
  department?: string;
  year?: string;
  phone?: string;
  cgpa?: string;
  skills?: string;
  role: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: UserData | null;
}

const initialState: UserState = {
  isAuthenticated: true,
  user: {
    name: "Geetesh",
    enrollmentNumber: "E23CSEU0361",
    department: "Computer Science",
    year: "3rd Year",
    phone: "+91 9876543210",
    cgpa: "8.5",
    skills: "React, Tailwind, Node.js",
    role: "super_admin"
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserData>) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUserField(
      state,
      action: PayloadAction<{ field: keyof UserData; value: string }>
    ) {
      if (state.user) {
        state.user[action.payload.field] = action.payload.value;
      }
    },
  },
});

export const { login, logout, updateUserField } = userSlice.actions;
export default userSlice.reducer;
