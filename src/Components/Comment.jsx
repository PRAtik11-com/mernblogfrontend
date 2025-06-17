import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";

 function Comment({ comment, handleLike, setShowModal, setCommentToDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [commentUser , setCommentUser] = useState("");
  const {user} =useSelector((state) => state.auth)

  const getcommentUser = async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/user/getuserinfo/${comment?.userId}`,{
        withCredentials:true
      })
      console.log(res.data.user);
      setCommentUser(res?.data?.user)
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error fetching commentuser");
    }
  }

  useEffect(()=>{
    getcommentUser();
  },[])

  return (
    <div className="flex p-4 border-b border-gray-200 hover:bg-gray-50 transition duration-300 rounded-md shadow-sm">
      <div className="mr-4">
        <img
          className="rounded-full w-10 h-10"
          src={commentUser?.profileImage?.split(":")[0] == "https" ? commentUser?.profileImage : `${import.meta.env.VITE_imageUrl}/user/${commentUser?.profileImage}`}
          alt={commentUser.name }
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-semibold text-gray-500 mr-2">@{commentUser?.name}</span>
          <span className="text-sm text-gray-500">{moment(comment?.createdAt).fromNow()}</span>
        </div>

        {isEditing ? (
          <>
            <textarea
              className="w-full border border-gray-300 rounded p-2 text-sm text-gray-500 mb-2 focus:outline-none focus:ring focus:ring-blue-300"
              defaultValue={comment?.comment}
            />
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                Save
              </button>
              <button
                className="px-3 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-2">{comment?.comment}</p>
            <div className="flex items-center gap-4 pt-2 border-t border-gray-200 text-sm">
              <button
                className="flex items-center text-gray-500 hover:text-blue-600 transition gap-1"
                onClick={() => handleLike?.(comment._id)}
              >
                <FaThumbsUp />
                <span>{comment?.numberOfLikes}</span>
              </button>

              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-yellow-600 transition"
              >
                Edit
              </button>
           { user?._id == comment?.userId && <div>
              <button
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => {
                  setCommentToDelete(comment);
                  setShowModal(true);
                }}
              >
                Delete
              </button>
              </div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;
