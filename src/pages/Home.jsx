import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const {user} = useSelector((state) => state.auth)
  console.log(user);
  
  
  const [posts, setPosts] = useState([]);
  const [limit] = useState(0);
 

  const getAlldatapost = async () => {
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

  useEffect(() => {
    getAlldatapost();
  }, [limit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 text-gray-800 pb-15">
      {/* Hero Section */}
      <div className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to DevBlog
        </h1>
        <p className="text-lg text-gray-600">
          Discover tutorials, guides, and insights from developers worldwide.
        </p>
      </div>

      {/* Latest Articles Section */}
      <section>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center ">
            Latest Articles
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-xl transition duration-300"
              >
                <img
                  src={
                    post?.postImage?.split(":")[0] == "https"
                      ? post?.postImage
                      : `${import.meta.env.VITE_imageUrl}/post/${
                          post?.postImage
                        }`
                  }
                  alt={post.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3" dangerouslySetInnerHTML={{ __html: post?.content }}>
                  </p>
                  <Link
                    to={`/singlepost/${post._id}`}
                    className="inline-block mt-4 text-sm text-blue-500 hover:underline"
                  >
                    Read full article →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
