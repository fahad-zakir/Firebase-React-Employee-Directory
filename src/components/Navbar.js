import React from "react";
import logo from "../images/oj-icon.png";

function Navbar() {
  return (
    <div className="row nav-col">
      <div className="col-sm-12">
        <img src={logo} className="nav--icon" alt="logo--icon" />
      </div>
      <div className="col-sm-12 d-flex justify-content-center">
        <h2 className="nav--logo_text">OJ Lifestyle Employee Directory</h2>
      </div>
    </div>
  );
}

export default Navbar;
