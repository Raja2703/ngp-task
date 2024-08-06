<template>
  <v-sheet class="mx-auto mt-10" width="300">
    <v-form @submit.prevent="createCourse">
      <v-text-field v-model="CourseName" :rules="nameRules" label="Course name"></v-text-field>
      <v-text-field
        v-model="CourseDescription"
        :rules="descriptionRules"
        label="Course description"
      ></v-text-field>
      <v-btn class="mt-2" type="submit" block>Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue'
import { courseStore } from '@/stores/course'
import { useRouter } from 'vue-router'

const CourseName = ref('')
const CourseDescription = ref('')
const store = courseStore()
const router = useRouter()

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

const createCourse = async () => {
  try {
    const course = await store.createCourse(CourseName.value, CourseDescription.value)
    router.push('/')
  } catch (err) {
    console.log(err)
  }
}
</script>
