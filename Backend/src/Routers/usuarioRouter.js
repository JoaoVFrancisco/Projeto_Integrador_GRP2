import { Router } from 'express'
import { createUser, readUser } from '../Controllers/usuarioController.js';



const router = Router();

//Rota para criar usuario
router.post('/', createUser);
router.get('/', readUser)


export default router;