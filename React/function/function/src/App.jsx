import React from 'react'

const App = () => {
  function click (){
    console.log("click me");
  }
  return (
    <div>
      <h1>hello guys</h1>
      <input type='text' placeholder='name'></input>
      <button onClick={click}>click me </button>
    </div>
  )
}

export default App
