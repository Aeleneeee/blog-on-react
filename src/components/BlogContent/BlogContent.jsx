import "./BlogContent.css";
import { posts } from "../../shared/projectData";
import { BlogCard } from "./components/BlogCard";
import { AddPostForm } from "./components/AddPostForm";
import React, { Component } from "react";

export class BlogContent extends Component {
  state = {
    showBlog: true,
    blogArr: JSON.parse(localStorage.getItem("blogArr")) || posts,
    showFormNewPost: false,
  };

  likePost = (pos) => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked;
    this.setState({
      blogArr: temp,
    });

    localStorage.setItem("blogArr", JSON.stringify(temp));
  };

  toggleBlog = () => {
    this.setState((state) => {
      return {
        showBlog: !state.showBlog,
      };
    });
  };

  deletePost = (pos) => {
    if (
      window.confirm(
        `Вы уверены, что хотите удалить ${this.state.blogArr[pos].title} ?`
      )
    ) {
      const temp = [...this.state.blogArr];
      temp.splice(pos, 1);
      this.setState({
        blogArr: temp,
      });
      localStorage.setItem("blogArr", JSON.stringify(temp));
    }
  };

  showAddForm = () => {
    this.setState({ showFormNewPost: true });
  };

  closeAddForm = () => {
    this.setState({ showFormNewPost: false });
  };

  handleFormOnEscape = (e) => {
    if (e.key === "Escape" && this.state.showFormNewPost) {
      this.closeAddForm();
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleFormOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleFormOnEscape);
  }

  newBlogPost = (blogPost) => {
    const temp = [...this.state.blogArr]
    temp.push(blogPost)

    this.setState ({
      blogArr:temp
    })

    localStorage.setItem("blogArr", JSON.stringify(temp));
  }

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(pos)}
          deletePost={() => this.deletePost(pos)}
        />
      );
    });



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

        <div className="buttons">
          <button className="myButton" onClick={this.showAddForm}>
            Создать пост
          </button>

          <button className="myButton" onClick={this.toggleBlog}>
            {this.state.showBlog ? "Скрыть блог" : "Показать блог"}
          </button>
        </div>

        {this.state.showBlog ? (
          <>
            <div className="posts">{blogPosts}</div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}
