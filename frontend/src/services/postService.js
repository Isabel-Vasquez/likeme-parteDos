import axios from 'axios';

const urlBaseServer = 'http://localhost:3000';

export const getPosts = async () => {
  const response = await axios.get(`${urlBaseServer}/posts`);
  return response.data;
};

export const agregarPost = async (post) => {
  await axios.post(`${urlBaseServer}/posts`, post);
};

export const likePost = async (id) => {
  await axios.put(`${urlBaseServer}/posts/like/${id}`);
};

export const eliminarPost = async (id) => {
  await axios.delete(`${urlBaseServer}/posts/${id}`);
};
