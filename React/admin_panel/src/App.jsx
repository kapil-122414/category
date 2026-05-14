import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/header/header";
import Dashboard from "./components/dashboard/dashboard";
import Users from "./components/dashboard/users";
import React, { useState } from "react";
const App = () => {
  const [page, setPage] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="main_content">
      <Sidebar setPage={setPage} />

      <section className={darkMode ? "dark_section" : "light_section"}>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {page === "dashboard" && <Dashboard darkMode={darkMode} />}

        {page === "users" && <Users />}
      </section>
    </div>
  );
};

export default App;
