<script setup lang="ts">
import { userStore } from '@/stores/user'
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const store = userStore()
const isAuthenticated = ref('false')
isAuthenticated.value = store.isAuthenticated

const email: any = ref(localStorage.getItem('email'))
const role: any = ref(localStorage.getItem('role'))

const items = [{ title: 'My Learnings' }, { title: 'My Teachings' }, { title: 'logout' }]

watch(
  () => store.isAuthenticated,
  (newValue) => {
    isAuthenticated.value = newValue
    if (newValue) {
      email.value = localStorage.getItem('email')
      role.value = localStorage.getItem('role')
    } else {
      email.value = null
      role.value = null
    }
  }
)
</script>

<template>
  <nav class="navbar sticky top-0 z-30">
    <div class="flex items-center justify-center ml-1">
      <RouterLink class="text-2xl" to="/">E-learn</RouterLink>
      <ul>
        <!-- <RouterLink to="/myLearnings" class="li" v-if="email">My learnings</RouterLink>
        <RouterLink to="/myTeachings" class="li" v-if="role == 'tutor'">My teachings</RouterLink> -->
        <RouterLink to="/createCourse" class="li" v-if="role == 'tutor'">Create Course</RouterLink>
      </ul>
    </div>
    <div v-if="email" class="flex mr-4">
      <!-- <button @click="store.logout()"> -->
      <button>
        <v-menu transition="scale-transition">
          <template v-slot:activator="{ props }">
            <!-- <v-btn color="primary" v-bind="props"> Scale Transition </v-btn> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
              v-bind="props"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </template>

          <v-list>
            <v-list-item class="hover:bg-zinc-200/50" v-show="email">
              <v-list-item-title class="hover:cursor-pointer"
                ><RouterLink to="/myLearnings" class="li"
                  >My learnings</RouterLink
                ></v-list-item-title
              >
            </v-list-item>
            <v-list-item class="hover:bg-zinc-200/50 text-h1" v-show="role == 'tutor'">
              <v-list-item-title class="hover:cursor-pointer">
                <RouterLink to="/myTeachings" class="li"
                  >My teachings</RouterLink
                ></v-list-item-title
              >
            </v-list-item>
            <!-- <v-list-item class="hover:bg-zinc-200/50" v-show="role == 'tutor'">
              <v-list-item-title class="hover:cursor-pointer"
                ><RouterLink to="/createCourse" class="li"
                  >Create Course</RouterLink
                ></v-list-item-title
              >
            </v-list-item> -->
            <v-list-item class="hover:bg-zinc-200/50">
              <v-list-item-title class="hover:cursor-pointer" @click="store.logout()"
                ><button>logout</button></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
        <!-- <svg
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
        </svg> -->
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
