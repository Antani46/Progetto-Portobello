import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage/Homepage.jsx';
import Catalog from '../pages/Catalog/Catalog.jsx';
import ProductDetail from '../pages/ProductDetail/ProductDetail.jsx';
import ContactPage from '../pages/Contact/ContactPage.jsx';
import Login from '../pages/Login/Login.jsx';
import UserProfile from '../pages/UserProfile/UserProfile.jsx';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard.jsx';
import AddProductPage from '../pages/AddProductPage/AddProductPage.jsx';
import EditProductPage from '../pages/EditProductPage/EditProductPage.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';
import PrivateRoute from '../components/auth/PrivateRoute.jsx';
import Layout from '../components/layout/Layout.jsx';

function AppRouter() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/catalogo/:id" element={<ProductDetail />} />
          <Route path="/contatti" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profilo"
            element={
              <PrivateRoute><UserProfile /></PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute requiredRole="Admin"><AdminDashboard /></PrivateRoute>
            }
          />
          <Route
            path="/admin/new-product"
            element={
              <PrivateRoute requiredRole="Admin"><AddProductPage /></PrivateRoute>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <PrivateRoute requiredRole="Admin"><EditProductPage /></PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default AppRouter; 
