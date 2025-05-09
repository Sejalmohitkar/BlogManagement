import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBlogById, updateBlog } from '../Store/blogThunk';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const EditBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const blogFromState = location.state?.blog;

  const [originalBlog, setOriginalBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [error, setError] = useState('');

  const populateFormData = (blog) => {
    setOriginalBlog(blog);
    setFormData({
      title: blog.title || '',
      content: blog.content || '',
      author: blog.author || '',
    });
  };

  useEffect(() => {
    if (blogFromState) {
      populateFormData(blogFromState);
    } else {
      dispatch(getBlogById(id))
        .then((res) => {
          if (res.payload) {
            populateFormData(res.payload);
          } else {
            setError('Failed to fetch blog details');
          }
        })
        .catch(() => setError('Failed to fetch blog details'));
    }
  }, [blogFromState, dispatch, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalBlog) {
      setError('Original blog data not loaded');
      return;
    }

    const updatedData = {};

    if (formData.title && formData.title !== originalBlog.title) {
      updatedData.title = formData.title;
    }
    if (formData.content && formData.content !== originalBlog.content) {
      updatedData.content = formData.content;
    }
    if (formData.author && formData.author !== originalBlog.author) {
      updatedData.author = formData.author;
    }

    if (Object.keys(updatedData).length === 0) {
      alert('No changes to update.');
      return;
    }

    try {
      await dispatch(updateBlog({ id, updatedData })).unwrap();
      alert('Blog updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating blog:', err);
      setError('Failed to update blog');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-800">Update Blog</h1>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {!originalBlog ? (
          <p className="text-center text-gray-600">Loading blog details...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />

            <textarea
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleChange}
              rows="5"
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            ></textarea>

            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            />

            <button
              type="submit"
              className="flex items-center justify-center w-[170px] py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition shadow-md hover:shadow-lg"
            >
              Update Blog
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditBlog;
