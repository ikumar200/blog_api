const prisma=require("../models/prismaModel");

const getPosts=async (req,res)=>{
    try{
        const posts=await prisma.post.findMany();

        res.status(200).json({
            data: posts
        });
    } catch(error){
        console.error("error fetching posts:", error);
        res.status(500).json({message: "Something went wrong"});
    }
};

const getPost=async (req,res)=>{
    const {id}=req.params;

    try{
        const post =await prisma.post.findUnique({
            where: {id: parseInt(id) } 
        });
        if(!post){
            return res.status(404).json({message: "Post not found"});
        }
        res.status(200).json({data: post});
    }catch(error){
        console.error("errero fetchong post:",error);
        res.status(500).json({msg:"Somethiong went wrong"});
    }
};

const createPost=async(req,res)=>{
const {title,content,category,tags}=req.body;

try{
    const post=await prisma.post.create({
        data:{
            title,
            content,
            category,
            tags,
        }
    });
    res.status(201).json({data:post})
}catch(error){
    console.error("Error creating post:", error);
    res.status(500).json({ message: 'Failed to create post' });
}

};

const updatePost=async(req,res)=>{
    const {id}=req.params;
    const {title,content,category,tags}=req.body;

    try{
        const post=await prisma.post.update({
            where:{id: parseInt(id) },
            data:{
                title,
                content,
                category,
                tags,
            }
        });
        res.status(200).json({data:post});
    }catch(error){
        console.error("Error updating post:", error);

        // Check if the post doesn't exist
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Post not found' });
    }
}
}

const deletePost=async(req,res)=>{
    const { id } = req.params; // Extract the ID from the route parameters

    try {
        // Delete the post with the specified ID
        await prisma.post.delete({
            where: { id: parseInt(id) } // Ensure ID is an integer
        });

        // Respond with a success message
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error("Error deleting post:", error);

        // Check if the post doesn't exist
        if (error.code === 'P2025') {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(500).json({ message: 'Failed to delete post' });
    }
};

module.exports={
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost
};