import React, { useState } from "react";

function Categories() {
  const [categories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setNewCategory("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <form className="bg-white rounded-lg shadow p-6 mb-6 flex gap-4" onSubmit={handleSubmit}>
        <input
          className="form-inputs"
          type="text"
          placeholder="Enter the category name"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          required
        />
        <button className="btn-primary" type="submit">
          Add Category
        </button>
      </form>

      <div className="bg-white rounded-lg shadow p-6">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center">No Categories found</p>
        ) : (
          categories.map(category => (
            <div className="flex items-center justify-between border-b py-3" key={category._id}>
              <span>{category.name}</span>
              <button className="btn-delete">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;
