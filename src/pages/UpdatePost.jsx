import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function UpdatePost() {
  const location = useLocation();
  const { Title, Category, Content } = location.state || {};
  const { postId } = useParams();
  const { user } = useSelector((state) => state.auth);
  console.log(user._id,postId);
  
  
  
  const navigate = useNavigate();

  const [Updateblog, setUpdateblog] = useState({
    title: Title,
    category: Category,
    content: Content,
    postImage: null,
  });

  const handlechange = (e) => {
    if (e.target.name === "postImage") {
      setUpdateblog({ ...Updateblog, [e.target.name]: e.target.files[0] });
    } else {
      setUpdateblog({ ...Updateblog, [e.target.name]: e.target.value });
    }
  };

  
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BaseUrl}/post/update/${user?._id}/${postId}`,
        {
          title: Updateblog.title,
          category: Updateblog.category,
          content: Updateblog.content,
          postImage: Updateblog.postImage,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      
      toast.success(res?.data?.message);
      // setUpdateblog(res?.data?.message)
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-[#fdf6f6] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Update Post</h1>

      <form className="space-y-6" onSubmit={handlesubmit}>
        {/* Title */}
        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            name="title"
            value={Updateblog.title}
            onChange={handlechange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block mb-1 font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={Updateblog.category}
            onChange={handlechange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="file" className="block mb-1 font-medium text-gray-700">
            Upload Image
          </label>
          <input
            id="file"
            type="file"
            name="postImage"
            onChange={handlechange}
            accept="image/*"
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label htmlFor="content" className="block mb-2 font-medium text-gray-700">
            Content
          </label>
          <ReactQuill
            theme="snow"
            value={Updateblog.content}
            onChange={handlechange}
            placeholder="Write something..."
            className="h-48"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 mt-10"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default UpdatePost;
