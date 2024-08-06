import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CourseValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    courseName: schema.string(),
    instructorId: schema.number(),
    courseDescription: schema.string(),
    noOfEnrollements: schema.number.optional()
  })

  public messages: CustomMessages = {
    required: 'The {{ field }} is required to create a new account',
  }
}
