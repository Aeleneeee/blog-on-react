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



  createNewPost = (e) => {
    e.preventDefault()
    const post = {
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: false,
    };
    
    this.props.newBlogPost(post)
    this.props.closeAddForm()

  };

  handleFormOnEnter = (e) => {
    if (e.key === "Enter"){
     this.createNewPost(e)
    }
  }

  componentDidMount() {
    window.addEventListener("keyup", this.handleFormOnEnter);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleFormOnEnter);
  }

  render() {
    const closeAddForm = this.props.closeAddForm;

    return (
      <>
        <form action="" className="addPostForm" onSubmit={this.createNewPost}>
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
              required
            />
          </div>
          <div>
            <textarea
              name="postDescription"
              className="formInput"
              placeholder="Описание поста"
              value={this.state.postDescription}
              onChange={this.changeDescription}
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
}
