/*import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userReducer";

//the store where we acces to the data
export const store = configureStore({
  reducer: { auth: useReducer },
});
*/
// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;