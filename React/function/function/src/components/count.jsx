import { useState } from "react";
import React from 'react'

const count=()=> {
  const [title,settitle]=useState('');

    const [count,setcount]=useState(0);
    const [user,userdat]=useState(" ");

    const submitHandler=(E)=>{
      E.preventDefault()
      console.log("sumbit data" ,title);
      settitle('');
        
    }

  return (
    <div>
      <form onSubmit={(E)=>{
        submitHandler(E)}}>
      <input type="text" 
      value={title}
      placeholder="enter category" 
      onChange={(e)=>{
        settitle(e.target.value);
        
      } }/>


      <input 
      type ="text"
      placeholder="enter the product"

      />
      <button >add</button>
      </form>
       <div className="data">

       </div>
      <h1>show user name={user}</h1>
      <h1>{count}</h1>
      <button onClick={()=>{setcount(count+1)}}>increase</button>
      <button onClick={()=>{setcount(count-1)}}>decrease
      </button>
    </div>
  )
}

export default count

