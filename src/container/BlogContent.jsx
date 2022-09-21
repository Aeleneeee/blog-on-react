import "./BlogContent.css";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import React, {useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { EditPostForm } from "./components/EditPostForm";

let source;

export const BlogContent = () => {

  const [showBlog, setShowBlog] = useState(true);

  const [blogArr, setBlogArr] = useState([]);

   
 
  const [showFormNewPost, setShowFormNewPost] = useState(false);

  const [showEditPost, setShowEditPost] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [selectedPost, setSelectedPost] = useState({});

  const likePost = (blogPost) => {
    const temp = { ...blogPost };

    temp.liked = !temp.liked;

    axios
      .put(
        `https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr/${blogPost.id}`,
        temp
      )
      .then((response) => {
        updatePosts();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const toggleBlog = () => {
    setShowBlog(!showBlog);
  };

  const deletePost = (blogPost) => {
    if (window.confirm(`Вы уверены, что хотите удалить ${blogPost.title} ?`)) {
      axios
        .delete(
          `https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr/${blogPost.id}`
        )

        .then((response) => {
          console.log("пост удален", response.data);
          updatePosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showAddForm = () => {
    setShowFormNewPost(true);
  };

  const closeAddForm = () => {
    setShowFormNewPost(false);
  };

  const showEditForm = () => {
    console.log("click");
    setShowEditPost(true);
  };

  const closeEditForm = () => {
    setShowEditPost(false);
  };

  const updatePosts = () => {
    setIsLoading(true);
    source = axios.CancelToken.source();
    axios
      .get("https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr", {
        cancelToken: source.token,
      })
      .then((response) => {
        setBlogArr(response.data);
       
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
    .get("https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr", {
    })
    .then((response) => {
      setBlogArr(response.data);
      setIsLoading(false);
    })
  }, [])

  const handleFormOnEscape = (e) => {
      if (e.key === "Escape" && showFormNewPost) {
        closeAddForm();
      }

      window.addEventListener("keyup", () => {
        handleFormOnEscape();
        updatePosts();
      });

      return () => {
        window.removeEventListener("keyup", handleFormOnEscape);

        if (source) {
          source.cancel("Axios cancel");
        }
      };
    };
  


 const newBlogPost = (blogPost) => {
    setIsLoading(true)
    axios
      .post(
        "https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr/",
        blogPost
      )
      .then((response) => {
        
        console.log(response.data);
        updatePosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

const  editBlogPost = (updPost) => {
    isLoading(true)
    axios
      .put(
        `https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr/${updPost.id}`,
        updPost
      )
      .then((response) => {
        console.log("Отредактировано");
        updatePosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

 const handleSelectPost = (blogPost) => {
      selectedPost(blogPost)
  };

  const blogPosts = blogArr.map((item, pos) => {
    return (
      <BlogCard
        className="blogCard"
        key={item.id}
        title={item.title}
        description={item.description}
        liked={item.liked}
        likePost={() => likePost(item)}
        deletePost={() => deletePost(item)}
        showEditForm={showEditForm}
        closeEditForm={closeEditForm}
        handleSelectPost={() => handleSelectPost(item)}
      />
    );
  });

  if (blogArr.length === 0) {
    return <h1>Происходит загрузка данных...</h1>;
  } 

  const customOpacity = isLoading ? 0.5 : 1;

  return (

    <>
      <h1>Еда и путешествия</h1>
      {showFormNewPost ? (
        <AddPostForm
          closeAddForm={closeAddForm}
          blogArr={blogArr}
          newBlogPost={newBlogPost}
        />
      ) : null}
      {showEditPost && (
        <EditPostForm
          closeEditForm={closeEditForm}
          selectedPost={selectedPost}
          editBlogPost={editBlogPost}
        />
      )}
      <div className="buttons">
        <button className="myButton" onClick={showAddForm}>
          Создать пост
        </button>

        <button className="myButton" onClick={toggleBlog}>
          {showBlog ? "Скрыть блог" : "Показать блог"}
        </button>
      </div>
      {isLoading && (
        <CircularProgress className="circular" color="inherit" />
      )}
      {showBlog ? (
        <>
          <div className="posts" style={{ opacity: customOpacity }}>
            {blogPosts}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
