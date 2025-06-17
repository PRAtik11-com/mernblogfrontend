import React from "react";
import moment from "moment";
import CommentSection from "../Components/CommentSection";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";

function BlogDetail() {
  const { postId } = useParams();
  console.log(postId);
  const [post, setPost] = React.useState({});

  const getAllusers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/post/getsinglepost/${postId}`,
        {
          withCredentials: true,
        }
      );

      setPost(res?.data?.post || []);
      toast.success(res?.data?.post || "Posts fetched successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error fetching posts");
    }
  };

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Blog Post Section */}
      <div className="flex justify-center mb-8">
        <div className="w-full md:w-3/4">
          <div className="text-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            {/* Blog Image */}
            <img
              src={
                post?.postImage?.split(":")[0] == "https"
                  ? post?.postImage
                  : `${import.meta.env.VITE_imageUrl}/post/${post?.postImage}`
              }
              alt="Blog Title"
              className="w-full h-96 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
            />
            {/* Blog Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {post.title}
            </h2>
            {/* Timestamp */}
            <p className="text-sm text-gray-500">
              {moment(post?.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
            {/* Blog Content */}
            <div
              className="text-gray-700 mt-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post?.content }}
            ></div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <CommentSection postId={postId} />
    </div>
  );
}

export default BlogDetail;
