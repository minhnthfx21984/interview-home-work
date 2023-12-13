const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

const connectDB = require("./dbConnect");
connectDB();

const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

app.use(postRoutes);
app.use(commentRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
