import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Electronics = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products/category/smartphones")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Electronics</h2>
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

export default Electronics;
