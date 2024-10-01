import React from "react";
import 'src/index'
const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="border-2 border-slate-500 rounded-md p-4 py-10 bg-stone-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl grid"> SIGN UP </h1>
        </div>
        <div className="register-form">
          <form>
            <label>Username</label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="text"
              id="username"
              name="username"
            />
            <br />
            <br />
            <div className="flex ">
              <div className="w-full">
                <label>First name</label> <br />
                <input
                  className="border-2 rounded-md w-full"
                  type="text"
                  id="username"
                  name="username"
                />
                <br />
                <br />
              </div>
              <div className="w-full ">
                <label>Last name</label> <br />
                <input
                  className="border-2 rounded-md w-full"
                  type="text"
                  id="username"
                  name="username"
                />
                <br />
                <br />
              </div>
            </div>
            <label>Phone number </label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="text"
              id="phone"
              name="phone"
            />
            <br />
            <br />
            <label>Password </label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="password"
              id="password"
              name="password"
            />
            <br />
            <br />
            <label>Confirm password </label> <br />
            <input
              className="border-2 rounded-md w-full"
              type="password"
              id="password"
              name="password"
            />
            <br />
            <br />
            <div className="text-center mb-3">
              <button
                className="bg-blue-500 p-1 rounded-lg w-full text-white hover:bg-blue-700 "
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="text-center">
            <p>
              Already have an account.
              <a
                className="text-blue-500 underline decoration-auto "
                href="/Login.tsx"
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
