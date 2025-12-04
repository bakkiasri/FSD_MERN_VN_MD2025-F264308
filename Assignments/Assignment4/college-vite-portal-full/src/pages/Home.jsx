import React, { useEffect, useState } from "react";
import DepartmentCard from "../components/DepartmentCard";
import departmentsData from "../data/departments.json";
import { Link } from "react-router-dom";
import banner from "../assets/vijay.webp";
import "../styles/home.css";
export default function Home() {
  const [top, setTop] = useState([]);

  useEffect(() => {
    setTop(departmentsData.slice(0, 3));
  }, []);

  return (
    <div className="container mt-5">
      {/* HERO SECTION */}
      <section className="hero-section p-5 rounded-4 shadow-lg mb-5">
        <div className="row align-items-center">
          <div className="col-md-7">
            <h1 className="display-5 fw-bold mb-3">
              Welcome to <span className="text-primary">Fatima College</span>
            </h1>
            <p className="lead text-dark">
              Shaping leaders through quality education & innovation. Experience
              excellence, diversity and growth.
            </p>

            <div className="mt-4">
              <Link to="/departments" className="btn btn-primary btn-lg me-3">
                Explore Departments
              </Link>
              <Link to="/about" className="btn btn-outline-primary btn-lg">
                About Us
              </Link>
            </div>
          </div>

          <div className="col-md-5 text-center">
            <img
              src={banner}
              alt="banner"
              className="img-fluid rounded-4 hero-img shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* WHY THIS COLLEGE */}
      <section className="mb-5">
        <h3 className="fw-bold mb-3 text-uppercase text-primary">
          Why This College?
        </h3>
        <p className="text-secondary fs-5">
          We blend academic rigour with real-world exposure, industry
          internships and strong faculty mentorship to build future innovators.
        </p>
      </section>

      {/* TOP DEPARTMENTS */}
      <section className="mb-5">
        <h3 className="fw-bold mb-4  text-primary">Top Departments</h3>

        <div className="row g-4">
          {top.map((dept) => (
            <div className="col-md-4 " key={dept.id}>
              <DepartmentCard dept={dept} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
