import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../Store/blogThunk';
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author) {
      setError('All fields are required');
      return;
    }

    try {
      await dispatch(createBlog(formData)).unwrap();
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to add blog');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Add New Blog</h1>

        {error && <p className="text-red-600 mb-4 text-center font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
          />

          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
          ></textarea>

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
