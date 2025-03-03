

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom"; // Import useSearchParams

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // Manage URL query params

  const API_BASE_URL = "http://localhost:8000/Admin"; // Backend URL

  // Read 'step' from URL (default to 1)
  const step = Number(searchParams.get("step")) || 1;

  // Step 1: Send OTP
  const sendOtp = async (data) => {
    try {
      await axios.post(`${API_BASE_URL}/ForgetPassword/email/verification/`, { email: data.email });
      setEmail(data.email);
      setSearchParams({ step: 2 }); // Update URL but stay on the same page
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async (data) => {
    try {
      await axios.post(`${API_BASE_URL}/ForgetPassword/otp/verification/`, { otp: data.otp });
      setSearchParams({ step: 3 }); // Update URL to step 3
    } catch (error) {
      alert(error.response?.data?.detail || "Invalid OTP");
    }
  };

  // Step 3: Reset Password
  const resetPassword = async (data) => {
    if (data.new_password !== data.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/forgetpassword/api`, {
        email,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      });
      alert("Password changed successfully! Redirecting to login...");
      navigate("/"); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to reset password");
    }
  };

  return (
    <div className="forgotpassword">
      {/* Step 1: Send OTP */}
      {step === 1 && (
        <form onSubmit={handleSubmit(sendOtp)}>
          <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="w-full border p-2 rounded mb-2"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <button type="submit" className="forgetBtn">Send OTP</button>
        </form>
      )}

      {/* Step 2: Verify OTP */}
      {step === 2 && (
        <form onSubmit={handleSubmit(verifyOtp)}>
          <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            {...register("otp", { required: "OTP is required", minLength: 6 })}
            className="w-full border p-2 rounded mb-2"
          />
          {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
          <button type="submit" className="forgetBtn">Verify OTP</button>
        </form>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <form onSubmit={handleSubmit(resetPassword)}>
          <h2 className="text-xl font-bold mb-4">Reset Password</h2>
          <input
            type="password"
            placeholder="New Password"
            {...register("new_password", { required: "New password is required", minLength: 4 })}
            className="w-full border p-2 rounded mb-2"
          />
          {errors.new_password && <p className="text-red-500">{errors.new_password.message}</p>}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirm_password", { required: "Confirm password is required", validate: value => value === watch("new_password") || "Passwords do not match" })}
            className="w-full border p-2 rounded mb-2"
          />
          {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}

          <button type="submit" className="forgetBtn">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
