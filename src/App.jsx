import "./App.css";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Categories from "./pages/Categories";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./parts/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;
