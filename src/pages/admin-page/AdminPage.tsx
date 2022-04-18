import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from '../../components/login-form/LoginForm';
import './AdminPage.scss';
import AdminContent from '../../components/admin-content/AdminContent';

const AdminPage = () => (
  <main className="admin-page">
    <Routes>
      {localStorage.getItem('auth-token')
        ? <Route path="/" element={<Navigate to="/admin/panel" />} />
        : <Route path="/" element={<Navigate to="/admin/login" />} />}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/panel" element={<AdminContent />} />
    </Routes>
  </main>
);

export default AdminPage;
