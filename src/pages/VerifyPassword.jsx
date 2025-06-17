import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ResetPaaswordVerifyOtpError, ResetPaaswordVerifyOtpStart, ResetPaaswordVerifyOtpSuccess } from "../redux/auth/authSlice";

const VerifyPassword = () => {
  const {loading} = useSelector((state) => state.auth)  
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerify = async (e) => {
    e.preventDefault();
    dispatch(ResetPaaswordVerifyOtpStart())
    // setMessage("");
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BaseUrl}/user/verifypassword`,
        { otp, password },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      navigate("/sign-in");
      dispatch(ResetPaaswordVerifyOtpSuccess(res?.data?.user))
      toast.success(res?.data?.message)
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      dispatch(ResetPaaswordVerifyOtpError(err.response?.data?.messagee))
    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform hover:scale-105 transition duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify OTP & Reset Password
        </h2>
        <form onSubmit={handleVerify} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition duration-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-green-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyPassword;
