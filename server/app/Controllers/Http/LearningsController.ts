// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Course from "App/Models/Course"
import Learning from "App/Models/Learning"

export default class LearningsController {
  public getLearningDetails = async ({ request, params, response }) => {
    try {
      const learning = await Learning.findByOrFail('id', params.id)
      let course = await Course.findByOrFail('id', learning.courseId)
      // course.progress = learning.progress
      return {
        success: true,
        course: course,
        progress: learning.progress
      }
    } catch (err) {
      return {
        success: false,
        error: err
      }
    }
  }
}
