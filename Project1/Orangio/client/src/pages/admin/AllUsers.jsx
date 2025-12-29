import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUsersData();
  }, []);

  const fetchUsersData = async () => {
    try {
      const usersResponse = await axios.get(
        "http://localhost:6001/api/users/fetch-users"
      );
      setUsers(
        usersResponse.data.filter((user) => user.usertype === "customer")
      );

      const ordersResponse = await axios.get(
        "http://localhost:6001/api/orders/fetch-orders"
      );
      setOrders(ordersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4">All Users</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {users.map((user) => (
          <Col key={user._id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>
                  <strong>User ID:</strong> {user._id} <br />
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Orders:</strong>{" "}
                  {orders.filter((order) => order.userId === user._id).length}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllUsers;
