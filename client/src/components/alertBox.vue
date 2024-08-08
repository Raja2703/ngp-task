<template>
  <div class="float-right mt-3 mr-2">
    <v-alert class="h-1 w-52 text-xs" border="start" :border-color="props.color" elevation="2">
      {{ props.message }}
    </v-alert>
  </div>
</template>

<script setup>
const props = defineProps({
  message: String,
  color: String
})
</script>
