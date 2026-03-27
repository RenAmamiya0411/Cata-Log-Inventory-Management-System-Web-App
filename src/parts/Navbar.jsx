import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard, MdInventory, MdCategory, MdLogout } from "react-icons/md";

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

  const navLinks = [
    { to: "/", label: "Dashboard", icon: <MdDashboard size={22} /> },
    { to: "/products", label: "Products", icon: <MdInventory size={22} /> },
    { to: "/categories", label: "Categories", icon: <MdCategory size={22} /> }
  ];

  return (
    <>
      <nav className="hidden md:flex bg-gray-900 text-white px-6 py-4 items-center justify-between">
        <h1 className="text-xl font-bold">Cata-Log</h1>
        <ul className="flex gap-6 items-center">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                className={`hover:text-gray-300 ${location.pathname === link.to ? "text-indigo-400 font-semibold" : ""}`}
                to={link.to}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-around py-3 z-50 border-t border-gray-700">
        {navLinks.map(link => (
          <Link
            className={`flex flex-col items-center text-xs gap-1 ${location.pathname === link.to ? "text-indigo-400" : "text-gray-400 hover:text-white"}`}
            key={link.to}
            to={link.to}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
        <button
          className="flex flex-col items-center text-xs gap-1 text-gray-400 hover:text-white"
          onClick={handleLogout}
        >
          <MdLogout size={22} />
          Logout
        </button>
      </nav>
    </>
  );
}

export default Navbar;
