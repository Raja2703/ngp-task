<template>
  <div class="p-5 mt-2 bg-zinc-800 flex justify-around text-white">
    <div>
      <h1 class="text-4xl font-semibold mb-5">{{ course.course_name }}</h1>

      <p class="w-96 mb-2">{{ course.course_description }}</p>

      <p class="text-xs">Created by {{ course.instructor?.name }}</p>

      <p class="text-sm mt-8">Progress</p>
      <v-progress-linear v-model="progress" height="25" class="mt-1">
        <strong>{{ Math.ceil(progress) }}%</strong>
      </v-progress-linear>
    </div>
    <div class="bg-white h-72">
      <iframe
        width="340"
        height="185"
        src="https://www.youtube.com/embed/VeNfHj6MhgA?si=EPN8OXC2_0TTTTnq"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h1 class="mx-2 my-3 text-black">Enroll for free</h1>
      <button v-if="isEnrolled" class="mx-3 bg-purple-800 text-white rounded-md px-3 py-1 w-11/12">
        Enrolled
      </button>
      <button
        v-else
        class="mx-3 bg-green-800 text-white rounded-md px-3 py-1 w-11/12"
        @click="enroll"
      >
        Enroll
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseStore } from '@/stores/course'
import { userStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const store = courseStore()
const userStoreData = userStore()
const course = ref({})
const progress = ref(26)
let user_id = ref()
let isEnrolled = ref(false)

user_id.value = localStorage.getItem('id')

onMounted(async () => {
  course.value = await store.getCourseDetails(route.params.id)
  // console.log(userStoreData.userDetails)

  if (userStoreData.userDetails.myLearnings.includes(Number(route.params.id))) {
    isEnrolled.value = true
  }
})

const enroll = async () => {
  const user_id = localStorage.getItem('id')
  if (!user_id) {
    return router.push('/login')
  }
  try {
    const enrollement = await store.enroll(course.value.id)
    router.push('/')
    return enrollement
  } catch (err) {
    return err
  }
}
</script>
