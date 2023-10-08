
/* eslint-disable no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = null
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //    setUser: (state, action: PayloadAction<any | null>) => {

    setUser: (state, action) => {
        console.log("setUser: ", action.payload)
        return action.payload;
      },
    removeUser(state, action) {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const updateUser = () => {
  return async (dispatch: any) => {
    const userJSON = localStorage.getItem('user')

    if (!userJSON) {
      return
    }
    const user = JSON.parse(userJSON)
    dispatch(setUser(user))
  }
}

export default userSlice.reducer