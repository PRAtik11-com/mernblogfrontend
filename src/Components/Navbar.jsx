import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { logoutSuccess } from "../redux/auth/authSlice";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { isAuth, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/user/logout`, {
        withCredentials: true,
      });
      dispatch(logoutSuccess());
      navigate("/sign-in");
      toast.success(res?.data?.message || "Logout Success");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout Failed");
    }
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const profileImage = user?.profileImage?.startsWith("https")
    ? user?.profileImage
    : `${import.meta.env.VITE_imageUrl}/user/${user?.profileImage}`;

  return (
    <nav className="bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="w-10 h-10" alt="Logo" />
          <span className="text-xl font-bold text-white hover:text-yellow-300">BlogSite</span>
        </Link>

        {/* Hamburger Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Full Menu for md and up */}
        <div className="hidden md:flex items-center gap-6 text-white">
          <Link to="/BlogSearch" className="hover:text-yellow-300 transition">BlogSearch</Link>

          {isAuth && (
            <div className="relative group">
              <img
                src={profileImage}
                alt="user"
                className="w-9 h-9 rounded-full border-2 border-white cursor-pointer"
              />
              <div className="absolute right-0 mt-3 w-44 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-20">
                <div className="px-4 py-2 font-bold border-b border-gray-200">@{user?.name}</div>
                <Link to="/dashboard?tab=profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                <hr />
                <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100">Logout</button>
              </div>
            </div>
          )}

          {!isAuth && (
            <Link
              to="/sign-in"
              className="px-4 py-1.5 border border-white rounded hover:bg-white hover:text-black transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 text-white space-y-2 bg-gradient-to-r from-orange-500 via-pink-500 to-red-500">
          <Link to="/BlogSearch" onClick={toggleMenu} className="block hover:text-yellow-300">BlogSearch</Link>

          {isAuth ? (
            <>
              <Link to="/dashboard?tab=profile" onClick={toggleMenu} className="block hover:text-yellow-300">Profile</Link>
              <button onClick={() => { toggleMenu(); handleLogout(); }} className="block text-left w-full hover:text-red-300">Logout</button>
            </>
          ) : (
            <Link
              to="/sign-in"
              onClick={toggleMenu}
              className="block hover:text-yellow-300"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
