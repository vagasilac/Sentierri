import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import sections from './components/sections/sections';
import './App.css';
import MiniDrawer from './components/common/MiniDrawer';
import RawMaterialsPage from './components/raw_materials/RawMaterialsPage';
import RawMaterialPage from './components/raw_materials/RawMaterialPage';
import NewRawMaterialPage from './components/raw_materials/NewRawMaterialPage';
import Categories from './components/categories/Categories';
import Category from './components/categories/Category';
import SuppliersPage from './components/suppliers/SuppliersPage';
import NewSupplierPage from './components/suppliers/NewSupplierPage';
import SupplierPage from './components/suppliers/SupplierPage';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <Router>
      <MiniDrawer sections={sections} open={open} setOpen={setOpen} />
      {/* <div className='main light-theme'>  */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: open ? drawerWidth : 0, // adjust the marginLeft property based on the open state
          transition: theme.transitions.create('marginLeft', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
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
      </Box>
      {/* </div> */}
    </Router>
  );
}

export default App;
