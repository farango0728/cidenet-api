import { Router } from 'express'

import authMiddleware from '../../middlewares/authMiddleware'

import EmployeesController from './controller'

const router = Router()

router.get('/employees/getAll', authMiddleware, EmployeesController.getAll)
router.post('/employees/add', authMiddleware, EmployeesController.add)
router.put(
  '/employees/updateStatus/:id',
  authMiddleware,
  EmployeesController.updateStatus
)
router.get('/employees/getOne/:id', authMiddleware, EmployeesController.getOne)
router.put('/employees/update/:id', authMiddleware, EmployeesController.update)
router.delete(
  '/employees/delete/:id',
  authMiddleware,
  EmployeesController.delete
)

export default router
