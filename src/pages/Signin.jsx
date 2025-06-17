import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { SignInError, SignInStart, SignInSuccess } from '../redux/auth/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';


 function SignIn() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  // const {loading} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch(SignInStart())
    try {
      const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/user/signin`,{email,password},{
        withCredentials:true
      })
      console.log(res.data.message);
      
      dispatch(SignInSuccess(res?.data?.user || "Login Successfully"))
      toast.success(res?.data?.message || "Login Successfully")
      navigate('/')
    } catch (error) {
      console.log(error);
      
      dispatch(SignInError(error?.response?.data?.message || "Invalid Email or Password"))
      toast.error(error?.response?.data?.message || "Invalid Email or Password")
    }
  }



  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1710162734135-8dc148f53abe?q=80&w=1932&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white bg-opacity-95 p-8 rounded-xl shadow-2xl max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Sign In</h2>
          <p className="text-gray-500">Access your account</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Your password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* Social Login */}
        <div className="my-6 text-center">
          <p className="text-gray-500 text-sm mb-4">Or sign in with</p>
          <div className="flex justify-center space-x-4">
            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-300">
              <FaGoogle size={20} />
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-full transition duration-300">
              <FaApple size={20} />
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition duration-300">
              <FaFacebook size={20} />
            </button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
        <div className="text-center text-sm text-gray-600 mt-4">
          Forget your Password?{' '}
          <Link to="/resetpassword" className="text-blue-600 hover:underline">
            Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
