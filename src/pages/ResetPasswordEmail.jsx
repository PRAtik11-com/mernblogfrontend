import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { ResetPaaswordError, ResetPaaswordStart, ResetPaaswordSuccess } from "../redux/auth/authSlice";
import Loading from "../Components/Loading";

const ResetPasswordEmail = () => {
   const {loading} = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const [loading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

  const handleRequest = async (e) => {
    e.preventDefault();
    
    dispatch(ResetPaaswordStart())
    try {
      const res = await axios.post(
       `${import.meta.env.VITE_BaseUrl}/user/resetpassword`,
        { email },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      dispatch(ResetPaaswordSuccess(res.data.message))
      navigate("/Verifypassword")
      toast.success(res.data.message || "Password reset successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      dispatch(ResetPaaswordError(err.response?.data?.message))
    } 
  };
   if(loading){
    return <Loading  type={"spinningBubbles"} color="blue" />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-400 to-purple-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform hover:scale-105 transition duration-300">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Request Password Reset
        </h2>
        <form onSubmit={handleRequest} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transform hover:scale-105 transition duration-300"
          >
            {loading ? "Sending..." : "Send Reset OTP"}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-blue-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordEmail;
