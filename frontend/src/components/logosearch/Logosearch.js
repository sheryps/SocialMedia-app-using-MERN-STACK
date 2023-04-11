import React from 'react'
import './Logosearch.css'
import Logo from '../../img/link.png'
import { FaSearch } from 'react-icons/fa';

const Logosearch = () => {
  return (
    <div className='Logosearch'>
        <img src={Logo} alt='' width={50}/>
        <div className='Search'>
            <input type='text' placeholder='#Explore' />
            <div className='s-icon'>
                <FaSearch/>
            </div>
        </div>
    </div>
  )
}

export default Logosearch