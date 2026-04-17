'use client';

import { useState } from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Dashboard from './dashboard/Dashboard';
import CertificationForm from './dashboard/CertificationForm';

export default function App() {
  const [currentPage, setCurrentPage] = useState('certification');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setIsFormOpen(false);
  };

  const handleNewCertification = () => {
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      <div className={`sidebar-transition min-h-screen flex flex-col flex-1 ${
        isSidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[320px]'
      }`}>
        <Header currentPage={currentPage} onPageChange={handlePageChange} />
        {isFormOpen ? (
          <CertificationForm onCancel={handleCancelForm} />
        ) : (
          <Dashboard onNewCertification={handleNewCertification} />
        )}
        <Footer />
      </div>
    </div>
  );
}