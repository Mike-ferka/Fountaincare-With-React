const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb+srv://ferkamichaelgha:xO9ZIeQon53bBgX6@mongodb-final-project.uhhhwvv.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB-final-project', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for posts
const postSchema = new mongoose.Schema({
  title: String,
  shortDescription: String,
  content: String,
  imageUrl: String,
  
},{ timestamps: true });

const Post = mongoose.model('Post', postSchema);

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API to get all posts
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// API to get a single post by ID
app.get('/api/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

// API to create a new post
app.post('/api/posts', async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.json(newPost);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
