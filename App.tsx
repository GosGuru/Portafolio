
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <PortfolioProvider>
      <AuthProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </PortfolioProvider>
  );
}

export default App;
