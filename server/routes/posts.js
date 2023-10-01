import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); //can grab the user feed when we are on the home page like it will give every single post in the databse 
router.get("/:userId/posts", verifyToken, getUserPosts); //can se that particular userid post 

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); //this represent for liking the post and notliking the post

export default router;