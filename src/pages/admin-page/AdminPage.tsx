import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from '../../components/login-form/LoginForm';
import './AdminPage.scss';
import AdminContent from '../../components/admin-content/AdminContent';

const AdminPage = () => (
  <div className="admin-page">
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/panel" element={<AdminContent />} />
      <Route path="/" element={<Navigate to="/admin/login" />} />
    </Routes>
  </div>
);

export default AdminPage;
