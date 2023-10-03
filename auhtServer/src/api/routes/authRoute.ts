import express from 'express';
import {loginPost} from '../controllers/authController';
const router = express.Router();

router.post('/login', loginPost);

export default router;
