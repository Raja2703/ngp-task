import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Course from "App/Models/Course"
import User from 'App/Models/User'
import CourseValidator from 'App/Validators/CourseValidator'

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
    const { instructorId } = request.body()
    console.log(request.body())
    try {
      // validating body
      const payload = await request.validate(CourseValidator)

      // creating course
      const course = await Course.create(payload)

      // update my_teachings array in users table
      const user: any = await User.findOrFail(instructorId)
      let myTeachings = user.myTeachings
      myTeachings.push(course.id)

      user.myTeachings = JSON.stringify(myTeachings)
      await user.save()
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
    const { user_id } = request.body()

    try {
      const course = await Course.findOrFail(params.id)

      const user: any = await User.findOrFail(user_id)

      // 
      let myLearnings = user.myLearnings
      myLearnings.push(course.id)
      user.myLearnings = JSON.stringify(myLearnings)

      // add progress value
      // let progress = user.progress
      // progress.push({ courseId: course.id, value: 20 })
      // user.progress = JSON.stringify(progress)
      await user.save()

      course.noOfEnrollments += 1
      await course.save()

      response.status(200)
      return {
        success: true,
        user
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
      const user = await User.findOrFail(params.user_id)
      const courseIds = user.myLearnings

      const courses = await Promise.all(
        courseIds.map(async (ele) => {
          return await Course.query().where('id', ele).preload('instructor').first();
        })
      );

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
