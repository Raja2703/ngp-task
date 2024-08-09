<template>
  <Card
    v-if="courses.length"
    :courses="courses"
    title="Created Courses"
    @delete-course="reloadScreen"
  />
  <h1 class="text-center mt-10 text-2xl" v-else>No Teachings yet!..</h1>
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
