import React, { useState } from 'react'
import './Auth.css'
import Logo from '../../img/link.png'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'
import { Link } from 'react-router-dom'
const Auth = () => {
    //dispatch
    const dispatch=useDispatch()

    //use selector for fetching from reducer
    const loading=useSelector((state)=>state.authReducer.loading)
    console.log(loading);

    //use state for signup value true or false
    const [isSignUp,setIsSignUp]=useState(true)
    
    //use state for setting form details
    const [data,setData]=useState({firstname:"",lastname:"",password:"",confirmpass:"",username:""})

    //function for setdata according to name in input field
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    //use state for setting password
    const [confirmPass,setConfirmPass]=useState(true)

    //function when form submitted
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(isSignUp){
            //redux action dispatch for signup
            data.password===data.confirmpass?dispatch(signUp(data)):setConfirmPass(false)
        }else{
            //redux action dispatch for login
            dispatch(logIn(data))
        }
    }

    //function to resetform and state
    const resetForm=()=>{
        setConfirmPass(true)
        setData({firstname:"",lastname:"",password:"",confirmpass:"",username:""})
    }
  return (
    <div className='Auth'>
      {/* left side */}
        <div className='a-left'>
            <img src={Logo} width={50}/>
            <div className="Webname">
                <h1>Linkedin.</h1>
                <h6>Explore the ideas throughout the world</h6>
            </div>
        </div>
        {/* right side */}
        <div className='a-right'>
            <form className='infoForm authForm' onSubmit={handleSubmit}>
                <h3>{isSignUp?"Sign up":"Log In"}</h3>
                {isSignUp && <div>
                    
                    <input type="text"placeholder="First Name" className="infoInput" name="firstname" onChange={handleChange} value={data.firstname}/>
                    <input type="text"placeholder="Last Name"className="infoInput"name="lastname" onChange={handleChange} value={data.lastname}/>
                </div>}
                

                <div>
                    <input
                        type="text"
                        className="infoInput"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={data.username}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        className="infoInput"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={data.password}
                    />
                    {isSignUp &&<input
                        type="password"
                        className="infoInput"
                        name="confirmpass"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        value={data.confirmpass}
                    />}
                    
                </div>
                <span style={{display:confirmPass?"none":"block",color:"red",fontSize:"12px",alignSelf:"flex-end",marginRight:"5px"}}>*Password not same</span>
                <div>
                    <span onClick={()=>{setIsSignUp((prev)=>!prev);resetForm()}} style={{fontSize: '12px',cursor:"pointer"}}>{isSignUp?"Already have an account. Login!":"Don't have an account Sign up"}</span>
                </div>
                        <button className="button infoButton" type="submit" disabled={loading}>
                    {loading?"Loading...":isSignUp?"Signup":"Login"}
                    </button>
            </form>
        </div>
    </div>
  )
}

export default Auth