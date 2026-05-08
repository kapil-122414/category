import { useState } from "react";
import React from 'react'

const count=()=> {
  const [title,settitle]=useState('');
 const [title1,settitle1]=useState('');

 const [task,settask]=useState([]);

    const [count,setcount]=useState(0);
    const [user,userdat]=useState(" ");

    const submitHandler=(E)=>{
      E.preventDefault()
    let newdata=[...task];
      newdata.push({title,title1});
      settask(newdata);
      console.log(newdata);
      settitle('');
      settitle1('')
        
    } 

  return (
    <div>
      <form onSubmit={(E)=>{
        submitHandler(E)}}>
      <input type="text" 
      value={title1}
      placeholder="enter category" 
      onChange={(e)=>{
        settitle1(e.target.value);
        
      } }/>


      <input 
      type ="text"
      value={title}
      placeholder="enter the product"
      onChange={(e)=>{
        settitle(e.target.value);
      }}

      />
      <button >add</button>
      </form>
       <div className="data">
{task.map(function(item){
  return <div><h3>{item.title} </h3>
  <h3>{item.title1} </h3></div>;
})}
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

