<template>
  <Card :courses="courses" title="Created Courses" />
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
</script>
