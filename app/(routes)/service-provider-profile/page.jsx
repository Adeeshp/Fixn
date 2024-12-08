"use client";
import { useState } from "react";
import { Mail, Phone, Edit, Save, Upload, Plus, Trash2 } from "lucide-react";
import BookingHistoryList from "@/app/_components/BookingHistoryList";

const ServiceProviderProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    phone: "123-456-7890",
    address: "123 Maple Street, Springfield",
    category: "Home Repairs",
    subcategories: ["Electrical Help", "Plumbing Help"],
    paymentType: "Hourly", // Wage type (Hourly or Job Wage)
    paymentAmount: "$50", // Amount for hourly or per job
    uploadedCertification: "/certifications/plumber_cert.pdf",
    profilePicture: "/images/male_avatar.JPG", // Default profile picture
  });

  const serviceProvider = {
    pastJobs: [
      {
        id: 1,
        title: "Fixed a Leaking Faucet",
        description: "Repaired a leaking faucet in the kitchen.",
        dateTime: "2024-11-25 10:00 AM",
        price: "$150",
      },
      {
        id: 2,
        title: "Repaired a Broken Window",
        description: "Replaced and installed a broken glass window.",
        dateTime: "2024-11-20 2:00 PM",
        price: "$200",
      },
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...formData.subcategories];
    updatedSubcategories[index] = value;
    setFormData((prev) => ({
      ...prev,
      subcategories: updatedSubcategories,
    }));
  };

  const addSubcategory = () => {
    setFormData((prev) => ({
      ...prev,
      subcategories: [...prev.subcategories, ""],
    }));
  };

  const removeSubcategory = (index) => {
    const updatedSubcategories = formData.subcategories.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      subcategories: updatedSubcategories,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: imageURL,
      }));
    }
  };

  const handleCertificateUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        uploadedCertification: fileURL,
      }));
    }
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="pt-20 pb-20 mx-20 flex flex-row">
      <div className="lg:w-3/3 md:w-4/4 w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        </div>
        <div className="flex flex-wrap lg:flex-nowrap mt-6">
          {/* Left: Profile Details */}
          <div className="lg:w-7/12 w-full pr-6 border-r border-gray-200">
            <div className="items-center mb-6">
              <div className="flex justify-between items-center mb-6">
                <div className="relative w-32 h-32 mb-6">
                  <img
                    src={formData.profilePicture}
                    alt={`${formData.firstName} ${formData.lastName}`}
                    className="w-full h-full rounded-full object-cover"
                  />
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer">
                      <Upload className="w-5 h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <button
                  onClick={toggleEditMode}
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
                >
                  {isEditing ? (
                    <>
                      <Save className="mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2" />
                      Edit
                    </>
                  )}
                </button>
              </div>
              <div>
                {/* Editable Fields */}
                {[{ label: "First Name", name: "firstName", value: formData.firstName },
                  { label: "Last Name", name: "lastName", value: formData.lastName },
                  { label: "Email", name: "email", value: formData.email },
                  { label: "Phone", name: "phone", value: formData.phone },
                  { label: "Address", name: "address", value: formData.address },
                ].map(({ label, name, value }) => (
                  <div className="mb-4 flex justify-between items-center" key={name}>
                    <div>
                      <label className="block text-gray-600 text-sm">{label}</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name={name}
                          value={value}
                          onChange={handleInputChange}
                          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                      ) : (
                        <p className="text-gray-800">{value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Category and Subcategories */}
                <div className="mb-6">
                  <label className="block text-gray-600 text-sm">Category</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  ) : (
                    <p className="text-gray-800">{formData.category}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 text-sm">Subcategories</label>
                  {isEditing ? (
                    <>
                      {formData.subcategories.map((subcategory, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <input
                            type="text"
                            value={subcategory}
                            onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                          />
                          <button
                            className="ml-2 text-red-500"
                            onClick={() => removeSubcategory(index)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                      <button
                        className="flex items-center mt-2 text-blue-500"
                        onClick={addSubcategory}
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Add Subcategory
                      </button>
                    </>
                  ) : (
                    <ul className="list-disc pl-5 text-gray-800">
                      {formData.subcategories.map((subcategory, index) => (
                        <li key={index}>{subcategory}</li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Certification Section */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Certification</h2>
                  {isEditing ? (
                    <div>
                      <label className="block text-gray-600 text-sm mb-1">Upload Certification</label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleCertificateUpload}
                        className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
                      />
                      {formData.uploadedCertification && (
                        <a
                          href={formData.uploadedCertification}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-blue-500 underline block"
                        >
                          View Uploaded Certification
                        </a>
                      )}
                    </div>
                  ) : (
                    <a
                      href={formData.uploadedCertification}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      View Certification
                    </a>
                  )}
                </div>

                {/* Payment Type and Amount Section */}
                <div className="mb-6">
                  <label className="block text-gray-600 text-sm">Payment Type</label>
                  {isEditing ? (
                    <select
                      name="paymentType"
                      value={formData.paymentType}
                      onChange={handleInputChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                      <option value="Hourly">Hourly</option>
                      <option value="Per Job">Per Job</option>
                    </select>
                  ) : (
                    <p className="text-gray-800">{formData.paymentType}</p>
                  )}
                </div>

                {/* Payment Amount */}
                {formData.paymentType && (
                  <div className="mb-6">
                    <label className="block text-gray-600 text-sm">Payment Amount</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="paymentAmount"
                        value={formData.paymentAmount}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    ) : (
                      <p className="text-gray-800">${formData.paymentAmount}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Past Jobs */}
          <div className="pl-5 w-4/12 border-l-2 border-primary">
            <h2 className="font-bold text-[20px] my-2">Past Jobs</h2>
            <BookingHistoryList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
