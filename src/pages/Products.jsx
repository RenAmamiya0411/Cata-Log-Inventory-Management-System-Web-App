import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductTable from "../parts/ProductTable";

function Products() {
  const [products] = useState([]);
  return (
    <div>
      <div>
        <h2>Products</h2>
        <Link to="/products/add">Add Product</Link>
      </div>
      <ProductTable products={products} />
    </div>
  );
}

export default Products;
