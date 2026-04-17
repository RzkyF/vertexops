'use client';

import { useState } from 'react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isCollapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

export default function Sidebar({ currentPage, onPageChange, isCollapsed, onToggle }: SidebarProps) {

  const menuItems = [
    { id: 'certification', label: 'Certification', icon: 'workspace_premium' },
    { id: 'personnel', label: 'Personnel Management', icon: 'badge' },
    { id: 'verification', label: 'Verification Checklist', icon: 'fact_check' },
    { id: 'user', label: 'User Management', icon: 'manage_accounts' },
    { id: 'log', label: 'System Log', icon: 'terminal' },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-50 sidebar-transition ${
        isCollapsed ? 'mini-sidebar' : 'full-sidebar'
      } hidden lg:flex flex-col`}
    >
      <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
        <button
          className="p-2 hover:bg-slate-100 rounded-lg text-primary transition-colors"
          onClick={() => onToggle(!isCollapsed)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className={`ml-4 font-extrabold text-xl tracking-tight text-primary overflow-hidden whitespace-nowrap ${
          isCollapsed ? 'hidden' : ''
        }`}>
          Vertex Global
        </span>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <a
            key={item.id}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold transition-all group cursor-pointer ${
              currentPage === item.id
                ? 'bg-[#dbeafe] text-[#00316b] font-bold'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
            onClick={() => onPageChange(item.id)}
          >
            <span className={`material-symbols-outlined shrink-0 ${
              currentPage === item.id ? 'fill-1' : 'group-hover:text-primary'
            } transition-colors`}>
              {item.icon}
            </span>
            <span className={`sidebar-text overflow-hidden whitespace-nowrap ${
              isCollapsed ? 'hidden' : ''
            }`}>
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
