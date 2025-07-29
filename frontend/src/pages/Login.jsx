import { FaGoogle, FaGithub, FaQrcode } from "react-icons/fa";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-2xl font-semibold text-black">
          What's your phone number or email?
        </h2>

        <input
          type="text"
          placeholder="Enter phone number or email"
          className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition">
          Continue
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-gray-100 py-3 rounded-md hover:bg-gray-200 transition">
          <FaGoogle size={18} />
          Continue with Google
        </button>

        {/* GitHub Button */}
        <button className="w-full flex items-center justify-center gap-3 bg-gray-100 py-3 rounded-md hover:bg-gray-200 transition">
          <FaGithub size={18} />
          Continue with GitHub
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* QR Code Login */}
        <button className="w-full flex items-center justify-center gap-3 bg-gray-100 py-3 rounded-md hover:bg-gray-200 transition">
          <FaQrcode size={18} />
          Log in with QR code
        </button>

        {/* Consent Text */}
        <p className="text-xs text-gray-500 text-center pt-4">
          By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages,
          including by automated means, from Rideonix and its affiliates to the
          number provided.
        </p>
      </div>
    </div>
  );
};

export default Login;
