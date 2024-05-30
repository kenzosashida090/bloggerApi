import { NextFunction, Request, Response } from "express";

export async function getAllPosts(req:Request, res:Response, next:NextFunction) {
    try{
        const blogger = req.blogger // blogger is stored in the protected middleware
        const response = await blogger.posts.list({ blogId: process.env.BLOG_ID });
        const posts = response.data.items
        res.status(202).json({
          status:"success",
          data:posts
        })
    }catch(error) {
        res.status(404).json({error:error.message})
    }
}

export async function getPost(req:Request, res:Response, next:NextFunction) {
    try{
        
    }catch(error) {
        res.status(404).json({error:error.message})
    }

}