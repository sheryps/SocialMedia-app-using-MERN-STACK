import React from 'react'
import './Postside.css'
import PostShare from '../Postshare/PostShare'
import Posts from '../Posts/Posts'
const Postside = ({location}) => {
  return (
    <div className='PostSide'>
        <PostShare/>
        <Posts location={location}/>
    </div>
    
  )
}

export default Postside