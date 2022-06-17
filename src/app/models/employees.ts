import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { SharedProp } from './helpers/sharedProp.helper'
import Country from './country'
import Area from './area'
import IdentificationType from './identification_type'

@Entity('employees')
class Employees extends SharedProp {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_surname: string

  @Column()
  second_surname: string

  @Column()
  first_name: string

  @Column()
  other_names: string

  @Column()
  identification_number: string

  @Column()
  email: string

  @Column()
  Admission_date: string

  @Column()
  status: boolean

  @Column({ nullable: false })
  countryId: number

  @Column({ nullable: false })
  areaId: number

  @Column({ nullable: false })
  identificationTypeId: number

  @ManyToOne(() => Country, (country: Country) => country.employee, {
    onDelete: 'CASCADE',
  })
  country: Country[]

  @ManyToOne(() => Area, (area: Area) => area.employee, {
    onDelete: 'CASCADE',
  })
  area: Area[]

  @ManyToOne(
    () => IdentificationType,
    (identificationType: IdentificationType) => identificationType.employee,
    {
      onDelete: 'CASCADE',
    }
  )
  identification_type: IdentificationType[]
}

export default Employees
