import { useState } from 'react'
import User from '../../interfaces/User'

import { login, register } from '../../graphql/queries'
import { doGraphQLFetch } from '../../graphql/fetchGraphql'

const url = process.env.REACT_APP_API_URL as string
export interface LoginResponse {
  register: {
      data: User
  }
}

export const signup = async (user: User) => {
  const data: LoginResponse = (await doGraphQLFetch(url, register, {user})) as LoginResponse
  console.log("sevice data ", data)
    const recivedUser: User = data.register.data
    console.log("user", recivedUser)
    localStorage.setItem('user', JSON.stringify(recivedUser))
    console.log(localStorage.getItem('user'))
  return recivedUser
}

export const useSignup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return [
    {
      username,
      email,
      password,
    },
    {
      setUsername,
      setEmail,
      setPassword,
    },
  ]
}