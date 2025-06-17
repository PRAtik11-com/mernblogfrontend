import { Link } from "react-router-dom";

 function PostCard({ post }) {
  console.log(post);
  
  

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full border border-gray-100">
        <Link to={`/singlepost/${post._id}`}>
          <img
             src={post?.postImage?.split(":")[0] == "https" ? post?.postImage : `${import.meta.env.VITE_imageUrl}/post/${post?.postImage}`}
            alt="post cover"
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {post.title}
          </h2>
          <p className="text-sm text-gray-500 mb-4">{post.category}</p>
          <div className="mt-auto">
            <Link
              to={`/singlepost/${post._id}`}
              className="inline-block px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition duration-300 text-sm"
            >
              Read article
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard
