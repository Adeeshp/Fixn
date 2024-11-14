"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [token, setToken] = useState("");

  const [showPassword, setShowPassword] = useState(false); // State for showing/hiding password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password

  const router = useRouter();

  useEffect(() => {
    // Get token from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("Invalid or missing token");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error and message states
    setError("");
    setMessage("");

    // New password validation
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    // Confirm password validation
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsProcessing(true); // Start processing

    try {
      const response = await fetch("/api/user/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        router.push("/login");
      } else {
        setError(data.message || "Error resetting password");
      }
    } catch (err) {
      setError("Error resetting password");
    } finally {
      setIsProcessing(false); // End processing
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="lg:w-2/6 md:w-1/2 w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center m-3">
          {/* New Password input field */}
          <div className="relative w-full flex items-center mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-gray-500"
                size="sm"
              />
            </button>
          </div>

          {/* Confirm Password input field */}
          <div className="relative w-full flex items-center mb-6">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 ease-in-out"
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="text-gray-500"
                size="sm"
              />
            </button>
          </div>

          {/* Submit Button */}
          <Button
            className="my-2 bg-primary hover:bg-white hover:border-primary hover:text-primary border-2 border-transparent cursor-pointer text-white font-semibold rounded-md py-3 px-4 w-full transition duration-200 ease-in-out"
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : "Reset Password"}
          </Button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Success Message */}
          {message && <p className="text-secondary text-sm">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
