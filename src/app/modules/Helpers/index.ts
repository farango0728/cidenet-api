import { Router } from 'express'

import authMiddleware from '../../middlewares/authMiddleware'

import HelepersController from './controller'

const router = Router()

router.get('/getHelpers', authMiddleware, HelepersController.getHelpers)

export default router
