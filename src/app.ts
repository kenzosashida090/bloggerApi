import morgan from "morgan" //Logs all request to the server
import express, {Request, Response,NextFunction} from "express"
import dotenv from "dotenv" // ENV Variables

import { google } from "googleapis"
import bodyParser from "body-parser"

dotenv.config({path:"./.env"}) //configure path to the env file where we store all the important keys

export const app = express()
const OAuth2 = google.auth.OAuth2;



// Set the OAuth2, for later to generate the refresh token and allow us to access to the Google API
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
  })

if(process.env.NODE_ENV==="development") app.use(morgan("dev")) //only see this in development

app.use( async(req:Request, res:Response, next:NextFunction)=> {
    try{
      const tokens = await oauth2Client.refreshAccessToken();
      oauth2Client.setCredentials(tokens.credentials);
      next();
    }catch(error) {
      res.status(500).json("Error refreshing access token")
    }
}) // Access to the google API with refresh token

app.use(
    bodyParser.urlencoded({
      extended: true
    })
)
app.use((req:Request, res:Response, next:NextFunction) => {
    req.requestTime = new Date().toISOString();
    console.log(req.requestTime)
    next();
  });

app.get('/blogger', async (req:Request, res:Response) => {
  const blogger = google.blogger({ version: 'v3', auth: oauth2Client });
  try {
    const response = await blogger.blogs.get({ blogId: process.env.BLOG_ID });
    if (response) res.status(202).json(response.data);
  }catch (error) {
    console.error('Error fetching blog', error);
    res.send('Error fetching blog');
    }
  });
  
app.get("/blogger/posts", async (req:Request, res:Response, next:NextFunction) => {
    const blogger = google.blogger({ version: 'v3', auth: oauth2Client });
    try { 
      const response = await blogger.posts.list({ blogId: process.env.BLOG_ID });
      const posts = response.data.items
      res.status(202).json({
        status:"success",
        data:posts
      })
    }catch(error) {
      res.status(505).json("Error fetching blog")
    }
  })