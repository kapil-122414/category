import React from 'react'
import {Route,Routes,Link} from 'react-router-dom'
import Home from './pages/home'
import About from './pages/about'
import Content from './pages/content'
import Navbar from './component/navbar'
import Footer from './component/footer'
import Notfound from './pages/Notfound'
import Man from './pages/Man'
import Woman from './pages/woman'
function App() {
  return (
    <div  >
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/content' element={<Content/>}>
        <Route
            index
            element={<div><h1>All Product Data</h1></div>
              
            }
          />
        <Route path='man' element={<Man/>}/>
        <Route path='woman' element={<Woman/>}/>
        </Route>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
   <Footer/>
    </div>
  )
}

export default App