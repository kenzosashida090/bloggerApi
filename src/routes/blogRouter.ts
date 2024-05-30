import express from "express"
import { protect } from "../controller/auth"
import { getBlog } from "../controller/blogController"


const router = express.Router()

router.get("/",protect, getBlog)


export default router