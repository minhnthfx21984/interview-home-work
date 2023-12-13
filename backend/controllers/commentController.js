const Comment = require("../models/comment");

// Tạo comment
const createComment = async (req, res) => {
  try {
    const { text, postId } = req.body;

    // Kiểm tra xem postId có tồn tại không
    // Nếu không tồn tại, bạn có thể thực hiện xử lý phù hợp

    const comment = new Comment({ text, post: postId });
    await comment.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Lấy comment theo post
const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Kiểm tra xem postId có tồn tại không
    // Nếu không tồn tại, bạn có thể thực hiện xử lý phù hợp

    const comments = await Comment.find({ post: postId });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
};
