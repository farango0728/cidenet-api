import { Request, Response } from 'express'
import { getRepository, PrimaryGeneratedColumn } from 'typeorm'
import Country from '../../models/country'
import Employees from '../../models/employees'

class Controller {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const {
        q,
        first_surname,
        second_surname,
        first_name,
        other_names,
        Admission_date,
        email,
        status,
        perPage,
        page,
        sortBy,
        sortDesc,
        area,
        country,
        identificationType,
      } = req.query
      let filter = ''
      let skip = 0
      let take = 10

      if (page) {
        skip = Number(page) - 1
        if (perPage) {
          skip = Number(perPage) * skip
          take = Number(perPage)
        }
      }

      q?.length !== undefined
        ? (filter = `employee.first_surname ILIKE '%${q}%' OR 
        employee.second_surname  ILIKE '%${q}%' OR
        employee.second_surname  ILIKE '%${q}%' OR
        employee.first_name  ILIKE '%${q}%' OR
        employee.other_names  ILIKE '%${q}%' OR
        employee.identification_number  ILIKE '%${q}%' OR
        employee.Admission_date  ILIKE '%${q}%'OR
        employee.email  ILIKE '%${q}%' OR
        country.name  ILIKE '%${q}%' OR
        area.name  ILIKE '%${q}%' OR
        identification_type.name  ILIKE '%${q}%'         
        `)
        : (filter = '')
      area?.length !== undefined
        ? (filter = `employee.areaId = ${area}`)
        : filter
      country?.length !== undefined
        ? (filter = `employee.countryId = ${country}`)
        : filter

      identificationType?.length !== undefined
        ? (filter = `employee.identificationTypeId = ${identificationType}`)
        : filter
      status !== undefined ? (filter = `employee.status = '${status}'`) : filter

      const employees = await getRepository(Employees)
        .createQueryBuilder('employee')
        .select([
          'employee.id',
          'employee.first_surname',
          'employee.second_surname',
          'employee.first_name',
          'employee.other_names',
          'employee.identification_number',
          'employee.Admission_date',
          'employee.email',
          'employee.status',
          'country.name',
          'country.id',
          'area.name',
          'area.id',
          'identification_type.name',
          'identification_type.id',
        ])
        .leftJoin('employee.country', 'country')
        .leftJoin('employee.area', 'area')
        .leftJoin('employee.identification_type', 'identification_type')
        .where(filter)
        .getMany()

      return res.json({ data: employees, total: employees.length })
    } catch (error) {
      console.error('getEmployees Error:', error)
      return res.send(error)
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const repository = getRepository(Employees)
      const repositoryCountry = getRepository(Country)
      const { first_name, first_surname, countryId, identification_number } =
        req.body.params
      let consecutive = 0

      const employeeIdentificationNumberExist = await repository.findOne({
        where: { identification_number },
      })

      if (employeeIdentificationNumberExist) {
        return res.sendStatus(409)
      }

      const countryDomain = await repositoryCountry.findOne({
        where: { id: countryId },
      })

      if (countryDomain === undefined) {
        return res.sendStatus(409)
      }

      let email = `${first_name.replace(/ /g, '')}.${first_surname.replace(
        / /g,
        ''
      )}@${countryDomain.domain}`

      req.body.params.email = email
      const filter = `first_name ILIKE '%${first_name}%' and first_surname ILIKE '%${first_surname}%'`

      const employeeEmailExist = await repository.count({
        where: filter,
      })

      if (employeeEmailExist) {
        employeeEmailExist === 1
          ? (consecutive = 1)
          : (consecutive = employeeEmailExist)

        req.body.params.email = `${first_name.replace(
          / /g,
          ''
        )}.${first_surname.replace(/ /g, '')}.${consecutive}@${
          countryDomain.domain
        }`
      }

      const employee = repository.create(req.body.params)
      await repository.save(employee)

      return res.json(employee)
    } catch (error) {
      console.error('addEmployees Error:', error)
      return res.send(error)
    }
  }
  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const employee = await getRepository(Employees).findOne(req.params.id)

      if (employee) {
        getRepository(Employees).merge(employee, req.body.status)
        const results = await getRepository(Employees).save(employee)
        return res.json(results)
      }

      return res.json({ msg: 'Not customer found' })
    } catch (error) {
      console.error('updateStatus Error:', error)
      return res.send(error)
    }
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const employee = await getRepository(Employees).findOne(req.params.id)
      return res.json(employee)
    } catch (error) {
      console.error('getOne Error:', error)
      return res.send(error)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const employee = await getRepository(Employees).findOne(req.params.id)
      if (employee) {
        getRepository(Employees).merge(employee, req.body.params)
        const results = await getRepository(Employees).save(employee)
        return res.json(results)
      }

      return res.json({ msg: 'Not customer found' })
    } catch (error) {
      console.error('update Error:', error)
      return res.send(error)
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const results = await getRepository(Employees).delete(req.params.id)
      return res.json(results)
    } catch (error) {
      console.error('deleteEmployee Error:', error)
      return res.send(error)
    }
  }
}

export default new Controller()
