import React, { useState } from "react";

function Categories() {
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setNewCategory("");
  };

  return (
    <div>
      <h2>Categories</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter the category name"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default Categories;
