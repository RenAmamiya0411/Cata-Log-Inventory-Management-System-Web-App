import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductTable from "../parts/ProductTable";
import axios from "../api/axios";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link to="/products/add" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
          Add Product
        </Link>
      </div>
      <ProductTable products={products} />
    </div>
  );
}

export default Products;
