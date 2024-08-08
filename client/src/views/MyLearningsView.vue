<template>
  <Card :courses="formatedCourses" title="Enrolled Courses" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { courseStore } from '@/stores/course'
import Card from '@/components/card.vue'

const store = courseStore()
let courses = ref([])
let formatedCourses = ref([])

onMounted(async () => {
  courses.value = await store.getMyLearnings()
  console.log(courses.value)
  formatedCourses.value = courses.value.map((course) => {
    return {
      progress: course.progress,
      course_name: course.course.course_name,
      id: course.course.id,
      instructor: { name: course.course.instructor.name }
    }
  })
})
</script>
