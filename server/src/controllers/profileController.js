import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma.js';

// @desc    Get user profile
// @route   GET /api/profile
// @access  Public
const getProfile = asyncHandler(async (req, res) => {
    // Assuming single user profile for now, or fetch by ID if needed.
    // We'll fetch the first profile found or a specific admin profile.
    const profile = await prisma.profile.findFirst();

    if (profile) {
        res.json(profile);
    } else {
        // Return empty profile if none exists
        res.json({ bio: '', resumeUrl: '', githubUrl: '', linkedinUrl: '', mediumUrl: '' });
    }
});

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private/Admin
const updateProfile = asyncHandler(async (req, res) => {
    const { bio, resumeUrl, githubUrl, linkedinUrl, mediumUrl, publicEmail, location } = req.body;

    let profile = await prisma.profile.findFirst();

    if (profile) {
        profile = await prisma.profile.update({
            where: { id: profile.id },
            data: {
                bio,
                resumeUrl,
                githubUrl,
                linkedinUrl,
                mediumUrl,
                publicEmail,
                location
            },
        });
    } else {
        profile = await prisma.profile.create({
            data: {
                bio,
                resumeUrl,
                githubUrl,
                linkedinUrl,
                mediumUrl,
                publicEmail,
                location
            },
        });
    }

    res.json(profile);
});

export { getProfile, updateProfile };
