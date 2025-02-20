import express from 'express'
import { logout, register } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/Auth.js';
import { updateProfile } from '../controllers/userController.js';
import { login } from '../controllers/userController.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/register', singleUpload, register);
router.post('/login', login);
router.put('/profile/update', isAuthenticated, singleUpload, updateProfile);
router.get('/logout', logout);

export default router;

// multer ka middleware attach hona chahiye jb hum file upload kr rhe hain khi bhi 