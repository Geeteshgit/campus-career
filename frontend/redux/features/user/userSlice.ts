import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  name: string;
  email: string;
  phone: string;
  role: string;
}

interface UserState {
  isAuthenticated: boolean;
  user: UserData | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
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
