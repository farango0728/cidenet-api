import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { SharedProp } from './helpers/sharedProp.helper'

@Entity('area')
class Area extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  status: boolean
}

export default Area
