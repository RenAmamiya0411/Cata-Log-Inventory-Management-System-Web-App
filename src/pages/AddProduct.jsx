import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    lowStockThreshold: 10
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/products", formData);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div>
          <label className="form-labels">Name</label>
          <input
            className="form-inputs"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="form-labels">Category</label>
          <select className="form-inputs" name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select a Category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-labels">Price</label>
          <input
            className="form-inputs"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="form-labels">Stock</label>
          <input
            className="form-inputs"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="form-labels">Low Stock Threshold</label>
          <input
            className="form-inputs"
            type="number"
            name="lowStockThreshold"
            value={formData.lowStockThreshold}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn-primary" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
