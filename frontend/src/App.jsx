import { useEffect, useState } from 'react';
import {
  getPosts,
  agregarPost,
  likePost,
  eliminarPost,
} from './services/postService';
import Form from './components/Form';
import Post from './components/Post';

function App() {
  const [titulo, setTitulo] = useState('');
  const [imgSrc, setImgSRC] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const postsData = await getPosts();
    setPosts([...postsData]);
  };

  const handleAgregarPost = async () => {
    const post = { titulo, url: imgSrc, descripcion };
    await agregarPost(post);
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='App'>
      <h2 className='py-5 text-center'>&#128248; Like Me &#128248;</h2>
      <div className='row m-auto px-5'>
        <div className='col-12 col-sm-4'>
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={handleAgregarPost}
          />
        </div>
        <div className='col-12 col-sm-8 px-5 row posts align-items-start'>
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={likePost}
              eliminarPost={eliminarPost}
              refreshPosts={fetchPosts}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
