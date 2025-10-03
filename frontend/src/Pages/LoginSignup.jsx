import React, { useEffect, useState } from "react";
import LoginForm from "../Components/LoginSignup/LoginForm";
import SignupForm from "../Components/LoginSignup/SignupForm";
import logo from "../Components/Assets/login-logo.png";
const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    setAnimate(true);
    console.log(isLogin);
    // Remove the animation class after it finishes (optional)
    const timer = setTimeout(() => setAnimate(false), 1200);
    return () => clearTimeout(timer);
  }, [isLogin]);
  return (
    <div className="loginsignup">
      <div
        className="loginsignup-container"
        style={{ maxWidth: isLogin ? "400px" : "600px" }}
      >
        <div className="text-center">
          <img
            src={logo}
            width={"100px"}
            alt="OneStyle Logo"
            className={`logo ${animate ? "zoom-in-out" : ""}`}
          />
        </div>
        <p className="text-center h1 m-3">{isLogin ? "Sign In" : "Sign Up"}</p>
        {isLogin ? (
          <LoginForm />
        ) : (
          <SignupForm goToLogin={() => setIsLogin(true)} />
        )}
        <p className="loginsignup-switch">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
