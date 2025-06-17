import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function DashComments() {
  const { user } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");
  const currentUser = { isAdmin: true };

  const getAlluserscomments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/comment/admin/comments/?limit=${limit}`,
        { withCredentials: true }
      );
      setComments(res?.data?.comments || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching comments");
    }
  };

  const handleDelete = (commentId) => {
    setShowModal(true);
    setCommentIdToDelete(commentId);
  };

  const confirmDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BaseUrl}/comment/delete/${user?._id}/${commentIdToDelete}`,
        { withCredentials: true }
      );
      getAlluserscomments();
      toast.success(res?.data?.message || "Comment deleted");
      setShowModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting comment");
    }
  };

  useEffect(() => {
    getAlluserscomments();
  }, [limit]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Admin Dashboard
          </h1>
          <ul className="flex flex-col sm:flex-row gap-3 text-white">
            <li className="hover:text-yellow-300 cursor-pointer">Dashboard</li>
            <li className="hover:text-yellow-300 cursor-pointer">Settings</li>
            <li className="hover:text-yellow-300 cursor-pointer">Logout</li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-6 p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {currentUser?.isAdmin && comments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 dark:border-gray-700 text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-200">
                  <th className="p-3 whitespace-nowrap">Date Updated</th>
                  <th className="p-3 whitespace-nowrap">Comment Content</th>
                  <th className="p-3 whitespace-nowrap">Likes</th>
                  <th className="p-3 whitespace-nowrap">Post ID</th>
                  <th className="p-3 whitespace-nowrap">User ID</th>
                  <th className="p-3 whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr
                    key={comment._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
                  >
                    <td className="p-3 whitespace-nowrap">
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">{comment.comment}</td>
                    <td className="p-3">{comment.numberOfLikes}</td>
                    <td className="p-3">{comment.postId}</td>
                    <td className="p-3">{comment.userId}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-all"
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
          <p className="text-center text-lg">You have no comments yet!</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 mx-4 w-full max-w-md rounded-lg shadow-lg animate-fadeIn">
            <div className="flex items-center mb-4">
              <HiOutlineExclamationCircle className="text-red-500 text-2xl mr-2" />
              <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            </div>
            <p className="mb-4">
              Are you sure you want to delete this comment?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashComments;
