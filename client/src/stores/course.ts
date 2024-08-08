import { defineStore } from "pinia";
import axios from "axios"
import { useRouter } from 'vue-router'
import { ref } from "vue";
import { userStore } from "./user";

export const courseStore = defineStore('course', () => {
  const router = useRouter()
  const url = import.meta.env.VITE_APP_URL
  const userStoreData = userStore()

  const courses: any = ref([])

  const getAllCourses = async () => {
    try {
      const allCourses = await axios.get(`${url}/`)
      courses.value = allCourses.data.courses
      return courses.value
    } catch (err) {
      return err
    }

  }

  const getCourseDetails = async (id: number) => {
    try {
      const course = await axios.get(`${url}/${id}`)
      // console.log(course.data)
      return course.data.course
    } catch (err) {
      return err
    }
  }

  const getMyLearnings = async () => {
    const id = localStorage.getItem('id')
    try {
      const course = await axios.get(`${url}/myLearnings/${id}`)
      // console.log(course)
      return course.data.myLearnings
    } catch (err) {
      return err
    }
  }

  const getMyTeachings = async () => {
    const id = localStorage.getItem('id')
    try {
      const course = await axios.get(`${url}/myTeachings/${id}`)
      // console.log(course.data.myTeachings)
      return course.data.myTeachings
    } catch (err) {
      return err
    }
  }

  const createCourse = async (courseName: string, courseDescription: string) => {
    const id = localStorage.getItem('id')
    try {
      const course = await axios.post(`${url}/`, {
        courseName: courseName,
        courseDescription: courseDescription,
        instructorId: id,
      })
      // console.log(course)

      return course
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const deleteCourse = async (id: number) => {
    try {
      const course = await axios.delete(`${url}/${id}`)
      // console.log(course)

      return course
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const enroll = async (id: number) => {
    const user_id = localStorage.getItem('id')
    try {
      const course = await axios.post(`${url}/enroll/${id}`, {
        user_id: user_id
      })
      userStoreData.userDetails.myLearnings.push(id)
      // console.log(userStoreData.userDetails)

      return course
    } catch (err) {
      console.log(err)
      return err
    }
  }



  return { getAllCourses, getCourseDetails, getMyLearnings, getMyTeachings, createCourse, enroll, deleteCourse }
}) 