import React from "react";
import AdminLogin from "./AdminLogin";

function Navbar() {
  return (
    <div className="row nav-col">
      {/* <div className="col-sm-12 logo-row d-flex">
        <AdminLogin />
      </div> */}
      <div className="col-sm-12 d-flex justify-content-center">
        <h2 className="nav--logo_text">Employee Directory</h2>
      </div>
    </div>
  );
}

export default Navbar;
