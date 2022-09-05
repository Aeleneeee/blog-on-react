import React from 'react';
import './BlogCard.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { EditPostForm } from './EditPostForm';

export const BlogCard = (
  {
    title,
    description,
    liked,
    likePost,
    deletePost,
    showEditForm,
    closeEditForm,
    handleSelectPost
  }
 
) => {

  const heartFill = liked? <FavoriteIcon style = {{fill: 'crimson' }}/> 
  :<FavoriteBorderIcon />

  const editForm = () => {
    handleSelectPost();
    showEditForm()
  }

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

    <div className='buttons'>
    <button className='edit__post' onClick={editForm}>
    <EditIcon/>
    </button>
    <button className='delete__button' onClick={deletePost}>
        <DeleteForeverIcon/>
    </button>
    </div>


{/*       {liked} */}
    </div>
)

}