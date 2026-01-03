import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import api from "../api/axios";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/doctor");
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (err) {
      alert("Failed to update appointment");
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
        className="text-center mb-5 text-white"
        style={{
          background: "linear-gradient(135deg, #6b015dff, #ff68f2ff)",
          padding: "30px",
          borderRadius: "12px",
        }}
      >
        <Card.Title style={{ fontSize: "28px" }}>Doctor Dashboard</Card.Title>
        <Card.Text style={{ color: "#e0d4f7" }}>
          Your scheduled patient appointments
        </Card.Text>
      </Card>

      {/* APPOINTMENTS */}
      {appointments.length === 0 ? (
        <p className="text-center text-muted">No appointments available</p>
      ) : (
        <Row xs={1} md={2} lg={2} className="g-4">
          {appointments.map((app) => (
            <Col key={app._id}>
              <Card
                className="d-flex flex-row align-items-center p-3 shadow-sm"
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
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  roundedCircle
                  width={70}
                  height={70}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <h5 style={{ color: "#6b015dff" }}>
                    {app.patient?.name || "Patient"}
                  </h5>
                  <p className="mb-1" style={{ color: "#374151" }}>
                    <strong>Date:</strong> {app.date}
                  </p>
                  <p className="mb-0">
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color:
                          app.status === "approved"
                            ? "#16a34a"
                            : app.status === "cancelled"
                            ? "#dc2626"
                            : "#eab308",
                        fontWeight: "500",
                      }}
                    >
                      {app.status || "pending"}
                    </span>
                  </p>
                </div>
                {app.status === "pending" && (
                  <div className="d-flex flex-column gap-2 ms-3">
                    <Button
                      onClick={() => updateStatus(app._id, "approved")}
                      className="border-0"
                      style={{ backgroundColor: "#6b015dff" }}
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => updateStatus(app._id, "cancelled")}
                      className="border-0"
                      style={{ backgroundColor: "#dc2626" }}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default DoctorDashboard;
