import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ProductCategory = () => {
  const { category } = useParams(); // will be 'electronics' or 'fashion'
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let apiUrl = "";

    if (category === "electronics") {
      // Fetch all electronics categories
      apiUrl = "https://dummyjson.com/products";
    } else if (category === "fashion") {
      // Fetch all fashion categories
      apiUrl = "https://dummyjson.com/products";
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        let filtered = [];
        if (category === "electronics") {
          filtered = data.products.filter((p) =>
            [
              "furniture",
              "laptops",
              "lighting",
              "automotive",
              "motorcycle",
            ].includes(p.category)
          );
        } else if (category === "fashion") {
          filtered = data.products.filter((p) =>
            [
              "beauty",
              "womens-dresses",
              "womens-shoes",
              "mens-shirts",
              "mens-shoes",
              "mens-watches",
              "womens-watches",
              "womens-bags",
              "womens-jewellery",
              "sunglasses",
            ].includes(p.category)
          );
        }
        setProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-capitalize">{category}</h2>
      <Row>
        {products.map((product) => (
          <Col xl={4} sm={6} xs={12} key={product.id} className="p-3">
            <Card style={{ height: "100%" }} className="rounded-5 p-3 shadow">
              <Card.Img
                src={product.thumbnail}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  padding: "10px",
                }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  ${product.price}
                </Card.Subtitle>
                <Card.Text>{product.category}</Card.Text>
                <Button
                  className="rounded-5 bg-primary p-2 border-0 shadow"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductCategory;
