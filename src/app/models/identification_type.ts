import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { SharedProp } from './helpers/sharedProp.helper'
import Employees from './employees'

@Entity('identification_type')
class IdentificationType extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  status: boolean

  @OneToMany(
    () => Employees,
    (employee: Employees) => employee.identification_type,
    {
      onDelete: 'CASCADE',
    }
  )
  employee: Employees[]
}

export default IdentificationType
