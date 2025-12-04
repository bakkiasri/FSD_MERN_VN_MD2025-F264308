import React, { useEffect, useState } from "react";
import DepartmentCard from "../components/DepartmentCard";
import departmentsData from "../data/departments.json";

export default function Departments() {
  const [depts, setDepts] = useState([]);
  useEffect(() => {
    setDepts(departmentsData);
  }, []);

  return (
    <div>
      <h2>Departments</h2>
      <div className="row g-3">
        {depts.map((d) => (
          <div className="col-md-4" key={d.id}>
            <DepartmentCard dept={d} />
          </div>
        ))}
      </div>
    </div>
  );
}
