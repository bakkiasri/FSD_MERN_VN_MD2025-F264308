import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Products.css";

const Products = ({ category }) => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);

  const [sortFilter, setSortFilter] = useState("popularity");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    const productRes = await axios.get(
      "http://localhost:6001/api/products/fetch-products"
    );

    const data =
      category === "all"
        ? productRes.data
        : productRes.data.filter((item) => item.category === category);

    setProducts(data);
    setVisibleProducts(data);

    const categoryRes = await axios.get(
      "http://localhost:6001/api/products/fetch-categories"
    );
    setCategories(categoryRes.data);
  };

  /* ================= Filters ================= */

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortFilter(value);

    let sorted = [...visibleProducts];

    if (value === "low") sorted.sort((a, b) => a.price - b.price);
    if (value === "high") sorted.sort((a, b) => b.price - a.price);
    if (value === "discount") sorted.sort((a, b) => b.discount - a.discount);

    setVisibleProducts(sorted);
  };

  const handleCategoryCheck = (e) => {
    const value = e.target.value;
    setCategoryFilter((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const handleGenderCheck = (e) => {
    const value = e.target.value;
    setGenderFilter((prev) =>
      prev.includes(value) ? prev.filter((g) => g !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    let filtered = [...products];

    if (categoryFilter.length > 0) {
      filtered = filtered.filter((p) => categoryFilter.includes(p.category));
    }

    if (genderFilter.length > 0) {
      filtered = filtered.filter((p) => genderFilter.includes(p.gender));
    }

    setVisibleProducts(filtered);
  }, [categoryFilter, genderFilter, products]);

  /* ================= UI ================= */

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* ================= Sidebar Filters ================= */}
        <div className="col-md-3">
          <div className="card shadow-sm p-3 sticky-top filter-card">
            <h5 className="mb-3">Filters</h5>

            {/* Sort */}
            <h6>Sort By</h6>
            {[
              { label: "Popular", value: "popularity" },
              { label: "Price: Low to High", value: "low" },
              { label: "Price: High to Low", value: "high" },
              { label: "Discount", value: "discount" },
            ].map((item) => (
              <div className="form-check" key={item.value}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="sort"
                  value={item.value}
                  checked={sortFilter === item.value}
                  onChange={handleSortChange}
                />
                <label className="form-check-label">{item.label}</label>
              </div>
            ))}

            {/* Categories */}
            {category === "all" && (
              <>
                <hr />
                <h6>Categories</h6>
                {categories.map((cat) => (
                  <div className="form-check" key={cat}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={cat}
                      checked={categoryFilter.includes(cat)}
                      onChange={handleCategoryCheck}
                    />
                    <label className="form-check-label">{cat}</label>
                  </div>
                ))}
              </>
            )}

            {/* Gender */}
            <hr />
            <h6>Gender</h6>
            {["Men", "Women", "Unisex"].map((g) => (
              <div className="form-check" key={g}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={g}
                  checked={genderFilter.includes(g)}
                  onChange={handleGenderCheck}
                />
                <label className="form-check-label">{g}</label>
              </div>
            ))}
          </div>
        </div>

        {/* ================= Products ================= */}
        <div className="col-md-9">
          <h4 className="mb-3">Products</h4>

          <div className="row g-4">
            {visibleProducts.map((product) => (
              <div className="col-md-4 col-lg-3" key={product._id}>
                <div
                  className="card h-100 shadow-sm product-card"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.mainImg}
                    className="card-img-top"
                    alt={product.title}
                  />

                  <div className="card-body">
                    <h6 className="card-title">{product.title}</h6>
                    <p className="text-muted small">
                      {product.description.slice(0, 40)}...
                    </p>

                    <div className="d-flex gap-2 align-items-center">
                      <strong className="text-success">
                        ₹
                        {parseInt(
                          product.price -
                            (product.price * product.discount) / 100
                        )}
                      </strong>
                      <small className="text-muted text-decoration-line-through">
                        ₹{product.price}
                      </small>
                    </div>

                    <small className="text-danger">
                      {product.discount}% off
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleProducts.length === 0 && (
            <p className="text-center mt-5 text-muted">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
