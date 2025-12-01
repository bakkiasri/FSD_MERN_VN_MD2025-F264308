import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import StarRating from "./rating";
// import axios from 'axios';
const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // ✅ navigation hook

  useEffect(() => {
    //  fetch('https://fakestoreapi.com/products'
    fetch("https://dummyjson.com/products", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched products:", data.products);
        setProducts(data.products);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        {products.map((product) => (
          <Col xl={4} sm={6} xs={12} className="p-3" key={product.id}>
            <Card style={{ height: "100%" }} className="rounded-5 p-3 shadow">
              <Card.Img
                // variant="top"
                src={product.images}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  padding: "10px",
                }}
              />
              <Card.Body>
                {/* {product.images} */}
                <Card.Title>{product.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  ${product.price}
                </Card.Subtitle>
                <Card.Text>{product.category}</Card.Text>
                <Card.Text>
                  {product.description.length > 100
                    ? product.description.slice(0, 100) + "..."
                    : product.description}
                </Card.Text>
                <Button
                  className="rounded-5 bg-primary p-2 border-0 shadow"
                  style={{ background: "" }}
                  onClick={() => navigate(`/product/${product.id}`)} // ✅ navigate to details
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {/* <Row>
        <StarRating />

      </Row> */}
    </Container>
  );
};

export default Product;
