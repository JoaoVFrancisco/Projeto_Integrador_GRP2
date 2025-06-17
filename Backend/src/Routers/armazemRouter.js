import { Router } from 'express'
import { createArmazem, readArmazem } from '../Controllers/armazemController.js';


const router = Router();

router.post('/', createArmazem)
router.get('/', readArmazem)

export default router;