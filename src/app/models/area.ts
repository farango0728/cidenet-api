import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { SharedProp } from './helpers/sharedProp.helper'
import Employees from './employees'

@Entity('area')
class Area extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  status: boolean

  @OneToMany(() => Employees, (employee: Employees) => employee.area, {
    onDelete: 'CASCADE',
  })
  employee: Employees[]
}

export default Area
