import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
const From = (props) => {
  return (
    <div className="from ">
      <div className="fromdata">
        <FaTimes
          className="text-red-700 text-1xl"
          onClick={() => props.setshowfrom(false)}
        />
        <from className="logindata">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="passward" />
          <button type="submit">login</button>
        </from>
      </div>
    </div>
  );
};

export default From;
