import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Program {
  _id: string;
  name: string;
}

export interface AcademicState {
  programs: Program[];
  initialized: boolean; 
}

const initialState: AcademicState = {
  programs: [],
  initialized: false,
};

export const academicSlice = createSlice({
  name: "academic",
  initialState,
  reducers: {
    setPrograms(state, action: PayloadAction<Program[]>) {
      state.programs = action.payload;
      state.initialized = true;
    },

    resetAcademic(state) {
      state.programs = [];
      state.initialized = false;
    },
  },
});

export const {
  setPrograms,
  resetAcademic,
} = academicSlice.actions;

export default academicSlice.reducer;
