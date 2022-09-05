import "./EditPostform.css";
import ClearIcon from "@mui/icons-material/Clear";
import { Component } from "react";

export class EditPostForm extends Component {
  state = {
    postTitle: this.props.selectedPost.title,
    postDescription: this.props.selectedPost.description,
  };

  updateEditPost = (e) => {
    e.preventDefault();
    const post = {
      id: this.props.selectedPost.id,
      title: this.state.postTitle,
      description: this.state.postDescription,
      
    };

    this.props.editBlogPost(post);
    this.props.closeEditForm();
  }

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

  handleForm = (e) => {
    if (e.key === "Enter") {
      this.updateEditPost(e);
    }
    if (e.key === "Escape") {
      this.props.closeEditForm();
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleForm);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleForm);
  }

  render() {
    const closeEditForm = this.props.closeEditForm;

    return (
      <>
        <form action="" className="editPostForm" onSubmit={this.updateEditPost}>
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
              className="editPost"
              type="submit"
              onClick={this.updateEditPost}
            >
              Сохранить
            </button>
          </div>
        </form>
        <div className="overlay" onClick={closeEditForm}></div>
      </>
    );
  }
}
