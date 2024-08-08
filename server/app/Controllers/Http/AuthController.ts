import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import SigninValidator from 'App/Validators/SigninValidator'
import SignupValidator from 'App/Validators/SignupValidator'

export default class AuthController {
  public createUser = async ({ request, response, auth }: HttpContextContract) => {
    try {
      const payload = await request.validate(SignupValidator)
      const user = await User.create(payload)
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
    const payload = await request.validate(SigninValidator)
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
        role: user.role,
        myLearnings: user.myLearnings,
        myTeachings: user.myTeachings
      }
    } catch (err) {
      console.log(err)
      response.unauthorized('Invalid email or password')
    }
  }

  async logout({ auth }: HttpContextContract) {
    try {
      await auth.use('api').logout()
      return {
        revoked: true
      }
    } catch (err) {
      return (err)
    }
  }


  public getAllUsers = async ({ response }: HttpContextContract) => {
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
