import React from 'react';
import logo from '../images/oj-icon.png'; 
import SearchBar from './SearchBar';

function Navbar () {
   return (
     <nav>
       <img src={logo} className="nav--icon" alt="logo--icon" />
       <h2 className="nav--logo_text">OJ Lifestyle Employee Directory</h2>
     </nav>
   );
}

export default Navbar;