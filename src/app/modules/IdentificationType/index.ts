import { Router } from 'express'

import authMiddleware from '../../middlewares/authMiddleware'

import IdentificationTypeController from './controller'

const router = Router()

router.get(
  '/identification-type/getAll',
  authMiddleware,
  IdentificationTypeController.getAll
)
router.post(
  '/identification-type/add',
  authMiddleware,
  IdentificationTypeController.add
)
router.put(
  '/identification-type/updateStatus/:id',
  authMiddleware,
  IdentificationTypeController.updateStatus
)
router.get(
  '/identification-type/getOne/:id',
  authMiddleware,
  IdentificationTypeController.getOne
)
router.put(
  '/identification-type/update/:id',
  authMiddleware,
  IdentificationTypeController.update
)

export default router
