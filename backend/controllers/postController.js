const Post = require("../models/post");

const postController = {
  getAllPosts: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5; // Số bài viết mỗi trang
    const searchKeyword = req.query.title;

    try {
      let query = {};

      if (searchKeyword) {
        // Nếu có từ khóa tìm kiếm, thêm điều kiện tìm kiếm theo title
        query = { title: { $regex: new RegExp(searchKeyword, "i") } };
      }

      const totalPosts = await Post.countDocuments(query);
      const totalPages = Math.ceil(totalPosts / pageSize);

      const posts = await Post.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .exec();

      const truncatedPosts = posts.map((post) => ({
        ...post._doc,
        content: post.content.substring(0, 100),
      }));

      res.json({
        posts: truncatedPosts,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getPostById: async (req, res) => {
    const postId = req.params.id;

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createPost: async (req, res) => {
    try {
      const { title, content, author } = req.body;

      // Tạo một bài viết mới sử dụng mô hình Post
      const newPost = new Post({
        title,
        content,
        author,
      });

      // Lưu bài viết vào cơ sở dữ liệu
      const savedPost = await newPost.save();

      res.status(201).json(savedPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updatePost: async (req, res) => {
    const postId = req.params.id;
    const { author, content, title } = req.body;

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      post.title = title;
      post.content = content;
      post.author = author;

      await post.save();

      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletePost: async (req, res) => {
    const postId = req.params.id;

    try {
      const post = await Post.findByIdAndDelete(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = postController;
