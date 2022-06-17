import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { SharedProp } from './helpers/sharedProp.helper'
import Employees from './employees'

@Entity('country')
class Country extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  domain: string

  @Column()
  status: boolean

  @OneToMany(() => Employees, (employee: Employees) => employee.country, {
    onDelete: 'CASCADE',
  })
  employee: Employees[]
}

export default Country
