import React, { useEffect, useState } from 'react'
import './Followers.css'
import { Follower } from '../../data/Followersdata'
import User from '../User/User'
import { getAllUser } from '../../api/UserRequests'
import { useSelector } from 'react-redux'


const Followers = () => {

//use state for allusers  
const [persons, setPersons] = useState([])

//user details
const { user } = useSelector((state) => state.authReducer.authData);

//useeffect for fetching all users from backend
useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);
  console.log(persons);
  
  return (
    <div className='FollowersCard'>
        <h3>People you may know</h3>
        {
            persons.map((person,id)=>{
              if(person._id!==user._id){
                  return(
                    <User person={person} key={id}/>
                )  
              }
                                  
            })
        }
        </div>
  )
}

export default Followers