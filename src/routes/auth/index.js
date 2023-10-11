import { Router } from 'express';
import {
  getAllUsers,
  register,
} from '../../controllers/auth';
import { validateUserData } from '../../middleware/validateInput';

const router = Router()
  .post('/register', validateUserData, register)
  .get('/users', getAllUsers);

export default router;
