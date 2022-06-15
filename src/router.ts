import { Router } from 'express'

import AuthController from './app/modules/Auth/controller'
import Users from './app/modules/Users'

const router = Router()

router.post('/auth', AuthController.auth)
router.use(Users)
export default router
