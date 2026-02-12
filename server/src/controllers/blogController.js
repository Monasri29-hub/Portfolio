import asyncHandler from 'express-async-handler';
import prisma from '../utils/prisma.js';

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    const blogs = await prisma.blog.findMany({
        orderBy: { createdAt: 'desc' },
    });
    res.json(blogs);
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await prisma.blog.findUnique({
        where: { id: req.params.id },
    });

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, tags, published } = req.body;

    const blog = await prisma.blog.create({
        data: {
            title,
            content,
            tags,
            published: published || false,
        },
    });

    res.status(201).json(blog);
});

// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
    const { title, content, tags, published } = req.body;

    const blog = await prisma.blog.findUnique({
        where: { id: req.params.id },
    });

    if (blog) {
        const updatedBlog = await prisma.blog.update({
            where: { id: req.params.id },
            data: {
                title,
                content,
                tags,
                published,
            },
        });
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
    const blog = await prisma.blog.findUnique({
        where: { id: req.params.id },
    });

    if (blog) {
        await prisma.blog.delete({
            where: { id: req.params.id },
        });
        res.json({ message: 'Blog post removed' });
    } else {
        res.status(404);
        throw new Error('Blog post not found');
    }
});

export { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
