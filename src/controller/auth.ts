import { NextFunction, Request, Response } from "express";
import { google } from "googleapis";
import { oauth2Client } from "../app";

export function protect(req:Request, res:Response, next:NextFunction){
    const blogger = google.blogger({ version: 'v3', auth: oauth2Client });
    req.blogger = blogger
    next()
}