import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Learning from 'App/Models/Learning'

export default class extends BaseSeeder {
  public async run() {
    await Learning.createMany([
      {
        userId: 1,
        courseId: 3,
        progress: 10
      },
      {
        userId: 1,
        courseId: 4,
        progress: 20
      }, {
        userId: 2,
        courseId: 1,
        progress: 30
      },
      {
        userId: 2,
        courseId: 2,
        progress: 40
      },
      {
        userId: 3,
        courseId: 1,
        progress: 50
      },
      {
        userId: 3,
        courseId: 2,
        progress: 60
      },
      {
        userId: 3,
        courseId: 3,
        progress: 70
      },
    ])
  }
}
