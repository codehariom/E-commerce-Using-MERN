import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik} from "formik";
import * as Yup from "yup";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "At least one lowercase letter required")
        .matches(/[A-Z]/, "At least one uppercase letter required")
        .matches(/[0-9]/, "At least one number required")
        .matches(/[@$!%*?&]/, "At least one special character required"),
    }),
    onSubmit: (values,{resetForm}) => {
      console.log("User details:", values);
      resetForm();
    },
  });

  return (
    <div className="flex">
      <div className="w-full flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-xl"
        >
          <div className="flex justify-center mb-4">
            <h2 className="text-xl font-medium">Style Pop</h2>
          </div>
          <h2 className="text-2xl text-center font-semibold mb-3">
            Hey There! 👋
          </h2>
          <p className="text-center mb-6">
            Enter your email and password to login
          </p>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              {...formik.getFieldProps("email")}
              className="w-full p-2 border rounded"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                {...formik.getFieldProps("password")}
                className="w-full p-2 border rounded pr-20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-orange-500 text-white rounded-lg font-semibold"
          >
            Sign-in
          </button>

          {/* Register Link */}
          <p className="mt-2 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
