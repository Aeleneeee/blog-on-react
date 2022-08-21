export const AddPostForm = () => {

    return(
        <form action="">
        <div>
          <input type="text" name="postTitle"/>
        </div>
        <div>
          <textarea name="postDescription"/>
        </div>

        <div>
          <buttton type="button">
            Добавить новый пост
          </buttton>
        </div>
        </form>
    )
}