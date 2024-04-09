import express from 'express'
import { login, logout, registerUser } from '../controller/userController.js';

const router = express.Router();

router.route('/user/register').post(registerUser);
router.route('/user/login').post(login);
router.route('/user/logout').post(logout);

export default router;