import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Loading from "../Components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { VerifyOtpError, VerifyOtpStart, VerifyOtpSuccess } from "../redux/auth/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const {loading} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleVerifyOtp = async () => {
    dispatch(VerifyOtpStart())
    try {
      const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/user/verify`,{otp},{
        withCredentials:true
      })
      console.log(res.data)
      dispatch(VerifyOtpSuccess(res?.data?.message || "Otp Verified"))
      navigate('/sign-in')
      toast.success(res?.data?.message || "Otp Verified Successfully")
      
    } catch (error) {
      console.log(error)
      dispatch(VerifyOtpError(error?.response?.data?.message || "Otp verification failed"))
      toast.error(error?.response?.data?.message || "Otp verification failed")
    }
  }
  if(loading){
    return <Loading  type={"spinningBubbles"} color="blue" />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          🔐 Verify Your OTP
        </h2>

        <div className="flex justify-center mb-4">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="mx-1"> </span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "48px",
              height: "56px",
              fontSize: "20px",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              backgroundColor: "#f3f4f6",
              color: "#1f2937",
              textAlign: "center",
              marginLeft: "6px",
              transition: "all 0.2s ease",
            }}
            focusStyle={{
              outline: "none",
              border: "2px solid #3b82f6",
              backgroundColor: "#fff",
              boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)",
            }}
          />
        </div>

        <button
          className={`w-full py-2 text-white text-lg font-medium rounded-lg transition duration-300 ${
            otp.length < 6
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={otp.length < 6}
          onClick={handleVerifyOtp}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default OtpVerification;
