import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container, Form, Button, Badge } from "react-bootstrap";
import { BsCart3, BsPersonCircle } from "react-icons/bs";
import { FcSearch } from "react-icons/fc";
import { ImCancelCircle } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";
import axios from "axios";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const usertype = localStorage.getItem("userType");
  const username = localStorage.getItem("username");

  const { cartCount, logout } = useContext(GeneralContext);

  const [productSearch, setProductSearch] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6001/api/products/fetch-categories")
      .then((res) => setCategories(res.data));
  }, []);

  const handleSearch = () => {
    if (categories.includes(productSearch)) {
      navigate(`/category/${productSearch}`);
    } else {
      setNoResult(true);
    }
  };

  /* ---------------- GUEST USER ---------------- */
  if (!usertype) {
    return (
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand
            role="button"
            onClick={() => navigate("/")}
            className="fw-bold"
          >
            Orangio
          </Navbar.Brand>

          <Form className="d-flex mx-auto w-50">
            <Form.Control
              type="search"
              placeholder="Search Electronics, mobiles, etc."
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleSearch}>
              <FcSearch />
            </Button>
          </Form>

          <Button onClick={() => navigate("/auth")}>Login</Button>
        </Container>

        {noResult && (
          <div className="text-center text-danger mt-2">
            No items found
            <ImCancelCircle
              role="button"
              className="ms-2"
              onClick={() => setNoResult(false)}
            />
          </div>
        )}
      </Navbar>
    );
  }

  /* ---------------- CUSTOMER ---------------- */
  if (usertype === "customer") {
    return (
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand
            role="button"
            onClick={() => navigate("/")}
            className="fw-bold"
          >
            Orangio
          </Navbar.Brand>

          <Form className="d-flex mx-auto w-50">
            <Form.Control
              type="search"
              placeholder="Search products"
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleSearch}>
              <FcSearch />
            </Button>
          </Form>

          <Nav className="align-items-center gap-4">
            <Nav.Link onClick={() => navigate("/profile")}>
              <BsPersonCircle size={22} /> {username}
            </Nav.Link>

            <Nav.Link
              onClick={() => navigate("/cart")}
              className="position-relative"
            >
              <BsCart3 size={22} />
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100"
              >
                {cartCount}
              </Badge>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }

  /* ---------------- ADMIN ---------------- */
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand role="button" onClick={() => navigate("/admin")}>
          Orangio (Admin)
        </Navbar.Brand>

        <Nav className="ms-auto gap-3">
          <Nav.Link onClick={() => navigate("/admin")}>Home</Nav.Link>
          <Nav.Link onClick={() => navigate("/all-users")}>Users</Nav.Link>
          <Nav.Link onClick={() => navigate("/all-orders")}>Orders</Nav.Link>
          <Nav.Link onClick={() => navigate("/all-products")}>
            Products
          </Nav.Link>
          <Nav.Link onClick={() => navigate("/new-product")}>
            New Product
          </Nav.Link>
          <Nav.Link onClick={logout} className="text-danger">
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
