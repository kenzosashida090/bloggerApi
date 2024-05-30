"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = void 0;
async function getAllPosts(req, res, next) {
    try {
        const blogger = req.blogger;
        const response = await blogger.posts.list({ blogId: process.env.BLOG_ID });
        const posts = response.data.items;
        res.status(202).json({
            status: "success",
            data: posts
        });
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}
exports.getAllPosts = getAllPosts;
//# sourceMappingURL=postsController.js.map