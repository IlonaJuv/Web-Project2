import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userReducer";

//the store where we acces to the data
export const store = configureStore({
  reducer: { auth: useReducer },
});
