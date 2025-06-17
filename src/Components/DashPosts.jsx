import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

function DashPosts() {
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");
  const [loading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(2);
  const currentUser = { isAdmin: true };

  const getAllusers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/post/getallposts/?limit=${limit}`,
        {
          withCredentials: true,
        }
      );

      setPosts(res?.data?.posts || []);
      toast.success(res?.data?.posts || "Posts fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error fetching posts");
    }
  };

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BaseUrl}/post/delete/${
          user?._id
        }/${postIdToDelete}`,
        {
          withCredentials: true,
        }
      );
      getAllusers();
      toast.success(res?.data?.message || "User deleted successfully");
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error deleting user");
    }
  };

  useEffect(() => {
    getAllusers();
  }, [limit]);

  return loading ? (
    <h1 className="text-center mt-10 text-2xl font-semibold text-gray-700">
      Loading...
    </h1>
  ) : (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        User Posts
      </h2>

      {currentUser?.isAdmin && posts?.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-800 border border-gray-300">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Updated</th>
                  <th className="px-4 py-3 text-left">Image</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Delete</th>
                  <th className="px-4 py-3 text-left">Edit</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td className="px-4 py-3">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link to={`/singlepost/${post?._id}`}>
                        <img
                          src={
                            post?.postImage?.split(":")[0] == "https"
                              ? post?.postImage
                              : `${import.meta.env.VITE_imageUrl}/post/${
                                  post?.postImage
                                }`
                          }
                          alt={post?.title}
                          className="h-20 w-20 object-cover rounded shadow"
                        />
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      <Link
                        className="text-indigo-700 hover:underline transition"
                        to={`/singlepost/${post?._id}`}
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{post?.category}</td>
                    <td className="px-4 py-3">
                      <span
                        className="text-red-600 hover:text-red-800 cursor-pointer transition font-medium"
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post?._id);
                        }}
                      >
                        Delete
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        className="text-green-600 hover:text-green-800 transition font-medium"
                        to={`/update-post/${post?._id}`}
                        state={{
                          Title: post.title,
                          Category: post.category,
                          Content: post.content,
                          PostImage: post.postImage,
                        }}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={() => setLimit(limit + 2)}
            className="mt-5 w-full py-2 px-4 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 transition"
          >
            Show More
          </button>
        </>
      ) : (
        <p className="text-center text-gray-500 text-lg">
          You have no posts yet!
        </p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <div className="flex flex-col items-center text-center">
              <HiOutlineExclamationCircle
                className="text-yellow-500 mb-3"
                size={50}
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Confirm Deletion
              </h3>
              <p className="text-gray-600">
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <div className="flex justify-center mt-4 space-x-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleDeletePost}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                  onClick={() => setShowModal(false)}
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

export default DashPosts;
