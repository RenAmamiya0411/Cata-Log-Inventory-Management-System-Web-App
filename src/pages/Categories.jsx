import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    axios
      .get("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("/categories", { name: newCategory });
      setCategories([...categories, res.data]);
      toast.success("Category added!")
      setNewCategory("");
    } catch (err) {
      toast.error("Failed to add category")
      console.log(err);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`/categories/${id}`);
      setCategories(categories.filter(cat => cat._id !== id));
      toast.success("Category deleted!")
    } catch (err) {
      toast.error("Failed to delete category")
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Categories</h2>
      <form className="bg-gray-800 rounded-lg shadow p-6 mb-6 flex gap-4" onSubmit={handleSubmit}>
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

      <div className="bg-gray-800 rounded-lg shadow p-6">
        {categories.length === 0 ? (
          <p className="text-gray-400 text-center">No Categories found</p>
        ) : (
          categories.map(category => (
            <div className="flex items-center justify-between border-b border-gray-700 py-3" key={category._id}>
              <span className="text-white">{category.name}</span>
              <button className="btn-delete" onClick={() => handleDelete(category._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Categories;
