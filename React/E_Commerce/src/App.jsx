


import card from "./components/cards";

const App = () => {
  const user="kapil";
  return (
   <>
   <div className="cards">
    {card()}
      {card()}
        {card()}
          {card()}
   </div>
   </>
  )
}

export default App;
