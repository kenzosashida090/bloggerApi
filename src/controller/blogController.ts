
import { Request, Response,NextFunction } from "express";

export async function getBlog (req:Request, res:Response, next:NextFunction) {
    try {
        const blogger = req.blogger
        const response = await blogger.blogs.get({ blogId: process.env.BLOG_ID });
        if (response) res.status(202).json({
            status:"success",
            data:response.data
        });
      }catch (error) {
        console.error('Error fetching blog', error);
        res.send('Error fetching blog');
    }
}