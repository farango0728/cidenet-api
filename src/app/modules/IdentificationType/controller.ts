import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import IdentificationType from '../../models/identification_type'

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

      const identificationType = await getRepository(IdentificationType).find({
        where: filter,
        skip: skip,
        take: take,
        order: {
          name: sortDesc ? 'ASC' : 'DESC',
        },
      })
      return res.json({
        data: identificationType,
        total: identificationType.length,
      })
    } catch (error) {
      console.error('getIdentificationType Error:', error)
      return res.send(error)
    }
  }

  async add(req: Request, res: Response): Promise<Response> {
    try {
      const repository = getRepository(IdentificationType)
      const { name } = req.body.params

      const identificationTypeExist = await repository.findOne({
        where: { name },
      })

      if (identificationTypeExist) {
        return res.sendStatus(409)
      }

      const identificationType = repository.create(req.body.params)
      await repository.save(identificationType)

      return res.json(identificationType)
    } catch (error) {
      console.error('addIdentificationType Error:', error)
      return res.send(error)
    }
  }
  async updateStatus(req: Request, res: Response): Promise<Response> {
    try {
      const identificationType = await getRepository(
        IdentificationType
      ).findOne(req.params.id)

      if (identificationType) {
        getRepository(IdentificationType).merge(
          identificationType,
          req.body.status
        )
        const results = await getRepository(IdentificationType).save(
          identificationType
        )
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
      const identificationType = await getRepository(
        IdentificationType
      ).findOne(req.params.id)
      return res.json(identificationType)
    } catch (error) {
      console.error('getOne Error:', error)
      return res.send(error)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const identificationType = await getRepository(
        IdentificationType
      ).findOne(req.params.id)
      console.log('req.params', req.body)
      if (identificationType) {
        getRepository(IdentificationType).merge(
          identificationType,
          req.body.params
        )
        const results = await getRepository(IdentificationType).save(
          identificationType
        )
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
