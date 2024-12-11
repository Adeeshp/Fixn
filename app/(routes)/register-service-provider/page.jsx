"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const ServiceProviderSignUp = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [category, setCategory] = React.useState("");
  const [subcategory, setSubcategory] = React.useState("");
  const [address, setAddress] = useState(""); // Add this state for the address
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [certification, setCertification] = useState(null);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [wageType, setWageType] = useState(""); // For "hourly" or "perJob"
  const [wageAmount, setWageAmount] = useState(""); // For the wage amount
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubcategoryList] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  
  // Fetch category list on initial render
  useEffect(() => {
    getCategoryList();
  }, []);
  
  /**
   * Fetches category list from the backend API
   */
  const getCategoryList = async () => {
    try {
      const response = await fetch("/api/category");
        console.log("this is one");
        console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        setCategoryList(data.data);
      } else {
        console.error("Error fetching categories:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  
  /**
   * Fetches subcategories based on the selected category
   */
  const getSubcategoriesByCategory = async (categoryId) => {
    try {
      const response = await fetch(`/api/subcategory/${categoryId}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        setSubcategoryList(data.data);
      } else {
        console.error("Error fetching subcategories:", data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  
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

    if (!termsAccepted) {
      setError("You must accept the terms and conditions");
      return;
    }

    if (!wageType) {
      setError("Please select a payment type");
      return;
    }
    if (wageType && !wageAmount) {
      setError(
        `Please enter a ${wageType === "hourly" ? "hourly" : "per job"} wage`
      );
      return;
    }
    async function fetchCategories() {
      try {
        const response = await fetch('/category'); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        return await response.json();
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    setIsProcessing(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address); // Include address
      formData.append("city", city);
      formData.append("province", province);
      formData.append("zipCode", zipCode);
      formData.append("password", password);
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
              <option value="Newfoundland and Labrador">
                Newfoundland and Labrador
              </option>
              <option value="Nova Scotia">Nova Scotia</option>
              <option value="Ontario">Ontario</option>
              <option value="Prince Edward Island">Prince Edward Island</option>
              <option value="Quebec">Quebec</option>
              <option value="Saskatchewan">Saskatchewan</option>
            </select>
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
          {/* Category Section */}
          <div className="mb-6 border-b pb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Category
            </h2>
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Select Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
            >
              <option value="">Select a category</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Delivery">Delivery</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>

          {/* Subcategory Section */}
          {category && (
            <div className="mb-6 border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-3">
                Subcategory
              </h2>
              <label
                htmlFor="subcategory"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Select Subcategory
              </label>
              <select
                id="subcategory"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
              >
                <option value="">Select a subcategory</option>
                {category === "Cleaning" && (
                  <>
                    <option value="Home Cleaning">Home Cleaning</option>
                    <option value="Office Cleaning">Office Cleaning</option>
                    <option value="Deep Cleaning">Deep Cleaning</option>
                  </>
                )}
                {category === "Maintenance" && (
                  <>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="HVAC">HVAC</option>
                  </>
                )}
                {category === "Delivery" && (
                  <>
                    <option value="Food Delivery">Food Delivery</option>
                    <option value="Parcel Delivery">Parcel Delivery</option>
                    <option value="Grocery Delivery">Grocery Delivery</option>
                  </>
                )}
                {category === "Shopping" && (
                  <>
                    <option value="Clothing">Clothing</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Groceries">Groceries</option>
                  </>
                )}
              </select>
            </div>
          )}

      {/* Subcategory Section */}
      {category && (
        <div className="mb-6 border-b pb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Subcategory
          </h2>
          <label
            htmlFor="subcategory"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Select Subcategory
          </label>
          <select
            id="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
          >
            
            {subcategoryList.length > 0 ? (
              subcategoryList.map((subcat) => (
                <option key={subcat.subcategoryId} value={subcat.subcategoryId}>
                  {subcat.subCategoryName}
                </option>
              ))
            ) : (
              <option value="no-subcategory">No subcategories found</option>
            )}
          </select>
        </div>
      )}
    </select>
  </div>
)}

      {/* Subcategory Section */}
      {category && (
        <div className="mb-6 border-b pb-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Subcategory</h2>
          <label
            htmlFor="subcategory"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Select Subcategory
          </label>
          <select
            id="subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
          >
            <option value="">Select a subcategory</option>
            {subcategoryList.length > 0 ? (
              subcategoryList.map((subcat) => (
                <option key={subcat._id} value={subcat._id}>
                  {subcat.subCategoryName}
                </option>
              ))
            ) : (
              <option value="no-subcategory">No subcategories found</option>
            )}
          </select>
        </div>
      )}
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
            <label
              htmlFor="password"
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

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
