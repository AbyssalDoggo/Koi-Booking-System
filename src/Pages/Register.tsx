import React, { useState } from "react";
import axios from "axios";

interface RegisterData {
  Email: string;
  Password: string;
  FullName: string;
  UserName: string;
  PhoneNumber: string;
  BirthDate: string; // Change to a single string format
  Address: string;
  IsActive: boolean;
  IsVerified: boolean;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    Email: "",
    Password: "",
    FullName: "",
    UserName: "",
    PhoneNumber: "",
    BirthDate: "", // Initialize as empty string
    Address: "",
    IsActive: true,
    IsVerified: true,
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.Password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Clear any previous errors
    try {
      const response = await axios.post(
        "https://localhost:7043/Authentication/Register",
        formData
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="border-2 border-slate-500 rounded-md p-4 py-10 bg-stone-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl grid">SIGN UP</h1>
        </div>
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <label>Email</label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label>Username</label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="text"
              name="UserName"
              value={formData.UserName}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label>Full Name</label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="text"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label>Phone Number</label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label>Address</label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="text"
              name="Address"
              value={formData.Address}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label>Password</label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <label>Confirm Password</label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <br />
            <br />
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <label>Birth Date</label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="date"
              name="BirthDate"
              value={formData.BirthDate}
              onChange={handleChange}
              required
            />
            <br />
            <br />
            <div className="text-center mb-3">
              <button
                className="bg-blue-500 p-1 rounded-lg w-full text-white hover:bg-blue-700"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="text-center">
            <p>
              Already have an account?{" "}
              <a
                className="text-blue-500 underline decoration-auto"
                href="/Login"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
