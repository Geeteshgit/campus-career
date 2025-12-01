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
  cgpa: string;
  skills?: string;
  resumeUrl?: string;
}

interface Job {
  _id: string;
  company: string;
  role: string;
  location: string;
  deadline: string;
  description: string;
  requirements: string[];
  eligibility: string;
  package: string;
  positions: number;
  type: string;
  status: "Active" | "Inactive";
  createdAt: string;
}

interface UserState {
  user: UserData | null;
  studentProfile: StudentProfileData | null;
  recommendations: Job[];
  recommendationsLoaded: boolean;
}

const initialState: UserState = {
  user: null,
  studentProfile: null,
  recommendations: [],
  recommendationsLoaded: false,
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
      }>
    ) {
      state.user = action.payload.user;

      if (action.payload.studentProfile) {
        state.studentProfile = action.payload.studentProfile;
      }
    },

    logout(state) {
      state.user = null;
      state.studentProfile = null;
      state.recommendations = [];
    },

    updateUserField(
      state,
      action: PayloadAction<{ field: keyof UserData; value: any }>
    ) {
      if (state.user) {
        state.user[action.payload.field] = action.payload.value;
      }
    },

    updateStudentField(
      state,
      action: PayloadAction<{ field: keyof StudentProfileData; value: any }>
    ) {
      if (state.studentProfile) {
        state.studentProfile[action.payload.field] = action.payload.value;
      }
    },
    setRecommendations(state, action: PayloadAction<Job[]>) {
      state.recommendations = action.payload;
      state.recommendationsLoaded = true;
    },
    clearRecommendations(state) {
      state.recommendations = [];
      state.recommendationsLoaded = false;
    },
  },
});

export const {
  login,
  logout,
  updateUserField,
  updateStudentField,
  setRecommendations,
  clearRecommendations
} = userSlice.actions;

export default userSlice.reducer;
