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
import { onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import AlertBox from './alertBox.vue'
import Modal from './modal.vue'

const props = defineProps({
  courses: Array,
  title: String
})

const emit = defineEmits(['delete-course'])

const route = useRoute()
const tutor = ref(false)
const showAlert = ref(false)
let showModal = ref(false)
const deletionId = ref(0)

onMounted(() => {
  if (route.path == '/myTeachings') {
    tutor.value = true
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
