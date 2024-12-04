// services/postService.js
const prisma = require("../models/prismaModel");

const getAllPosts = async () => {
    return await prisma.post.findMany();
};

const getPostById = async (id) => {
    return await prisma.post.findUnique({
        where: { id: parseInt(id) }
    });
};

const createNewPost = async (title, content, category, tags) => {
    return await prisma.post.create({
        data: { title, content, category, tags }
    });
};

const updateExistingPost = async (id, title, content, category, tags) => {
    return await prisma.post.update({
        where: { id: parseInt(id) },
        data: { title, content, category, tags }
    });
};

const deletePostById = async (id) => {
    return await prisma.post.delete({
        where: { id: parseInt(id) }
    });
};

module.exports = {
    getAllPosts,
    getPostById,
    createNewPost,
    updateExistingPost,
    deletePostById
};
