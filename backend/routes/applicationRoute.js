import express from 'express'
import { applyJob, getAppliedJobs, getApplicants, updateStatus } from '../controllers/applicationController.js'
import isAuthenticated from '../middlewares/Auth.js';


const router = express.Router();

router.get('/apply/:id', isAuthenticated, applyJob);  // konsi job pr apply krree hain
router.get('/get', isAuthenticated, getAppliedJobs);
router.get('/:id/applicants', isAuthenticated, getApplicants);
router.post('/status/:id/update', isAuthenticated, updateStatus);

export default router;