import { toast } from "react-toastify";
import PostCard from "../Components/PostCard";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function Search() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(4);
  const [search ,setsearch] = useState("")
  const [order ,setorder] = useState("")
  const [category, setCategory] = useState("")

  const getAllusers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BaseUrl}/post/getallposts/?limit=${limit}&search=${search}&order=${order}&category=${category}`,
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
    getAllusers();
  }, [limit,search,order,category]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Filters */}
      <div className="w-full md:w-1/3 p-6 bg-white border-r border-gray-300 shadow-sm">
        <form className="space-y-5">
          {/* Search Term */}
          <div className="flex flex-col">
            <label
              htmlFor="searchTerm"
              className="mb-1 font-semibold text-gray-700"
            >
              Search Term:
            </label>
            <input
              id="searchTerm"
              type="text"
              onChange={(e) => setsearch(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Sort */}
          <div className="flex flex-col">
            <label htmlFor="sort" className="mb-1 font-semibold text-gray-700">
              Sort:
            </label>
            <select
              id="sort"
              onChange={(e) => setorder(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="mb-1 font-semibold text-gray-700"
            >
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          {/* <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Apply Filters
          </button> */}
        </form>
      </div>

      {/* Results Section */}
      <div className="w-full md:w-2/3 p-6">
        <h1 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">
          Post Results:
        </h1>

        <div className="flex flex-wrap gap-6">
          {/* If no posts */}

          {posts && posts.length > 0 ? (
            posts.map((el) => <PostCard key={el._id} post={el} />)
          ) : (
            <p className="text-gray-500 text-lg">No posts found.</p>
          )}

          {/* Show More Button */}
          <button
            className="text-blue-600 hover:text-blue-800 font-medium transition"
            onClick={() => setLimit(limit + 2)}
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
