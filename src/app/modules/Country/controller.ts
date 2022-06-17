import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Country from '../../models/country'

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

      const countries = await getRepository(Country).find({
        where: filter,
        skip: skip,
        take: take,
        order: {
          name: sortDesc ? 'ASC' : 'DESC',
        },
      })
      return res.json({ data: countries, total: countries.length })
    } catch (error) {
      console.error('getCountry Error:', error)
      return res.send(error)
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const repository = getRepository(Country)
      const { name } = req.body.params

      const countryExist = await repository.findOne({ where: { name } })

      if (countryExist) {
        return res.sendStatus(409)
      }

      const country = repository.create(req.body.params)
      await repository.save(country)

      return res.json(country)
    } catch (error) {
      console.error('addCountry Error:', error)
      return res.send(error)
    }
  }
  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const country = await getRepository(Country).findOne(req.params.id)

      if (country) {
        getRepository(Country).merge(country, req.body.status)
        const results = await getRepository(Country).save(country)
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
      const country = await getRepository(Country).findOne(req.params.id)
      return res.json(country)
    } catch (error) {
      console.error('getOne Error:', error)
      return res.send(error)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const country = await getRepository(Country).findOne(req.params.id)
      console.log('req.params', req.body)
      if (country) {
        getRepository(Country).merge(country, req.body.params)
        const results = await getRepository(Country).save(country)
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
