import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import { Badge } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons"; // Bootstrap icon
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { AuthContext } from "../../Context/AuthContext";
const Navbar = () => {
  const [menu, setMenu] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle menu visibility
  const { getTotalCartItems } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
    // Remove the animation className after it finishes (optional)
    const timer = setTimeout(() => setAnimate(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <Link to="/" className="nav-logo">
          <img
            src={logo}
            alt="OneStyle Logo"
            className={`logo ${animate ? "zoom-in-out" : ""}`}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              className="nav-item text-dark"
              onClick={() => setMenu("product")}
            >
              <Link
                to="/product"
                tabIndex="-1"
                aria-disabled="true"
                className={`nav-link text-dark text-decoration-none underline-anim ${
                  menu === "product" ? "line" : ""
                }`}
              >
                PRODUCTS
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className={`nav-link dropdown-toggle text-dark text-decoration-none underline-anim`}
              >
                CATEGORIES
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    CATEGORY 1
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    CATEGORY 2
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    CATEGORY 3
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link
                href="/new-arrival"
                tabIndex="-1"
                aria-disabled="true"
                className={` nav-link text-dark text-decoration-none underline-anim ${
                  menu === "new" ? "line" : ""
                }`}
              >
                <div
                  className="position-relative d-inline-block"
                  onClick={() => setMenu("new")}
                >
                  NEW ARRIVAL
                  <Badge
                    bg="success"
                    className="position-absolute top-0  start-100 translate-middle naab-green-bg"
                  >
                    NEW
                  </Badge>
                </div>
              </Link>
            </li>
            <li className="nav-item" onClick={() => setMenu("naab")}>
              <Link
                href="/about"
                tabIndex="-1"
                aria-disabled="true"
                className={`nav-link text-dark text-decoration-none underline-anim ${
                  menu === "naab" ? "line" : ""
                }`}
              >
                NAAB ORGANICA
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <div className="nav-login-cart">
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/login">
                  <button
                    type="button"
                    className="btn naab-green-outline border-2"
                    style={{ width: "120px" }}
                  >
                    Login
                  </button>
                </Link>
              )}
              <Link to="/cart" className="text-reset text-decoration-none">
                <div className="position-relative d-inline-block">
                  <Cart size={32} />

                  {/* Badge */}
                  <Badge
                    pill
                    className="position-absolute top-0 start-100 translate-middle naab-green-bg"
                  >
                    {getTotalCartItems()}
                  </Badge>
                </div>
              </Link>
              <div className="avatar naab-green-bg">H</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
