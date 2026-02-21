import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h1>Cata-Log</h1>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
