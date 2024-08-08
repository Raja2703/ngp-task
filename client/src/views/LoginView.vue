<script setup>
import { reactive, ref } from 'vue'
import { userStore } from '@/stores/user'
import { RouterLink, useRouter } from 'vue-router'

const store = userStore()
const router = useRouter()

const user = reactive({
  email: '',
  password: ''
})

const error = ref()

const signIn = async () => {
  try {
    const userFromDb = await store.signIn(user)
    console.log(userFromDb)
    if (userFromDb.response?.data == 'Invalid email or password') {
      throw new Error('Invalid email or password')
    }
    if (userFromDb.data?.success === true) {
      router.push('/')
    } else {
      const err = userFromDb.response.data.errors[0].message
      error.value = err
    }
  } catch (err) {
    error.value = err
  }
}
</script>

<template>
  <form @submit.prevent="signIn">
    <div
      class="bg-white flex flex-col justify-center items-center border-[#17153b] rounded-md px-12 py-8"
    >
      <h1>Sign in</h1>
      <section class="inputClass">
        <div class="inputField">
          <label for="email">Email</label>
          <input type="text" name="email" v-model="user.email" />
        </div>

        <div class="inputField">
          <label for="password">Password</label>
          <input type="password" name="password" v-model="user.password" maxlength="10" />
        </div>
        <p class="errors" v-if="error">{{ error }}</p>
      </section>
      <button type="submit" class="signUpButton mb-2">login</button>
      <RouterLink to="/register">Don't have an account? Sign up here</RouterLink>
    </div>
  </form>
</template>

<style scoped>
form {
  /* border: 1px solid black; */
  background-color: rgba(79, 23, 135, 0.507);
  height: 100vh;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
  font-size: 1.7rem;
  margin-bottom: 1rem;
  color: #17153b;
}

input,
textarea {
  border: 1px solid #17153b;
  outline: none;
  padding: 0px 5px;
  font-size: 15px;
  width: 12rem;
  color: #17153b;
}

.inputClass {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.inputField {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
}

label {
  margin-right: 1rem;
  width: 6rem;
  text-align: right;
  color: #17153b;
  font-weight: 600;
}

.signUpButton {
  color: white;
  border: none;
  width: 8rem;
  border-radius: 5px;
  background-color: rgb(82, 34, 88);
}

.errors {
  color: red;
  text-align: center;
  width: 100%;
}
</style>
