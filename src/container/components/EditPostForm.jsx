import "./EditPostform.css";
import ClearIcon from "@mui/icons-material/Clear";
import { Component, useState, useEffect } from "react";

export const EditPostForm =(props) => {


  const [postTitle, setPostTitle] = useState(props.selectedPost.title)
  const [postDescription, setPostDescription] = useState(props.selectedPost.description)

 const updateEditPost = (e) => {
    e.preventDefault();
    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      description: postDescription,
      
    };

    props.editBlogPost(post);
    props.closeEditForm();
  }

  const changeTitle = (e) => {
   setPostTitle(e.target.value)
  };

  const changeDescription = (e) => {
  setPostDescription(e.target.value)
  };

  useEffect(() => {
    const handleForm = (e) => {
      if (e.key === "Enter") {
        updateEditPost(e);
      }
      if (e.key === "Escape") {
        props.closeEditForm();
      }
    };
    window.addEventListener("keyup", handleForm);

    return() => window.removeEventListener("keyup", handleForm);
  })

  

/*   const componentDidMount = () => {
    window.addEventListener("keyup", handleForm);
  }

  const componentWillUnmount = () => {
    window.removeEventListener("keyup", handleForm);
  } */

    const closeEditForm = props.closeEditForm;

    return (
      <>
        <form action="" className="editPostForm" onSubmit={updateEditPost}>
          <div className="formHeader">
            <h3>Редактирование поста</h3>
            <button>
              <ClearIcon className="deleteFormBtn" onClick={closeEditForm} />
            </button>
          </div>

          <div>
            <input
              type="text"
              className="formInput"
              name="postTitle"
              placeholder="Название"
              value={postTitle}
              onChange={changeTitle}
              required
            />
          </div>
          <div>
            <textarea
              name="postDescription"
              className="formInput"
              placeholder="Описание поста"
              value={postDescription}
              onChange={changeDescription}
              required
            />
          </div>

          <div>
            <button
              className="editPost"
              type="submit"
              onClick={updateEditPost}
            >
              Сохранить
            </button>
          </div>
        </form>
        <div className="overlay" onClick={closeEditForm}></div>
      </>
    );
  }

