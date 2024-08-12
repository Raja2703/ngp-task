import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { course_category } from 'Contracts/enum'

export default class extends BaseSchema {
  protected tableName = 'courses'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('course_name').notNullable()
      table.integer('instructor_id').references('id').inTable('users').onDelete('CASCADE')
      table.string('course_description').notNullable()
      table.integer('no_of_enrollments').defaultTo(0)
      table.string('topics').notNullable()
      table.enum('category', Object.values(course_category)).notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
