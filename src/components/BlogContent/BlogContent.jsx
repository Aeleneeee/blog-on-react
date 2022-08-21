import './BlogContent.css'
import { posts } from '../../shared/projectData'
import { BlogCard } from './components/BlogCard'
import { AddPostForm } from './components/AddPostForm';
import React, { Component } from 'react';


export class BlogContent extends Component {

  state = {
    showBlog: true,
    blogArr:JSON.parse(localStorage.getItem('blogArr')) || posts
  }

  likePost = pos => {
    const temp = [...this.state.blogArr];
    temp[pos].liked = !temp[pos].liked
    this.setState({
      blogArr: temp
    })

    localStorage.setItem('blogArr', JSON.stringify(temp))
    
  }




  toggleBlog = () => {
    this.setState((state => {
      return {
        showBlog: !state.showBlog
      }
    }))
  }

  deletePost = pos => {
    if (window.confirm (`Вы уверены, что хотите удалить ${this.state.blogArr[pos].title} ?`)) {
      const temp = [...this.state.blogArr];
      temp.splice(pos,1)
      this.setState({
      blogArr:temp
      
      })
      localStorage.setItem('blogArr', JSON.stringify(temp))
    }
    
  }

    render() {

    const  blogPosts = this.state.blogArr.map((item, pos) => {
        return(
         <BlogCard 
    
         key = {item.id}
         title = {item.title}
         description = {item.description}
         liked={item.liked}
         likePost = {() => this.likePost(pos)}
         deletePost = { () => this.deletePost(pos)}
    
         />
        )
      })
      return (
        <>
        <AddPostForm/>
        <button className='showButton'
        onClick= {
          this.toggleBlog
        }>
          {
            this.state.showBlog ? 'Скрыть блог' : 'Показать блог'
          }
        </button>

        {
          this.state.showBlog ? 
        <>
          <h1>
            Еда и путешествия
          </h1>

          <div className="posts">
            {blogPosts}
          </div>
        </>

        :<></>

        }

   
   </>
      )
    
    }

    
}