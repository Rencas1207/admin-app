import express from 'express';
import { getAll } from '../controllers/sales';

const router = express.Router();

router.get('/', getAll);

export default router;
