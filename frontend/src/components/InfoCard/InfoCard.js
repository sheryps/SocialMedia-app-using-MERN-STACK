import React, { useEffect, useState } from 'react'
import './InfoCard.css'
import { FaPen } from 'react-icons/fa';
import * as UserApi from '../../api/UserRequests.js'
import ProfileModal from '../Profilemodal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logout } from '../../actions/AuthAction';
const InfoCard = () => {
  const [modalOpened,setModalOpened]=useState(false)

  const dispatch=useDispatch()
  const params=useParams()
  const profileUserId=params.id

  const [profileUser,setprofileUser]=useState({})
  const {user}=useSelector((state)=>state.authReducer.authData)

  useEffect(()=>{
    const fetchProfileUser = async()=>{
      if(profileUserId === user._id){
        setprofileUser(user)
      }else{
        const profileUser=await UserApi.getUser(profileUserId)
        setprofileUser(profileUser)
      }
    }
    fetchProfileUser()
  },[user])
  const handleLogout=()=>{
    dispatch(logout())
  }
  return (
    <div className='InfoCard'>
      <div className='infoHead'>
        <h4>{profileUser.firstname}{profileUser.lastname}</h4>
        {user._id === profileUserId?(<div>
          <FaPen width='2rem' height='1.2rem' onClick={()=>setModalOpened(true)}/>
        <ProfileModal 
        modalOpened={modalOpened} 
        setModalOpened={setModalOpened}
        data={user}
        />
        </div>):""}
        
      </div>
      <div className='info'>
        <span>
          <b>Status </b>
        </span>
        <span>
          {profileUser.relationship}
          </span>
      </div>
      <div className='info'>
        <span>
          <b>Lives in </b>
        </span>
        <span>
          {profileUser.livesin}
          </span>
      </div>
      <div className='info'>
        <span>
          <b>Works at </b>
        </span>
        <span>
          {profileUser.worksAt}
          </span>
      </div>
      <button className='button logout-button' onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default InfoCard