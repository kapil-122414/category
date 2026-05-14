import React from "react";

const cards = (props) => {
  return (
    <div>
      <div className="Cards shadow-2xl h-35">
        <div className="py-4 px-5 ">
          <h1 className=' props.darkMode?"white":black'>{props.name}</h1>
          <h3 className=' props.darkMode?"white":black'>
            {props.price}
            {props.totaluser}
          </h3>
          <p className="growth text-green">{props.growth}</p>
        </div>
      </div>
    </div>
  );
};

export default cards;
