import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Image } from "react-bootstrap";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    specialization: "",
    about: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await api.post("/auth/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registered successfully. Please wait for admin approval.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f0f4f8" }}
    >
      <Card
        style={{ width: "400px", padding: "30px", borderRadius: "10px" }}
        className="shadow-sm"
      >
        <Card.Body className="text-center">
          <Card.Title
            className="text-center mb-4"
            style={{ color: "#6b015dff", fontSize: "28px" }}
          >
            Register
          </Card.Title>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="hover:bg-white"
              >
                <option value="patient" className="hover:bg-white">
                  Patient
                </option>
                <option value="doctor">Doctor</option>
              </Form.Select>
            </Form.Group>

            {formData.role === "doctor" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    name="about"
                    rows={3}
                    placeholder="About yourself"
                    value={formData.about}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Button
              type="submit"
              className="w-100"
              style={{
                backgroundColor: "#6b015dff",
                border: "none",
                fontSize: "16px",
              }}
            >
              Register
            </Button>
          </Form>

          <p className="mt-3" style={{ fontSize: "14px", color: "#555" }}>
            Already have an account?{" "}
            <span
              style={{
                color: "#6b015dff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;
