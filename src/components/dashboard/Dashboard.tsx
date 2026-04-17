'use client';

import { useState } from 'react';

interface Certification {
  id: string;
  clientName: string;
  index: string;
  type: string;
  product: string;
  status: string;
  stages: { label: string; status: string }[];
  la: string;
  auditor: string;
}

const mockCertifications: Certification[] = [
  {
    id: '1',
    clientName: 'PT Best International (Kipas Angin)',
    index: 'RPS.B25-003.1239',
    type: 'Multi-Track',
    product: 'elektronik',
    status: 'running',
    stages: [
      { label: 'Sertifikasi Awal', status: 'Sedang Review' },
      { label: 'PRL - PT BEST...', status: 'Evaluasi' },
      { label: 'PRL - Merek Sanken', status: 'Evaluasi (Sampling)' },
    ],
    la: 'MC',
    auditor: 'SJ',
  },
  {
    id: '2',
    clientName: 'Garmen Sejahtera Abadi (Baju)',
    index: 'RPS.B25-003.1240',
    type: 'Multi-Track',
    product: 'mainan',
    status: 'on-hold',
    stages: [
      { label: 'Surveilan 1', status: 'Tinjauan Permohonan' },
      { label: 'PRL Merek Samono', status: 'Tinjauan Permohonan' },
      { label: 'PRL Merek Sanken', status: 'Review' },
    ],
    la: 'AF',
    auditor: 'RD',
  },
  {
    id: '3',
    clientName: 'Tekno Home Solutions (Kulkas)',
    index: 'RPS.B25-003.1241',
    type: 'Perpanjangan',
    product: 'elektronik',
    status: 'completed',
    stages: [
      { label: 'Tahapan', status: 'Telah Terbit' },
    ],
    la: 'BW',
    auditor: 'ML',
  },
  {
    id: '4',
    clientName: 'Global Kabel Indotama (Kabel)',
    index: 'RPS.B25-003.1250',
    type: 'Awal',
    product: 'elektronik',
    status: 'running',
    stages: [
      { label: 'Tahapan', status: 'Tinjauan Permohonan' },
    ],
    la: 'AN',
    auditor: 'KL',
  },
  {
    id: '5',
    clientName: 'Cahaya Mandiri (Lampu LED)',
    index: 'RPS.B25-003.1261',
    type: 'Surveilan',
    product: 'elektronik',
    status: 'running',
    stages: [
      { label: 'Tahapan', status: 'Pengujian Lab' },
    ],
    la: 'ST',
    auditor: 'PT',
  },
  {
    id: '6',
    clientName: 'Maju Bersama (Mainan)',
    index: 'RPS.B25-003.1235',
    type: 'Awal',
    product: 'mainan',
    status: 'error',
    stages: [
      { label: 'Tahapan', status: 'Pending Evaluasi' },
    ],
    la: 'HP',
    auditor: 'RS',
  },
];

interface DashboardProps {
  onNewCertification: () => void;
}

export default function Dashboard({ onNewCertification }: DashboardProps) {
  const [certifications] = useState<Certification[]>(mockCertifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.index.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || cert.type.toLowerCase().includes(typeFilter.toLowerCase());
    const matchesProduct = !productFilter || cert.product === productFilter;
    const matchesStatus = !statusFilter || cert.status === statusFilter;
    return matchesSearch && matchesType && matchesProduct && matchesStatus;
  });

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'running':
        return {
          border: 'border-blue-100 border-l-blue-500',
          iconBg: 'bg-blue-50 border-blue-100',
          iconColor: 'text-blue-500',
          badge: 'bg-blue-600',
          badgeSecondary: 'bg-blue-800',
          stageBg: 'bg-blue-50/50 border-blue-100/50',
          stageText: 'text-blue-700',
          stageBorder: 'border-blue-200'
        };
      case 'on-hold':
        return {
          border: 'border-amber-100 border-l-amber-500',
          iconBg: 'bg-amber-50 border-amber-100',
          iconColor: 'text-amber-500',
          badge: 'bg-amber-600',
          badgeSecondary: 'bg-amber-800',
          stageBg: 'bg-amber-50/50 border-amber-100/50',
          stageText: 'text-amber-700',
          stageBorder: 'border-amber-200'
        };
      case 'completed':
        return {
          border: 'border-green-100 border-l-green-500',
          iconBg: 'bg-green-50 border-green-100',
          iconColor: 'text-green-500',
          badge: 'bg-green-600',
          badgeSecondary: 'bg-green-800',
          stageBg: 'bg-green-50/50 border-green-100/50',
          stageText: 'text-green-700',
          stageBorder: 'border-green-200'
        };
      case 'error':
        return {
          border: 'border-red-100 border-l-red-500',
          iconBg: 'bg-red-50 border-red-100',
          iconColor: 'text-red-500',
          badge: 'bg-red-600',
          badgeSecondary: 'bg-red-800',
          stageBg: 'bg-red-50/50 border-red-100/50',
          stageText: 'text-red-700',
          stageBorder: 'border-red-200'
        };
      default:
        return {
          border: 'border-slate-100 border-l-slate-500',
          iconBg: 'bg-slate-50 border-slate-100',
          iconColor: 'text-slate-500',
          badge: 'bg-slate-600',
          badgeSecondary: 'bg-slate-800',
          stageBg: 'bg-slate-50/50 border-slate-100/50',
          stageText: 'text-slate-700',
          stageBorder: 'border-slate-200'
        };
    }
  };

  const totalCertifications = certifications.length;
  const runningCount = certifications.filter(c => c.status === 'running').length;
  const onHoldCount = certifications.filter(c => c.status === 'on-hold').length;
  const completedCount = certifications.filter(c => c.status === 'completed').length;

  return (
    <main className="p-8 flex-1">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Certification Control Center</h1>
          <p className="text-slate-500 text-sm mt-1">Managing client pipelines and status across the organization.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-200/50 backdrop-blur border border-slate-200 p-1 rounded-xl flex">
            <button className="px-4 py-2 bg-white text-primary font-bold rounded-lg text-sm flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-sm">grid_view</span> Grid
            </button>
            <button className="px-4 py-2 text-slate-500 hover:text-primary font-medium rounded-lg text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">table_rows</span> Table
            </button>
          </div>
          <button
            className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[0.98] transition-all border border-primary/10"
            onClick={onNewCertification}
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span> New Certification
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:translate-y-[-2px]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Sertifikasi</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-primary">{totalCertifications}</p>
            <span className="text-green-500 text-xs font-bold flex items-center">+12% <span className="material-symbols-outlined text-xs">trending_up</span></span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm transition-all hover:translate-y-[-2px]">
          <p className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-1">Berjalan</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-blue-600">{runningCount}</p>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold">{Math.round((runningCount / totalCertifications) * 100)}% Rate</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm transition-all hover:translate-y-[-2px]">
          <p className="text-[10px] font-bold text-amber-500 uppercase tracking-wider mb-1">On Hold</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-amber-600">{onHoldCount}</p>
            <span className="material-symbols-outlined text-amber-500">pause_circle</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm transition-all hover:translate-y-[-2px]">
          <p className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-1">Selesai</p>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black text-green-600">{completedCount}</p>
            <span className="material-symbols-outlined text-green-500">check_circle</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-2 mb-8 shadow-sm flex flex-col md:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl">search</span>
          <input
            className="w-full pl-12 pr-4 py-3 bg-transparent border-none rounded-xl text-base font-medium placeholder:text-slate-400 focus:ring-0 transition-all"
            placeholder="Search Client Index or Certificate Number..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 px-2 md:px-0">
          <div className="relative group min-w-[140px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary">filter_list</span>
            <select
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary text-[12px] appearance-none transition-all uppercase tracking-tight"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Semua Tipe</option>
              <option value="tipe 1">Tipe 1</option>
              <option value="tipe 5">Tipe 5</option>
              <option value="batch">Batch / Lot</option>
            </select>
          </div>
          <div className="relative group min-w-[140px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary">inventory_2</span>
            <select
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary text-[12px] appearance-none transition-all uppercase tracking-tight"
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
            >
              <option value="">Semua Produk</option>
              <option value="elektronik">Elektronik</option>
              <option value="bangunan">Bahan Bangunan</option>
              <option value="mainan">Mainan Anak</option>
            </select>
          </div>
          <div className="relative group min-w-[140px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary">analytics</span>
            <select
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary text-[12px] appearance-none transition-all uppercase tracking-tight"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Semua Status</option>
              <option value="review">Review</option>
              <option value="pengujian">Pengujian</option>
              <option value="audit">Audit</option>
              <option value="terbit">Terbit</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCertifications.map((cert) => {
          const statusClasses = getStatusClasses(cert.status);
          return (
            <div key={cert.id} className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border-l-8 ${statusClasses.border}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 ${statusClasses.iconBg}`}>
                    <span className={`material-symbols-outlined text-xl ${statusClasses.iconColor}`}>
                      {cert.status === 'completed' ? 'check_circle' : cert.status === 'running' ? 'play_circle' : cert.status === 'on-hold' ? 'pause_circle' : 'error'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 leading-tight">{cert.clientName}</h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="px-1.5 py-0.5 bg-slate-50 rounded text-[9px] font-black text-slate-700 border border-slate-200 uppercase">{cert.index}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5 mb-4">
                <span className={`px-2.5 py-1 text-white rounded-full text-[8px] font-black uppercase tracking-wide ${statusClasses.badge}`}>{cert.type}</span>
                <span className={`px-2.5 py-1 text-white rounded-full text-[8px] font-black uppercase tracking-wide ${statusClasses.badgeSecondary}`}>Tipe: {cert.type.includes('5') ? '5' : '1'}</span>
              </div>
              <div className="space-y-2 mb-4">
                {cert.stages.map((stage, index) => (
                  <div key={index} className={`flex items-center justify-between rounded-xl px-3 py-2 border ${statusClasses.stageBg}`}>
                    <span className="text-[10px] font-bold text-slate-600 truncate mr-2">{stage.label}</span>
                    <span className={`text-[10px] font-extrabold whitespace-nowrap bg-white px-2 py-0.5 rounded-lg border ${statusClasses.stageText} ${statusClasses.stageBorder}`}>{stage.status}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-700 uppercase">
                  <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">LA: {cert.la}</span>
                  <span className="bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">AUDITOR: {cert.auditor}</span>
                </div>
                <button className="text-[10px] font-black text-primary flex items-center gap-1 hover:translate-x-1 transition-transform">
                  View Details <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm gap-4">
        <p className="text-xs font-bold text-slate-400">Menampilkan {filteredCertifications.length} dari {totalCertifications} data</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-2">Halaman:</span>
          <button className="w-8 h-8 rounded-lg bg-primary text-white text-xs font-black shadow-lg shadow-primary/20">1</button>
          <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors">2</button>
          <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors">3</button>
          <span className="text-slate-400">...</span>
          <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors">20</button>
          <button className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </main>
  );
}
