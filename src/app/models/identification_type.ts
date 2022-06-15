import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { SharedProp } from './helpers/sharedProp.helper'

@Entity('identification_type')
class IdentificationType extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  status: boolean
}

export default IdentificationType
