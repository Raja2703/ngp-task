<template>
  <Card :courses="courses" title="Created Courses" @delete-course="reloadScreen" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { courseStore } from '@/stores/course'
import Card from '@/components/card.vue'

const store = courseStore()
let courses = ref([])

onMounted(async () => {
  courses.value = await store.getMyTeachings()
})

const reloadScreen = async () => {
  courses.value = await store.getMyTeachings()
}
</script>

<style>
.blur-filter {
  filter: blur(8px);
  transition: filter 0.3s;
}
</style>
