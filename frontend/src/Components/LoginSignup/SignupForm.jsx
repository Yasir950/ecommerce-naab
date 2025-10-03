import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom"; // for redirection
import "./Css/LoginSignup.css";
import { saveUserData } from "../../apiservices";
import { toast } from "react-toastify";

const SignupForm = ({ goToLogin }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate(); // to redirect to login page

  const formik = useFormik({
    initialValues: {
      first: "",
      last: "",
      contact: "",
      address: "",
      email: "",
      password: "",
      country: "",
    },
    validationSchema: Yup.object({
      first: Yup.string().required("Required"),
      last: Yup.string(),
      contact: Yup.string(),
      address: Yup.string(),
      country: Yup.string(),
      city: Yup.string(),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await saveUserData("users", values);
        if (res._id) {
          goToLogin();
          toast.success("Sign up successfully");
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
        <div className="group">
          <div class="mb-3 group-input">
            <label for="exampleFormControlInput1" class="form-label">
              First Name
            </label>
            <input
              type="text"
              name="first"
              class="form-control "
              placeholder="First Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first}
            />
          </div>
          {formik.touched.first && formik.errors.first && (
            <div classfirst="error">{formik.errors.first}</div>
          )}
          <div class="mb-3 group-input">
            <label for="exampleFormControlInput1" class="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="last"
              class="form-control"
              placeholder="Last Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last}
            />
          </div>
          {formik.touched.last && formik.errors.last && (
            <div classlast="error">{formik.errors.last}</div>
          )}
        </div>
        <div className="group">
          <div class="mb-3 group-input">
            <label for="exampleFormControlInput1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              class="form-control"
              placeholder="Email Address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
          <div class="mb-3 group-input">
            <label for="exampleFormControlInput1" class="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              class="form-control"
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
        <div className="group">
          <div class="mb-3 group-input">
            <label for="exampleFormControlInput1" class="form-label">
              Country
            </label>
            <input
              type="text"
              name="country"
              class="form-control"
              placeholder="Country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
            />
          </div>
          <div class="mb-3 group-input">
            <label for="exampleFormControlInput1" class="form-label">
              Contact Number
            </label>
            <input
              type="number"
              name="contact"
              class="form-control"
              placeholder="Contact Number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contact}
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            City
          </label>
          <input
            class="form-control"
            id="exampleFormControlTextarea1"
            name="city"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
          ></input>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">
            Address
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button
          className="btn btn-outline-success btn-sm  mt-4"
          style={{ width: "180px" }}
          type="submit"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
