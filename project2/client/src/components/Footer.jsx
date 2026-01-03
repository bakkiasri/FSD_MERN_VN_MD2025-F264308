import { FaFacebookF, FaLinkedinIn, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "	#BF40BF", color: "#ffffff" }}
      className="pt-4 pb-3 mt-auto"
    >
      <div className="container">
        <div className="row">
          {/* Brand & Address */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold text-white">
              Doctor<span style={{ color: "	#610061ff" }}>Here</span>
            </h5>
            <p className="mb-2 text-light">
              Smart Healthcare Appointment Platform
            </p>
            <p className="small text-light">
              <FaMapMarkerAlt className="me-2" />
              Chennai, Tamil Nadu, India
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold text-white">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-decoration-none text-light">
                  Home
                </a>
              </li>
              <li>
                <a href="/login" className="text-decoration-none text-light">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-decoration-none text-light">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-semibold text-white">Connect With Us</h6>
            <div className="d-flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "#9d7de8",
                  color: "#ffffff",
                }}
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="d-flex align-items-center justify-content-center rounded-circle"
                style={{
                  width: "38px",
                  height: "38px",
                  backgroundColor: "#9d7de8",
                  color: "#ffffff",
                }}
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <hr style={{ borderColor: "#bfa9ff" }} />

        <div className="text-center small text-light">
          © 2025 MediBook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
