

import {Request,Response,NextFunction } from "express"
import path from "path";

const express = require("express")
const {google} = require("googleapis")
import dotenv from "dotenv"

dotenv.config({path:"./.env"})

const OAuth2 = google.auth.OAuth2;
const app = express();
const PORT = process.env.PORT || 3000;

// Configura el cliente OAuth2
console.log("this is googelaut",google.auth)
const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:3000/oauth2callback'
);

// Permisos que solicitas
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
})

app.use( async(req:Request, res:Response, next:NextFunction)=> {
  try{
    const tokens = await oauth2Client.refreshAccessToken();
    oauth2Client.setCredentials(tokens.credentials);
    next();
  }catch(error) {
    res.status(500).json("Error refreshing access token")
  }
})

// Ruta para interactuar con la API de Blogger
app.get('/blogger', async (req:Request, res:Response) => {
  const blogger = google.blogger({ version: 'v3', auth: oauth2Client });
  try {
    const response = await blogger.blogs.get({ blogId: process.env.BLOG_ID });
    if (response) res.status(202).json(response.data);
  } catch (error) {
    console.error('Error fetching blog', error);
    res.send('Error fetching blog');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/blogger/posts", async (req:Request, res:Response, next:NextFunction) => {
  const blogger = google.blogger({ version: 'v3', auth: oauth2Client });
  try { 
    const response = await blogger.posts.list({ blogId: process.env.BLOG_ID });
    const posts = response.data.items
    console.log(posts)
    res.status(202).json("Nice")
  }catch(error) {
    res.status(505).json("Error fetching blog")
  }
})