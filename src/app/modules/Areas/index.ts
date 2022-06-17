import { Router } from 'express'

import authMiddleware from '../../middlewares/authMiddleware'

import AreasController from './controller'

const router = Router()

router.get('/areas/getAll', authMiddleware, AreasController.getAll)
router.post('/areas/add', authMiddleware, AreasController.add)
router.put(
  '/areas/updateStatus/:id',
  authMiddleware,
  AreasController.updateStatus
)
router.get('/areas/getOne/:id', authMiddleware, AreasController.getOne)
router.put('/areas/update/:id', authMiddleware, AreasController.update)

export default router
