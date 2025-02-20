import express from 'express'
import { postJob, getAllJobs, getJobById, getAdminJobs} from '../controllers/jobController.js'
import isAuthenticated from '../middlewares/Auth.js';



const router = express.Router();

router.post('/post', isAuthenticated, postJob);
router.get('/get', getAllJobs);
router.get('/getadminjobs', isAuthenticated, getAdminJobs);
router.get('/get/:id', isAuthenticated, getJobById);

export default router;