import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
export default class Course extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public courseName: String

  @column()
  public instructorId: number

  @column()
  public courseDescription: String

  @column()
  public noOfEnrollments: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
