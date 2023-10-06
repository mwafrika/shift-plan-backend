import { Router } from 'express';
import {
  login,
  register,
  forgetPassword,
  resetPassword,
} from '../../controllers/auth';

const router = Router()
  .post('/login', login)
  .post('/register', register)
  .post('/forget-password', forgetPassword)
  .post('/reset-password/:id/:token', resetPassword);
export default router;
