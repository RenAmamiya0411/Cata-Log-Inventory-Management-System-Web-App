import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    lowStockThreshold: 10
  });

  useEffect(() => {
    axios
      .get(`/products/${id}`)
      .then(res => setFormData(res.data))
      .catch(err => console.log(err));

    axios
      .get(`/categories/`)
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (Number(formData.price) <= 0) newErrors.price = "Price must be a positive number";
    if (Number(formData.stock) < 0) newErrors.stock = "Stock cannot be negative";
    if (!Number.isInteger(Number(formData.stock))) newErrors.stock = "Stock must be a whole number";
    if (Number(formData.lowStockThreshold) <= 0) newErrors.lowStockThreshold = "Threshold must be a positive number";
    if (!Number.isInteger(Number(formData.lowStockThreshold)))
      newErrors.lowStockThreshold = "Threshold must be a whole number";
    return newErrors;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await axios.put(`/products/${id}`, formData);
      toast.success("Product updated!");
      navigate("/products");
    } catch (err) {
      toast.error("Failed to update product");
      console.log(err);
    }
  };
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white">Edit Product</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg shadow p-6 flex flex-col gap-4">
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
          {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
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
          {errors.stock && <p className="text-red-400 text-sm mt-1">{errors.stock}</p>}
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
          {errors.lowStockThreshold && <p className="text-red-400 text-sm mt-1">{errors.lowStockThreshold}</p>}
        </div>
        <div className="flex gap-3">
          <button className="btn-primary flex-1" type="submit">
            Update Product
          </button>
          <button
            className="flex-1 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
            type="button"
            onClick={() => navigate("/products")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
