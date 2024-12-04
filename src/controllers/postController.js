// controllers/postController.js
const postService = require("../services/postService");

const getPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json({ data: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await postService.getPostById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ data: post });
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const createPost = async (req, res) => {
    const { title, content, category, tags } = req.body;
    try {
        const post = await postService.createNewPost(title, content, category, tags);
        res.status(201).json({ data: post });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Failed to create post" });
    }
};

const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content, category, tags } = req.body;
    try {
        const post = await postService.updateExistingPost(id, title, content, category, tags);
        res.status(200).json({ data: post });
    } catch (error) {
        console.error("Error updating post:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(500).json({ message: "Something went wrong" });
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        await postService.deletePostById(id);
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        if (error.code === 'P2025') {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(500).json({ message: "Failed to delete post" });
    }
};

module.exports = {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
};
