import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';
import DashPosts from './DashPosts';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

function DashboardComp() {
  // const {user} = useSelector((state) => state.auth);
  const [users,setusers] = useState([]);
  const [totalUsers , settotalUsers] = useState(0);
  const [comments,setComments] = useState([]);
  const [totalComments , settotalComments] = useState(0);
  const [posts,setPosts] = useState([]);
  const [totalPosts , settotalPosts] = useState(0);



  const Getallusersdata = async() =>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/user/getallusers`,{
        withCredentials:true
      })
      console.log(res.data)
      setusers(res?.data?.users)
      settotalUsers(res?.data?.totalUsers)
      toast.success(res?.data?.users)
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Alldata fetching failed");
      
    }
  }
  const GetAllPostsdata = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/post/getallposts`,{
        withCredentials:true
      })
  
      setPosts(res?.data?.posts || [] )
      settotalPosts(res?.data?.totalPosts)
      toast.success(res?.data?.posts || "Posts fetched successfully");
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Error fetching posts");
    }
  }

  const GetAllCommentsdata = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/comment/admin/comments`,{
        withCredentials:true
      })
  
      setComments(res?.data?.comments || [] )
      settotalComments(res?.data?.totalComments)
      toast.success(res?.data?.comments || "Comments fetched successfully");
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Error fetching comments");
    }
  }

  const pieData = [
    { name: 'Users', value: totalUsers },
    { name: 'Comments', value: totalComments },
    { name: 'Posts', value: totalPosts },
  ];

  const barData = comments.map(c => ({
    name: c.content,
    Likes: c.numberOfLikes
  }));

  const COLORS = ['#3b82f6', '#14b8a6', '#f59e0b'];

  useEffect(() => {
    Getallusersdata()
    GetAllPostsdata()
    GetAllCommentsdata()
  },[])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">📊 Dashboard</h1>
        <ul className="flex gap-4">
          <li className="hover:text-blue-400 cursor-pointer transition">Home</li>
          <li className="hover:text-blue-400 cursor-pointer transition">Users </li>
          <li className="hover:text-blue-400 cursor-pointer transition">Posts </li>
        </ul>
      </nav>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 p-6">
        <div className="bg-gray-800 rounded-xl p-6 text-center hover:scale-105 transition transform shadow-lg">
          <p className="text-gray-400">Total Users</p>
          <h2 className="text-4xl font-semibold">{totalUsers}</h2>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center hover:scale-105 transition transform shadow-lg">
          <p className="text-gray-400">Total Comments</p>
          <h2 className="text-4xl font-semibold">{totalComments}</h2>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center hover:scale-105 transition transform shadow-lg">
          <p className="text-gray-400">Total Posts</p>
          <h2 className="text-4xl font-semibold">{totalPosts}</h2>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 p-6">
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h3 className="text-lg mb-4">User, Comment, Post Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h3 className="text-lg mb-4">Top Comment Likes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Likes" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Data Tables */}
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* Recent Users */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h4 className="text-center font-semibold mb-2">Recent Users</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th>Image</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-t border-gray-700">
                  <td><img  src={user?.profileImage?.split(":")[0] == "https" ? user?.profileImage : `${import.meta.env.VITE_imageUrl}/user/${user?.profileImage}`} alt="Profile"  className="w-9 h-9 rounded-full border-2 border-white hover:scale-110 transition-transform duration-300 cursor-pointer mt-1"  /></td>
                  <td>{user.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={"/dashboard?tab=users"}><button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded transition">See All</button></Link>
        </div>

        {/* Recent Comments */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h4 className="text-center font-semibold mb-2">Recent Comments</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th>Content</th>
                <th>Likes</th>
              </tr>
            </thead>
            <tbody>
              {comments.map(comment => (
                <tr key={comment._id} className="border-t border-gray-700">
                  <td>{comment.comment}</td>
                  <td>{comment.numberOfLikes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={"/dashboard?tab=comments"}><button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded transition">See All</button></Link>
        </div>

        {/* Recent Posts */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h4 className="text-center font-semibold mb-2">Recent Posts</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400">
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id} className="border-t border-gray-700">
                  <td><img src={
                    post?.postImage?.split(":")[0] == "https"
                      ? post?.postImage
                      : `${import.meta.env.VITE_imageUrl}/post/${
                          post?.postImage
                        }`
                  } alt="Post" className="w-14 mr-5" /></td>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
         <Link to={"/dashboard?tab=posts"}> <button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded transition">See All</button></Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardComp
