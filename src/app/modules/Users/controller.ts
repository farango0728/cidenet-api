import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import Users from '../../models/user'

class Controller {
  sessionId(req: Request, res: Response) {
    return res.send({ userId: req.userId })
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const repository = getRepository(Users)
      const { user_name } = req.body

      const userExist = await repository.findOne({ where: { user_name } })

      if (userExist) {
        return res.sendStatus(409)
      }

      const user = repository.create(req.body)
      await repository.save(user)

      return res.json(user)
    } catch (error) {
      console.error('createUser Error:', error)
      return res.send(error)
    }
  }

  async getOneUser(req: Request, res: Response): Promise<Response> {
    try {
      const customers1 = await getRepository(Users).findOne(req.params.id)
      return res.json(customers1)
    } catch (error) {
      console.error('getOneUser Error:', error)
      return res.send(error)
    }
  }

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const customers1 = await getRepository(Users).find()
      return res.json(customers1)
    } catch (error) {
      console.error('getUsers Error:', error)
      return res.send(error)
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await getRepository(Users).findOne(req.params.id)
      if (user) {
        getRepository(Users).merge(user, req.body)
        const results = await getRepository(Users).save(user)
        return res.json(results)
      }

      return res.json({ msg: 'Not customer found' })
    } catch (error) {
      console.error('updateUser Error:', error)
      return res.send(error)
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const results = await getRepository(Users).delete(req.params.id)
      return res.json(results)
    } catch (error) {
      console.error('deleteUser Error:', error)
      return res.send(error)
    }
  }

  async updateUserStatus(req: Request, res: Response): Promise<Response> {
    try {
      const user = await getRepository(Users).findOne(req.params.id)
      if (user) {
        getRepository(Users).merge(user, req.body)
        const results = await getRepository(Users).save(user)
        return res.json(results)
      }

      return res.json({ msg: 'Not customer found' })
    } catch (error) {
      console.error('updateUserStatus Error:', error)
      return res.send(error)
    }
  }
}

export default new Controller()
