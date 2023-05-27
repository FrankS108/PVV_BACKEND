import express from 'express';
import checkAuth from '../middleware/checkAuth.js';
import { checkHexId } from '../helpers/hexId.js';
import { getAllEnterprises, addEnterprise, deleteEnterprise, editEnterprise, getEnterprise, addCollaborators, deleteCollaborator , deleteStore} from '../controllers/enterpriseController.js';


const router = express.Router();

router.get('/', checkAuth, getAllEnterprises);
router.post('/', checkAuth, addEnterprise);
router.put('/:id',  checkHexId, checkAuth, editEnterprise);
router.get('/:id',  checkHexId, checkAuth, getEnterprise);
router.delete('/', checkAuth, deleteEnterprise);
router.post('/add-collaborators/:id', checkAuth, addCollaborators );
router.post('/delete-collaborators/:id', checkAuth, deleteCollaborator);
router.post('/delete-store/:id', checkAuth, deleteStore);

export default router;