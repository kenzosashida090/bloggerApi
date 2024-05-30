"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const morgan_1 = __importDefault(require("morgan")); //Logs all request to the server
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv")); // ENV Variables
const googleapis_1 = require("googleapis");
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config({ path: "./.env" }); //configure path to the env file where we store all the important keys
exports.app = (0, express_1.default)();
const OAuth2 = googleapis_1.google.auth.OAuth2;
// Set the OAuth2, for later to generate the refresh token and allow us to access to the Google API
const oauth2Client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'http://localhost:3000/oauth2callback');
oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});
if (process.env.NODE_ENV === "development")
    exports.app.use((0, morgan_1.default)("dev")); //only see this in development
exports.app.use(async (req, res, next) => {
    try {
        const tokens = await oauth2Client.refreshAccessToken();
        oauth2Client.setCredentials(tokens.credentials);
        next();
    }
    catch (error) {
        res.status(500).json("Error refreshing access token");
    }
}); // Access to the google API with refresh token
exports.app.use(body_parser_1.default.urlencoded({
    extended: true
}));
exports.app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime);
    next();
});
exports.app.get('/blogger', async (req, res) => {
    const blogger = googleapis_1.google.blogger({ version: 'v3', auth: oauth2Client });
    try {
        const response = await blogger.blogs.get({ blogId: process.env.BLOG_ID });
        if (response)
            res.status(202).json(response.data);
    }
    catch (error) {
        console.error('Error fetching blog', error);
        res.send('Error fetching blog');
    }
});
exports.app.get("/blogger/posts", async (req, res, next) => {
    const blogger = googleapis_1.google.blogger({ version: 'v3', auth: oauth2Client });
    try {
        const response = await blogger.posts.list({ blogId: process.env.BLOG_ID });
        const posts = response.data.items;
        res.status(202).json({
            status: "success",
            data: posts
        });
    }
    catch (error) {
        res.status(505).json("Error fetching blog");
    }
});
//# sourceMappingURL=app.js.map