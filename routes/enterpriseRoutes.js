import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { getAllEnterprises, addEnterprise, deleteEnterprise, editEnterprise, getEnterprise, addCollaborators } from '../controllers/enterpriseController.js';


const router = express.Router();

router.get('/', checkAuth, getAllEnterprises);
router.post('/', checkAuth, addEnterprise);
router.put('/:id', checkAuth, editEnterprise);
router.get('/:id', checkAuth, getEnterprise);
router.delete('/', checkAuth, deleteEnterprise);
router.post('/add-collaborators/:id', checkAuth, addCollaborators );

export default router;