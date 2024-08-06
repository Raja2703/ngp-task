<script setup>
import { reactive, ref } from 'vue'
import { userStore } from '@/stores/user'

const store = userStore()

const user = reactive({
  name: '',
  email: '',
  password: '',
  role: 'user'
})

const error = ref('')

const signUp = async () => {
  try {
    const userFromDb = await store.signUp(user)
    return userFromDb
  } catch (err) {
    error.value = err
  }
}
</script>

<template>
  <form @submit.prevent="signUp">
    <div class="bg-white flex flex-col justify-center items-center rounded-md px-12 py-8">
      <h1>Register</h1>
      <section class="inputClass">
        <div class="inputField">
          <label for="name">Name</label>
          <input type="text" name="name" v-model="user.name" />
        </div>

        <div class="inputField">
          <label for="email">email</label>
          <input type="text" name="email" v-model="user.email" />
        </div>

        <div class="inputField">
          <label for="password">Password</label>
          <input type="password" name="password" v-model="user.password" maxlength="10" />
        </div>

        <div class="inputField">
          <label for="role">Role</label>
          <input type="text" name="role" v-model="user.role" maxlength="10" />
        </div>
        <p class="errors" v-if="error">{{ error }}</p>
      </section>
      <button type="submit" class="signUpButton mb-3">Sign up</button>
      <RouterLink to="/login">Already have an account? Login here</RouterLink>
    </div>
  </form>
</template>

<style scoped>
form {
  /* border: 1px solid black; */
  background-color: rgba(79, 23, 135, 0.507);
  border-radius: 5px;
  padding: 1rem 2rem;
  height: 100vh;
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
