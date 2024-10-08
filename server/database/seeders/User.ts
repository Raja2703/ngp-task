import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'raja',
        email: 'raja@gmail.com',
        password: 'raja1234',
        role: 'tutor'
      },
      {
        name: 'gokul',
        email: 'gokul@gmail.com',
        password: 'gokul1234',
        role: 'tutor'
      }, {
        name: 'varun',
        email: 'varun@gmail.com',
        password: 'varun1234',
        role: 'user',
      },
    ])
  }
}
