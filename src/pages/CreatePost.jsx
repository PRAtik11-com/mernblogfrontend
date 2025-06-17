import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";

 function CreatePost() {
     const [title, settitle] = useState("")
    const [content , setcontent] = useState("")
    const [category , setcategory] = useState("")

    const handleFormSubmit = async(e) => {
        e.preventDefault();
       try {
        const res = await axios.post(`${import.meta.env.VITE_BaseUrl}/post/createpost`,{title,content,category},{
            withCredentials:true
        })
        console.log(res.data)
        toast.success(res?.data?.message || "Post created successfully");
        settitle("");
        setcontent("");
        setcategory("uncategorized");
       } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something went wrong")
       }
        
    }
  return (
    <div className="max-w-3xl mx-auto min-h-screen p-6 " >
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Create a Post
      </h1>

      <form className="space-y-6 bg-[#fdf6f6] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300" onSubmit={handleFormSubmit}>
        {/* Title & Category */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <select
            className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            defaultValue={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>

        {/* React Quill Editor */}
        <div className="quill-wrapper">
          <ReactQuill
            theme="snow"
            placeholder="Write something..."
            className="h-48 mb-2"
            defaultValue={content}
            onChange={setcontent}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>

        {/* Publish Button */}
        <button
          type="submit"
          className="w-full md:w-1/3 mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-15"
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreatePost
