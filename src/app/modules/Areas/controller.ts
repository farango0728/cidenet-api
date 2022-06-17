import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Areas from '../../models/area'

class Controller {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const { q, name, status, perPage, page, sortBy, sortDesc } = req.query
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

      q?.length !== undefined ? (filter = `name ILIKE '%${q}%'`) : (filter = '')
      name?.length !== undefined ? (filter = `name ILIKE '%${name}%'`) : filter
      status !== undefined ? (filter = `status = '${status}'`) : filter

      const employees = await getRepository(Areas).find({
        where: filter,
        skip: skip,
        take: take,
        order: {
          name: sortDesc ? 'ASC' : 'DESC',
        },
      })
      return res.json({ data: employees, total: employees.length })
    } catch (error) {
      console.error('getAreas Error:', error)
      return res.send(error)
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const repository = getRepository(Areas)
      const { name } = req.body.params

      const userExist = await repository.findOne({ where: { name } })

      if (userExist) {
        return res.sendStatus(409)
      }

      const user = repository.create(req.body.params)
      await repository.save(user)

      return res.json(user)
    } catch (error) {
      console.error('addAreas Error:', error)
      return res.send(error)
    }
  }
  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const user = await getRepository(Areas).findOne(req.params.id)

      if (user) {
        getRepository(Areas).merge(user, req.body.status)
        const results = await getRepository(Areas).save(user)
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
      const employee = await getRepository(Areas).findOne(req.params.id)
      return res.json(employee)
    } catch (error) {
      console.error('getOne Error:', error)
      return res.send(error)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const user = await getRepository(Areas).findOne(req.params.id)
      console.log('req.params', req.body)
      if (user) {
        getRepository(Areas).merge(user, req.body.params)
        const results = await getRepository(Areas).save(user)
        return res.json(results)
      }

      return res.json({ msg: 'Not customer found' })
    } catch (error) {
      console.error('update Error:', error)
      return res.send(error)
    }
  }
}

export default new Controller()
