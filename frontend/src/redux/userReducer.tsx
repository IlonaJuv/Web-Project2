
/* eslint-disable no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import User from '../interfaces/User';
import { RootState } from "../redux/store";
import { signup, signin } from '../services/userService';

export interface UserState {
  loading: boolean;
  user: User;
  error: string | undefined;
  token: string;
}

const initialState: UserState = {
  loading: false,
  user: {},
  error: "",
  token: "",
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.user = {};
      state.token = "";
      state.error = "";
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
      console.log("state.user, ", state.user)
      console.log("action.payload, ", action.payload)
      console.log("reducer token", action.payload.token)
      state.token = action.payload.token as string
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    });
    builder.addCase(signin.pending, (state, action) => {
      state.loading = true
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
      console.log("state.user, ", state.user)
      console.log("action.payload, ", action.payload)
      console.log("reducer token", action.payload.token)
      state.token = action.payload.token as string
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    });
  }
});


export const { logout } = userSlice.actions

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer