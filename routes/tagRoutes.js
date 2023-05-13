import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { getTags, registerTag, deleteTag } from '../controllers/tagController.js';

const router = express.Router();

router.route('/').get(checkAuth, getTags).post(checkAuth, registerTag);
router.delete('/:id', checkAuth, deleteTag);

export default router;