import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { SharedProp } from './helpers/sharedProp.helper'

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
}

export default Country
