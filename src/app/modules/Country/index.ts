import { Router } from 'express'

import authMiddleware from '../../middlewares/authMiddleware'

import CountryController from './controller'

const router = Router()

router.get('/country/getAll', authMiddleware, CountryController.getAll)
router.post('/country/add', authMiddleware, CountryController.add)
router.put(
  '/country/updateStatus/:id',
  authMiddleware,
  CountryController.updateStatus
)
router.get('/country/getOne/:id', authMiddleware, CountryController.getOne)
router.put('/country/update/:id', authMiddleware, CountryController.update)

export default router
