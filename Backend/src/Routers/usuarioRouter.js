import { Router } from 'express'
import { createUser, deleteUser, readUser, updateUser } from '../Controllers/usuarioController.js';



const router = Router();

//Rota para criar usuario
router.post('/', createUser);
router.get('/', readUser);
router.put('/:id_usuario', updateUser);
router.delete('/:id_usuario', deleteUser)


export default router;