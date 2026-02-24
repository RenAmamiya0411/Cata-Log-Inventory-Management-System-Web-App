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

  const handleDelete = async id => {
    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link to="/products/add" className="btn-primary">
          Add Product
        </Link>
      </div>
      <ProductTable products={products} onDelete={handleDelete} />
    </div>
  );
}

export default Products;
