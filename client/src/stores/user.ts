import { defineStore } from "pinia";
import axios from "axios"
import { useRouter } from 'vue-router'
import { ref } from "vue";

export const userStore = defineStore('user', () => {
  const router = useRouter()
  const isAuthenticated = ref('false')

  const userDetails = ref({ myLearnings: [], MyTeachings: [] })

  const signUp = async (user: { userName: string, email: string, password: string }) => {
    try {
      const userProfile: any = await axios.post('http://localhost:3333/user/register', user)
      localStorage.setItem('token', userProfile.data.token.token)
      localStorage.setItem('email', userProfile.data.user.email)
      localStorage.setItem('id', userProfile.data.user.id)
      localStorage.setItem('role', userProfile.data.user.role)

      userDetails.value.myLearnings = userProfile.data.user.myLearnings
      userDetails.value.MyTeachings = userProfile.data.user.MyTeachings
      isAuthenticated.value = 'true'
      // router.push('/')
      return userProfile
    } catch (err) {
      return err
    }
  }

  const signIn = async (user: { userName: string, password: string }) => {
    try {
      const userProfile = await axios.post('http://localhost:3333/user/login', user)
      localStorage.setItem('token', userProfile.data.token.token)
      localStorage.setItem('email', userProfile.data.email)
      localStorage.setItem('id', userProfile.data.id)
      localStorage.setItem('role', userProfile.data.role)

      userDetails.value.myLearnings = userProfile.data.myLearnings
      userDetails.value.MyTeachings = userProfile.data.myTeachings
      isAuthenticated.value = 'true'
      // router.push('/')
      return userProfile
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const logout = async () => {
    const token = localStorage.getItem('token')
    // console.log(token)
    try {
      await axios.post('http://localhost:3333/user/logout', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      localStorage.clear()
      isAuthenticated.value = 'false'
      router.push('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return { signUp, signIn, logout, isAuthenticated, userDetails }
}) 