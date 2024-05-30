import morgan from "morgan" //Logs all request to the server
import express, {Request, Response,NextFunction} from "express"
import dotenv from "dotenv" // ENV Variables

import { google } from "googleapis"
import bodyParser from "body-parser"
import blogRouter from "./routes/blogRouter"
import postsRouter from "./routes/postsRouter"

export const app = express()
dotenv.config({path:"./.env"}) //configure path to the env file where we store all the important keys

const OAuth2 = google.auth.OAuth2;
// Set the OAuth2, for later to generate the refresh token and allow us to access to the Google API
export const oauth2Client = new OAuth2(
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

app.use("/api/v1/blog", blogRouter)
app.use("/api/v1/posts", postsRouter)