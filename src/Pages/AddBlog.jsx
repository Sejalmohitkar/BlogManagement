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
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Blog</h1>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          rows="5"
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-500"
        ></textarea>

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
