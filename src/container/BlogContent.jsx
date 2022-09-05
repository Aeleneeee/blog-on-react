import "./BlogContent.css";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import React, { Component } from "react";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";
import { EditPostForm } from "./components/EditPostForm";

let source;

export class BlogContent extends Component {
  state = {
    showBlog: true,
    blogArr: [],
    showFormNewPost: false,
    showEditPost: false,
    isLoading: true,
    selectedPost: {},
  };

  likePost = (blogPost) => {
    const temp = { ...blogPost };

    temp.liked = !temp.liked;

    axios
      .put(
        `https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr/${blogPost.id}`,
        temp
      )
      .then((response) => {
        this.updatePosts();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  toggleBlog = () => {
    this.setState((state) => {
      return {
        showBlog: !state.showBlog,
      };
    });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`Вы уверены, что хотите удалить ${blogPost.title} ?`)) {
      axios
        .delete(
          `https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr/${blogPost.id}`
        )

        .then((response) => {
          console.log("пост удален", response.data);
          this.updatePosts();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  showAddForm = () => {
    this.setState({ showFormNewPost: true });
  };

  closeAddForm = () => {
    this.setState({ showFormNewPost: false });
  };

  showEditForm = () => {
    console.log("click");
    this.setState({ showEditPost: true });
  };

  closeEditForm = () => {
    this.setState({ showEditPost: false });
  };

  handleFormOnEscape = (e) => {
    if (e.key === "Escape" && this.state.showFormNewPost) {
      this.closeAddForm();
    }
  };

  updatePosts = () => {
    this.setState({
      isLoading: true,
    });
    source = axios.CancelToken.source();
    axios
      .get("https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr", {
        cancelToken: source.token,
      })
      .then((response) => {
        this.setState({
          blogArr: response.data,
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleFormOnEscape);
    this.updatePosts();
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleFormOnEscape);

    if (source) {
      source.cancel("Axios cancel");
    }
  }

  newBlogPost = (blogPost) => {
    this.setState({
      isLoading: true,
    });
    axios
      .post(
        "https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr/",
        blogPost
      )
      .then((response) => {
        console.log(response.data);
        this.updatePosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editBlogPost = (updPost) => {
    this.setState({
      isLoading: true,
    });
    axios
      .put(
        `https://630b3f6af280658a59d86c90.mockapi.io/projectData/postsarr/${updPost.id}`,
        updPost
      )
      .then((response) => {
        console.log("Отредактировано");
        this.updatePosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSelectPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost,
    });
  };

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          showEditForm={this.showEditForm}
          closeEditForm={this.closeEditForm}
          handleSelectPost={() => this.handleSelectPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) {
      return <h1>Происходит загрузка данных...</h1>;
    }

    const customOpacity = this.state.isLoading ? 0.5 : 1;

    return (
      <>
        <h1>Еда и путешествия</h1>
        {this.state.showFormNewPost ? (
          <AddPostForm
            closeAddForm={this.closeAddForm}
            blogArr={this.state.blogArr}
            newBlogPost={this.newBlogPost}
          />
        ) : null}

        {this.state.showEditPost && (
          <EditPostForm
            closeEditForm={this.closeEditForm}
            selectedPost={this.state.selectedPost}
            editBlogPost={this.editBlogPost}
          />
        )}

        <div className="buttons">
          <button className="myButton" onClick={this.showAddForm}>
            Создать пост
          </button>

          <button className="myButton" onClick={this.toggleBlog}>
            {this.state.showBlog ? "Скрыть блог" : "Показать блог"}
          </button>
        </div>

        {this.state.isLoading && (
          <CircularProgress className="circular" color="inherit" />
        )}

        {this.state.showBlog ? (
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
  }
}
