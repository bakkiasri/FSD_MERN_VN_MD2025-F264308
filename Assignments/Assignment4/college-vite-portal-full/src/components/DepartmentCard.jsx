import React from "react";
import { Link } from "react-router-dom";

export default function DepartmentCard({ dept }) {
  return (
    <div className=" h-100 shadow-lg bg-white p-4 rounded-5  ">
      <div className="card-body d-flex p-4 flex-column">
        <h5 className="card-title">{dept.name}</h5>
        <p className="card-text text-muted">{dept.description}</p>
        <div className="mt-auto">
          <Link to={`/departments/${dept.id}`} className="btn btn-primary">
            View More
          </Link>
        </div>
      </div>
    </div>
  );
}
