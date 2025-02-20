import express from 'express'
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/companyController.js'
import isAuthenticated from '../middlewares/Auth.js';
import { singleUpload } from '../middlewares/multer.js'

const router = express.Router();

router.post('/register', isAuthenticated, singleUpload, registerCompany);
router.get('/get', isAuthenticated, getCompany);
router.get('/get/:id', isAuthenticated, getCompanyById);
router.put('/update/:id', isAuthenticated, singleUpload, updateCompany);

export default router;