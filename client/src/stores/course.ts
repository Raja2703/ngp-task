import { defineStore } from "pinia";
import axios from "axios"
import { ref } from "vue";

export const courseStore = defineStore('course', () => {
  const url = import.meta.env.VITE_APP_URL

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

  const getProgress = async () => {
    try {
      const progress = await axios.get(`${url}/progress/:id`)
      return progress
    } catch (err) {
      return err
    }
  }

  const getCourseDetails = async (id: number) => {
    try {
      const course = await axios.get(`${url}/${id}`)
      return course.data.course
    } catch (err) {
      return err
    }
  }

  const getMyLearnings = async () => {
    const id = localStorage.getItem('id')
    try {
      const course = await axios.get(`${url}/myLearnings/${id}`)
      return course.data.myLearnings
    } catch (err) {
      return err
    }
  }

  const getMyTeachings = async () => {
    const id = localStorage.getItem('id')
    try {
      const course = await axios.get(`${url}/myTeachings/${id}`)
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

      return course
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const editCourse = async (courseName: string, courseDescription: string, courseId: number) => {
    // const id = localStorage.getItem('id')
    try {
      const course = await axios.patch(`${url}/${courseId}`, {
        courseName: courseName,
        courseDescription: courseDescription,
      })

      return course
    } catch (err) {
      console.log(err)
      return err
    }
  }

  const deleteCourse = async (id: number) => {
    try {
      const course = await axios.delete(`${url}/${id}`)
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
        userId: user_id
      })

      return course
    } catch (err) {
      console.log(err)
      return err
    }
  }



  return { getProgress, getAllCourses, getCourseDetails, getMyLearnings, getMyTeachings, createCourse, editCourse, enroll, deleteCourse }
}) 