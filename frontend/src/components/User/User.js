import React from 'react'
import { useDispatch } from 'react-redux'
import { followUser,unfollowUser } from '../../actions/userAction'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { BiMessageRoundedDetail } from "react-icons/bi";
import { Link } from 'react-router-dom'
import { createChat } from '../../api/ChatRequests'
const User = ({person}) => {
  const dispatch=useDispatch()
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const {user}=useSelector((state)=>state.authReducer.authData)
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  const handleChat=async()=>{
    try{
      const body={
        senderId:user._id,
        receiverId:person._id
      }
      const result=await createChat(body)
      console.log(result);
    }
    catch(error){

    }

  }
  return (
    <div className='follower'>
    <div>
        <img src={person.profilePicture?serverPublic + person.profilePicture:serverPublic + "defaultProfile.png"}
        className='followerImage'
        />
        <div className='name'>
            <span>{person.firstname} {person.lastname}</span>
            <span>{person.username}</span>
        </div>
    </div>
    <Link to='/chat'><BiMessageRoundedDetail style={{width:'20',height:'20'}} onClick={handleChat}/></Link>
    <button  className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
      onClick={handleFollow}>{following ? "Unfollow" : "Follow"}</button>
</div>
  )
}

export default User