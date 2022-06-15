import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Users from '../../models/user'

class Controller {
  async auth(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(Users)

    const { user_name, password } = req.body
    let dataUser: any = ''

    const user = await repository.findOne({
      where: { user_name },
    })

    if (!user) {
      return res.json({
        is_access: false,
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) {
      return res.json({
        is_access: false,
      })
    }

    const { id } = user
    const token = jwt.sign({ id }, 'secret', { expiresIn: '1d' })

    return res.json({
      user,
      token,
    })
  }
}

export default new Controller()
