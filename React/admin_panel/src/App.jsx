
import Sidebar from './components/sidebar/sidebar'
import Header from './components/header/header'
import Dashboard from './components/dashboard/dashboard';
import Users from './components/dashboard/users';
import React, { useState } from 'react'
const  App=()=> {
    const[page,setPage]=useState("dashboard")
  return (
    <div className='main_content'>
      
      <Sidebar setPage={setPage}/>
      <section>
         <Header/>

           {
          page === "dashboard" && <Dashboard />
        }

        {
          page === "users" && <Users />
        }
         
      </section>
      
      
    </div>
  )
}

export default App
