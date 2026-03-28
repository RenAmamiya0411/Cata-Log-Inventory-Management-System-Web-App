import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductTable from "../parts/ProductTable";
import axios from "../api/axios";
import toast from "react-hot-toast";
import SkeletonTable from "../parts/SkeletonTable";
import ConfirmModal from "../parts/ConfirmModal";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products", { params: { search, category, page, limit: 10 } });
        setProducts(data.products);
        setPages(data.pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, category, page, refresh]);

  const handleDelete = id => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/products/${deleteId}`);
      setRefresh(prev => !prev);
      toast.success("Product deleted!");
    } catch (err) {
      toast.error("Failed to delete product");
      console.log(err);
    } finally {
      setModalOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <Link className="btn-primary" to="/products/add">
          Add Product
        </Link>
      </div>
      <div className="flex gap-4 mb-6">
        <input
          className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={category}
          onChange={e => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {loading ? <SkeletonTable /> : <ProductTable products={products} onDelete={handleDelete} />}
      <div className="flex justify-center gap-2 mt-6">
        <button
          className="px-3 py-1 bg-gray-800 border border-gray-700 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-3 py-1 text-gray-300">
          {page} / {pages}
        </span>
        <button
          className="px-3 py-1 bg-gray-800 border border-gray-700 text-white rounded hover:bg-gray-700 disabled:opacity-50"
          onClick={() => setPage(p => p + 1)}
          disabled={page === pages}
        >
          Next
        </button>
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        message="Are you sure you want to delete this product? "
        onConfirm={confirmDelete}
        onCancel={() => {
          setModalOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  );
}

export default Products;
