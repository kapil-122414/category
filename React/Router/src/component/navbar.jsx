import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='nave'>
        <h3>hyy</h3>
        <Link to="/">home</Link>
        <Link to="/content">contect</Link>
        <Link to="/about">about</Link>
        
      
    </div>
  )
}

export default Navbar
