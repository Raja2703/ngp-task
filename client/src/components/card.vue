<template>
  <div class="m-10">
    <h1 class="text-2xl">{{ props.title }}</h1>
    <div class="flex flex-wrap gap-10 mt-10 justify-center">
      <v-card v-for="course in props.courses" :key="course.id" width="250">
        <v-img
          class="align-end text-white"
          height="100"
          src="https://kinsta.com/wp-content/uploads/2023/04/react-must-be-in-scope-when-using-jsx.jpg"
          cover
        >
          <!-- <v-card-title>Top 10 Australian beaches</v-card-title> -->
        </v-img>

        <!-- <v-card-subtitle class="pt-4"> Number 10 </v-card-subtitle> -->

        <v-card-text>
          <div class="text-xl font-semibold">{{ course.course_name }}</div>

          <div>{{ course.instructor_id }}</div>
          <!-- <div>{{ course.course_description }}</div> -->
        </v-card-text>

        <v-card-actions>
          <button><RouterLink :to="`/course/${course.id}`">Explore</RouterLink></button>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  courses: Object,
  title: String
})
</script>
