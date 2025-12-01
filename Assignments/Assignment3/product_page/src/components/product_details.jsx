import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StarRating from "./rating";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product)
    return (
      <p className="d-flex align-items-center justify-content-center w-100 h-100 ">
        Loading...
      </p>
    );

  return (
    <Container className="d-flex align-items-center justify-content-center w-100 h-100 mt-5">
      <Row className="d-flex w-100 align-items-center p-3  justify-content-center shadow rounded-5 bg-white">
        <img
          src={product.images}
          alt={product.title}
          style={{ height: "600px", objectFit: "contain" }}
        />
      </Row>
      <Row
        xs={9}
        className="d-flex w-100 align-items-center pt-0 p-5 justify-content-top border-right"
      >
        <Col>
          <h2>{product.title}</h2>
          <p>
            <strong className="h-1">Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>{product.description}</p>
          <StarRating />
        </Col>
      </Row>

      <Row></Row>
    </Container>
  );
};

export default ProductDetails;
