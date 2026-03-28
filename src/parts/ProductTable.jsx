import React from "react";
import { Link } from "react-router-dom";

function ProductTable({ products, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 rounded-lg shadow">
        <thead className="bg-gray-900 text-white">
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
              <td className="py-4 px-6 text-center text-gray-400" colSpan="5">
                No Products Found
              </td>
            </tr>
          ) : (
            products.map(product => {
              const isLowStock = product.stock <= product.lowStockThreshold;
              return (
                <tr
                  className={`border-b border-gray-700 transition duration-200 ${isLowStock ? "bg-yellow-50 hover:bg-yellow-100" : " bg-gray-800 hover:bg-gray-700"}`}
                  key={product._id}
                >
                  <td className={`cell-padding ${isLowStock ? "text-gray-900" : "text-white"}`}>{product.name}</td>
                  <td className={`cell-padding text-center ${isLowStock ? "text-gray-900" : "text-white"}`}>
                    {product.category}
                  </td>
                  <td className={`cell-padding text-center ${isLowStock ? "text-gray-900" : "text-white"}`}>
                    ${product.price}
                  </td>
                  <td className={`cell-padding text-center ${isLowStock ? "text-gray-900" : "text-white"}`}>
                    <div className="flex flex-col items-center gap-1">
                      <span>{product.stock}</span>
                      {isLowStock && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                          Low Stock
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="cell-padding flex gap-2 justify-center">
                    <Link
                      className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
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
