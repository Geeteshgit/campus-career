import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "super_admin" | "student";
}

interface StudentProfileData {
  enrollmentNumber: string;
  program: string;
  year: string;
  batch: string;
  specialization: string;
  cgpa: string;
  skills?: string;
}

interface UserState {
  user: UserData | null;
  studentProfile: StudentProfileData | null;
  authLoading: boolean;
}

const initialState: UserState = {
  user: null,
  studentProfile: null,
  authLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{
        user: UserData | null;
        studentProfile?: StudentProfileData | null;
      }>,
    ) {
      state.user = action.payload.user;
      state.studentProfile = action.payload.studentProfile ?? null;
      state.authLoading = false;
    },

    logout(state) {
      state.user = null;
      state.studentProfile = null;
      state.authLoading = false;
    },

    updateUserField(
      state,
      action: PayloadAction<{ field: keyof UserData; value: any }>,
    ) {
      if (state.user) {
        state.user[action.payload.field] = action.payload.value;
      }
    },

    updateStudentField(
      state,
      action: PayloadAction<{ field: keyof StudentProfileData; value: any }>,
    ) {
      if (state.studentProfile) {
        state.studentProfile[action.payload.field] = action.payload.value;
      }
    },
  },
});

export const { login, logout, updateUserField, updateStudentField } =
  userSlice.actions;

export default userSlice.reducer;
