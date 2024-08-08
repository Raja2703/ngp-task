<template>
  <div class="p-10">
    <h1 class="text-2xl">{{ props.title }}</h1>
    <div class="flex flex-wrap gap-10 mt-10 justify-center">
      <v-card v-for="course in props.courses" :key="course.id" width="250">
        <v-img
          class="align-end text-white"
          height="100"
          src="https://kinsta.com/wp-content/uploads/2023/04/react-must-be-in-scope-when-using-jsx.jpg"
          cover
        >
        </v-img>

        <v-card-text>
          <div class="text-xl font-semibold">{{ course.course_name }}</div>

          <div class="text-xs">{{ course.instructor.name }}</div>
        </v-card-text>

        <v-card-actions class="w-full flex justify-start gap-3">
          <button class="border px-2 py-1 bg-purple-400 rounded-md text-white hover:bg-purple-600">
            <RouterLink :to="`/course/${course.id}`">Explore</RouterLink>
          </button>
          <button
            v-if="tutor"
            class="border px-2 py-1 bg-red-400 rounded-md text-white hover:bg-red-600"
            @click="handleDelete(course.id)"
          >
            delete
          </button>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { courseStore } from '@/stores/course'

const props = defineProps({
  courses: Array,
  title: String
})

const route = useRoute()
const tutor = ref(false)
const store = courseStore()

onMounted(() => {
  if (route.path == '/myTeachings') {
    tutor.value = true
  }
})

// const handleDelete = async (id) => {
//   // console.log(id)
//   try {
//     const res = await store.deleteCourse(id)
//     return res
//   } catch (err) {
//     return err
//   }
// }
</script>
