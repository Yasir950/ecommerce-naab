import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import { Badge, Dropdown } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons"; // Bootstrap icon
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { AuthContext } from "../../Context/AuthContext";
import { getData } from "../../apiservices";
const Navbar = () => {
  const [menu, setMenu] = useState("");
  const { getTotalCartItems } = useContext(ShopContext);
  const [animate, setAnimate] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [cats, setCats] = useState([]);

  const getCats = async () => {
    let res = await getData("categories");
    setCats(res);
  };
  useEffect(() => {
    // Trigger animation when component mounts
    getCats();
    setAnimate(true);
    // Remove the animation className after it finishes (optional)
    const timer = setTimeout(() => setAnimate(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light "
      style={{ paddingTop: "0px", paddingBottom: "0px" }}
    >
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
                className={`nav-link dropdown-toggle text-dark text-decoration-none `}
              >
                CATEGORIES
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {cats.map((item) => (
                  <Link
                    to={`/product/${item._id} `}
                    className="nav-logo text-decoration-none"
                    key={item._id}
                  >
                    <li className=" text-black-50">{item.name}</li>
                  </Link>
                ))}
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
              {!userData?._id && (
                <Link to="/login">
                  <button
                    type="button"
                    className="btn naab-green-outline border-2"
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
              {userData && (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="div"
                    id="avatarDropdown"
                    className="p-0"
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="avatar naab-green-bg d-inline-flex align-items-center justify-content-center"
                      style={{ width: 40, height: 40, borderRadius: "50%" }}
                    >
                      {userData.first?.charAt(0).toUpperCase()}
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate("/orders")}>
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Item
                    // onClick={() => navigate("/profile")}
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
