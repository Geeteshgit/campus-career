import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Program {
  _id: string;
  name: string;
}

export interface AcademicState {
  programs: Program[];
}

const initialState: AcademicState = {
  programs: [],
};

export const academicSlice = createSlice({
  name: "academic",
  initialState,
  reducers: {
    setPrograms(state, action: PayloadAction<Program[]>) {
      state.programs = action.payload;
    },
  },
});

export const {
  setPrograms,
} = academicSlice.actions;

export default academicSlice.reducer;
