import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./component/Navbar";
export default function App() {
  const [navNum, setNavNum] = useState(0);
  //0,1,2,3,4 = home, discovery, explore, progress, my account
  return (
    <div className="main">
      <div className="header">
        <div>Appbar</div>
        <div className="navbar_pc">
          <Navbar></Navbar>
        </div>
      </div>
      <div className="app">
        <div className="body">
          <Outlet />
          {/* <div className="navbar_padding"></div> */}
        </div>
        <div className="navbar">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
