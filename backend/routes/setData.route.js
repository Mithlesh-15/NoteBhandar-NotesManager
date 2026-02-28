import express from 'express';
import { createCollegeCourseSubject } from '../controllers/setData.controller.js';

const router = express.Router();

router.post('/base',createCollegeCourseSubject)

export default router;