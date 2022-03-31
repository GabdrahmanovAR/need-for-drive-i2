import React from 'react';
import './AdminContent.scss';
import Sidebar from './sidebar/Sidebar';
import Header from './header/Header';

const AdminContent = () => (
  <main className="admin-content">
    <Sidebar />
    <section className="admin-content__main">
      <Header />
    </section>
  </main>
);

export default AdminContent;
