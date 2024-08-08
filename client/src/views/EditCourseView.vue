<template>
  <v-sheet class="mx-auto mt-10" width="300">
    <v-form @submit.prevent="editCourse">
      <v-text-field v-model="CourseName" :rules="nameRules" label="Course name"></v-text-field>
      <v-text-field
        v-model="CourseDescription"
        :rules="descriptionRules"
        label="Course description"
      ></v-text-field>
      <v-btn class="mt-2" type="submit" block>save</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { courseStore } from '@/stores/course'
import { useRouter, useRoute } from 'vue-router'

const CourseName = ref('')
const CourseDescription = ref('')
const course_id = ref(0)
const store = courseStore()
const router = useRouter()
const route = useRoute()

const nameRules = [
  (value) => {
    if (value) return true
    return 'You must enter a Course name.'
  }
]

const descriptionRules = [
  (value) => {
    if (value) return true
    return 'You must enter a Course description.'
  }
]

onMounted(() => {
  const { courseName, courseDescription, courseId } = route.query
  CourseName.value = courseName
  CourseDescription.value = courseDescription
  course_id.value = Number(courseId)
})

const editCourse = async () => {
  try {
    const course = await store.editCourse(
      CourseName.value,
      CourseDescription.value,
      course_id.value
    )
    // console.log(course)
    if (course.data.success === true) {
      router.push(`/course/${course_id.value}`)
    }
  } catch (err) {
    console.log(err)
  }
}
</script>
