import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

// Creat new Post
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//get a post

export const getPost = async(req,res)=>{
    const id =req.params.id;
    try{
        const post=await PostModel.findById(id);
        res.status(200).json(post)
    }
    catch(error){
        res.status(500).json(error);
    }
}
//update a post

export const updatePost=async(req,res)=>{
    const postId=req.params.id
    const {userId}=req.body
    try{
        const post=await PostModel.findById(postId);
        if(post.userId===userId){
            await post.updateOne({$set:req.body})
            res.status(200).json('Post Updated')
        }else{
            res.status(403).json('Action Forbidden')
        }

    }
    catch(error){
        res.status(500).json(error);
    }
}
//delete a post

export const deletePost=async(req,res)=>{
    const Id=req.params.id
    const {userId}=req.body
    try{
        const post=await PostModel.findById(Id);
        if(post.userId){
            await post.deleteOne()
            res.status(200).json('Post deleted sucessfully')
        }else{
            res.status(403).json('Action Forbidden')
        }

    }
    catch(error){
        res.status(500).json(error);
    }
}

// like/dislike a post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    try {
      //checking post liked by user already
      const post = await PostModel.findById(id);
      //if not like
      if (!post.likes.includes(userId)) {
        await post.updateOne({ $push: { likes: userId } });
        res.status(200).json("Post liked");
      } else {//else unlike
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json("Post Unliked");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };

// Get Timeline POsts
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;
  
    try {
      //finding posts by user
      const currentUserPosts = await PostModel.find({ userId: userId });
      //getting followings post
      const followingPosts = await UserModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "following",
            foreignField: "userId",
            as: "followingPosts",
          },
        },
        {
          $project: {
            followingPosts: 1,
            _id: 0,
          },
        },
      ]);
  
      res
        .status(200)
        .json(currentUserPosts.concat(...followingPosts[0].followingPosts)      
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        })//for contatinating result,
        );
    } catch (error) {
      res.status(500).json(error);
    }
  };  
