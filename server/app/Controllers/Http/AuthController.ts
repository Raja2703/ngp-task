import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public createUser = async ({ request, response, auth }: HttpContextContract) => {
    try {
      const user = await User.create(request.body())
      const token = await auth.login(user)
      response.status(200)

      return {
        success: true,
        user,
        token
      }
    } catch (error) {
      response.status(400)
      return {
        success: false,
        error
      }
    }
  }

  async login({ request, response, auth }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string({}, [rules.email()]),
      password: schema.string({}, [rules.minLength(6)])
    })

    const payload = await request.validate({ schema: loginSchema })
    const { email, password } = payload

    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '7 days'
      })
      const isLogged = auth.use('api').isLoggedIn

      const user: any = auth.user
      return {
        success: true,
        token,
        isLogged,
        email: user.email,
        id: user.id,
        role: user.role
      }
    } catch (err) {
      console.log(err)
      response.unauthorized('Invalid email or password')
    }
  }

  async logout({ auth }: HttpContextContract) {
    try {
      await auth.use('api').revoke()
      return {
        revoked: true
      }
    } catch (err) {
      return (err)
    }
  }


  public getAllUsers = async ({ request, response }: HttpContextContract) => {
    try {
      const users = await User.all()
      response.status(200)

      return {
        success: true,
        users
      }
    } catch (error) {
      response.status(400)
      return {
        success: false,
        error
      }
    }
  }
}
