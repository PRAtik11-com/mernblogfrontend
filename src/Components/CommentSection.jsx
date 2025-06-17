import React, { useState, useEffect } from 'react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Comment from './Comment'; // Your custom comment component
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

 function CommentSection({postId}) {
  const {user} = useSelector((state) => state.auth);
  console.log(user?._id,postId);
  

  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const getSinglepostcommentlist = async () =>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_BaseUrl}/comment/getpostcomment/${postId}`,{
        withCredentials:true
      })
      setComments(res?.data?.comments);
      toast.success(res?.data?.comments || "comment fetched successfully.")
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error fetching comments');
    }
  }

  useEffect(() => {
    getSinglepostcommentlist()
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError('Comment exceeds the character limit of 200.');
      return;
    }

      try {
      const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/comment/commentcreate`,{userId : user?._id,postId,comment},{
        withCredentials:true
      });
      console.log(res.data.message);
      toast.success(res?.data?.message || 'Comment created successfully!');
      setComment("")

    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error creating comment');
    }
  }


  const handleLike =async (commentId) => {
    console.log(commentId);
    try {
      const res = await axios.patch(`${import.meta.env.VITE_BaseUrl}/comment/like/${user?._id}/${commentId}`,{},{
        withCredentials : true,
      })
      console.log(res.data.message);
      getSinglepostcommentlist()
      toast.success(res?.data?.message || 'Comment liked successfully!')
      
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || 'Error liking comment');
    }
    
  };

  const handleDelete = () => {
    setComments(comments.filter((comment) => comment._id !== commentToDelete));
    setShowModal(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-xl shadow-md transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          placeholder="Add a comment..."
          rows="3"
          maxLength="200"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <div className="flex justify-between items-center mt-2 text-sm">
          <p className="text-gray-500">{200 - comment.length} characters remaining</p>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
          >
            Submit
          </button>
        </div>
        {commentError && (
          <p className="mt-3 text-red-500 text-sm">{commentError}</p>
        )}
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Comments ({comments.length})</h3>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet!</p>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              handleLike={handleLike}
              setShowModal={setShowModal}
              setCommentToDelete={setCommentToDelete}
            />
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-300">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl w-[90%] max-w-md text-center">
            <HiOutlineExclamationCircle className="text-red-500 mx-auto mb-4" size={48} />
            <h4 className="text-lg font-semibold mb-4">Are you sure you want to delete this comment?</h4>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                onClick={handleDelete}
              >
                Yes, delete
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentSection;