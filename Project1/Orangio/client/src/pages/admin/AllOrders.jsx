import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
} from "react-bootstrap";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data } = await axios.get(
      "http://localhost:6001/api/orders/fetch-orders"
    );
    setOrders(data.reverse());
  };

  const cancelOrder = async (orderId) => {
    try {
      const { data } = await axios.put(
        "http://localhost:6001/api/orders/cancel-order",
        { orderId }
      );
      alert(data.message || "Order cancelled!!");
      fetchOrders();
    } catch (err) {
      alert(err.response?.data?.message || "Order cancellation failed!!");
    }
  };

  const updateOrderStatus = async (id) => {
    if (!updateStatus) return alert("Select a status first!");
    try {
      await axios.put("http://localhost:6001/api/orders/update-order-status", {
        id,
        updateStatus,
      });
      alert("Order status updated!!");
      setUpdateStatus("");
      fetchOrders();
    } catch (err) {
      alert("Order update failed!!");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">All Orders</h2>

      <Row className="g-4">
        {orders.map((order) => (
          <Col md={6} lg={4} key={order._id}>
            <Card className="h-100 shadow-sm border-0 order-card hover-scale">
              <Card.Img
                variant="top"
                src={order.mainImg}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{order.title}</Card.Title>
                <Card.Text>{order.description.slice(0, 50)}...</Card.Text>

                <div className="mb-2">
                  <Badge bg="secondary" className="me-2">
                    Size: {order.size}
                  </Badge>
                  <Badge bg="secondary" className="me-2">
                    Qty: {order.quantity}
                  </Badge>
                  <Badge bg="success" className="me-2">
                    ₹{" "}
                    {parseInt(
                      (order.price - (order.price * order.discount) / 100) *
                        order.quantity
                    )}
                  </Badge>
                </div>

                <div className="mb-2">
                  <Badge bg="info" className="me-2">
                    Payment: {order.paymentMethod}
                  </Badge>
                  <Badge bg="warning" className="me-2">
                    Status: {order.orderStatus}
                  </Badge>
                </div>

                <div className="mb-2">
                  <small>
                    Ordered on: {order.orderDate.slice(0, 10)}
                    <br />
                    Address: {order.address}, {order.pincode}
                  </small>
                </div>

                {/* Update Status & Cancel */}
                {order.orderStatus !== "delivered" &&
                  order.orderStatus !== "cancelled" && (
                    <div className="d-flex flex-column gap-2 mt-2">
                      <Form.Select
                        size="sm"
                        value={updateStatus}
                        onChange={(e) => setUpdateStatus(e.target.value)}
                      >
                        <option value="">Update order status</option>
                        <option value="Order placed">Order Placed</option>
                        <option value="In-transit">In-transit</option>
                        <option value="delivered">Delivered</option>
                      </Form.Select>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => updateOrderStatus(order._id)}
                      >
                        Update Status
                      </Button>

                      {(order.orderStatus === "Order placed" ||
                        order.orderStatus === "In-transit") && (
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => cancelOrder(order._id)}
                        >
                          Cancel Order
                        </Button>
                      )}
                    </div>
                  )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllOrders;
