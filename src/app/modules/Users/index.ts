import { Router } from 'express'

import authMiddleware from '../../middlewares/authMiddleware'

import UserController from './controller'

const router = Router()

router.post('/addUser', UserController.createUser)

export default router
