import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogList from './Pages/BlogList';
import AddBlog from './Pages/AddBlog';
import EditBlog from './Pages/EditBlog';
import BlogDetails from './Pages/BlogDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogList/>} />
        <Route path="/add" element={<AddBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
