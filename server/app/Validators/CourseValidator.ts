import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { course_category } from 'Contracts/enum'

export default class CourseValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    courseName: schema.string(),
    instructorId: schema.number(),
    courseDescription: schema.string(),
    noOfEnrollements: schema.number.optional(),
    topics: schema.string(),
    category: schema.enum(Object.values(course_category))
  })

  public messages: CustomMessages = {
    required: 'The {{ field }} is required to create a new account',
    enum: 'The value of {{ field }} must be in {{ option.choices }}'
  }
}
