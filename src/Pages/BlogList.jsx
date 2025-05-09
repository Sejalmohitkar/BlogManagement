import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, deleteBlog } from '../Store/blogThunk';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const dispatch = useDispatch();
  const { blogList, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await dispatch(deleteBlog(id)).unwrap();
        alert('Blog deleted successfully!');
        dispatch(getAllBlogs());
      } catch (err) {
        alert('Error deleting blog. Please try again.');
        console.error('Delete error:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-xl font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Blog List</h1>
          <Link
            to="/add"
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full transition shadow-lg transform hover:scale-105"
          >
            Add New Blog
          </Link>
        </div>

        {blogList && blogList.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogList.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-5 flex flex-col justify-between"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">
                  {blog.content.length > 150 ? blog.content.substring(0, 150) + '...' : blog.content}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="flex-1 text-center py-1 rounded-lg  text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition text-sm shadow-md hover:shadow-lg"
                  >
                    Read More
                  </Link>
                  <Link
                    to={`/edit/${blog._id}`}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700  hover:to-green-500  text-white text-center py-1 rounded-lg transition text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white text-center py-1 rounded-lg transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
