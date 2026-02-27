import express from 'express';
import { getAllColleges } from '../controllers/getData.controller.js';
import isAuthorized from '../utils/isAuthorized.js';

const router = express.Router();

router.get('/college',isAuthorized,getAllColleges);
router.get('/course',isAuthorized,getAllColleges);
router.get('/subject',isAuthorized,getAllColleges);

export default router;