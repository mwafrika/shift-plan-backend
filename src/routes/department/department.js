import { Router} from 'express';

import { createNewDepartment,
     findAllDepartment,
    updateDepartmentById, } from '../../controllers/department';

const router = Router()
    .get('/', findAllDepartment)
    .post('/create', createNewDepartment)
    .patch('/update', updateDepartmentById);

export default router;
