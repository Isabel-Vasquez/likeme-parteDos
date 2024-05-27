function Post({
  post: { id, titulo, img, descripcion, likes },
  like,
  eliminarPost,
  refreshPosts,
}) {
  const handleLike = async () => {
    await like(id);
    refreshPosts();
  };

  const handleDelete = async () => {
    await eliminarPost(id);
    refreshPosts();
  };

  return (
    <div className='card col-12 col-sm-4 d-inline mx-0 px-3'>
      <div className='card-body  p-0'>
        <img className='card-img-top ' src={img} />
        <div className='p-3'>
          <h4 className='card-title'>{titulo}</h4>
          <p className='card-text'>{descripcion}</p>
          <div className='d-flex justify-content-between align-items-center'>
            <div>
              <i
                onClick={handleLike}
                className={`fa-heart fa-xl ${
                  likes ? 'fa-solid' : 'fa-regular'
                }`}
              ></i>
              <span className='ms-1'>{likes}</span>
            </div>
            <i onClick={handleDelete} className='fa-solid fa-x'></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
