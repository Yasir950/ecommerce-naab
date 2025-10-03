import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom"; // to redirect
import "./Css/LoginSignup.css";
import { toast } from "react-toastify";
import { userLogin } from "../../apiservices";

const LoginForm = () => {
  const navigate = useNavigate(); // to redirect to homepage

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await userLogin(values);
        if (res?.user?._id) {
          console.log(res);
          toast.success("Sign In successfully");
          navigate("/");
          localStorage.setItem("user", JSON.stringify(res.user));
        }
        // you can add success logic here, e.g. toast.success("Saved!");
      } catch (error) {
        console.error("Error saving user data:", error);
        // you can add error handling here, e.g. toast.error("Failed to save!");
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
