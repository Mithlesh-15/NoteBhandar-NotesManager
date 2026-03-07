import express from 'express';
import { existUser, loginUser } from '../controllers/login.controller.js';
import { feedBackAndReport } from '../controllers/action.controller.js';

const router = express.Router();

router.post('/exist-user',existUser);
router.post('/login-user',loginUser);
router.post('/fr',feedBackAndReport);

export default router;