import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Area from '../../models/area'
import Country from '../../models/country'
import IdentificationType from '../../models/identification_type'

class Controller {
  async getHelpers(req: Request, res: Response): Promise<Response> {
    try {
      const countries = await getRepository(Country).find({
        select: ['id', 'name'],
        where: { status: true },
        order: { name: 'ASC' },
      })

      const areas = await getRepository(Area).find({
        select: ['id', 'name'],
        where: { status: true },
        order: { name: 'ASC' },
      })

      const identificationType = await getRepository(IdentificationType).find({
        select: ['id', 'name'],
        where: { status: true },
        order: { name: 'ASC' },
      })

      return res.json({
        data: {
          countries,
          areas,
          identificationType,
        },
      })
    } catch (error) {
      console.error('getHelpers Error:', error)
      return res.send(error)
    }
  }
}
export default new Controller()
