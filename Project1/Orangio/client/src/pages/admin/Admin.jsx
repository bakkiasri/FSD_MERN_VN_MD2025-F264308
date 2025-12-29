import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

const Admin = () => {
  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [banner, setBanner] = useState("");

  useEffect(() => {
    if (localStorage.getItem("userType") !== "admin") {
      navigate("/auth"); // redirect non-admin users
    }
  }, []);

  useEffect(() => {
    fetchCountData();
  }, []);

  const fetchCountData = async () => {
    const users = await axios.get(
      "http://localhost:6001/api/users/fetch-users"
    );
    setUserCount(users.data.length - 1);

    const products = await axios.get(
      "http://localhost:6001/api/products/fetch-products"
    );
    setProductCount(products.data.length);

    const orders = await axios.get(
      "http://localhost:6001/api/orders/fetch-orders"
    );
    setOrdersCount(orders.data.length);
  };

  const updateBanner = async () => {
    if (!banner) return alert("Enter a banner URL");
    await axios
      .post("http://localhost:6001/update-banner", { banner })
      .then(() => {
        alert("Banner updated");
        setBanner("");
      });
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      <Row className="g-4">
        {/* Users Card */}
        <Col md={3}>
          <Card className="text-center shadow-sm h-100 border-0">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text className="display-6">{userCount}</Card.Text>
              <Button variant="primary" onClick={() => navigate("/all-users")}>
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Products Card */}
        <Col md={3}>
          <Card className="text-center shadow-sm h-100 border-0">
            <Card.Body>
              <Card.Title>All Products</Card.Title>
              <Card.Text className="display-6">{productCount}</Card.Text>
              <Button
                variant="success"
                onClick={() => navigate("/all-products")}
              >
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Orders Card */}
        <Col md={3}>
          <Card className="text-center shadow-sm h-100 border-0">
            <Card.Body>
              <Card.Title>All Orders</Card.Title>
              <Card.Text className="display-6">{ordersCount}</Card.Text>
              <Button variant="warning" onClick={() => navigate("/all-orders")}>
                View All
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Add Product Card */}
        <Col md={3}>
          <Card className="text-center shadow-sm h-100 border-0">
            <Card.Body>
              <Card.Title>Add Product</Card.Title>
              <Card.Text className="text-muted">(new)</Card.Text>
              <Button variant="info" onClick={() => navigate("/new-product")}>
                Add Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Update Banner Section */}
      <Row className="mt-5">
        <Col md={6} className="mx-auto">
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title className="mb-3">Update Banner</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Banner URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter banner image URL"
                  value={banner}
                  onChange={(e) => setBanner(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={updateBanner}>
                Update
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
