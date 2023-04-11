import React, { useEffect,useState } from 'react'
import './Conversation.css'
import { getUser } from '../../api/UserRequests'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteChat } from '../../api/ChatRequests'
import { useNavigate } from 'react-router-dom';
const Conversation = ({chat,currentUserId,online}) => {
    //for userdata
    const [userData, setUserData] = useState(null)
    const history=useNavigate()

    useEffect(()=>{
        const userId = chat.members.find((id)=>id!==currentUserId)
        const getUserData=async()=>{
            try{
                const {data} =await getUser(userId)
                setUserData(data)
            }
            catch(error){
                console.log(error);
            }
        }
        getUserData()
    },[])
    const handledeleteChat =async()=>{
        try{
            const chatId=chat._id
            console.log(chatId);
            const result = await deleteChat(chatId)
            console.log(result);
            alert(result.data)
            window.location.reload();
        }
        catch(error){
            console.log(error);
        }

    }
  return (
    <>
    <div className='follower conversation'>
        <div>
            {online && <div className='online-dot'></div>}
            <img  src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
                className="followerImage"
                style={{ width: "50px", height: "50px" }}
            />
            <div className="name" style={{fontSize: '0.8rem'}}>
                <span>{userData?.firstname} {userData?.lastname}</span>
                <span>{online?"Online":"Offline"}</span>
                
            </div>
            
        </div>
        <RiDeleteBin5Fill onClick={handledeleteChat}/>
    </div>
    <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  )
}

export default Conversation