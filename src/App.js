import React from 'react';
import './App.css';
import AuthorsFrontend from './Authorsfrontend';
import Header from './Header.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostsfrontend from './BlogPostsfrontend.js';

function App() {
  return (
    <Router>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<AuthorsFrontend />} />
          <Route path="/authors/:authorId/blogPosts/:postId" element={<BlogPostsfrontend />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
