import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function About() {
  return (
    <div style={{ backgroundColor: "#F7F8FB", minHeight: "100vh" }}>
      {/* About Header */}
      <div
        className="text-white d-flex align-items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 20px",
        }}
      >
        <Container>
          <h1 className="display-4 fw-bold">About Us</h1>
          <p className="lead">
            Creating safer ESD-free environments through advanced monitoring
            solutions.
          </p>
        </Container>
      </div>

      {/* About Content */}
      <Container className="py-5">
        <Row className="mb-5">
          <Col md={6}>
            <h2 className="fw-semibold mb-3">Who We Are</h2>
            <p className="text-muted" style={{ lineHeight: "1.8" }}>
              We specialize in designing and developing high-precision ESD
              monitoring systems that protect sensitive electronic components
              from electrostatic discharge events. Our solutions ensure
              real-time monitoring for wrist straps, workstations, and grounding
              systems to maintain global safety compliance.
            </p>
          </Col>

          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80"
              alt="About"
              className="img-fluid rounded shadow w-75"
            />
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6}>
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              alt="Our Vision"
              className="img-fluid rounded shadow"
            />
          </Col>

          <Col md={6}>
            <h2 className="fw-semibold mb-3">Our Vision</h2>
            <p className="text-muted" style={{ lineHeight: "1.8" }}>
              Our goal is to build safer, smarter, static-free environments
              where precision and quality meet innovation. We aim to simplify
              ESD compliance for industries while delivering reliability and
              trust.
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="text-center">
            <h3 className="fw-semibold">Why Choose Us?</h3>
            <p className="text-muted mt-3">
              ✔ Real-time monitoring & alerts
              <br />✔ High-accuracy sensors
              <br />✔ Global standards compliance
              <br />✔ Trusted by electronics manufacturing industries
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
