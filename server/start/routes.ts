import Route from '@ioc:Adonis/Core/Route'

// course routes
Route.get('/', 'CoursesController.getAllCourses')
Route.get('/:id', 'CoursesController.getCourse')
Route.post('/', 'CoursesController.createCourse')
Route.post('/enroll/:id', 'CoursesController.enroll')
Route.get('/myLearnings/:user_id', 'CoursesController.getMyLearnings')
Route.get('/myTeachings/:id', 'CoursesController.getMyTeachings')

// auth routes
Route.group(() => {
  Route.get('/', 'AuthController.getAllUsers')
  Route.post('/register', 'AuthController.createUser')
  Route.post('/login', 'AuthController.login')
  Route.post('/logout', 'AuthController.logout')
}).prefix('user')

