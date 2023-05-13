import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registerStore, getStore } from '../controllers/storeController.js';

const router = express.Router();

router.post('/', checkAuth, registerStore);
router.get('/:id', checkAuth, getStore);

export default router;