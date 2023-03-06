import React from "react";
import logo from "../images/oj-icon.png";
import AdminLogin from "./AdminLogin";

function Navbar() {
  return (
    <div className="row nav-col">
      <div className="col-sm-12 logo-row d-flex justify-content-between">
        <img src={logo} className="nav--icon" alt="logo--icon" />
        <AdminLogin />
      </div>

      <div className="col-sm-12 d-flex justify-content-center">
        <h2 className="nav--logo_text">OJ Employee Directory</h2>
      </div>
    </div>
  );
}

export default Navbar;
