import React from "react";

const cards = (props) => {
  return (
    <div>
      <div className="Cards shadow-2xl h-35">
        <div className="py-4 px-5 ">
          <h1 className="  text-lg text-black font-medium text-left">
            {props.name}
          </h1>
          <h3 className="  text-3xl text-black font-bold text-left">
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
