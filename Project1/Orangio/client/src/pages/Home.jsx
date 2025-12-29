import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import "../styles/Home.css";
import "../styles/Products.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [bannerImg, setBannerImg] = useState();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);

  const [sortFilter, setSortFilter] = useState("popularity");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [genderFilter, setGenderFilter] = useState([]);

  useEffect(() => {
    fetchBanner();
    fetchProducts();
  }, []);

  const fetchBanner = async () => {
    const res = await axios.get("http://localhost:6001/api/banners");
    setBannerImg(res.data);
  };

  const fetchProducts = async () => {
    const productRes = await axios.get(
      "http://localhost:6001/api/products/fetch-products"
    );
    setProducts(productRes.data);
    setVisibleProducts(productRes.data);

    const categoryRes = await axios.get(
      "http://localhost:6001/api/products/fetch-categories"
    );
    setCategories(categoryRes.data);
  };

  /* ---------------- Filters ---------------- */
  const handleSortFilterChange = (e) => {
    const value = e.target.value;
    setSortFilter(value);

    let sorted = [...visibleProducts];
    if (value === "low-price") sorted.sort((a, b) => a.price - b.price);
    if (value === "high-price") sorted.sort((a, b) => b.price - a.price);
    if (value === "discount") sorted.sort((a, b) => b.discount - a.discount);
    setVisibleProducts(sorted);
  };

  const handleCategoryCheckBox = (e) => {
    const value = e.target.value;
    setCategoryFilter((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((c) => c !== value)
    );
  };

  useEffect(() => {
    let filtered = products;
    if (categoryFilter.length)
      filtered = filtered.filter((p) => categoryFilter.includes(p.category));
    setVisibleProducts(filtered);
  }, [categoryFilter, products]);

  return (
    <Container fluid className="HomePage mt-3">
      {/* ================= FILTER BAR (TOP) ================= */}
      <Card className="mb-4 p-3 shadow-sm">
        <Row>
          <Col md={4}>
            <h6>Sort By</h6>
            {["popularity", "low-price", "high-price", "discount"].map(
              (type) => (
                <Form.Check
                  key={type}
                  type="radio"
                  label={type}
                  value={type}
                  checked={sortFilter === type}
                  onChange={handleSortFilterChange}
                />
              )
            )}
          </Col>

          <Col md={8}>
            <h6>Categories</h6>
            <Row>
              {categories.map((cat) => (
                <Col md={3} key={cat}>
                  <Form.Check
                    type="checkbox"
                    label={cat}
                    value={cat}
                    checked={categoryFilter.includes(cat)}
                    onChange={handleCategoryCheckBox}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Card>

      {/* ================= MAIN CONTENT ================= */}
      <Row className="gy-4">
        {/* -------- LEFT SIDEBAR -------- */}
        <Col md={3}>
          {/* Banner */}
          <Card className="mb-4 shadow-sm banner-card">
            {bannerImg && (
              <Card.Img src={bannerImg} alt="banner" className="banner-img" />
            )}
          </Card>

          {/* Categories */}
          {[
            {
              name: "Fashion",
              img: "https://media.istockphoto.com/id/504742864/photo/stylish-business-clothing-for-businessman.jpg?s=612x612&w=0&k=20&c=AsGrhEMNkmpwqaJPBSACPthMuBsmsDIecRkdFXKSnl0=",
            },
            {
              name: "Electronics",
              img: "https://5.imimg.com/data5/ANDROID/Default/2023/1/SE/QC/NG/63182719/product-jpeg-500x500.jpg",
            },
            {
              name: "mobiles",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jUW7v1WFJL9Ylax9a4vazyKXwG-ktSinI4Rd7qi7MkhMr79UlIyyrNkbiK0Cz5u6WYw",
            },
            {
              name: "Groceries",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbpV_yQ_zCtZt_1kNebjvFqXvdDnLuuJPsQ",
            },
            {
              name: "Sports-Equipment",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQJ-hcaUAEP31U4-Tos6OyBulvRIT35lXhUQ",
            },
          ].map((cat) => (
            <Card
              key={cat.name}
              className="mb-3 shadow-sm category-card-animated"
              role="button"
              onClick={() => navigate(`/${cat.name}`)}
            >
              <div className="category-img-wrapper">
                <Card.Img src={cat.img} alt={cat.name} />
              </div>
              <Card.Body className="p-2 text-center">
                <Card.Title className="fs-6 mb-0">{cat.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* -------- PRODUCTS -------- */}
        <Col md={9}>
          <Row className="g-4">
            {visibleProducts.map((product) => (
              <Col md={4} sm={6} key={product._id}>
                <Card
                  className="h-100 product-card-animated"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="product-img-wrapper">
                    <Card.Img variant="top" src={product.mainImg} />
                  </div>

                  <Card.Body>
                    <Card.Title className="fs-6">{product.title}</Card.Title>

                    <Card.Text className="text-muted small">
                      {product.description.slice(0, 30)}...
                    </Card.Text>

                    <h6 className="mb-0">
                      ₹
                      {parseInt(
                        product.price - (product.price * product.discount) / 100
                      )}
                      <s className="ms-2 text-muted small">{product.price}</s>
                    </h6>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Footer />
    </Container>
  );
};

export default Home;
