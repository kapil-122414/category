import { useState } from "react";

import {
  FaHome,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaCog,
  FaComments,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

const Sidebar = ({ setPage }) => {

  const [toggle, setToggle] = useState(false);

  return (
    <>
    
      {/* TOGGLE BUTTON */}

      <button
        className="toggle_btn"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? <FaTimes /> : <FaBars />}
      </button>

      {/* SIDEBAR */}

      <div className={toggle ? "sidebar active" : "sidebar"}>

        <div className='logo  '>
          <img
            src='data:image/jpeg;base64,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'          />

          <h1>DashBoard</h1>
        </div>

        <div className='dashborad'>

          <div onClick={() => setPage("dashboard")}>
            <h3><FaHome /> Dashboard</h3>
          </div>

          <div onClick={() => setPage("users")}>
            <h3><FaUsers /> Users</h3>
          </div>

          <div>
            <h3><FaBox /> Products</h3>
          </div>

          <div>
            <h3><FaShoppingCart /> Orders</h3>
          </div>

          <div>
            <h3><FaComments /> Messages</h3>
          </div>

          <div>
            <h3><FaCog /> Setting</h3>
          </div>

        </div>

        <button className='logout_btn'>
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </>
  )
}

export default Sidebar;