import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Cata-Log</h1>
      <ul className="flex gap-6">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>
        </li>
        <li>
          <Link to="/categories" className="hover:text-gray-300">
            Categories
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
