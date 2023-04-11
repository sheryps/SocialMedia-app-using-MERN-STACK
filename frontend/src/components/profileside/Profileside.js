import React from 'react'
import './Profileside.css'
import Logosearch from '../logosearch/Logosearch'
import Profilecard from '../profilecard/Profilecard'
import Followers from '../followerscard/Followers'
const Profileside = () => {
  return (
    <div className='ProfileSide'>
        <Logosearch/>
        <Profilecard location="homepage"/>
        {/* <Followers/> */}
    </div>
  )
}

export default Profileside