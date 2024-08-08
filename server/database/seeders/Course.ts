import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Course from 'App/Models/Course'

export default class extends BaseSeeder {
  public async run() {
    await Course.createMany([
      {
        courseName: 'React js',
        instructorId: 1,
        courseDescription: 'Master React by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
        noOfEnrollments: 0
      },
      {
        courseName: 'Vue js',
        instructorId: 1,
        courseDescription: 'Master Vue by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
        noOfEnrollments: 2
      },
      {
        courseName: 'AWS',
        instructorId: 2,
        courseDescription: 'Master React by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
        noOfEnrollments: 1
      },
      {
        courseName: 'Kubernetes',
        instructorId: 2,
        courseDescription: 'Master Kubernetes by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!',
        noOfEnrollments: 0
      }
    ])
  }
}
