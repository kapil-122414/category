import React from 'react'
import {
  FaHome,
  FaUsers,
  FaBox,
  FaShoppingCart,
  FaCog,
  FaComments,FaSignOutAlt 
  
} from "react-icons/fa";

const Sidebar=() =>{
  return (
    <>
    <div className='sidebar'>
      <div className='logo'><img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA9lBMVEX///+92fEVFRU1NTUAAAApKSkQEBDZWmXv7+/19fXS0tJkZGQHAAAUFhUqJygADQzYWmUQFhKnvNPC3/hMVl+YQlCzTVcLBwMTFhkADwqWlpbi4uJndoQ2OT+51egSDgu80utKTVhZZG1ISEgfHx/B3/0WFBe2ydzBwcG72/K60eYgIymqqqqgoKCmtsmElaVjcIA9PT0SDgQ4ICa4uLiYrr+OorRSUlIPFxZ6QEeBPEbPXmk+Hh88HybOXGCpUFigU1sbEhgEABA5QkJ/jJkcEQ8OFB11gYk5Qku9zNzO4vSqusg0PkaBk5wODwBndYAvMDuBgYEudITGAAAF+ElEQVR4nO2ca2PaNhSGsTm44bYEnA1KCOZmgyFpyi3Ntm5dNrZeQkv7///MJGMMJiF1iYVU+j5fbByDeSJZOjoSTiQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGGOxCJbL11ppX4SSCrVqqRlCh4lqWQIhpIyy/EV6bqeFwj7eJ1eyRPMMMHysUiePy8wxYw0w0tybpxffxbJb9aNTpfSDCt0ezN6JpTfX5d1qkg01Mt//CnU8OT1jVzDgj46eXYijmcno4IChiKL8GSUh6Fgw/wfIgWZ4kjyfZgvjN78IpA3f40kt6UF3WG9skBKvMeXWobO7W1ZILe3N5INHacgFBaW3kru8R2HcgL5+9iQXIa6dX5XFMjd3bkluZZa55orEK0+G0ovw7omkprsMsyLNzQkGB6NLz0usqX9GGYvFhcc7yefcZalJSV9L4Z6Kbhi9ky84Jh4bmbJVsOaa5qxGa4gGosXDF1xW0tj25PqizgUNwx1Q7TikW7wq/gYWw3NK/bnSQyK4VrKL66LvRlZ/6CXBpnVK99wU9M8Pc5TMybDoC3NDEh4hJMydKMdJKG39hau2TD00qOG7mrXjmqYSLfZ9VMiBdP8f3gRvAwMXbdXLHYWmLZW/7qhrXWWb+jUIhsmLvgXEJnmP6NQfnZVhr13wa0yNSMY2r1G0APQP53IhjwHTSJ7jG2GZpXy5UUS3jquR6il9nStz6G57W47URnDl7l/ncWY1aCOHcFwnlsZ5pr21oqqiqFW7Ad17q3pRjCs5rz+2+sAvgtDrTbxKdquG+E+ZIZGO9PtZgYGN1S+ljJMH+9FREP+Ga0SN6xvU1TIMMSPaBjE4Yud79DQNder6T1Dc3K9xAvIHzWsr0U56hh2rnwm/PvfM2yu+neam18xdN2aeoZ3K4GX98vQ7hGf7i8UCiwosPTOw4ZBLbDXAlVVDM15znIYLKwZUmfTsGZ3iMUCXu/ONv9tMZwsq8HVdV09w7fkxTR80K/37sc0HfL7d74tP2jIPmLFqXKGWu00+HbXD0Te3JC6iXRizKvrg4a9vpVfpkYcKipnqAUy3l30oCF/X5e2lWG9b/EkBUPXHQoyIOoYhoax99pSvwy/athOMYy8moYhdjDs9Y0yXabTaSahquFyqmFnQ8dLH5ypavho5B21DBU2NCcvfaY9bWtb+j0bXlPOnymldwdZhmYzp5eXWZd7Mc1BGF7R0LA8KNk7RENNmzbeLWgWD7KWruG1pgdpGErNH6Sh9iRDTf0e349lHoxp+Phww5CNldYNTVurrQydgoKGth1kmuyNmRmbBTrvQ2OL9+zIypCf+EH70OsP875hWae7ZXSkjKFWnZ0zZrPzxosNQ3N6PuPTnEay1Wol2U6ZnTbr86lddqDVZts+f3PZP2XAxhZGcjZ7q5Sh+ZGs4YJcKhy1mdc0tCxvyp/jzYyz0xY7/gF2xBp62xI/wkbCw0+f6KOpkmEzZ/mrCXlMEzKs5vI7LEp0FnenMobaJFi/R426HRoB39FOa/v8ZQDKGJqT+bzqMa2F21LbflHdgfl8YvOZcGUM17KdXvtgNo7zQW9h7oZSLc0GrJaefho+vlIhIuoaNsmi6eEasiim1yg3e08XVNZQ4wnU2Na1KWoYEzCEIQxVMLRkG36u7xiyRKP2WWoZ8pWCRuNUKEZoNeS+DflLNqYTCR8/rint2zDxhXTx0JfVBfduyBTFsyYowTCRqWTFUglfbv+GewaGTwaGwoHhk4GhcGD4ZA7ZMO3hGXbT8uh6hov9eAWXv4zVl+tEZbH2BbJxCl7sYwzxrcT6a9KKkoZx/tTyBzFMqYQQw6RKwBCGMJQPDL+VSyUN43zoZ9frD2VbreH1h90YDc9KhlqFqPMfEMX6CJCsF7a1ZUcyPm0vaIt1bJE42ngsjXwMivkpLhkqyXYKUYo/1ZAZEIl+dHdkiAYCcinpcXYg+wb0GWTHgp7gkhb8DP2oSH0OPQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACy+R8FNd6ElgsmogAAAABJRU5ErkJggg=='></img><h1>DashBoard</h1></div>    
      
      <div className='dashborad'>
      <div><h3><FaHome/>Dashboard</h3></div>
      <div><h3><FaUsers />Users</h3></div>
      <div><h3><FaBox />Products</h3></div>
      <div> <h3><FaShoppingCart />Orderd</h3></div>
      <div><h3> <FaComments /> messages</h3></div>
      <div><h3><FaCog />Setting</h3></div>
      
      <button className='logout_btn'><FaSignOutAlt />Logout
</button>
      </div>
      
      </div>
    </>
  )
}

export default Sidebar

