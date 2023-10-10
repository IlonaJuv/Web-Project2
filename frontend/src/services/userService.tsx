import { useState } from 'react'
import User from '../interfaces/User'

import { login, register } from '../graphql/queries'
import { doGraphQLFetch } from '../graphql/fetchGraphql'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginResponse, RegisterResponse } from '../interfaces/Responses'

const url = process.env.REACT_APP_API_URL as string


export const signup = createAsyncThunk(
  "user/register",
  async (user: User) => {
  const data: RegisterResponse = (await doGraphQLFetch(url, register, {user})) as RegisterResponse
    const recivedUser: User = data.register.data
    recivedUser.token = data.register.token;
    localStorage.setItem('user', JSON.stringify(recivedUser))
    localStorage.setItem('token', data.register.token);
  return recivedUser
});

export const signin = createAsyncThunk(
  "user/login",
  async ({email, password}: User) => {
  const data: LoginResponse = (await doGraphQLFetch(url, login, {email, password})) as LoginResponse
    const recivedUser: User = data.login.user
    recivedUser.token = data.login.token;
    localStorage.setItem('user', JSON.stringify(recivedUser))
    localStorage.setItem('token', data.login.token)
  return recivedUser
}
);
