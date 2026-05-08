import React from 'react'
import Sidebar from './components/sidebar/sidebar'
import Header from './components/header/header'
const  App=()=> {
  return (
    <div className='main_content'>
      
      <Sidebar/>
      <section>
         <Header/>
         
      </section>
      
      
    </div>
  )
}

export default App
