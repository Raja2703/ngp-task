<script setup>
import { courseStore } from '@/stores/course'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ showModal: Boolean, showAlert: Boolean, deletionId: Number })
const emit = defineEmits(['close', 'delete'])
const store = courseStore()

const handleCancel = () => {
  emit('close')
}

const handleYes = async () => {
  try {
    await store.deleteCourse(props.deletionId)
    emit('delete')
    emit('close')
  } catch (err) {
    return err
  }
}
</script>

<template>
  <div class="modalWindow">
    <div class="innerDiv z-10">
      <h1>Are you sure, you want to delete</h1>
      <div class="buttons">
        <button class="no" @click="handleCancel">no</button>
        <button class="yes" @click="handleYes">yes</button>
      </div>
    </div>
    <div class="absolute h-full w-full z-0 bg-black opacity-25"></div>
  </div>
</template>

<style scoped>
.modalWindow {
  z-index: 10;
  position: fixed;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  color: white;
}

.innerDiv {
  background-color: rgba(79, 23, 135, 0.808);
  padding: 20px 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
}

.buttons {
  display: flex;
}

button {
  border: none;
  width: 5rem;
  border-radius: 5px;
  /* background-color: rgba(79, 23, 135, 0.507); */
  border: 1.5px solid white;
  margin-right: 10px;
}

h1 {
  text-align: center;
  margin-bottom: 10px;
}
</style>
