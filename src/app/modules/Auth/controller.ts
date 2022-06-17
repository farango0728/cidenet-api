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

    dataUser = {
      Employeess_first_name: 'Fabio',
      Employeess_last_name: 'arango',
      name: 'Farango',
      rol: 'Empleado',
      rolId: 1,
    }

    const menuUser = [
      {
        title: 'Employees',
        icon: 'UsersIcon',
        children: [
          {
            title: 'Create',
            route: 'apps-employees-add',
          },
          {
            title: 'List',
            route: 'apps-employees-list',
          },
        ],
      },
      {
        title: 'Settings',
        icon: 'SettingsIcon',
        children: [
          {
            title: 'Country',
            route: 'apps-country-list',
          },
          {
            title: 'Identification type',
            route: 'apps-identification-type-list',
          },
          {
            title: 'Area',
            route: 'apps-areas-list',
          },
        ],
      },
    ]

    return res.json({
      is_access: true,
      user,
      token,
      dataUser,
      menuUser,
    })
  }
}

export default new Controller()
