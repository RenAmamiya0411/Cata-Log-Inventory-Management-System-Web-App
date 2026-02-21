import "./App.css";
import Dashboard from "../src/pages/Dashboard";
import Products from "../src/pages/Products";
import AddProduct from "../src/pages/AddProduct";
import EditProduct from "../src/pages/EditProduct";
import Categories from "../src/pages/Categories";
import { BrowserRouter as Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
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
