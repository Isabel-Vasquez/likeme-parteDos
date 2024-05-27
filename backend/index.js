import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './database/connection.js';
import {
  getPosts,
  createPost,
  updatePostLikes,
  deletePost,
} from './models/post.models.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

testConnection();

app.get('/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/posts', async (req, res) => {
  try {
    const { titulo, url: img, descripcion } = req.body;
    const newPost = await createPost(titulo, img, descripcion);
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para incrementar likes
app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await updatePostLikes(id);
    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Ruta para eliminar un post
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await deletePost(id);
    if (deletedPost) {
      res.json(deletedPost);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
