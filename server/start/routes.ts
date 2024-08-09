import Route from '@ioc:Adonis/Core/Route'

Route.where('id', /^[0-9]+$/)
Route.where('user_id', /^[0-9]+$/)

// course routes
Route.get('/', 'CoursesController.getAllCourses')
Route.get('/:id', 'CoursesController.getCourse')
Route.get('/learning/:id', 'LearningsController.getLearningDetails')
Route.patch('/:id', 'CoursesController.editCourse')
Route.delete('/:id', 'CoursesController.deleteCourse')
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

