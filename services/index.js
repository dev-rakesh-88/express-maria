const Post = require('../models/Post')
const addPostService = (body) => {
    const { title, content } = body;
  
    Post.create({ title, content })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
}

module.exports = {
    addPostService
}