import "./AddPostForm.css";
import ClearIcon from "@mui/icons-material/Clear";
import { Component } from "react";

export class AddPostForm extends Component {
  state = {
    postTitle: "",
    postDescription: "",
  };

  changeTitle = (e) => {
    this.setState({
      postTitle: e.target.value,
    });
  };

  changeDescription = (e) => {
    this.setState({
      postDescription: e.target.value,
    });
  };



  createNewPost = () => {
    const post = {
      id: this.props.blogArr.length +1,
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: false,
    };
    
    this.props.newBlogPost(post)
    this.props.closeAddForm()

  
  };

  render() {
    const closeAddForm = this.props.closeAddForm;

    return (
      <>
        <form action="" className="addPostForm">
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
              value={this.state.postTitle}
              onChange={this.changeTitle}
            />
          </div>
          <div>
            <textarea
              name="postDescription"
              className="formInput"
              placeholder="Описание поста"
              value={this.state.postDescription}
              onChange={this.changeDescription}
            />
          </div>

          <div>
            <button
              className="addPost"
              type="button"
              onClick={this.createNewPost}
            >
              Добавить новый пост
            </button>
          </div>
        </form>
        <div className="overlay" onClick={closeAddForm}></div>
      </>
    );
  }
}
