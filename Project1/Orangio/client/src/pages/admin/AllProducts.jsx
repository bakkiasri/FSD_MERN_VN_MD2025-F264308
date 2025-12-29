import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productsResponse = await axios.get(
      "http://localhost:6001/api/products/fetch-products"
    );
    setProducts(productsResponse.data);
    setVisibleProducts(productsResponse.data);

    const categoriesResponse = await axios.get(
      "http://localhost:6001/api/products/fetch-categories"
    );
    setCategories(categoriesResponse.data);
  };

  const [sortFilter, setSortFilter] = useState("popularity");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCategoryFilter([...categoryFilter, value]);
    } else {
      setCategoryFilter(categoryFilter.filter((cat) => cat !== value));
    }
  };

  const handleGenderCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setGenderFilter([...genderFilter, value]);
    } else {
      setGenderFilter(genderFilter.filter((gen) => gen !== value));
    }
  };

  const handleSortFilterChange = (e) => {
    const value = e.target.value;
    setSortFilter(value);

    let sortedProducts = [...visibleProducts];
    if (value === "low-price") sortedProducts.sort((a, b) => a.price - b.price);
    else if (value === "high-price")
      sortedProducts.sort((a, b) => b.price - a.price);
    else if (value === "discount")
      sortedProducts.sort((a, b) => b.discount - a.discount);

    setVisibleProducts(sortedProducts);
  };

  useEffect(() => {
    let filteredProducts = [...products];

    if (categoryFilter.length > 0)
      filteredProducts = filteredProducts.filter((p) =>
        categoryFilter.includes(p.category)
      );
    if (genderFilter.length > 0)
      filteredProducts = filteredProducts.filter((p) =>
        genderFilter.includes(p.gender)
      );

    setVisibleProducts(filteredProducts);
  }, [categoryFilter, genderFilter, products]);

  return (
    <Container className="my-4">
      <Row>
        {/* Filters Section */}
        <Col md={3}>
          <h4>Filters</h4>

          {/* Sort By */}
          <div className="mb-3">
            <h6>Sort By</h6>
            {["popularity", "low-price", "high-price", "discount"].map(
              (sort) => (
                <Form.Check
                  key={sort}
                  type="radio"
                  name="sortFilter"
                  label={
                    sort === "popularity"
                      ? "Popularity"
                      : sort === "low-price"
                      ? "Price (low to high)"
                      : sort === "high-price"
                      ? "Price (high to low)"
                      : "Discount"
                  }
                  value={sort}
                  checked={sortFilter === sort}
                  onChange={handleSortFilterChange}
                  className="mb-1"
                />
              )
            )}
          </div>

          {/* Categories */}
          <div className="mb-3">
            <h6>Categories</h6>
            {categories.map((cat) => (
              <Form.Check
                key={cat}
                type="checkbox"
                label={cat}
                value={cat}
                checked={categoryFilter.includes(cat)}
                onChange={handleCategoryCheckBox}
                className="mb-1"
              />
            ))}
          </div>

          {/* Gender */}
          <div className="mb-3">
            <h6>Gender</h6>
            {["Men", "Women", "Unisex"].map((gender) => (
              <Form.Check
                key={gender}
                type="checkbox"
                label={gender}
                value={gender}
                checked={genderFilter.includes(gender)}
                onChange={handleGenderCheckBox}
                className="mb-1"
              />
            ))}
          </div>
        </Col>

        {/* Products Section */}
        <Col md={9}>
          <h3 className="mb-3">All Products</h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {visibleProducts.map((product) => (
              <Col key={product._id}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={product.mainImg}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                      {product.description.slice(0, 50) + "..."}
                    </Card.Text>
                    <Card.Text>
                      <strong>
                        &#8377;{" "}
                        {parseInt(
                          product.price -
                            (product.price * product.discount) / 100
                        )}
                      </strong>{" "}
                      <s>{product.price}</s> ({product.discount}% off)
                    </Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/update-product/${product._id}`)}
                    >
                      Update
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AllProducts;
