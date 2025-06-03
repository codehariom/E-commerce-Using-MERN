import React from "react";
import Topbar from "../layout/Topbar";
import Navbar from "../layout/Navbar";
function Header() {
  return (
  <header className=" border-b border-gray-200"> 
{/* Topbar  */} 
  <Topbar/>
  {/* Navbar  */}
  <Navbar/>
  {/* Cart Drawer  */}

  </header>

  )
 
}

export default Header;
