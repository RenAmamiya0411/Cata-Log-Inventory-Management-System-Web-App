import React from "react";
import { Link } from "react-router-dom";

function ProductTable({ products }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="cell-padding text-left">Name</th>
            <th className="cell-padding text-left">Category</th>
            <th className="cell-padding text-left">Price</th>
            <th className="cell-padding text-left">Stock</th>
            <th className="cell-padding text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-4 px-6 text-center text-gray-500">
                No Products Found
              </td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="cell-padding">{product.name}</td>
                <td className="cell-padding">{product.category}</td>
                <td className="cell-padding">${product.price}</td>
                <td className="cell-padding">{product.stock}</td>
                <td className="cell-padding flex gap-2">
                  <Link
                    to={`/products/edit/${product._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
