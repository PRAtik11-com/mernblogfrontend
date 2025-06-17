import React, { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

function DashUsers() {
  
  const [users, setUsers] = useState([])
  const [limit , setLimit] = useState(2)

  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const openDeleteModal = (userId) => {
    setUserIdToDelete(userId);
    setShowModal(true);
  };

  const getAllusers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/user/getallusers/?limit=${limit}`,{
        withCredentials:true
      })
      console.log(res?.data?.users)
      setUsers(res?.data?.users )
      
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Error fetching users");
    }
  }
  
  const handleDelete = async() => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BaseUrl}/user/deleteuser/${userIdToDelete}`,{
        withCredentials:true
      })
      getAllusers()
      toast.success(res?.data?.message || "User deleted successfully");
      setShowModal(false)
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error deleting user")
    }
    
  };
   useEffect(() => {
    getAllusers()
   
  },[limit])

 

  return (
    <div className="max-w-5xl mx-auto mt-20 bg-white shadow-lg p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">User List</h2>

      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Created</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Username</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-center">Admin</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <img
                      src={user?.profileImage?.split(":")[0] == "https" ? user?.profileImage : `${import.meta.env.VITE_imageUrl}/user/${user?.profileImage}`}
                      alt={user.name}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 text-center">
                    {user?.role ? (
                      <FaCheck className="text-green-500 inline" />
                    ) : (
                      <FaTimes className="text-red-500 inline" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => openDeleteModal(user._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
           <button
            onClick={() => setLimit(limit + 2)}
            className="mt-5 w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 transition"
          >
            Show More
          </button>
        </div>
        
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg animate-fadeIn">
            <div className="flex flex-col items-center text-center">
              <HiOutlineExclamationCircle className="text-yellow-500 text-4xl mb-3" />
              <h3 className="text-lg font-semibold mb-2">Confirm Deletion</h3>
              <p className="text-sm text-gray-600 mb-5">
                Are you sure you want to delete this user? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashUsers
