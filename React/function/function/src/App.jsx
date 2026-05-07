import React from 'react'
import Count from'./components/count.jsx';
const App = () => {
  function click (){
    console.log("click me");
  }
  return (
    <div>
      <h1>hello guys</h1>
      <input type='text' placeholder='name'></input>
      <button onClick={click}>click me </button>
      <Count/>
    </div>
  )
}

export default App
