import React, { useRef } from 'react'
import Logosearch from '../../components/logosearch/Logosearch'
import './Chat.css'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { userChats } from '../../api/ChatRequests'
import Conversation from '../../components/Conversations/Conversation'
import NavIcons from '../../components/Navicons/NavIcons'
import ChatBox from '../../components/chatbox/ChatBox'
import {io} from 'socket.io-client'
const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    //for chats
    const [chats, setChats] = useState([]);
    //current chat
    const [currentChat, setCurrentChat] = useState(null);
    //for checking online users
    const [onlineUsers, setOnlineUsers] = useState([]);
    //for sending mesage
    const [sendMessage, setSendMessage] = useState(null);
    //for receiving messsage
    const [receivedMessage, setReceivedMessage] = useState(null);
    //socket server reference
    const socket = useRef()
    console.log(onlineUsers);

    //send message to socket server
    useEffect(()=>{
      if(sendMessage!==null){
        //emit used to send to socket server
        socket.current.emit('send-message',sendMessage)
      }
    },[sendMessage])



      // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  },[user]);

    // Connect to Socket.io
    useEffect(() => {
      socket.current = io("ws://localhost:8800");
      socket.current.emit("new-user-add", user._id);
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });
    }, [user]);

          // Get the message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  },[]);
  //function to check online status
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    console.log(online);
    return online ? true : false;
  };
  return (
    <div className="Chat">
        {/* leftside */}
        <div className='Left-side-chat chatSide'>
            <Logosearch/>
            <div className="Chat-container">
                <h2>Chats</h2>
                <div className='Chat-list'>
                    {
                      chats.map((chat)=>(
                        <div onClick={() => {setCurrentChat(chat);}}>
                                <Conversation 
                                chat={chat} 
                                currentUserId={user._id}
                                online={checkOnlineStatus(chat)}
                                />
                        </div>
                      ))
                    }
                </div>
            </div>
            
        </div>

        {/* rightside */}
        <div className='Right-side-chat'>
          <div style={{ width: "20rem", alignSelf: "flex-end" }}>
            <NavIcons />
          </div>
          <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
        </div>
    </div>
  )
}

export default Chat