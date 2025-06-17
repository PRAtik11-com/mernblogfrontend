import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashProfile from '../Components/DashProfile';
import DashSidebar from '../Components/DashSidebar';
import DashboardComp from '../Components/DashboardComp';
import DashPosts from '../Components/DashPosts';
import DashUsers from '../Components/DashUsers';
import DashComments from '../Components/DashComments';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      
      {/* Sidebar */}
      <div className="md:w-64 bg-gray-900 text-white shadow-lg">
        <DashSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto transition-all duration-300 bg-white dark:bg-gray-800 rounded-tl-3xl shadow-inner">
        {tab === 'profile' && <DashProfile />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'users' && <DashUsers />}
        {tab === 'comments' && <DashComments />}
        {tab === 'dash' && <DashboardComp />}

        {!tab && (
          <div className="text-center text-gray-400 mt-20 text-lg">
            Select a tab from the sidebar to view content.
          </div>
        )}
      </div>
    </div>
  );
}
