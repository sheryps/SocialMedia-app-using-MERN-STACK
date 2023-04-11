import React from 'react'
import './Profilecard.css'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
const Profilecard = ({location}) => {

  //fetch user details from reducer/store
  const {user}=useSelector((state)=>state.authReducer.authData)

  //fetch posts details from reducer/store
  const posts=useSelector((state)=>state.postReducer.posts)
  console.log(posts);

  //creating cdn for saving images in static file in backend
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className='ProfileCard'>
        <div className='ProfileImages'>
            <img src={user.coverPicture?serverPublic + user.coverPicture:serverPublic + "defaultCover.jpg"}/>
            <img src={user.profilePicture?serverPublic + user.profilePicture:serverPublic + "defaultProfile.png"}/>
        </div>
        <div className="ProfileName">
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.worksAt?user.worksAt:"write about yourself"}</span>
      </div>
      <div className='followStatus'>
        <hr/>
        <div>
            <div className='follow'>
                <span>{user.following.length}</span>
                <span>Following</span>
            </div>
            <div className="vl"></div>
            <div className="follow">
                <span>{user.followers.length}</span>
                <span>Followers</span>
            </div>
            {location ==='profilePage' && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{posts.filter((post)=>post.userId===user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr/>
      </div>
      {location ==='profilePage' ? "" : <span>
        <Link style={{textDecoration:"none",color:"inherit"}} to={`/profile/${user._id}`}>My Profile</Link>
        </span>}
    </div>
  )
}

export default Profilecard