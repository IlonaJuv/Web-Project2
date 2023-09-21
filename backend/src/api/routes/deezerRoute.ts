import express from 'express';
import { getDeezer } from '../controllers/deezerController';

const router = express.Router();

router
    .route('/:query')
    .get(getDeezer)

export default router;