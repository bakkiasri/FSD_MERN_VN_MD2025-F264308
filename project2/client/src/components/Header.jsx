import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top"
      style={{ backgroundColor: "	#BF40BF", color: "#ffffff" }}
    >
      <div className="container">
        {/* Logo */}
        <span
          className="navbar-brand text-white fw-bold fs-4"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Doctor<span style={{ color: "	#610061ff" }}>Here</span>
        </span>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse text-white navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
            <li className="nav-item">
              <Link className="nav-link text-white fw-medium" to="/">
                Home
              </Link>
            </li>

            {!token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-medium" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn text-white px-4"
                    style={{ backgroundColor: "#0000009a" }}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  style={{ backgroundColor: "#6b015dff" }}
                  className="btn border-0 text-white px-4"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
