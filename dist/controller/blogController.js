"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlog = void 0;
async function getBlog(req, res, next) {
    try {
        const blogger = req.blogger;
        const response = await blogger.blogs.get({ blogId: process.env.BLOG_ID });
        if (response)
            res.status(202).json({
                status: "success",
                data: response.data
            });
    }
    catch (error) {
        console.error('Error fetching blog', error);
        res.send('Error fetching blog');
    }
}
exports.getBlog = getBlog;
//# sourceMappingURL=blogController.js.map