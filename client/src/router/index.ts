import CourseDetailsView from '@/views/CourseDetailsView.vue'
import CreateCourseView from '@/views/CreateCourseView.vue'
import EditCourseView from '@/views/EditCourseView.vue'
import ErrorView from '@/views/ErrorView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import MyLearningsView from '@/views/MyLearningsView.vue'
import MyTeachingsView from '@/views/MyTeachingsView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UnauthorizedView from '@/views/UnauthorizedView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: ErrorView },
    { path: '/Error404', name: 'unauthorized', component: UnauthorizedView },
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
      path: '/editCourse',
      name: 'edit Course',
      component: EditCourseView
    },
    {
      path: '/course/:id',
      name: 'course details',
      component: CourseDetailsView
    },
  ]
})

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('role')
  const tutorRoutes = [
    "my teachings",
    "create Course",
    "edit Course",
  ];

  if (tutorRoutes.includes(to.name) && role != 'tutor') {
    next({ name: "unauthorized" });
  } else {
    next();
  }
})


export default router
