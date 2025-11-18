import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  user: any;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: { name: "Geetesh", enrollmentNumber: "E23CSEU0361" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
