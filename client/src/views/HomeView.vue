<template>
  <div class="pt-5 px-16 flex items-center">
    <!-- <input
      class="border border-black w-full outline-none px-3 py-1"
      placeholder="search"
      @input="search"
      v-model="searchText"
    /> -->
    <v-col md="12">
      <v-text-field
        v-model="searchText"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        @input="search"
      ></v-text-field>
    </v-col>
  </div>

  <Card :courses="filteredCourse" title="All courses" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { courseStore } from '@/stores/course'
import Card from '@/components/card.vue'

const store = courseStore()
let courses = ref([])
let searchText = ref('')
let filteredCourse = ref([])

const search = () => {
  filteredCourse.value = courses.value.filter((course) => {
    if (course.course_name.toLowerCase().indexOf(searchText.value.toLowerCase()) > -1) {
      // console.log(searchText.value)
      return course
    }
  })
}

onMounted(async () => {
  courses.value = await store.getAllCourses()
  filteredCourse.value = courses.value
})
</script>
