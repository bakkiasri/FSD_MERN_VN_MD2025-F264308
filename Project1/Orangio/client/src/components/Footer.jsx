import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-4 mt-5">
      <Container>
        <h5 className="text-center mb-4">
          © Orangio – One destination for all your needs
        </h5>

        <Row className="text-center text-md-start">
          <Col md={3} sm={6} className="mb-3">
            <ul className="list-unstyled">
              <li>Home</li>
              <li>Categories</li>
              <li>All Products</li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <ul className="list-unstyled">
              <li>Cart</li>
              <li>Profile</li>
              <li>Orders</li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <ul className="list-unstyled">
              <li>Electronics</li>
              <li>Mobiles</li>
              <li>Laptops</li>
            </ul>
          </Col>

          <Col md={3} sm={6} className="mb-3">
            <ul className="list-unstyled">
              <li>Fashion</li>
              <li>Grocery</li>
              <li>Sports</li>
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary" />

        <div className="text-center pb-3">
          <small>© Orangio.com – All rights reserved</small>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
