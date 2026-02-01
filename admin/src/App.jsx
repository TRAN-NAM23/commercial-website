import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ProductEdit from './pages/ProductEdit.jsx';
import ProductAdd from './pages/ProductAdd.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/product/edit/:id" element={<ProductEdit />} />
        <Route path="/add" element={<ProductAdd />} />
      </Routes>
    </Router>
  );
}

export default App;