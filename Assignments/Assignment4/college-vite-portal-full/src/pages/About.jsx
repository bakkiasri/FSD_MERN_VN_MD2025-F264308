import React from "react";

// Hero image link (You can replace this with your image URL)
const heroBG =
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1567&q=80";

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="  p-2  d-flex align-items-center w-100 rounded-5 mt-0"
        style={{
          backgroundImage: `url(${heroBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "50vh",
          width: "100vh",
        }}
      >
        <div className=" text-black ">
          <h1 className="display-5 fw-bold">About Fatima College</h1>
          <p className="lead">
            Inspiring innovation, empowering students for a better tomorrow.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container my-5">
        {/* History */}
        <section className="mb-4">
          <h3 className="fw-bold mb-2">History</h3>
          <p className="text-secondary">
            Founded in 1990, XYZ College has grown from a small institution to a
            recognized center of excellence in engineering and management
            education.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="mb-4">
          <h3 className="fw-bold mb-2">Mission & Vision</h3>
          <ul className="text-secondary">
            <li>To provide high-quality education.</li>
            <li>To foster research and innovation.</li>
            <li>To prepare students for global challenges.</li>
          </ul>
        </section>

        {/* Achievements */}
        <section>
          <h3 className="fw-bold mb-4">Achievements</h3>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="fw-bold">🏅 Accredited</h5>
                  <p className="text-secondary m-0">
                    National accreditation 2022
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="fw-bold">💼 Placements</h5>
                  <p className="text-secondary m-0">
                    80% average placement in top companies
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="fw-bold">🔬 Research</h5>
                  <p className="text-secondary m-0">
                    Multiple funded projects in AI & Robotics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
