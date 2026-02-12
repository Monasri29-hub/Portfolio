import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma.js';

// @desc    Send a message
// @route   POST /api/contact
// @access  Public
const sendMessage = asyncHandler(async (req, res) => {
    const { name, email, content } = req.body;

    if (!name || !email || !content) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    const message = await prisma.message.create({
        data: {
            name,
            email,
            content,
        },
    });

    res.status(201).json(message);
});

// @desc    Get all messages
// @route   GET /api/contact/messages
// @access  Private/Admin
const getMessages = asyncHandler(async (req, res) => {
    const messages = await prisma.message.findMany({
        orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
});

// @desc    Mark message as read (optional, can be implemented later)
// @route   PUT /api/contact/messages/:id/read
// @access  Private/Admin

export { sendMessage, getMessages };
