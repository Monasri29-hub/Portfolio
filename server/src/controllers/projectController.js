import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma.js';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
    });
    res.json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
    const project = await prisma.project.findUnique({
        where: { id: req.params.id },
    });

    if (project) {
        res.json(project);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
    const { title, description, techStack, githubLink, liveLink, imageUrl, category } = req.body;

    const project = await prisma.project.create({
        data: {
            title,
            description,
            techStack,
            githubLink,
            liveLink,
            imageUrl,
            category,
        },
    });

    res.status(201).json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
    const { title, description, techStack, githubLink, liveLink, imageUrl, category } = req.body;

    const project = await prisma.project.findUnique({
        where: { id: req.params.id },
    });

    if (project) {
        const updatedProject = await prisma.project.update({
            where: { id: req.params.id },
            data: {
                title,
                description,
                techStack,
                githubLink,
                liveLink,
                imageUrl,
                category,
            },
        });
        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
    const project = await prisma.project.findUnique({
        where: { id: req.params.id },
    });

    if (project) {
        await prisma.project.delete({
            where: { id: req.params.id },
        });
        res.json({ message: 'Project removed' });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

export { getProjects, getProjectById, createProject, updateProject, deleteProject };
