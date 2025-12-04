import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import departmentsData from "../data/departments.json";

export default function DepartmentDetails() {
  const { id } = useParams();
  const [dept, setDept] = useState(null);

  useEffect(() => {
    const found = departmentsData.find((d) => d.id === id);
    setDept(found || null);
  }, [id]);

  if (!dept)
    return (
      <div>
        <h3>Department not found</h3>
        <p>
          Try going back to <Link to="/departments">Departments</Link>.
        </p>
      </div>
    );

  return (
    <div>
      <h2>{dept.name}</h2>
      <p className="text-muted">{dept.description}</p>
      <section className="mb-3">
        <h5>About the Department</h5>
        <p>{dept.fullDescription}</p>
      </section>

      <section className="mb-3">
        <h5>Courses Offered</h5>
        <ul>
          {dept.courses.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="mb-3">
        <h5>Faculty</h5>
        <ul>
          {dept.faculty.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>

      <section>
        <h5>Labs & Facilities</h5>
        <ul>
          {dept.labs.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </section>

      <div className="mt-3">
        <Link to="/departments" className="btn btn-outline-secondary">
          Back to Departments
        </Link>
      </div>
    </div>
  );
}
