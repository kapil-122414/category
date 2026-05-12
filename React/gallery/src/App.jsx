import React, { useEffect } from  'react'
import axios from 'axios'
import { useState } from 'react'


const App=() =>{
  const [Userdata,setuserdata]=useState([]);
  const [index,setIndex]=useState(1)
  const getdata= async()=>{
  const res= await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`);
   setuserdata(res.data)
 }

 useEffect(function(){
  getdata()
 },[index])


  let printuserdat="no user avilable";
  if(Userdata.length>0){
    printuserdat=Userdata.map(function(elem,idex){
      return (
        <div key={idex}>
        <a href={elem.url} target='_blank'>
      <div className='bg-white'>
        
        <div className=' h-40 w-44' ><img className='h-full object-cover'  src={elem.download_url} alt="" />
      <h1  className='text-white'>{elem.author}</h1></div>
       
      </div>
      </a>
     </div>
      );
      
    });
  }
  return (
    <div className='text-red-600'>
  
    <div className='flex flex-wrap gap-20' >{printuserdat}</div>
    <div className='flex justify-center items-center p-4 gap-4 m-10'>
      <button className='bg-amber-400 text-black cursor-pointer active:scale-95 p-2 rounded px-4' 
      onClick={()=>{
       if(index>1){
           setIndex(index-1)
        }
      
      }}>prev</button>
      <h1 className='text-white'>page {index}</h1>
      <button className='bg-amber-400 text-black cursor-pointer active:scale-95 p-2 rounded px-4' 
      onClick={()=>{
        
        setIndex(index+1)
       
      }}>next</button>
    </div>
    </div>
  )
}

export default App
