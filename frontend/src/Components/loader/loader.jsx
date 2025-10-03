import React from "react";
import logo from "../Assets/logo.png";
import "./loader.css";
export function Loader() {
  return (
    <div className="image">
      <img src={logo} alt="OneStyle Logo" className={`logo zoom-in-out`} />
    </div>
  );
}

export default Loader;
