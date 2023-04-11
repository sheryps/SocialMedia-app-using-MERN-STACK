import React, { useEffect, useRef, useState } from 'react'
import { getMessages,addMessage } from '../../api/MessageRequest'
import { getUser } from '../../api/UserRequests'
import { format } from "timeago.js";
import InputEmoji from 'react-input-emoji'
import './ChatBox.css'

const ChatBox = ({chat,currentUser,setSendMessage,  receivedMessage}) => {
  //use state for userdata
    const [userData,setUserData]=useState(null)
    //use state for messages
    const [messages, setMessages] = useState([]);
    //for new messages
    const [newMessage, setNewMessage] = useState("");
    //use ref for scroll to last message
    const scroll=useRef()

  //to set new messafe
    const handleChange = (newMessage)=> {
      setNewMessage(newMessage)
    }

        // Receive Message from parent component
    useEffect(()=> {
      console.log("Message Arrived: ", receivedMessage)
      if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
        setMessages([...messages, receivedMessage]);
      }

    },[receivedMessage])
    //fetching data for header
    useEffect(()=>{
        const userId = chat?.members?.find((id)=>id!==currentUser)
        const getUserData=async()=>{
            try{
                const {data} =await getUser(userId)
                setUserData(data)
                console.log(data);
            }
            catch(error){
                console.log(error);
            }
        }
        if(chat!==null){
            getUserData()
        }
    },[chat,currentUser])
    useEffect(()=>{
      const fetchMessages=async()=>{
        try{
            const {data}=await getMessages(chat._id)
            console.log(data);
            setMessages(data)
        }
        catch(error){
          console.log(error);
        }
      }
      if(chat!==null){
        fetchMessages()
      }
    },[chat])

      // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])
  
    const handleSend=async(e)=>{
      e.preventDefault()
      const message = {
        senderId : currentUser,
        text: newMessage,
        chatId: chat._id,
    }
    const receiverId = chat.members.find((id)=>id!==currentUser);
    // send message to socket server
    setSendMessage({...message, receiverId})
    //send message to database
    try{
      const { data } = await addMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
    }
    catch(error){
      console.log(error);
    }
    }
  return (
    <>
    <div className='ChatBox-container'>
      {chat?(
        <>
        {/* chat header */}
            <div className='chat-header'>
                <div className='follower'>
                    <div>
                        <img  src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
                        className="followerImage"
                        style={{ width: "50px", height: "50px" }}
                        />
                        <div className="name" style={{fontSize: '0.9rem'}}>
                            <span>{userData?.firstname} {userData?.lastname}</span>
                        
                        </div>

                    </div>

                </div>
                <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />    
            </div>
            {/* chatboz */}
            <div className="chat-body" >
              {messages.map((message)=>(
                <>
                <div ref={scroll}
                className={message.senderId === currentUser? "message own": "message"}>
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                </div>
                </>
              ))}
            </div>
            {/* chat sender */}
            <div className='chat-sender'>
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange}/>
              <div className="send-button button" onClick = {handleSend}>Send</div>
            </div>
        </>
      ):(
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
        
    </div>
    </>
  )
}

export default ChatBox