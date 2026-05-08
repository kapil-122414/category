import style from './header.module.css';
import React from 'react'
import { useState } from 'react';
import { FaSearch,FaMoon , FaUser  } from "react-icons/fa";
const Header = () => {

 const [theme,settheme]=useState('light');

const darkmode =()=>{
 
  if(theme==='light'){
    settheme("dark");
  }
  else{
    settheme("light");
  }

}  
  return (
    <div className={style.main}>
       <div className={style.search } >
        <div> <FaSearch className='text-black' /><input type="text" placeholder='Search anything..'/></div>
        <div className='flex gap-5'>
          <div><FaMoon className={style.darkmode}  onClick={darkmode}/></div>
          <div><FaUser /></div>
        </div>
        </div>
    </div>
  )
}

export default Header