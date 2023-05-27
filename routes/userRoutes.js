import express from "express";
import { register, authenticate, confirm, resetPassword, verifyToken, newPassword, profile } from '../controllers/userController.js';
import checkAuth from "../middleware/checkAuth.js";
import { checkHexToken }from "../helpers/hexId.js";

const router = express.Router();


// Autenticacion, Registro y Confirmación de Usuarios
router.post('/', register); //Crea un nuevo usuario
router.post('/login', authenticate);
router.get('/confirm/:token', confirm);
router.post('/reset-password', resetPassword);
router.route('/reset-password/:token')
    .get(verifyToken)
    .post(newPassword)

router.get('/profile', checkAuth, profile);
export default router;