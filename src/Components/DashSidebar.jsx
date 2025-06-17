import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie
} from 'react-icons/hi';
import { useSelector } from 'react-redux';

function DashSidebar() {
  const {user} = useSelector((state) => state.auth)
  const [currentUser] = useState(user);

  const linkClasses =
    'flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-indigo-600 hover:text-white rounded-md transition-colors duration-200';

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-5 shadow-lg">
      <nav className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-indigo-400 mb-4 pl-2">Dashboard</h2>

        {currentUser?.role && (
          <Link to="/dashboard?tab=dash" className={linkClasses}>
            <HiChartPie className="text-lg" /> Dashboard
          </Link>
        )}

        <Link to="/dashboard?tab=profile" className={linkClasses}>
          <HiUser className="text-lg" />
          Profile
          <span className="ml-auto bg-indigo-600 px-2 py-0.5 rounded text-xs">
            {currentUser?.role ? 'Admin' : 'User'}
          </span>
        </Link>

        {currentUser?.role && (
          <Link to="/dashboard?tab=posts" className={linkClasses}>
            <HiDocumentText className="text-lg" /> Posts
          </Link>
        )}

        {currentUser?.role && (
          <Link to="/dashboard?tab=users" className={linkClasses}>
            <HiOutlineUserGroup className="text-lg" /> Users
          </Link>
        )}

        {currentUser?.role && (
          <Link to="/dashboard?tab=comments" className={linkClasses}>
            <HiAnnotation className="text-lg" /> Comments
          </Link>
        )}

        <div
          className={`${linkClasses} cursor-pointer text-red-400 hover:text-white hover:bg-red-500`}
        >
          <HiArrowSmRight className="text-lg" /> Sign Out
        </div>
      </nav>
    </div>
  );
}

export default DashSidebar