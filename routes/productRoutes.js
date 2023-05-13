import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { registerProduct, editProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.post('/', checkAuth, registerProduct);
router.put('/:id', checkAuth, editProduct);
router.delete('/', checkAuth, deleteProduct);


export default router;