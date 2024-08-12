import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Course from "App/Models/Course"
import Learning from 'App/Models/Learning'
import CourseValidator from 'App/Validators/CourseValidator'
import EditCourseValidator from 'App/Validators/EditCourseValidator'

export default class CoursesController {
  public getAllCourses = async ({ response }: HttpContextContract) => {
    try {
      const courses = await Course.query().preload('instructor')
      response.status(200)

      return {
        success: true,
        courses
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        error: err
      })
    }
  }

  public getCourse = async ({ response, params }: HttpContextContract) => {
    try {
      const course = await Course.query()
        .where('id', params.id)
        .preload('instructor')
        .firstOrFail()
      response.status(200)

      return {
        success: true,
        course
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        error: err
      })
    }
  }

  public deleteCourse = async ({ response, params }: HttpContextContract) => {
    try {
      const course = await Course.findOrFail(params.id)
      await course.delete()

      response.status(200)

      return {
        success: true,
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        error: err
      })
    }
  }

  public createCourse = async ({ request, response }: HttpContextContract) => {
    try {
      // validating body
      const payload = await request.validate(CourseValidator)

      // creating course
      const course = await Course.create(payload)
      response.status(200)
      return {
        success: true,
        course
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        error: err
      })
    }
  }

  public editCourse = async ({ request, response, params }: HttpContextContract) => {
    try {
      // validating body
      const payload = await request.validate(EditCourseValidator)

      // creating course
      const course = await Course.updateOrCreate({ 'id': params.id }, payload)
      response.status(200)
      return {
        success: true,
        course
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        error: err
      })
    }
  }

  public enroll = async ({ request, response, params }: HttpContextContract) => {
    try {
      request.body().courseId = params.id
      const enrollment = await Learning.create(request.body())

      const course = await Course.findOrFail(params.id)
      course.noOfEnrollments += 1
      course.save()

      response.status(200)
      return {
        success: true,
        enrollment
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        error: 'No course found'
      })
    }
  }

  public getMyTeachings = async ({ response, params }: HttpContextContract) => {
    try {
      const courses = await Course.query().where('instructorId', params.id).preload('instructor')

      response.status(200)
      return {
        success: true,
        myTeachings: courses
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        error: 'No intructor found'
      })
    }
  }

  public getMyLearnings = async ({ response, params }: HttpContextContract) => {
    try {
      const courses = await Learning.query().where('user_id', params.user_id).preload('course', (courseQuery) => { courseQuery.preload('instructor') })//.preload('user')

      response.status(200)
      return {
        success: true,
        myLearnings: courses
      }
    } catch (err) {
      console.log(err)
      response.status(400).json({
        success: false,
        error: 'No user found'
      })
    }
  }
}
