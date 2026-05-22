'use client';

import { useEffect, useMemo, useState } from 'react';
import SimpleBar from 'simplebar-react';

interface Certification {
  id: string;
  clientName: string;
  index: string;
  type: string;
  product: string;
  status: string;
  stages: { label: string; status: string; tone?: StageTone }[];
  la: string;
  auditor: string;
  company?: string;
  factory?: string;
  brand?: string;
  auditorName?: string;
  auditDate?: string;
  samplingDate?: string;
  reviewerName?: string;
  reviewDate?: string;
  certDate?: string;
  region?: string;
}

type StageTone = 'amber' | 'blue' | 'indigo' | 'emerald' | 'red' | 'slate';

type ModalId = 'modalEdit' | 'modalAddTask' | 'modalProgress' | 'modalDelete';

const mockCertifications: Certification[] = [
  {
    id: '1',
    clientName: 'PT Best International (Kipas Angin)',
    index: 'RPS.B25-003.1239',
    type: 'Tipe 5',
    product: 'Electric juicer',
    status: 'running',
    stages: [
      { label: 'Sertifikasi Awal', status: 'Sedang Review', tone: 'amber' },
      { label: 'PRL - PT BEST INTERNATIONAL', status: 'Evaluasi', tone: 'blue' },
      { label: 'PRL - Merek Sanken', status: 'Evaluasi (Sampling)', tone: 'indigo' },
    ],
    la: 'MC',
    auditor: 'SJ',
    company: 'PT BEST INTERNATIONAL',
    factory: 'PT BEST - FACTORY A',
    brand: 'SANKEN',
    auditorName: 'Susilo',
    auditDate: '15-17 Jan 2024',
    samplingDate: '15-17 Jan 2024',
    reviewerName: 'Fajar Subhan',
    reviewDate: '20 Jan 2024',
    certDate: '-',
    region: 'Dalam Negeri',
  },
  {
    id: '2',
    clientName: 'Garmen Sejahtera Abadi (Baju)',
    index: 'RPS.B25-003.1240',
    type: 'Tipe 5',
    product: 'mainan',
    status: 'on-hold',
    stages: [
      { label: 'Surveilan 1', status: 'Tinjauan Permohonan', tone: 'amber' },
      { label: 'PRL Merek Samono', status: 'Tinjauan Permohonan', tone: 'blue' },
      { label: 'PRL Merek Sanken', status: 'Review', tone: 'indigo' },
    ],
    la: 'AF',
    auditor: 'RD',
    company: 'PT GARMEN SEJAHTERA',
    factory: 'PT GARMEN - FACTORY B',
    brand: 'GARMEN+',
    auditorName: 'Rahmat',
    auditDate: '22-24 Jan 2024',
    samplingDate: '22-24 Jan 2024',
    reviewerName: 'Fajar Subhan',
    reviewDate: '28 Jan 2024',
    certDate: '-',
    region: 'Dalam Negeri',
  },
  {
    id: '3',
    clientName: 'Tekno Home Solutions (Kulkas)',
    index: 'RPS.B25-003.1241',
    type: 'Perpanjangan',
    product: 'elektronik',
    status: 'completed',
    stages: [
      { label: 'Tahapan', status: 'Telah Terbit', tone: 'emerald' },
    ],
    la: 'BW',
    auditor: 'ML',
    company: 'TEKNO HOME SOLUTIONS',
    factory: 'TEKNO CHINA LTD.',
    brand: 'TEKNO+',
    auditorName: 'Susilo',
    auditDate: '02-04 Feb 2024',
    samplingDate: '02-04 Feb 2024',
    reviewerName: 'Rahmat',
    reviewDate: '10 Feb 2024',
    certDate: '1 Maret 2024',
    region: 'Luar Negeri',
  },
  {
    id: '4',
    clientName: 'Global Kabel Indotama (Kabel)',
    index: 'RPS.B25-003.1250',
    type: 'Awal',
    product: 'elektronik',
    status: 'running',
    stages: [
      { label: 'Tahapan', status: 'Tinjauan Permohonan', tone: 'amber' },
    ],
    la: 'AN',
    auditor: 'KL',
    company: 'PT GLOBAL KABEL',
    factory: 'PT GLOBAL - FACTORY C',
    brand: 'GLOBAL KABEL',
    auditorName: 'Susilo',
    auditDate: '05-07 Feb 2024',
    samplingDate: '05-07 Feb 2024',
    reviewerName: 'Fajar Subhan',
    reviewDate: '12 Feb 2024',
    certDate: '-',
    region: 'Dalam Negeri',
  },
  {
    id: '5',
    clientName: 'Cahaya Mandiri (Lampu LED)',
    index: 'RPS.B25-003.1261',
    type: 'Surveilan',
    product: 'elektronik',
    status: 'running',
    stages: [
      { label: 'Tahapan', status: 'Pengujian Lab', tone: 'blue' },
    ],
    la: 'ST',
    auditor: 'PT',
    company: 'PT CAHAYA MANDIRI',
    factory: 'PT CAHAYA - FACTORY D',
    brand: 'CAHAYA LED',
    auditorName: 'Susilo',
    auditDate: '08-10 Feb 2024',
    samplingDate: '08-10 Feb 2024',
    reviewerName: 'Rahmat',
    reviewDate: '15 Feb 2024',
    certDate: '-',
    region: 'Dalam Negeri',
  },
  {
    id: '6',
    clientName: 'Maju Bersama (Mainan)',
    index: 'RPS.B25-003.1235',
    type: 'Awal',
    product: 'mainan',
    status: 'error',
    stages: [
      { label: 'Tahapan', status: 'Pending Evaluasi', tone: 'red' },
    ],
    la: 'HP',
    auditor: 'RS',
    company: 'PT MAJU BERSAMA',
    factory: 'PT MAJU - FACTORY E',
    brand: 'MAJU+',
    auditorName: 'Rahmat',
    auditDate: '12-14 Feb 2024',
    samplingDate: '12-14 Feb 2024',
    reviewerName: 'Fajar Subhan',
    reviewDate: '18 Feb 2024',
    certDate: '-',
    region: 'Luar Negeri',
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
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  const filteredCertifications = certifications.filter(cert => {
    const matchesSearch = cert.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.index.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || cert.type.toLowerCase().includes(typeFilter.toLowerCase());
    const matchesProduct = !productFilter || cert.product === productFilter;
    const matchesStatus = !statusFilter || cert.status === statusFilter;
    return matchesSearch && matchesType && matchesProduct && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCertifications.length / limit);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCertifications = filteredCertifications.slice(startIndex, endIndex);

  // Reset page when filters change
  const handleFilterChange = (callback: () => void) => {
    setCurrentPage(1);
    callback();
  };

  const openModal = (modalId: ModalId) => setActiveModal(modalId);
  const closeModals = () => setActiveModal(null);

  useEffect(() => {
    if (!activeModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModals();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activeModal]);

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

  const stageToneClasses = useMemo(() => {
    const map: Record<StageTone, { dot: string; text: string; badge: string; segmentOn: string; segmentOff: string }> = {
      amber: {
        dot: 'bg-amber-500',
        text: 'text-amber-600',
        badge: 'bg-amber-100 text-amber-700',
        segmentOn: 'bg-amber-500',
        segmentOff: 'border border-amber-200 bg-amber-50',
      },
      blue: {
        dot: 'bg-blue-500',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-700',
        segmentOn: 'bg-blue-500',
        segmentOff: 'border border-blue-200 bg-blue-50',
      },
      indigo: {
        dot: 'bg-indigo-500',
        text: 'text-indigo-600',
        badge: 'bg-indigo-100 text-indigo-700',
        segmentOn: 'bg-indigo-500',
        segmentOff: 'border border-indigo-200 bg-indigo-50',
      },
      emerald: {
        dot: 'bg-emerald-500',
        text: 'text-emerald-600',
        badge: 'bg-emerald-100 text-emerald-700',
        segmentOn: 'bg-emerald-500',
        segmentOff: 'border border-emerald-200 bg-emerald-50',
      },
      red: {
        dot: 'bg-red-500',
        text: 'text-red-600',
        badge: 'bg-red-100 text-red-700',
        segmentOn: 'bg-red-500',
        segmentOff: 'border border-red-200 bg-red-50',
      },
      slate: {
        dot: 'bg-slate-400',
        text: 'text-slate-600',
        badge: 'bg-slate-100 text-slate-700',
        segmentOn: 'bg-slate-400',
        segmentOff: 'border border-slate-200 bg-slate-50',
      },
    };
    return map;
  }, []);

  const getStageTone = (stage: Certification['stages'][number]): StageTone => stage.tone ?? 'slate';

  const totalCertifications = certifications.length;
  const runningCount = certifications.filter(c => c.status === 'running').length;
  const onHoldCount = certifications.filter(c => c.status === 'on-hold').length;
  const completedCount = certifications.filter(c => c.status === 'completed').length;

  return (
    <main className="p-8 flex-1">
      {/* Modals */}
      <div
        className={`focused-modal fixed inset-0 z-[100] items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm ${activeModal === 'modalEdit' ? 'active' : ''}`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModals();
        }}
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 overflow-hidden relative">
          <button
            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
            onClick={closeModals}
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-primary tracking-tight">Edit Data Sertifikasi</h2>
            <p className="text-slate-500 font-medium">Pilih jenis data yang ingin Anda perbarui</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="flex flex-col items-center p-8 border-2 border-slate-100 rounded-3xl hover:border-primary hover:bg-blue-50/30 transition-all group text-center" type="button">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">edit_document</span>
              </div>
              <h3 className="font-extrabold text-slate-900">Sertifikasi Awal</h3>
              <p className="text-[11px] text-slate-400 font-bold mt-2 uppercase tracking-wider">Update Data Awal</p>
            </button>
            <button className="flex flex-col items-center p-8 border-2 border-slate-100 rounded-3xl hover:border-primary hover:bg-blue-50/30 transition-all group text-center" type="button">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/5 flex items-center justify-center text-amber-600 mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">visibility</span>
              </div>
              <h3 className="font-extrabold text-slate-900">Surveilan</h3>
              <p className="text-[11px] text-slate-400 font-bold mt-2 uppercase tracking-wider">Update Data Pengawasan</p>
            </button>
            <button className="flex flex-col items-center p-8 border-2 border-slate-100 rounded-3xl hover:border-primary hover:bg-blue-50/30 transition-all group text-center" type="button">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/5 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">add_business</span>
              </div>
              <h3 className="font-extrabold text-slate-900">PRL</h3>
              <p className="text-[11px] text-slate-400 font-bold mt-2 uppercase tracking-wider">Perluasan Ruang Lingkup</p>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`focused-modal fixed inset-0 z-[100] items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm ${activeModal === 'modalAddTask' ? 'active' : ''}`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModals();
        }}
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 overflow-hidden relative">
          <button className="absolute top-6 right-6 text-slate-400 hover:text-slate-600" onClick={closeModals} type="button">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-primary tracking-tight">Tambah Task Baru</h2>
            <p className="text-slate-500 font-medium">Pilih kategori tugas untuk ditambahkan ke pipeline</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="p-6 border-2 border-slate-100 rounded-3xl hover:border-blue-500 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-blue-600">add_task</span>
                  <h3 className="font-extrabold text-slate-900">PRL</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full py-2 px-3 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold text-slate-600 transition-colors text-left flex justify-between items-center" type="button">
                    PRL Merek <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                  <button className="w-full py-2 px-3 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold text-slate-600 transition-colors text-left flex justify-between items-center" type="button">
                    PRL Importir <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-6 border-2 border-slate-100 rounded-3xl hover:border-emerald-500 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-emerald-600">published_with_changes</span>
                  <h3 className="font-extrabold text-slate-900">Perubahan Sertifikat</h3>
                </div>
                <div className="space-y-2">
                  <button className="w-full py-2 px-3 bg-slate-50 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold text-slate-600 transition-colors text-left flex justify-between items-center" type="button">
                    Perubahan Nomenklatur <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                  <button className="w-full py-2 px-3 bg-slate-50 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold text-slate-600 transition-colors text-left flex justify-between items-center" type="button">
                    Perubahan Komponen <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
            <button className="flex flex-col items-center justify-center p-6 border-2 border-slate-100 rounded-3xl hover:border-red-500 hover:bg-red-50/30 transition-all group text-center" type="button">
              <div className="w-12 h-12 rounded-xl bg-red-500/5 flex items-center justify-center text-red-600 mb-3 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl">cancel</span>
              </div>
              <h3 className="font-extrabold text-slate-900">Drop Sertifikat</h3>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Hentikan Proses</p>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`focused-modal fixed inset-0 z-[100] items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm ${activeModal === 'modalProgress' ? 'active' : ''}`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModals();
        }}
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 overflow-hidden relative">
          <button className="absolute top-6 right-6 text-slate-400 hover:text-slate-600" onClick={closeModals} type="button">
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-primary tracking-tight">Lanjutkan Progress</h2>
            <p className="text-slate-500 font-medium">Daftar task yang sedang berjalan pada klien ini</p>
          </div>
          <div className="space-y-4">
            {(paginatedCertifications[0]?.stages ?? []).slice(0, 2).map((stage, i) => {
              const tone = getStageTone(stage);
              const toneClass = stageToneClasses[tone];
              return (
                <div
                  key={i}
                  className="p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors group flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${toneClass.badge}`}>
                      <span className="material-symbols-outlined text-xl">play_arrow</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{stage.label}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-black text-slate-400 uppercase">Status:</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${toneClass.badge}`}>
                          {stage.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent w-8 h-8 flex items-center justify-center"
                      onClick={() => openModal('modalDelete')}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                    <button
                      className="bg-primary text-center text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary/90"
                      type="button"
                    >
                      Lanjutkan
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`focused-modal fixed inset-0 z-[110] items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm ${activeModal === 'modalDelete' ? 'active' : ''}`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModals();
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">delete</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-2">Konfirmasi Hapus</h3>
          <p className="text-slate-500 text-sm mb-8 font-medium">
            Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div className="flex gap-3">
            <button
              className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              onClick={closeModals}
              type="button"
            >
              Batal
            </button>
            <button
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-200 hover:bg-red-700 transition-colors"
              type="button"
              onClick={closeModals}
            >
              Hapus Data
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Certification Control Center</h1>
          <p className="text-slate-500 text-sm mt-1">Managing client pipelines and status across the organization.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-200/50 backdrop-blur border border-slate-200 p-1 rounded-xl flex">
            <button 
              className={`px-4 py-2 font-medium rounded-lg text-sm flex items-center gap-2 transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-primary font-bold shadow-sm' 
                  : 'text-slate-500 hover:text-primary'
              }`}
              onClick={() => setViewMode('grid')}
            >
              <span className="material-symbols-outlined text-sm">grid_view</span> Grid
            </button>
            <button 
              className={`px-4 py-2 font-medium rounded-lg text-sm flex items-center gap-2 transition-all ${
                viewMode === 'table' 
                  ? 'bg-white text-primary font-bold shadow-sm' 
                  : 'text-slate-500 hover:text-primary'
              }`}
              onClick={() => setViewMode('table')}
            >
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
            onChange={(e) => handleFilterChange(() => setSearchTerm(e.target.value))}
          />
        </div>
        <div className="h-8 w-[1px] bg-slate-200 hidden md:block"></div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 px-2 md:px-0">
          <div className="relative group min-w-[140px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary">filter_list</span>
            <select
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary text-[12px] appearance-none transition-all uppercase tracking-tight"
              value={typeFilter}
              onChange={(e) => handleFilterChange(() => setTypeFilter(e.target.value))}
            >
              <option value="">Semua Tipe</option>
              <option value="tipe1b">Tipe 1B</option>
              <option value="tipe5">Tipe 5</option>
              <option value="tipe1a">Tipe 1A</option>

            </select>
          </div>
          <div className="relative group min-w-[140px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-primary">inventory_2</span>
            <select
              className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-4 focus:ring-primary/5 focus:border-primary text-[12px] appearance-none transition-all uppercase tracking-tight"
              value={productFilter}
              onChange={(e) => handleFilterChange(() => setProductFilter(e.target.value))}
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
              onChange={(e) => handleFilterChange(() => setStatusFilter(e.target.value))}
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

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedCertifications.map((cert) => {
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
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Custom, draggable horizontal scrollbar (always visible) */}
          <SimpleBar
            forceVisible="x"
            autoHide={false}
            style={{ maxWidth: '100%', maxHeight: 560 }}
          >
            <table
              className="w-full custom-table"
              style={{ minWidth: 2600, borderCollapse: 'separate', borderSpacing: 0 }}
            >
              <thead>
                <tr>
                  <th className="text-center sticky-no-col">No</th>
                  <th className="text-left sticky-identity-col">Client Identity</th>
                  <th className="text-left w-[120px]">Tipe</th>
                  <th className="text-left min-w-[120px] grid-header-compact">Perusahaan</th>
                  <th className="text-left min-w-[140px] grid-header-compact">Produk</th>
                  <th className="text-left min-w-[80px] grid-header-compact">Merek</th>
                  <th className="text-left min-w-[280px]">Project Track</th>
                  <th className="text-left w-[140px]">Auditor</th>
                  <th className="text-left w-[100px]">Tgl Audit</th>
                  <th className="text-left w-[100px]">Tgl Sampling</th>
                  <th className="text-left w-[140px]">Reviewer</th>
                  <th className="text-left w-[100px]">Review Date</th>
                  <th className="text-left">Tgl Terbit</th>
                  <th className="text-right w-[140px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCertifications.map((cert, idx) => (
                  <tr key={cert.id} className="group">
                    <td className="text-center align-middle border-r border-slate-50 sticky-no-col">
                      <span className="text-xs font-black text-slate-400">{idx + 1}</span>
                    </td>
                    <td className="border-r border-slate-50 sticky-identity-col">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 text-primary shrink-0">
                          <span className="material-symbols-outlined text-lg">corporate_fare</span>
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-[12px] font-extrabold text-slate-900 leading-tight truncate">{cert.clientName}</h4>
                          <p className="text-[9px] font-bold text-slate-400 mt-0.5 uppercase tracking-tight">{cert.index}</p>
                          <div className="mt-1">
                            <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-[7px] font-black uppercase tracking-wide border border-blue-100">{cert.region}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border-r border-slate-50 align-middle">
                      <span className="px-1 py-1 bg-slate-100 text-slate-700 rounded-lg text-[9px] font-black uppercase tracking-wide border border-slate-200">{cert.type}</span>
                    </td>
                    <td className="grid-compact-col">
                      {cert.company || cert.clientName}
                    </td>
                    <td className="grid-compact-col">
                      {cert.product}
                    </td>
                    <td className="grid-compact-col">
                      {cert.brand || '-'}
                    </td>
                    <td className="sub-process-row">
                      <div className="space-y-2">
                        {cert.stages.map((stage, stageIdx) => {
                          const progressPercent = ((stageIdx + 1) / cert.stages.length) * 100;
                          const tone = getStageTone(stage);
                          const toneClass = stageToneClasses[tone];
                          return (
                            <div key={stageIdx} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full ${toneClass.dot}`}></span>
                                  <span className="text-[10px] font-extrabold text-slate-700">{stage.label}</span>
                                </div>
                                <span className={`text-[9px] font-black uppercase ${toneClass.text}`}>{stage.status}</span>
                              </div>
                              <div className="flex gap-1 h-1 w-full">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`step-segment ${
                                      i < Math.ceil(progressPercent / 20) ? toneClass.segmentOn : toneClass.segmentOff
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="border-l border-slate-50 align-middle">
                      <div className="text-pic-block">
                        <div><span className="label-pic">LA:</span> {cert.la}</div>
                        <div><span className="label-pic">Auditor:</span> {cert.auditor}</div>
                      </div>
                    </td>
                    <td className="border-l border-slate-50 align-middle text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter leading-tight block">{cert.auditDate}</span>
                    </td>
                    <td className="border-l border-slate-50 align-middle text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter leading-tight block">{cert.samplingDate}</span>
                    </td>
                    <td className="border-l border-slate-50 align-middle">
                      <div className="text-pic-block">
                        <div><span className="label-pic">Rev:</span> {cert.reviewerName}</div>
                      </div>
                    </td>
                    <td className="border-l border-slate-50 align-middle text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter leading-tight block">{cert.reviewDate}</span>
                    </td>
                    <td className="border-l border-slate-50 align-middle text-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter leading-tight block">{cert.certDate}</span>
                    </td>
                    <td className="text-right align-middle border-l border-slate-50">
                      <div className="flex justify-end gap-1.5">
                        <button 
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-slate-100 rounded-lg transition-all border border-transparent"
                          onClick={() => openModal('modalEdit')}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                        <button 
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent"
                          onClick={() => openModal('modalDelete')}
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SimpleBar>
        </div>
      )}

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm gap-4">
        <div className="flex items-center gap-4">
          <p className="text-xs font-bold text-slate-400">Menampilkan {paginatedCertifications.length} dari {filteredCertifications.length} data</p>
          <div className="h-4 w-px bg-slate-200"></div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Limit:</span>
            <select
              className="text-[11px] font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/10 py-1.5 pl-2 pr-7"
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            if (totalPages <= 5 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {page}
                </button>
              );
            } else if (Math.abs(page - currentPage) === 2) {
              return <span key={page} className="text-slate-300 px-1">...</span>;
            }
            return null;
          })}
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors disabled:opacity-50"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </main>
  );
}
