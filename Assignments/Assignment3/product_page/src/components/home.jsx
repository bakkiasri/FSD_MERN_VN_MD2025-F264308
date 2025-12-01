import React from "react";
import { Link } from "react-router-dom";
// ✅ Added Navbar import
import { Container, Row, Col, Button } from "react-bootstrap";

function Home() {
  // Online images
  const heroImage =
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80";
  const stockImage =
    "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="">
      {/* Navbar */}

      {/* Hero Section */}
      <div
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 20px",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">
                Advanced ESD Monitoring for a Safer, Smarter, Static-Free
                Environment
              </h1>

              <p className="lead mb-4">
                Real-time monitoring for wrist straps, workstations, and
                grounding systems to prevent ESD events and ensure compliance
                with global standards.
              </p>

              <Link to="/about">
                <Button
                  variant="outline-primary"
                  className="px-4 py-2"
                  style={{ cursor: "pointer" }}
                >
                  Know More
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Stock Section */}
      <div className="py-5" style={{ backgroundColor: "#F7F8FB" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="fw-semibold ps-3 mb-3">Our Stock</h2>
            </Col>

            <Col md={6}>
              <img
                src={stockImage}
                alt="Stock"
                className="img-fluid rounded shadow"
                style={{
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.transform = "scale(1.08)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;
