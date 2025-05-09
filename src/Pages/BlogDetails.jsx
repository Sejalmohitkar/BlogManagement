import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogById } from '../Store/blogThunk';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { BlogById, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getBlogById(id));
  }, [dispatch, id]);

  if (loading === 'loading') {
    return <div className="flex items-center justify-center h-screen text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500 text-xl font-semibold">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Blog Details</h1>

        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-3">{BlogById?.title}</h2>

        <p className="text-gray-500 mb-4 italic">By {BlogById?.author}</p>

        <p className="text-gray-700 text-lg leading-relaxed mb-6">{BlogById?.content}</p>

        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 font-semibold"
        >
          Back to List
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
