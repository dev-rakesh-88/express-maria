require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const router = require('./routes/index')
const Post = require('./models/Post');

app.use(express.json());

// Create a new post

app.use('/api',router)

app.get('/posts', (req, res) => {
    Post.findAll()
      .then((posts) => {
        res.json(posts);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });

  app.put('/posts/:id', (req, res) => {
    const postId = req.params.id;
    const { title, content } = req.body;
  
    Post.findByPk(postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        post.title = title;
        post.content = content;
  
        return post.save();
      })
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });

  app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
  
    Post.findByPk(postId)
      .then((post) => {
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
  
        return post.destroy();
      })
      .then(() => {
        res.json({ message: 'Post deleted successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  });
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});