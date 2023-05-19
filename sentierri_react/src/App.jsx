import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import Sidebar from './components/common/Sidebar';
import sections from './components/sections/sections';
import './App.css';
import Navbar from './components/common/Navbar';
import actions from './navbarActions/navbarActions';
import RawMaterialsPage from './components/raw_materials/RawMaterialsPage';
import RawMaterialPage from './components/raw_materials/RawMaterialPage';
import NewRawMaterialPage from './components/raw_materials/NewRawMaterialPage';
import Categories from './components/categories/Categories';
import Category from './components/categories/Category';
import SuppliersPage from './components/suppliers/SuppliersPage';
import NewSupplierPage from './components/suppliers/NewSupplierPage';
import SupplierPage from './components/suppliers/SupplierPage';

function App() {
  const brand = 'Sentierri ERP';

  return (
    <Router>
      <Navbar brand={brand} actions={actions} />
      <div className='main light-theme'> 
        <Sidebar sections={sections} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/raw-materials/" element={<RawMaterialsPage />} />
          <Route path="/raw-materials/new" element={<NewRawMaterialPage />} />
          <Route path="/raw_materials/:id" element={<RawMaterialPage />} />
          <Route path="/settings/categories/" element={<Categories />} />
          <Route path="/settings/categories/:id" element={<Category />} />
          <Route path="/suppliers/" element={<SuppliersPage />} />
          <Route path="/suppliers/:id" element={<SupplierPage />} />
          <Route path="/suppliers/new" element={<NewSupplierPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;