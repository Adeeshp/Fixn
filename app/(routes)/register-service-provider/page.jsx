"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ServiceProviderSignUp = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
const [city, setCity] = useState("");
const [province, setProvince] = useState("");

  const [address, setAddress] = useState(""); // Add this state for the address
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [certification, setCertification] = useState(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [wageType, setWageType] = useState(""); // For "hourly" or "perJob"
  const [wageAmount, setWageAmount] = useState(""); // For the wage amount

  const handleFileUpload = (e) => {
    setCertification(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (firstName === "") {
      setError("Please enter your First Name");
      return;
    }
    if (lastName === "") {
      setError("Please enter your Last Name");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    if (!address) {
      setError("Please enter your address");
      return;
    }
    if (city === "") {
      setError("Please enter your city");
      return;
    }
    if (province === "") {
      setError("Please select your province");
      return;
    }
    const zipPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!zipPattern.test(zipCode)) {
      setError("Please enter a valid Canadian zip code (e.g., A1A 1A1)");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!selectedService) {
      setError("Please select a service you provide");
      return;
    }
    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }

    if (!wageType) {
      setError("Please select a payment type");
      return;
    }
    if (wageType && !wageAmount) {
      setError(`Please enter a ${wageType === "hourly" ? "hourly" : "per job"} wage`);
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address); // Include address
      formData.append("password", password);
      formData.append("service", selectedService);
      formData.append("wageType", wageType); // Include wage type
      formData.append("wage", wageAmount); // Include wage amount
      formData.append("city", city);
formData.append("province", province);
formData.append("zipCode", zipCode);
      if (certification) formData.append("certification", certification);

      const response = await fetch("/api/user/registerServiceProvider", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Server error. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="lg:w-2/5 md:w-2/5 w-full bg-white rounded-lg shadow-lg my-28 p-8">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Service Provider Registration
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

        <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  size="sm"
                />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  size="sm"
                />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Phone Number
            </label>
            <div className="flex">
              <select className="border border-gray-300 rounded-md py-2 px-3 mr-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="+1">+1 (USA/Canada)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+91">+91 (India)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japan)</option>
                <option value="+49">+49 (Germany)</option>
                <option value="+33">+33 (France)</option>
                <option value="+86">+86 (China)</option>
                <option value="+39">+39 (Italy)</option>
                <option value="+55">+55 (Brazil)</option>
                <option value="+34">+34 (Spain)</option>
                <option value="+7">+7 (Russia)</option>
                <option value="+27">+27 (South Africa)</option>
                <option value="+64">+64 (New Zealand)</option>
                <option value="+82">+82 (South Korea)</option>
              </select>

              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
          <div className="mb-4">
  <label
    htmlFor="country"
    className="block text-gray-600 text-sm font-medium mb-1"
  >
    Country
  </label>
  <input
    type="text"
    id="country"
    value="Canada"
    readOnly
    className="w-full border border-gray-300 rounded-md py-2 px-3 bg-gray-100 cursor-not-allowed focus:outline-none"
  />
</div>

<div className="mb-4">
  <label
    htmlFor="province"
    className="block text-gray-600 text-sm font-medium mb-1"
  >
    Province
  </label>
  <select
    id="province"
    value={province}
    onChange={(e) => setProvince(e.target.value)}
    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
  >
    <option value="">Select a Province</option>
    <option value="Alberta">Alberta</option>
    <option value="British Columbia">British Columbia</option>
    <option value="Manitoba">Manitoba</option>
    <option value="New Brunswick">New Brunswick</option>
    <option value="Newfoundland and Labrador">Newfoundland and Labrador</option>
    <option value="Nova Scotia">Nova Scotia</option>
    <option value="Ontario">Ontario</option>
    <option value="Prince Edward Island">Prince Edward Island</option>
    <option value="Quebec">Quebec</option>
    <option value="Saskatchewan">Saskatchewan</option>
  </select>
</div>
<div className="mb-4 flex space-x-4">
  <div className="w-1/2">
    <label
      htmlFor="city"
      className="block text-gray-600 text-sm font-medium mb-1"
    >
      City
    </label>
    <input
      type="text"
      id="city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>

  <div className="w-1/2">
    <label
      htmlFor="zipCode"
      className="block text-gray-600 text-sm font-medium mb-1"
    >
      Zip Code
    </label>
    <input
      type="text"
      id="zipCode"
      value={zipCode}
      onChange={(e) => setZipCode(e.target.value)}
      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
    />
  </div>
</div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="service"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Service Offered
            </label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a Service</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Gardening">Gardening</option>
              <option value="Painting">Painting</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="wageType"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Payment Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="wageType"
                  value="hourly"
                  checked={wageType === "hourly"}
                  onChange={() => setWageType("hourly")}
                  className="form-radio"
                />
                <span className="ml-2">Hourly</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="wageType"
                  value="perJob"
                  checked={wageType === "perJob"}
                  onChange={() => setWageType("perJob")}
                  className="form-radio"
                />
                <span className="ml-2">Per Job</span>
              </label>
            </div>
          </div>

          {wageType && (
            <div className="mb-4">
              <label
                htmlFor="wageAmount"
                className="block text-gray-600 text-sm font-medium mb-1"
              >
                Wage Amount ({wageType === "hourly" ? "per hour" : "per job"})
              </label>
              <input
                type="number"
                id="wageAmount"
                value={wageAmount}
                onChange={(e) => setWageAmount(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          )}
        

         
        <div className="mb-4">
            <label
              htmlFor="certification"
              className="block text-gray-600 text-sm font-medium mb-1"
            >
              Upload Certification (required)
            </label>
            <input
              type="file"
              id="certification"
              onChange={handleFileUpload}
              required // Make the field required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>



          <div className="mb-4">
            <label className="text-gray-600 text-sm">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mr-2 "
              />
              I agree to the{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms and Conditions
              </Link>{" "}
              and have reviewed the{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>


          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

           {/* Submit Button */}
           <button
            type="submit"
            className={`bg-primary hover:bg-white hover:border-primary hover:text-primary border-2 border-transparent cursor-pointer text-white font-semibold rounded-md py-3 px-4 w-full transition duration-200 ease-in-out ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isProcessing}
          >
            {isProcessing ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-primary hover:underline">
            Already have an account? <b>Sign In</b>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ServiceProviderSignUp;
