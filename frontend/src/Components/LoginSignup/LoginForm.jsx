import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom"; // to redirect
import "./Css/LoginSignup.css";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // to redirect to homepage
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === values.email &&
        storedUser.password === values.password
      ) {
        login(storedUser); // Set user in context
        alert("Login successful!");
        navigate("/"); // Redirect to homepage after successful login
      } else {
        setError("Invalid email or password!");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}
        <div class="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            name="password"
            id="password"
            placeholder="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="error">{formik.errors.password}</div>
        )}
      </div>
      {error && <div className="error">{error}</div>}
      <div class="d-flex justify-content-center">
        <button
          className="btn btn-outline-success btn-sm mt-3"
          type="submit"
          style={{ width: "180px" }}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
