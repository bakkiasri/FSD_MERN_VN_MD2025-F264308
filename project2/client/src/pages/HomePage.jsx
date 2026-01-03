import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import api from "../api/axios";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async (query = "") => {
    try {
      setLoading(true);
      const url = query ? `/doctors?search=${query}` : "/doctors";
      const res = await api.get(url);
      setDoctors(res.data);
    } catch (error) {
      console.error("Fetch doctors error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchDoctors(search);
  };

  return (
    <div
      style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#f5f7fb" }}
    >
      {/* HERO */}
      <section
        className="text-center mb-5 p-4 m-5 rounded-3 text-white"
        style={{
          background:
            "linear-gradient(135deg, #f065ebff, #530851ff, #ff68f2ff)",
          color: "#fff",
        }}
      >
        <h1>Your Health, Our Priority</h1>
        <p>Search by doctor name or specialization</p>

        <div className="d-flex justify-content-center gap-2 mt-3">
          <Form.Control
            type="text"
            placeholder="e.g. Cardiology, John"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: "250px", borderRadius: "6px" }}
          />
          <Button
            className="border-0"
            style={{ backgroundColor: "#6b015dff" }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </section>

      {/* DOCTORS */}
      <section className="py-5">
        <Container>
          <h2
            className="text-center mb-5"
            style={{ color: "#6b015dff", fontSize: "32px" }}
          >
            Available Doctors
          </h2>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : doctors.length === 0 ? (
            <p className="text-center">No doctors found</p>
          ) : (
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {doctors.map((doc) => (
                <Col key={doc._id}>
                  <Card
                    className="text-center shadow-sm h-100"
                    style={{
                      borderRadius: "12px",
                      padding: "25px",
                      transition: "all 0.3s ease",
                      backgroundColor: "#fff",
                      border: "1px solid #fff",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#ffd0f9ff";
                      e.currentTarget.style.border = "1px solid #55004aff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#fff";
                      e.currentTarget.style.border = "1px solid #fff";
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        doc.image
                          ? `http://localhost:5000${doc.image}`
                          : "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                      }
                      alt={doc.name}
                      style={{
                        width: "110px",
                        height: "110px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        margin: "0 auto 15px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title style={{ color: "#6b015dff" }}>
                        {doc.name}
                      </Card.Title>
                      <Card.Text
                        style={{ color: "#6b015dff", marginBottom: "15px" }}
                      >
                        {doc.specialization}
                      </Card.Text>
                      <Link
                        to={`/doctor/${doc._id}`}
                        className="border-0 btn text-white"
                        style={{ backgroundColor: "#6b015dff" }}
                      >
                        View Profile
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* FOOTER */}
      <footer
        className="text-center py-3"
        style={{ backgroundColor: "#111827", color: "#d1d5db" }}
      >
        <p>© 2025 MediBook. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
