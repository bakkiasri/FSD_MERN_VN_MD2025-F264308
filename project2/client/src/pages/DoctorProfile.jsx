import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Image,
} from "react-bootstrap";
import api from "../api/axios";

const DoctorProfile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await api.get(`/doctors/${id}`);
        setDoctor(res.data);
      } catch (error) {
        console.error("Fetch doctor error:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  const submitReview = async () => {
    try {
      await api.post(`/doctors/${id}/review`, { rating, comment });
      alert("Review submitted successfully");
      setRating(5);
      setComment("");
      const res = await api.get(`/doctors/${id}`);
      setDoctor(res.data);
    } catch (error) {
      console.error("Submit review error:", error);
      alert(error.response?.data?.message || "Failed to submit review");
    }
  };

  if (!doctor) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  const avgRating =
    doctor.reviews && doctor.reviews.length > 0
      ? (
          doctor.reviews.reduce((sum, r) => sum + r.rating, 0) /
          doctor.reviews.length
        ).toFixed(1)
      : "No ratings yet";

  return (
    <Container className="py-5">
      {/* ================= PROFILE CARD ================= */}
      <Card
        className="mx-auto mb-5 shadow-lg"
        style={{ maxWidth: "600px", borderRadius: "16px" }}
      >
        <Card.Body className="text-center">
          <Image
            src={
              doctor.image
                ? `http://localhost:5000${doctor.image}`
                : "https://cdn-icons-png.flaticon.com/512/387/387561.png"
            }
            roundedCircle
            width={140}
            height={140}
            className="mb-3"
          />
          <Card.Title style={{ color: "#6b015dff", fontSize: "28px" }}>
            {doctor.name}
          </Card.Title>
          <Card.Text style={{ color: "#6b7280", marginBottom: "10px" }}>
            {doctor.specialization}
          </Card.Text>
          <div style={{ margin: "10px 0", fontSize: "18px" }}>
            ⭐ <b>{avgRating}</b>
          </div>
          {doctor.about && (
            <Card.Text style={{ color: "#374151", lineHeight: 1.6 }}>
              {doctor.about}
            </Card.Text>
          )}
        </Card.Body>
      </Card>

      {/* ================= REVIEWS ================= */}
      <section className="mb-5 text-center">
        <h3 className="mb-4" style={{ color: "#6b015dff" }}>
          Patient Reviews
        </h3>
        {doctor.reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          <Row xs={1} className="g-3">
            {doctor.reviews.map((r, index) => (
              <Col key={index}>
                <Card
                  className="p-3 shadow-sm"
                  style={{ borderRadius: "10px" }}
                >
                  <Card.Title>{r.patient?.name || "Patient"}</Card.Title>
                  <Card.Text>⭐ {r.rating}</Card.Text>
                  <Card.Text>{r.comment}</Card.Text>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>

      {/* ================= ADD REVIEW ================= */}
      <section className="mb-5 text-center">
        <h3 className="mb-4" style={{ color: "#6b015dff" }}>
          Add Your Review
        </h3>
        <Card
          className="p-4 shadow-lg"
          style={{ borderRadius: "14px", maxWidth: "600px", margin: "0 auto" }}
        >
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Share your experience"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>

            <Button
              onClick={submitReview}
              className="border-0"
              style={{ backgroundColor: "#6b015dff" }}
            >
              Submit Review
            </Button>
          </Form>
        </Card>
      </section>
    </Container>
  );
};

export default DoctorProfile;
