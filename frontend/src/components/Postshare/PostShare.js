import React,{useState,useRef} from 'react'
import './PostShare.css'
import Profileimage from '../../img/profileImg.jpg'
import { FaRegImage,FaPlayCircle } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { GrScheduleNew,GrFormClose } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/uploadAction';
const PostShare = () => {
  //fetching from store
  const loading = useSelector((state)=>state.postReducer.uploading)

  //usestate to set image
  const [image,setImage]=useState(null)

  //useref for images
  const imageRef=useRef()

  //dispatch
  const dispatch=useDispatch()

  //useref for description
  const desc=useRef()

  //fetching user from store
  const {user}=useSelector((state)=>state.authReducer.authData)

  //setting cdn for images
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  //function for uploading images and setting to usestate
  const onImageChange=(event)=>{
    if(event.target.files && event.target.files[0]){
      let img =event.target.files[0];
      setImage(img)
    }
  }

  //reseting fields
  const reset=()=>{
    setImage(null)
    desc.current.value='';
  }

  //function when form is submitted
  const handleSubmit=(e)=>{
    e.preventDefault()
    //creating new post
    const newPost = {
      userId:user._id,
      desc:desc.current.value
    }

    if(image){
      //setting image
      const data=new FormData()
      const filename=Date.now()+image.name
      data.append('name',filename)
      data.append('file',image)
      newPost.image=filename;
      console.log(newPost);
      try{
        //dispatch to action
        dispatch(uploadImage(data))
      }
      catch(error){
        console.log(error);
      }
    }
    //dispatch to action 
    dispatch(uploadPost(newPost))
    reset()
  }
  return (
    <div className='PostShare'>
        <img src={user.profilePicture?serverPublic + user.profilePicture:serverPublic + "defaultProfile.png"}/>
        <div>
            <input type='text' placeholder="What's happening"
              ref={desc}
              required
            />
            <div className='postOptions'>
              <div className='option'
                style={{color:"var(--photo)"}}
                onClick={()=>imageRef.current.click()}
              >
                  <FaRegImage/>
                  Photo
              </div>{" "}
              {/* <div className='option' style={{color:"var(--video)"}}>
                  <FaPlayCircle/>
                  Video
              </div>{" "}
              <div className='option' style={{color:"var(--location)"}}>
                  <GoLocation/>
                  Location
              </div>{" "}
              <div className='option' style={{color:"var(--shedule)"}} >
                  <GrScheduleNew/>
                  Schedule
              </div>{" "} */}
              <button className='button ps-button'
              onClick={handleSubmit}
              disabled={loading}
              >{loading?"Uploading...":"Share"}</button>
              <div style={{display:'none'}}>
                <input type='file' name='myImage' ref={imageRef} onChange={onImageChange}/>
              </div>
            </div>
            {image && (
              <div className='previewImage'>
                <GrFormClose onClick={()=>{setImage(null)}}/>
                <img src={URL.createObjectURL(image)}/>
              </div>
            )}
        </div>

    </div>
  )
}

export default PostShare