import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice';
import academicReducer from "./features/academic/academicSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    academic: academicReducer
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']