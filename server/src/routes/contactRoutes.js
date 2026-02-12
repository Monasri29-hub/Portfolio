import express from 'express';
import { sendMessage, getMessages } from '../controllers/contactController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', sendMessage);
router.get('/messages', protect, admin, getMessages);

export default router;
