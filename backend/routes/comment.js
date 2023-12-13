const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

// Tạo comment
router.post("/comments", commentController.createComment);

// Lấy comment theo post
router.get("/posts/:postId/comments", commentController.getCommentsByPost);

module.exports = router;
