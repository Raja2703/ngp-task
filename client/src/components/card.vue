<template>
  <AlertBox v-show="showAlert" message="course deleted successfully" color="success" />
  <Modal
    v-if="showModal"
    :showModal="showModal"
    :showAlert="showAlert"
    :deletionId="deletionId"
    @close="showModal = false"
    @delete="showAlert = true"
  />
  <div class="pt-5 px-10 pb-10">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">{{ props.title }}</h1>
      <RouterLink to="/myLearnings" v-show="learning && route.path !== '/myLearnings'"
        ><h1 class="text-base text-teal-900 tracking-normal">View all >></h1></RouterLink
      >
    </div>
    <div class="grid grid-cols-3 ml-2 gap-10 mt-10 justify-center">
      <v-card
        v-for="course in props.courses"
        :key="course.id"
        width="250"
        class="hover:scale-105 hover:ease-linear duration-75 hover:transition-all hover:cursor-pointer"
      >
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
            <RouterLink :to="`/course/${course.id}?learning=${learning}`">Explore</RouterLink>
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
import { onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import AlertBox from './alertBox.vue'
import Modal from './modal.vue'
import router from '@/router'

const props = defineProps({
  courses: Array,
  title: String,
  isLearning: String
})

const emit = defineEmits(['delete-course'])

const route = useRoute()
const tutor = ref(false)
const learning = ref(false)
const showAlert = ref(false)
let showModal = ref(false)
const deletionId = ref(0)

onMounted(() => {
  if (route.path == '/myTeachings') {
    tutor.value = true
  }
  if (route.path == '/myLearnings') {
    learning.value = true
  }
  if (props.isLearning == 'true') {
    learning.value = true
  }
})

watch(showAlert, () => {
  // props.courses = store
  emit('delete-course')
  setTimeout(() => {
    showAlert.value = false
  }, 1000)
})

const handleDelete = async (id) => {
  deletionId.value = id
  showModal.value = true
}
</script>
