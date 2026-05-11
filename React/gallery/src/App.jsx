import React from  'react'
import axios, { Axios } from 'axios'
import { useState } from 'react'


const App=() =>{
  const [Userdata,setuserdata]=useState([]);
  const getdata= async()=>{
  const res= await axios.get('https://picsum.photos/v2/list?page=1')
   setuserdata(res.data)
   console.log(res.data.
download_url)
  console.log("getdata")
  }
  let printuserdat="no user avilable";
  if(Userdata.length>0){
    printuserdat=Userdata.map(function(elem,idex){
      return <div className=' h-40 w-44' ><img className='h-40' src={elem.download_url} alt="" />
      <h1></h1></div>;
    })
  }
  return (
    <div className='text-red-600'>
      <button onClick={getdata} className='bg-green-600 m-7 px-5 py-2 rounded text-white'>get data</button>
    <div className='flex flex-wrap gap-4' >{printuserdat}</div>
    </div>
  )
}

export default App
