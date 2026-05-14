import style from "./header.module.css";
import React, { useState } from "react";
import { FaSearch, FaMoon, FaUser } from "react-icons/fa";
import From from "../froms/from";

const Header = ({ darkMode, setDarkMode }) => {
  const [showForm, setshowfrom] = useState(false);

  return (
    <div className={`${style.main} topbar`}>
      <div className={style.search}>
        <div>
          <FaSearch className={darkMode ? "text-white" : "text-black"} />

          <input type="text" placeholder="Search anything.." />
        </div>

        <div className="flex gap-5">
          <div>
            <FaMoon
              className={
                darkMode
                  ? "text-white cursor-pointer"
                  : "text-black cursor-pointer"
              }
              onClick={() => setDarkMode(!darkMode)}
            />
          </div>

          <div className="user">
            <FaUser
              className={darkMode ? "text-white" : "text-black"}
              onClick={() => setshowfrom(true)}
            />
          </div>
        </div>
        {showForm && <From setshowfrom={setshowfrom} />}
      </div>
    </div>
  );
};

export default Header;
