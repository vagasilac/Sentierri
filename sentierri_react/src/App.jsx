import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import sections from './components/sections/sections';
import { styled, useTheme } from '@mui/material/styles';
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
import NewCustomerPage from './components/customers/NewCustomerPage';
import Shop from './components/customers/Shop.jsx';
import CustomersPage from './components/customers/CustomersPage';
import ShopsPage from './components/customers/ShopsPage';
import Colors from './components/colors/Colors';
import ColorPage from './components/colors/ColorPage';
import NewColorPage from './components/colors/NewColorPage';

const drawerWidth = 240;
const MainContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  flexGrow: 1,
  marginLeft: open ? drawerWidth : '3rem',
  transition: theme.transitions.create('marginLeft', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

function App() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <Router>
      <MiniDrawer sections={sections} open={open} setOpen={setOpen} />
      <MainContent open={open}>
      {/* <div className='main light-theme'>  */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/raw-materials/" element={<RawMaterialsPage />} />
          <Route path="/raw-materials/new" element={<NewRawMaterialPage />} />
          <Route path="/raw_materials/:id" element={<RawMaterialPage />} />
          <Route path="/settings/categories/" element={<Categories />} />
          <Route path="/settings/categories/:id" element={<Category />} />
          <Route path="/settings/colors/" element={<Colors />} />
          <Route path="/settings/colors/:id" element={<ColorPage />} />
          <Route path="/settings/colors/new" element={<NewColorPage />} />
          <Route path="/suppliers/" element={<SuppliersPage />} />
          <Route path="/suppliers/:id" element={<SupplierPage />} />
          <Route path="/suppliers/new" element={<NewSupplierPage />} />
          <Route path="/customers/" element={<CustomersPage />} />
          <Route path="/customers/new" element={<NewCustomerPage />} />
          <Route path="/shops/" element={<ShopsPage />} />
          <Route path="/shops/:id" element={<Shop />} />
        </Routes>
      </MainContent>
      {/* </div> */}
    </Router>
  );
}

export default App;
