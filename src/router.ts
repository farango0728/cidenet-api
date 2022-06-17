import { Router } from 'express'

import AuthController from './app/modules/Auth/controller'
import Users from './app/modules/Users'
import Employees from './app/modules/Employees'
import Areas from './app/modules/Areas'
import Country from './app/modules/Country'
import IdentificationType from './app/modules/IdentificationType'
import Helpers from './app/modules/Helpers'

const router = Router()

router.post('/auth', AuthController.auth)
router.use(Users)
router.use(Employees)
router.use(Areas)
router.use(Country)
router.use(IdentificationType)
router.use(Helpers)
export default router
