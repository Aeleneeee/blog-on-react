import React from 'react';
import './BlogCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const BlogCard = (
  {
    title,
    description,
    liked,
    likePost,
    deletePost
  }
 
) => {

  const heartFill = liked? <FavoriteIcon style = {{fill: 'crimson' }}/> 
  :<FavoriteBorderIcon />


  return (
    <div  className="post">

    <div className='post__content'> 
    <h2>
    {title}
    </h2>
    <p>
    {description}
    </p>
    <button className='like'  onClick={likePost}
    >
    {heartFill}
    </button>
    </div>

    <button className='delete__button' onClick={deletePost}>
        <DeleteForeverIcon/>
    </button>
{/*       {liked} */}
    </div>
)

}