import React from "react";

const NewPage = () => {
  return (
    <div className="w-screen h-screen flex font-['Nunito_Sans'] bg-[#F2ECE2]">
      {/* Left Side */}
      <div className="flex flex-col justify-between px-10 py-8 w-1/2 relative">
        <div>
          <h1 className="text-6xl font-extrabold text-black">Novix</h1>
          <p className="text-sm text-gray-700 ml-1 mt-1">your own platform</p>
          <div className="w-44 h-1 bg-gray-300 mt-1 ml-1"></div>
        </div>
        <img
          src="/images/try.png"
          alt="Character"
          className="w-[500px] mx-auto h-[550px]"
        />
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-[40px] px-10 py-12 w-[400px]">
          <h2 className="text-center text-3xl font-medium mb-1">Hi There!</h2>
          <h1 className="text-center text-3xl font-bold mb-1">Welcome Back</h1>
          <p className="text-center text-sm text-gray-600 mb-6">
            Log In To Continue Your Journey With Us
          </p>

          {/* Email Input */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Email Address / phone no.
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
              <i className="fa fa-envelope text-gray-500" />
              <input
                type="text"
                placeholder="Enter your email address / phone no"
                className="outline-none w-full text-sm"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Password
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2">
              <i className="fa fa-lock text-gray-500" />
              <input
                type="password"
                placeholder="Enter your password..."
                className="outline-none w-full text-sm"
              />
              <i className="fa fa-eye text-gray-400 cursor-pointer" />
            </div>
          </div>

          {/* Checkbox & Forgot Password */}
          <div className="flex justify-between items-center mb-6 text-sm font-semibold">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-green-800" />
              Keep Me Signed In
            </label>
            <span className="text-[#053F2E] underline cursor-pointer">
              Forgot Password
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full bg-[#CEE3CC] text-[#1A3E2F] font-semibold py-2 rounded-full mb-4 flex justify-center items-center gap-2">
            Log in <i className="fa fa-arrow-right" />
          </button>

          {/* Divider */}
          <div className="text-center text-xs font-extrabold uppercase text-gray-500 mb-4">
            or
          </div>

          {/* Google Button */}
          <button className="w-full bg-black text-white font-semibold py-2 rounded-full flex justify-center items-center gap-3">
            <img
              src="/images/Vector.png"
              className="w-5 h-5"
            />
            Sign In With Google
          </button>

          {/* Sign Up Prompt */}
          <p className="text-center text-sm mt-6">
            Don’t have an account?{" "}
            <span className="text-[#1A3E2F] italic underline font-bold cursor-pointer">
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPage;
