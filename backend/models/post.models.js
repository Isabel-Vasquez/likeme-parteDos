import { pool } from '../database/connection.js';

const getPosts = async () => {
  const result = await pool.query('SELECT * FROM posts');
  return result.rows;
};

const createPost = async (titulo, img, descripcion) => {
  const result = await pool.query(
    'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *',
    [titulo, img, descripcion]
  );
  return result.rows[0];
};

const updatePostLikes = async (id) => {
  const result = await pool.query(
    'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

const deletePost = async (id) => {
  const result = await pool.query(
    'DELETE FROM posts WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

export { getPosts, createPost, updatePostLikes, deletePost };
