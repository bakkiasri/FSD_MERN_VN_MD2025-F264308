import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import api from "../api/axios";

const AdminDashboard = () => {
  const [pendingDoctors, setPendingDoctors] = useState([]);
  const [approvedDoctors, setApprovedDoctors] = useState([]);

  useEffect(() => {
    fetchPendingDoctors();
    fetchApprovedDoctors();
  }, []);

  const fetchPendingDoctors = async () => {
    try {
      const res = await api.get("/doctors/pending");
      setPendingDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApprovedDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setApprovedDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approveDoctor = async (id) => {
    try {
      await api.put(`/doctors/approve/${id}`);
      fetchPendingDoctors();
      fetchApprovedDoctors();
    } catch (err) {
      alert("Failed to approve doctor");
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure you want to remove this doctor?")) return;

    try {
      await api.delete(`/doctors/delete/${id}`);
      fetchPendingDoctors();
      fetchApprovedDoctors();
    } catch (err) {
      alert("Failed to remove doctor");
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#f5f7fb",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      {/* HEADER */}
      <Card
        className="text-center text-white mb-5"
        style={{
          background: "linear-gradient(135deg, #6b015dff, #ff68f2ff)",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <Card.Title style={{ fontSize: "28px" }}>Admin Dashboard</Card.Title>
        <Card.Text style={{ color: "#e0d4f7" }}>
          Manage doctor registrations
        </Card.Text>
      </Card>

      {/* PENDING DOCTORS */}
      <section className="mb-5">
        <h3 style={{ color: "#6b015dff", marginBottom: "20px" }}>
          Pending Approvals
        </h3>
        {pendingDoctors.length === 0 ? (
          <p className="text-center text-muted">No pending doctors</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {pendingDoctors.map((doc) => (
              <Col key={doc._id}>
                <Card
                  className="p-3 shadow-sm"
                  style={{ borderRadius: "14px", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffd0f9ff";
                    e.currentTarget.style.border = "1px solid #6b015dff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.border = "1px solid #fff";
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <Image
                      src={
                        doc.image
                          ? `http://localhost:5000${doc.image}`
                          : "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                      }
                      roundedCircle
                      width={70}
                      height={70}
                    />
                    <div className="flex-grow-1">
                      <h5 style={{ color: "#6b015dff" }}>{doc.name}</h5>
                      <p className="mb-0" style={{ color: "#374151" }}>
                        {doc.specialization}
                      </p>
                    </div>
                    <Button
                      className="border-0"
                      style={{ backgroundColor: "#6b015dff" }}
                      onClick={() => approveDoctor(doc._id)}
                    >
                      Approve
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>

      {/* APPROVED DOCTORS */}
      <section>
        <h3 style={{ color: "#6b015dff", marginBottom: "20px" }}>
          Approved Doctors
        </h3>
        {approvedDoctors.length === 0 ? (
          <p className="text-center text-muted">No approved doctors</p>
        ) : (
          <Row xs={1} md={2} lg={3} className="g-4">
            {approvedDoctors.map((doc) => (
              <Col key={doc._id}>
                <Card
                  className="p-3 shadow-sm"
                  style={{ borderRadius: "14px", transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffd0f9ff";
                    e.currentTarget.style.border = "1px solid #6b015dff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#fff";
                    e.currentTarget.style.border = "1px solid #fff";
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <Image
                      src={
                        doc.image
                          ? `http://localhost:5000${doc.image}`
                          : "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                      }
                      roundedCircle
                      width={70}
                      height={70}
                    />
                    <div className="flex-grow-1">
                      <h5 style={{ color: "#6b015dff" }}>{doc.name}</h5>
                      <p className="mb-0" style={{ color: "#374151" }}>
                        {doc.specialization}
                      </p>
                    </div>
                    <Button
                      className="border-0"
                      style={{ backgroundColor: "#6b015dff" }}
                      onClick={() => deleteDoctor(doc._id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>
    </Container>
  );
};

export default AdminDashboard;
