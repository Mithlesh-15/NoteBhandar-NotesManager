import express from 'express';
import { existUser, loginUser } from '../controllers/login.controller.js';

const router = express.Router();

router.post('/exist-user',existUser);
router.post('/login-user',loginUser);

export default router;