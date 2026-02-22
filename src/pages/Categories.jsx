import React, { useState } from "react";

function Categories() {
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
        <button className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700" type="submit">
          Add Category
        </button>
      </form>
    </div>
  );
}

export default Categories;
