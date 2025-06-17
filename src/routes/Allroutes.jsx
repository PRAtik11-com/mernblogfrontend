import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import OtpVerification from "../pages/OtpVerification";
import Dashboard from "../pages/Dashboard";
import Search from "../pages/Search";
import CommentSection from "../Components/CommentSection";
import BlogDetail from "../pages/BlogDetail";
import CreatePost from "../pages/CreatePost";
import UpdatePost from "../pages/UpdatePost";
import ResetPasswordEmail from "../pages/ResetPasswordEmail";
import VerifyPassword from "../pages/VerifyPassword";


const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/otpverification" element={<OtpVerification />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/BlogSearch" element={<Search />}></Route>
        <Route path="/singlepost/:postId" element={<BlogDetail />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
        <Route path="/resetpassword" element={<ResetPasswordEmail / >} />
        <Route path="/Verifypassword" element={<VerifyPassword />} />
      </Routes>
    </div>
  );
};

export default Allroutes;
