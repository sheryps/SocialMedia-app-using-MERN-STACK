import React, { useState } from 'react'
import './Rightside.css'


import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../Sharemodal/ShareModal'
import Followers from '../followerscard/Followers'
import NavIcons from '../Navicons/NavIcons'
const Rightside = () => {
  const [modalOpened,setModalOpened]=useState(false)
  return (
    <div className='RightSide'>
        <NavIcons/>
        {/* <TrendCard/> */}
        {/* <button className='button r-button' onClick={()=>setModalOpened(true)}>Share</button>
        <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened}/> */}
        <Followers/>
    </div>
  )
}

export default Rightside