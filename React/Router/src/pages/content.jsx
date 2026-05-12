import React from 'react'
import { Link, Outlet } from 'react-router-dom'
const Content = () => {
  return (
    <div className='content'>
         
        <Link to="/content/man">Man</Link>
        <Link to="/content/woman">woman</Link>
     <Outlet/>
    </div>
  )
}

export default Content
