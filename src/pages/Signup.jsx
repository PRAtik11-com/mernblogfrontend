import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { SignupError, SignupStart, SignupSuccess } from '../redux/auth/authSlice';
import Loading from '../Components/Loading';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {loading} = useSelector((state) => state.auth)

  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(SignupStart())
    try {
      const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/user/signup`,{name,email,password},{
        withCredentials:true
      })
      console.log(res.data);
      dispatch(SignupSuccess())
      toast.success(res?.data?.message || 'User Signup successfully');
      navigate('/otpverification');
    } catch (error) {
      console.log(error?.response?.data?.message)    
      dispatch(SignupError(error?.response?.data?.message || 'Error Occured'))
      toast.error(error?.response?.data?.message || 'Error Occured')
    }
  };
  if(loading){
    return <Loading  type={"spinningBubbles"} color="blue" />
  }
    

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2">
        
        {/* Left: Image */}
        <div className="hidden md:flex items-center justify-center bg-blue-100">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
            alt="Sign up illustration"
            className="w-80 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right: Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 hover:shadow"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 hover:shadow"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 hover:shadow"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-all duration-300"
            >
              Register
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;