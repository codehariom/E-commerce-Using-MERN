import { useFormik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const formik   = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
    },
    validationSchema:Yup.object({
      name:Yup.string()
      .required("Name is Required"),
      email:Yup.string()
      .email("Invalid Email")
      .required("Email is Required"),
      password:Yup.string()
      .required("Password is Required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "At least one lowercase letter required")
        .matches(/[A-Z]/, "At least one uppercase letter required")
        .matches(/[0-9]/, "At least one number required")
        .matches(/[@$!%*?&]/, "At least one special character required"),
    }),
    onSubmit: (values,{resetForm}) => {
       alert(JSON.stringify(values, null, 2));
       resetForm();
     },
  })
  
  return (
    <div className="flex">
      <div className=" w-full  flex flex-col justify-center items-center p-8 md:p-12">
        <form
           onSubmit={formik.handleSubmit}
          className=" w-full max-w-md bg-white p-8 rounded-lg border shadow-xl"
        >
          <div className=" flex justify-center mb-4">
            <h2 className=" text-xl font-medium">Style Pop</h2>
          </div>
          <h2 className=" text-2xl text-center font-semibold mb-3">
            {" "}
            Welcome to Style pop
          </h2>
          <p className=" text-center mb-6">Enter Your Credentials </p>
          <div className="mb-4">
            <label className=" block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
            {...formik.getFieldProps("name")}
              className=" w-full p-2 border rounded"
              placeholder="Enter Your Full Name"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className=" block text-sm font-semibold mb-2">Email</label>
            <input
              type="text"
              {...formik.getFieldProps("email")}
              className=" w-full p-2 border rounded"
              placeholder="Enter Your Email"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className=" block text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className=" w-full p-2 border rounded"
                placeholder="Enter Password"
                {...formik.getFieldProps("password")}
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className=" absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-black"
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
          <button
            type="submit"
            className=" w-full py-2 mt-2 bg-orange-500 text-white rounded-lg font-semibold"
          >
            Sign-up
          </button>
          <p className=" mt-2 text-center">
            You Have account{" "}
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
