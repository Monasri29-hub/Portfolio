import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getProfile);
router.put('/', protect, admin, updateProfile);

export default router;
