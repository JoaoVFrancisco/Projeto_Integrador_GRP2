import { Router } from 'express'
import { createEnvio, readEnvio } from '../Controllers/envioController.js';


const router = Router();

router.post('/', createEnvio)
router.get('/', readEnvio)

export default router;