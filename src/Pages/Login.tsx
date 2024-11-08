import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("sirisz2003@gmail.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7043/Authentication/Login",
        {
          email,
          password,
        }
      );
      const accessToken = response.data.Token;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userRole", response.data.User.RoleId);
      localStorage.setItem("userId", response.data.User.UserId);
      navigate(`/customer`);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(
          err.response.data.message || "An error occurred during login."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="border-2 border-slate-500 rounded-md p-10 bg-stone-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl grid"> SIGN IN</h1>
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <label>Email</label> <br />
            <input
              className="border-2 rounded-md w-full p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <br />
            <label>Password </label> <br />
            <input
              className="border-2 rounded-md w-full p-2"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <br />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <div className="text-center mb-3">
              <button
                className="bg-blue-500 p-2 rounded-lg w-full text-white hover:bg-blue-700 disabled:bg-blue-300"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <a
                className="text-blue-500 text-sm hover:underline hover:decoration-auto mt-2 inline-block"
                href="#"
              >
                Forgot password?
              </a>
            </div>
          </form>
          <div className="text-center">
            <p>
              Don't have an account?{" "}
              <a
                className="text-blue-500 underline decoration-auto "
                href="Register"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
