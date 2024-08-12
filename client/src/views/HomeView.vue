<template>
  <div class="pt-5 px-16 flex items-center">
    <!-- <input
      class="border border-black w-full outline-none px-3 py-1"
      placeholder="search"
      @input="search"
      v-model="searchText"
    /> -->
    <v-col class="flex gap-5 justify-center">
      <v-text-field
        v-model="searchText"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        class="w-2/3"
        @input="search"
      ></v-text-field>
      <v-select
        :items="filterItems"
        density="comfortable"
        label="filter"
        v-model="filter"
        class="w-1/3"
        hide-details
        active="true"
      ></v-select>
    </v-col>
  </div>

  <Card :courses="filteredCourse" title="All courses" />
  <Card :courses="myFilteredLearnings" title="Enrolled courses" isLearning="true" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { courseStore } from '@/stores/course'
import Card from '@/components/card.vue'

const store = courseStore()
let courses = ref([])
let myLearnings = ref([])
let myFilteredLearnings = ref([])
let searchText = ref('')
let filteredCourse = ref([])
let constantFilteredCourse = ref([])
const filter = ref('')

const filterItems = ['Web development', 'App development', 'Data Science']

const search = () => {
  filteredCourse.value = courses.value.filter((course) => {
    if (course.course_name.toLowerCase().indexOf(searchText.value.toLowerCase()) > -1) {
      return course
    }
  })
  if (searchText.value === '') {
    filteredCourse.value = constantFilteredCourse.value
  }
}

onMounted(async () => {
  courses.value = await store.getAllCourses() // all courses
  filteredCourse.value = courses.value

  myLearnings.value = await store.getMyLearnings() // enrolled courses

  // remove user learnings from all courses
  constantFilteredCourse.value = courses.value.filter((course) => {
    let isLearning = false
    myLearnings.value.forEach((learning) => {
      if (course.id == learning.course.id) {
        isLearning = true
      }
    })

    if (!isLearning) return course
  })
  filteredCourse.value = constantFilteredCourse.value

  myLearnings.value = myLearnings.value.map((course, i) => {
    return {
      progress: course.progress,
      course_name: course.course.course_name,
      id: course.id,
      instructor: { name: course.course.instructor.name }
    }
  })
  for (let i = 0; i < 2; i++) {
    myFilteredLearnings.value.push(myLearnings.value[i])
  }
  // console.log(myFilteredLearnings.value)
})

watch(filter, async () => {
  filteredCourse.value = await store.getAllCourses(filter.value)
  console.log(filteredCourse.value)
})
</script>
