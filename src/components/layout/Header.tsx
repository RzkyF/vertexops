'use client';

import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Header({ currentPage, onPageChange }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getBreadcrumb = () => {
    const breadcrumbs = {
      certification: ['Dashboard', 'Certification'],
      personnel: ['Dashboard', 'Personnel Management'],
      verification: ['Dashboard', 'Verification Checklist'],
      user: ['Dashboard', 'User Management'],
      log: ['Dashboard', 'System Log'],
    };
    return breadcrumbs[currentPage as keyof typeof breadcrumbs] || ['Dashboard'];
  };

  const breadcrumbs = getBreadcrumb();

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <nav aria-label="Breadcrumb" className="flex text-sm font-medium text-slate-400">
          <ol className="flex items-center space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="material-symbols-outlined text-sm">chevron_right</span>}
                <span
                  className={`hover:text-primary cursor-pointer ${
                    index === breadcrumbs.length - 1 ? 'text-primary font-bold' : ''
                  }`}
                  onClick={() => index === 0 ? onPageChange('certification') : null}
                >
                  {crumb}
                </span>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 text-slate-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>
        <div className="relative">
          <button
            className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-slate-50 rounded-xl transition-all group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-bold text-slate-900 leading-none">Admin Center</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">Super Admin</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/5 overflow-hidden">
              <img
                alt="User"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr9TtMByc7hP393n7fKN8Gm6QdDqrsgAm52iU62c-yocl-Ub5dWO4iAKY2uKMNuzZ1UhoPg1vlAVXys3xmbrIMsE4axXAINxerfWB0a1Q473S32oFYqgf5fTIJG27Dv5arjhEJ3DVSD4wBnHxmCh0q6JWLAjM-RshpyIHyOhb3RwaGyZz9IZedeP5wsEKgQPX4FRYFhhEJ-SqSMC6nVhCpV35_zom3aamDsyhFr02t_NpJ9rjBYgliAtIOHh84oXuXWS4VaX84pkpk"
              />
            </div>
            <span className="material-symbols-outlined text-slate-400 text-lg group-hover:text-primary transition-colors">
              expand_more
            </span>
          </button>
          <div className={`dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 overflow-hidden ${isDropdownOpen ? 'active' : ''}`}>
            <a className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors" href="#">
              <span className="material-symbols-outlined text-slate-400 text-lg">person</span> Profile
            </a>
            <div className="h-[1px] bg-slate-100 my-1"></div>
            <a className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors" href="#">
              <span className="material-symbols-outlined text-lg">logout</span> Logout
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
