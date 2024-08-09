<template>
  <div class="p-5 mt-2 bg-zinc-800 flex justify-around text-white">
    <div>
      <h1 class="text-4xl font-semibold mb-5">{{ course.course_name }}</h1>

      <p class="w-96 mb-2">{{ course.course_description }}</p>

      <p class="text-xs">Created by {{ course.instructor?.name }}</p>

      <div v-show="isEnrolled">
        <p class="text-sm mt-8">Progress</p>
        <v-progress-linear v-model="course.progress" height="25" class="mt-1">
          <strong>{{ Math.ceil(course.progress) }}%</strong>
        </v-progress-linear>
      </div>

      <div class="mt-5" v-if="course.instructor?.id == user_id">
        <button class="bg-green-700 px-2 py-1 rounded-md" @click="handleEdit">Edit</button>
      </div>
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
  <AlertBox v-show="showAlert" message="course enrolled successfully" color="#06D001" />
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { courseStore } from '@/stores/course'
import AlertBox from '@/components/alertBox.vue'

const route = useRoute()
const router = useRouter()
const store = courseStore()
const course = ref({})
const progress = ref(26)
let user_id = ref()
let isEnrolled = ref(false)
let newEnroll = ref(false)
let showAlert = ref(false)
const userId = ref(localStorage.getItem('id'))

user_id.value = localStorage.getItem('id')

const isCourseEnrolled = async () => {
  const myLearnings = await store.getMyLearnings(userId)
  isEnrolled.value = myLearnings.some((learning) => {
    if (learning.course_id === course.value.id) {
      return true
    }
  })
}
onMounted(async () => {
  if (route.query.learning === 'true') {
    course.value = await store.getLearningDetails(route.params.id)
    course.value = { ...course.value.course, progress: course.value.progress }
    console.log(course.value)
    isCourseEnrolled() // check if the current course is enrolled by  the logged in user
  } else {
    course.value = await store.getCourseDetails(route.params.id)
    isCourseEnrolled() // check if the current course is enrolled by  the logged in user
  }
})

watch(newEnroll, async () => {
  isCourseEnrolled() // make the course enrolled
  setTimeout(() => {
    showAlert.value = false
  }, 1000)
})

const enroll = async () => {
  const user_id = localStorage.getItem('id')
  if (!user_id) {
    return router.push('/login')
  }
  try {
    await store.enroll(course.value.id)
    newEnroll.value = !newEnroll.value
    showAlert.value = true
  } catch (err) {
    return err
  }
}

const handleEdit = () => {
  router.push({
    path: '/editCourse',
    query: {
      courseName: course.value.course_name,
      courseDescription: course.value.course_description,
      courseId: course.value.id
    }
  })
}
</script>
