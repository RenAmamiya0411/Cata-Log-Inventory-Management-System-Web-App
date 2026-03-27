import React from "react";
import { Link } from "react-router-dom";

function ProductTable({ products, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="cell-padding">Name</th>
            <th className="cell-padding">Category</th>
            <th className="cell-padding">Price</th>
            <th className="cell-padding">Stock</th>
            <th className="cell-padding">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td className="py-4 px-6 text-center text-gray-500" colSpan="5">
                No Products Found
              </td>
            </tr>
          ) : (
            products.map(product => {
              const isLowStock = product.stock <= product.lowStockThreshold;
              return (
                <tr
                  className={`border-b transition duration-200 ${isLowStock ? "bg-yellow-50 hover:bg-yellow-100" : "hover:bg-gray-50"}`}
                  key={product._id}
                >
                  <td className="cell-padding">{product.name}</td>
                  <td className="cell-padding text-center">{product.category}</td>
                  <td className="cell-padding text-center">${product.price}</td>
                  <td className="cell-padding text-center">
                    <span>{product.stock}</span>
                    {isLowStock && (
                      <span className="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Low Stock</span>
                    )}
                  </td>
                  <td className="cell-padding flex gap-2 justify-center">
                    <Link
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      to={`/products/edit/${product._id}`}
                    >
                      Edit
                    </Link>
                    <button className="btn-delete" onClick={() => onDelete(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
