import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);

      if (res.data.user.role === "patient") navigate("/patient");
      if (res.data.user.role === "doctor") navigate("/doctor");
      if (res.data.user.role === "admin") navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f5f7fb" }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{ color: "#6b015dff", fontSize: "28px" }}
          >
            Login
          </Card.Title>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  borderRadius: "6px",
                  padding: "12px",
                  color: "#6b015dff",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  borderRadius: "6px",
                  padding: "12px",
                  color: "#6b015dff",
                }}
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: "#6b015dff",
                border: "none",
                padding: "12px",
                fontSize: "16px",
              }}
            >
              Login
            </Button>
          </Form>

          <p
            className="text-center mt-3"
            style={{ fontSize: "14px", color: "#555" }}
          >
            Don't have an account?{" "}
            <span
              style={{
                color: "#6b015dff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
