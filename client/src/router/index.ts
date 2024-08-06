import CourseDetailsView from '@/views/CourseDetailsView.vue'
import CreateCourseView from '@/views/CreateCourseView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import MyLearningsView from '@/views/MyLearningsView.vue'
import MyTeachingsView from '@/views/MyTeachingsView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/myLearnings',
      name: 'my learnings',
      component: MyLearningsView
    },
    {
      path: '/myTeachings',
      name: 'my teachings',
      component: MyTeachingsView
    },
    {
      path: '/createCourse',
      name: 'create Course',
      component: CreateCourseView
    },
    {
      path: '/course/:id',
      name: 'course details',
      component: CourseDetailsView
    },
  ]
})

export default router
