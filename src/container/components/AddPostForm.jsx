import "./AddPostForm.css";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";

export const AddPostForm = (props) => {
  
  const [postTitle, setPostTitle] = useState ('')
  const [postDescription, setPostDescription] = useState ('')

  const changeTitle = (e) => {
    setPostTitle(e.target.value)
  };

  const changeDescription = (e) => {
    setPostDescription(e.target.value)
  };


  const createNewPost = (e) => {
    e.preventDefault()
    const post = {
      title: postTitle,
      description: postDescription,
      liked: false,
    };
    
    props.newBlogPost(post)
    props.closeAddForm()

  };


  useEffect(() => {
    const handleFormOnEnter = (e) => {
      if (e.key === "Enter"){
       createNewPost(e)
      }
    }
    window.addEventListener("keyup", handleFormOnEnter);
    return() => window.removeEventListener("keyup", handleFormOnEnter);
  //Если удалить ", [props]" то функция заработает, разберись солнышко ❤️
  }, [props])



    const closeAddForm = props.closeAddForm;

    return (
      <>
        <form action="" className="addPostForm" onSubmit={createNewPost}>
          <div className="formHeader">
            <h3>Создание поста</h3>
            <button>
              <ClearIcon className="deleteFormBtn" onClick={closeAddForm} />
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
              className="addPost"
              type="submit"
            >
              Добавить новый пост
            </button>
          </div>
        </form>
        <div className="overlay" onClick={closeAddForm}></div>
      </>
    );
  }

