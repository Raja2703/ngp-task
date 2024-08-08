import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
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

  @hasOne(() => User, {
    foreignKey: 'id',
    localKey: 'instructorId',
  })
  public instructor: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
