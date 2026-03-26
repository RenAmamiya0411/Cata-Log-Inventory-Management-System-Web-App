import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const hideOn = ["/login", "/register"];
  const navigate = useNavigate();

  if (hideOn.includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
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
        <li>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
