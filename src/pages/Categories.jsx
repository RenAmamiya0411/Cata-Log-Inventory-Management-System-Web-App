import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import ConfirmModal from "../parts/ConfirmModal";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
      toast.success("Category added!");
      setNewCategory("");
    } catch (err) {
      toast.error("Failed to add category");
      console.log(err);
    }
  };

  const handleDelete = id => {
    setModalOpen(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/categories/${deleteId}`);
      setCategories(categories.filter(cat => cat._id !== deleteId));
      toast.success("Category deleted!");
    } catch (err) {
      toast.error("Failed to delete category");
      console.log(err);
    } finally {
      setModalOpen(false);
      setDeleteId(null);
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
        <input
          className="form-inputs mb-4"
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {categories.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase())).length === 0 ? (
          <p className="text-gray-400 text-center">No Categories found</p>
        ) : (
          categories
            .filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()))
            .map(category => (
              <div className="flex items-center justify-between border-b border-gray-700 py-3" key={category._id}>
                <span className="text-white">{category.name}</span>
                <button className="btn-delete" type="button" onClick={() => handleDelete(category._id)}>
                  Delete
                </button>
              </div>
            ))
        )}
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        message="Are you sure you want to delete this category? "
        onConfirm={confirmDelete}
        onCancel={() => {
          setModalOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}

export default Categories;
