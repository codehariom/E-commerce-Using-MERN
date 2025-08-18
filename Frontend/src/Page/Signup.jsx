import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/authSlice.js";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "At least one lowercase letter required")
        .matches(/[A-Z]/, "At least one uppercase letter required")
        .matches(/[0-9]/, "At least one number required")
        .matches(/[@$!%*?&]/, "At least one special character required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      setError(null);
      try {
        const { name, email, password } = values;
        await dispatch(signUpUser({ name, email, password })).unwrap();
        resetForm();
        navigate("/collection/all"); // Redirect to dashboard on success
      } catch (err) {
        setError(err || "Registration failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex min-h-screen">
      <div className="w-full flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-xl"
        >
          <div className="flex justify-center mb-4">
            <h2 className="text-xl font-medium">Style Pop</h2>
          </div>
          <h2 className="text-2xl text-center font-semibold mb-3">
            Welcome to Style Pop
          </h2>
          <p className="text-center mb-6">Create Your Account</p>
          {error && <div className="text-red-600 text-center mb-4">{error}</div>}

          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter Your Full Name"
              autoComplete="name"
              aria-describedby={
                formik.touched.name && formik.errors.name ? "name-error" : undefined
              }
              {...formik.getFieldProps("name")}
              className={`w-full p-2 border rounded ${
                formik.touched.name && formik.errors.name ? "border-red-600" : "border-gray-300"
              }`}
            />
            {formik.touched.name && formik.errors.name && (
              <div id="name-error" className="text-red-600 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              autoComplete="email"
              aria-describedby={
                formik.touched.email && formik.errors.email ? "email-error" : undefined
              }
              {...formik.getFieldProps("email")}
              className={`w-full p-2 border rounded ${
                formik.touched.email && formik.errors.email ? "border-red-600" : "border-gray-300"
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <div id="email-error" className="text-red-600 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                autoComplete="new-password"
                aria-describedby={
                  formik.touched.password && formik.errors.password ? "password-error" : undefined
                }
                {...formik.getFieldProps("password")}
                className={`w-full p-2 border rounded pr-20 ${
                  formik.touched.password && formik.errors.password ? "border-red-600" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-black focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div id="password-error" className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 mt-2 bg-orange-500 text-white rounded-lg font-semibold ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Registering..." : "Sign-up"}
          </button>

          {/* Login Link */}
          <p className="mt-2 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Sign-in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;