import React from 'react'
import Followers from '../followerscard/Followers'
import InfoCard from '../InfoCard/InfoCard'
import Logosearch from '../logosearch/Logosearch'
import './ProfileLeft.css'
const ProfileLeft = () => {
  return (
    <div className='ProfileSide'>
        <Logosearch/>
        <InfoCard/>
        {/* <Followers/> */}
    </div>
  )
}

export default ProfileLeft