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
    // Remove the animation class after it finishes (optional)
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
    <nav class="navbar navbar-expand-lg navbar-light ">
      <div class="container-fluid">
        <Link to="/" className="nav-logo">
          <img
            src={logo}
            alt="OneStyle Logo"
            className={`logo ${animate ? "zoom-in-out" : ""}`}
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item text-dark" onClick={() => setMenu("product")}>
              <Link
                class="nav-link"
                to="/product"
                tabindex="-1"
                aria-disabled="true"
                className={`text-dark text-decoration-none underline-anim ${
                  menu === "product" ? "line" : ""
                }`}
              >
                PRODUCTS
              </Link>
            </li>
            <li class="nav-item dropdown">
              <Link
                class="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className={`text-dark text-decoration-none underline-anim`}
              >
                CATEGORIES
              </Link>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a class="dropdown-item" href="#">
                    CATEGORY 1
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    CATEGORY 2
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    CATEGORY 3
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link"
                href="/new-arrival"
                tabindex="-1"
                aria-disabled="true"
                className={`text-dark text-decoration-none underline-anim ${
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
            <li class="nav-item" onClick={() => setMenu("naab")}>
              <Link
                class="nav-link"
                href="/about"
                tabindex="-1"
                aria-disabled="true"
                className={`text-dark text-decoration-none underline-anim ${
                  menu === "naab" ? "line" : ""
                }`}
              >
                NAAB ORGANICA
              </Link>
            </li>
          </ul>
          <div class="d-flex">
            <div className="nav-login-cart">
              {user ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <Link to="/login">
                  <button
                    type="button"
                    class="btn naab-green-outline border-2"
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
