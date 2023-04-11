import React from 'react'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { FcSettings } from "react-icons/fc";
import {FaBackspace} from "react-icons/fa"
import { Link } from 'react-router-dom'
const NavIcons = () => {
  return (
    <div className='navIcons'>
    <Link to='../home'><FaBackspace/></Link>
    <FcSettings />
    <img src={Noti}/>
    <Link to="/chat"><img src={Comment}/></Link>
    
</div>
  )
}

export default NavIcons