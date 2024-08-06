<script setup lang="ts">
import { userStore } from '@/stores/user'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const store = userStore()

const email: any = ref('')
const role: any = ref('')

email.value = localStorage.getItem('email')
role.value = localStorage.getItem('role')
</script>

<template>
  <nav class="navbar">
    <div class="flex items-center justify-center">
      <RouterLink class="text-2xl" to="/">E-learn</RouterLink>
      <ul>
        <RouterLink to="/myLearnings" class="li" v-if="email">My learnings</RouterLink>
        <RouterLink to="/myTeachings" class="li" v-if="role == 'tutor'">My teachings</RouterLink>
        <RouterLink to="/createCourse" class="li" v-if="role == 'tutor'">Create Course</RouterLink>
      </ul>
    </div>
    <div v-if="email" class="flex mr-2">
      <!-- <h1>{{ email }}</h1> -->
      <button @click="store.logout()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
      </button>
    </div>
    <div v-else class="flex mr-2 gap-2">
      <RouterLink to="/login" class="li">Login/Signup</RouterLink>
    </div>
  </nav>
</template>

<style>
.navbar {
  height: 10vh;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  gap: 20px;
  border-bottom: 1px solid gray;
  background-color: rgb(82, 34, 88);
}

h1 {
  font-weight: 700;
  font-size: 17px;
  letter-spacing: 2px;
  margin-right: 0.2rem;
}

ul {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-left: 1.4rem;
}

.li {
  font-weight: 400;
}
</style>
