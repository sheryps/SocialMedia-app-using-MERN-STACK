import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Delete from '../../img/delete.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { deletePost, likePost } from '../../api/PostRequests'
const Post = ({data,location}) => {
  const {user}=useSelector((state)=>state.authReducer.authData)

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const history=useNavigate()
  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id,user._id)
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  function refreshPage() {
    window.location.reload();
  }
  const handleDelete=async()=>{
    console.log(data._id,user._id);
    const del=await deletePost(data._id)
    alert(del.data)
   refreshPage()
  }
  return (
    <div className='Post'>
        <img src={data.image?process.env.REACT_APP_PUBLIC_FOLDER + data.image:""}/>
        <div className='postReact'>
            <img src={liked?Heart:NotLike}
            style={{ cursor: "pointer" }}
            onClick={handleLike}
            />
            <img src={Comment}/>
            <img src={location?Delete:Share} style={{width:"22px"}} onClick={handleDelete}/>
        </div>
        <span style={{color: "var(--gray)", fontSize: '12px'}}>{likes} Likes</span>
        <div className='detail'>
            <span><b>{data.name} </b></span>
            <span>{data.desc}</span>
        </div>
    </div>
  )
}

export default Post