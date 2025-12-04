import React, { useState, useEffect } from "react";
import departmentsData from "../data/departments.json";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    setDepartments(departmentsData);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      department,
      message,
      date: new Date().toISOString(),
    };
    setSubmitted(data);
    setName("");
    setEmail("");
    setDepartment("");
    setMessage("");
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-4 p-5 bg-white mt-4 rounded-4 shadow-lg"
      >
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <select
            className="form-select"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Choose...</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      {submitted && (
        <div className="card p-3">
          <h5>Submitted Details</h5>
          <p>
            <strong>Name:</strong> {submitted.name}
          </p>
          <p>
            <strong>Email:</strong> {submitted.email}
          </p>
          <p>
            <strong>Department:</strong> {submitted.department}
          </p>
          <p>
            <strong>Message:</strong> {submitted.message}
          </p>
          <p className="text-muted small">
            Submitted at: {new Date(submitted.date).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
