import express from "express"
import { protect } from "../controller/auth"
import { getAllPosts } from "../controller/postsController"

const router=  express.Router()

router.get("/",protect,getAllPosts )
router.get("/[id]", protect,)
export default router