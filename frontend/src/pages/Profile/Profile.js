import React from 'react'
import ProfileLeft from '../../components/Profileleft/ProfileLeft'
import './Profile.css'
import Profilecard from '../../components/profilecard/Profilecard'
import Postside from '../../components/Postside/Postside'
import Rightside from '../../components/Rightside/Rightside'
const Profile = () => {
  return (
    <div className='Profile'>
        <ProfileLeft/>
        <div className='Profile-center'>
          <Profilecard location="profilePage"/>
          <Postside location="profilePage"/>
        </div>
        <Rightside/>
    </div>
  )
}

export default Profile