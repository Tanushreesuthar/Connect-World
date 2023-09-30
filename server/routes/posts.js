import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts); //can se all the post in the feed
router.get("/:userId/posts", verifyToken, getUserPosts); //can se that particular userid post 

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost); //this represent for liking the post and notliking the post

export default router;