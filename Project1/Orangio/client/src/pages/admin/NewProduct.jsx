import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productMainImg, setProductMainImg] = useState("");
  const [productCarouselImg1, setProductCarouselImg1] = useState("");
  const [productCarouselImg2, setProductCarouselImg2] = useState("");
  const [productCarouselImg3, setProductCarouselImg3] = useState("");
  const [productSizes, setProductSizes] = useState([]);
  const [productGender, setProductGender] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productNewCategory, setProductNewCategory] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [AvailableCategories, setAvailableCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await axios.get(
      "http://localhost:6001/api/products/fetch-categories"
    );
    setAvailableCategories(response.data);
  };

  const handleCheckBox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setProductSizes([...productSizes, value]);
    } else {
      setProductSizes(productSizes.filter((size) => size !== value));
    }
  };

  const handleNewProduct = async () => {
    await axios.post("http://localhost:6001/api/products/add-new-product", {
      productName,
      productDescription,
      productMainImg,
      productCarousel: [
        productCarouselImg1,
        productCarouselImg2,
        productCarouselImg3,
      ],
      productSizes,
      productGender,
      productCategory,
      productNewCategory,
      productPrice,
      productDiscount,
    });
    alert("Product added");
    setProductName("");
    setProductDescription("");
    setProductMainImg("");
    setProductCarouselImg1("");
    setProductCarouselImg2("");
    setProductCarouselImg3("");
    setProductSizes([]);
    setProductGender("");
    setProductCategory("");
    setProductNewCategory("");
    setProductPrice(0);
    setProductDiscount(0);
    navigate("/all-products");
  };

  return (
    <Container className="my-4">
      <h3 className="mb-4">New Product</h3>
      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <FloatingLabel label="Product Name" className="mb-3">
              <Form.Control
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col md={6}>
            <FloatingLabel label="Product Description" className="mb-3">
              <Form.Control
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <FloatingLabel label="Thumbnail Image URL" className="mb-3">
          <Form.Control
            type="text"
            value={productMainImg}
            onChange={(e) => setProductMainImg(e.target.value)}
          />
        </FloatingLabel>

        <Row className="mb-3">
          <Col md={4}>
            <FloatingLabel label="Carousel Image 1">
              <Form.Control
                type="text"
                value={productCarouselImg1}
                onChange={(e) => setProductCarouselImg1(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col md={4}>
            <FloatingLabel label="Carousel Image 2">
              <Form.Control
                type="text"
                value={productCarouselImg2}
                onChange={(e) => setProductCarouselImg2(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col md={4}>
            <FloatingLabel label="Carousel Image 3">
              <Form.Control
                type="text"
                value={productCarouselImg3}
                onChange={(e) => setProductCarouselImg3(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Available Sizes</Form.Label>
          <div>
            {["S", "M", "L", "XL"].map((size) => (
              <Form.Check
                inline
                key={size}
                label={size}
                type="checkbox"
                value={size}
                checked={productSizes.includes(size)}
                onChange={handleCheckBox}
              />
            ))}
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div>
            {["Men", "Women", "Unisex"].map((gender) => (
              <Form.Check
                inline
                key={gender}
                label={gender}
                type="radio"
                name="productGender"
                value={gender}
                checked={productGender === gender}
                onChange={(e) => setProductGender(e.target.value)}
              />
            ))}
          </div>
        </Form.Group>

        <Row className="mb-3">
          <Col md={4}>
            <FloatingLabel label="Category">
              <Form.Select
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value="">Choose Product Category</option>
                {AvailableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="new category">New Category</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md={4}>
            <FloatingLabel label="Price">
              <Form.Control
                type="number"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </FloatingLabel>
          </Col>
          <Col md={4}>
            <FloatingLabel label="Discount (%)">
              <Form.Control
                type="number"
                value={productDiscount}
                onChange={(e) => setProductDiscount(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>

        {productCategory === "new category" && (
          <FloatingLabel label="New Category" className="mb-3">
            <Form.Control
              type="text"
              value={productNewCategory}
              onChange={(e) => setProductNewCategory(e.target.value)}
            />
          </FloatingLabel>
        )}

        <Button variant="primary" onClick={handleNewProduct}>
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default NewProduct;
