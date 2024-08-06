import { defineStore } from "pinia";
import axios from "axios"
import { useRouter } from 'vue-router'

export const userStore = defineStore('user', () => {
  const router = useRouter()

  const signUp = async (user: { userName: string, email: string, password: string }) => {
    try {
      const userProfile: any = await axios.post('http://localhost:3333/user/register', user)
      localStorage.setItem('token', userProfile.data.token.token)
      localStorage.setItem('email', userProfile.data.user.email)
      localStorage.setItem('id', userProfile.data.user.id)
      localStorage.setItem('role', userProfile.data.user.role)
      router.push('/')
    } catch (err) {
      return err
    }
  }

  const signIn = async (user: { userName: string, password: string }) => {
    try {
      const userProfile = await axios.post('http://localhost:3333/user/login', user)
      console.log(userProfile)
      localStorage.setItem('token', userProfile.data.token.token)
      localStorage.setItem('email', userProfile.data.email)
      localStorage.setItem('id', userProfile.data.id)
      localStorage.setItem('role', userProfile.data.role)
      router.push('/')
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:3333/user/logout', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      localStorage.setItem('token', '')
      localStorage.setItem('email', '')
      localStorage.setItem('id', '')
      localStorage.setItem('role', '')
      router.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return { signUp, signIn, logout }
}) 