import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch,useSelector } from 'react-redux'
import { getTimelinePosts } from '../../actions/postAction'
import { useParams } from "react-router-dom";
const Posts = ({location}) => {
  //dispatch
  const dispatch=useDispatch()
  //use parms to get id
  const params = useParams()

  //getting data from store
  const {user}=useSelector((state)=>state.authReducer.authData)
  let {posts,loading}=useSelector((state)=>state.postReducer)

  //-dispatch to action
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id))
  },[])
  if(!posts) return 'No Posts';

  //to get posts
  if(params.id) {
    posts = posts.filter((post)=> post.userId===params.id)
  }
  return (
    <div className='Posts'>
      {loading
        ? "Fetching posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} location={location}/>;
          })}
    </div>
  )
}

export default Posts