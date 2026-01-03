import { useEffect, useState } from "react";
import api from "../api/axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
} from "react-bootstrap";

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [hoveredDoctorId, setHoveredDoctorId] = useState(null);
  const [hoveredAppId, setHoveredAppId] = useState(null);

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Fetch doctors error:", err);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments/patient");
      setAppointments(res.data);
    } catch (err) {
      console.error("Fetch appointments error:", err);
    }
  };

  const bookAppointment = async () => {
    if (!date || !selectedDoctor) {
      alert("Select doctor and date");
      return;
    }

    try {
      await api.post("/appointments", {
        doctorId: selectedDoctor._id,
        date,
      });
      alert("Appointment booked");
      setSelectedDoctor(null);
      setDate("");
      fetchAppointments();
    } catch (err) {
      alert("Failed to book appointment");
    }
  };

  // Styles
  const getDoctorCardStyle = (id) => ({
    backgroundColor: hoveredDoctorId === id ? "#ffd0f9ff" : "#ffffff",
    border: `1px solid ${hoveredDoctorId === id ? "#ff1ef4ff" : "#ffffff"}`,
    transition: "all 0.3s ease",
  });

  const getAppointmentCardStyle = (id) => ({
    backgroundColor: hoveredAppId === id ? "#ffd0f9ff" : "#ffffff",
    border: `1px solid ${hoveredAppId === id ? "#ff1ef4ff" : "#ffffff"}`,
    transition: "all 0.3s ease",
  });

  return (
    <Container className="py-4">
      {/* HEADER */}
      <div
        className="text-center mb-5 p-4 rounded-3 text-white"
        style={{ background: "linear-gradient(135deg, #ff1ef4ff, #ff68f2ff)" }}
      >
        <h1>Patient Dashboard</h1>
        <p>Book appointments with trusted doctors</p>
      </div>

      {/* DOCTORS */}
      <section className="mb-5" style={{ color: "#6b015dff" }}>
        <h2 className="mb-4">Available Doctors</h2>
        {doctors.length === 0 ? (
          <p>No doctors available</p>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {doctors.map((doc) => (
              <Col key={doc._id}>
                <Card
                  className="text-center rounded-3 shadow-lg h-100"
                  style={getDoctorCardStyle(doc._id)}
                  onMouseEnter={() => setHoveredDoctorId(doc._id)}
                  onMouseLeave={() => setHoveredDoctorId(null)}
                >
                  <Card.Body>
                    <Image
                      src={
                        doc.image
                          ? `http://localhost:5000${doc.image}`
                          : "https://cdn-icons-png.flaticon.com/512/387/387561.png"
                      }
                      roundedCircle
                      width={110}
                      height={110}
                      className="mb-3"
                    />
                    <Card.Title style={{ color: "#6b015dff" }}>
                      {doc.name}
                    </Card.Title>
                    <Card.Text
                      className="text-muted"
                      style={{ color: "#6b015dff" }}
                    >
                      {doc.specialization}
                    </Card.Text>
                    <Button
                      className="border-0"
                      style={{ backgroundColor: "#6b015dff" }}
                      onClick={() => setSelectedDoctor(doc)}
                    >
                      Book Appointment
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>

      {/* BOOKING PANEL */}
      {selectedDoctor && (
        <section className="mb-5">
          <Card className="mx-auto p-4 shadow-sm" style={{ maxWidth: "450px" }}>
            <Card.Body className="text-center">
              <Card.Title>
                Booking with{" "}
                <span className="fw-bold" style={{ color: "#6b015dff" }}>
                  {selectedDoctor.name}
                </span>
              </Card.Title>
              <Form.Group className="my-3">
                <Form.Control
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex gap-3 justify-content-center mt-3">
                <Button
                  className="border-0"
                  style={{ backgroundColor: "#6b015dff" }}
                  onClick={bookAppointment}
                >
                  Confirm
                </Button>
                <Button
                  className="border-0"
                  style={{ backgroundColor: "#6b015dff" }}
                  onClick={() => setSelectedDoctor(null)}
                >
                  Cancel
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>
      )}

      {/* APPOINTMENTS */}
      <section className="mb-5">
        <h2 className="mb-4" style={{ color: "#6b015dff" }}>
          Your Appointments
        </h2>
        {appointments.length === 0 ? (
          <p style={{ color: "#6b015dff" }}>No appointments yet</p>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {appointments.map((app) => (
              <Col key={app._id}>
                <Card
                  className="shadow-lg  d-flex flex-row align-items-center p-3 h-100"
                  style={getAppointmentCardStyle(app._id)}
                  onMouseEnter={() => setHoveredAppId(app._id)}
                  onMouseLeave={() => setHoveredAppId(null)}
                >
                  <Image
                    src={
                      app.doctor?.image
                        ? `http://localhost:5000${app.doctor.image}`
                        : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    roundedCircle
                    width={70}
                    height={70}
                    className="me-3"
                  />
                  <div>
                    <Card.Title>{app.doctor?.name}</Card.Title>
                    <Card.Text className="mb-1">Date: {app.date}</Card.Text>
                    <Card.Text>
                      Status: <b>{app.status}</b>
                    </Card.Text>
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

export default PatientDashboard;
