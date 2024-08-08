import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignupValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.email()]),
    password: schema.string({}, [rules.minLength(6)]),
    role: schema.enum(['user', 'tutor'])
  })

  public messages: CustomMessages = {
    required: '{{ field }} is required'
  }
}
