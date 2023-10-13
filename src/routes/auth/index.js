import { Router } from 'express';
import { register, login } from '../../controllers/auth';
import { validateUserData } from '../../middleware/validateInput';

const router = Router().post('/register', validateUserData, register).post('/login', login);

export default router;
