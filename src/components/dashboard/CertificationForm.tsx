'use client';

import { useState } from 'react';

interface Importir {
  id: number;
  name: string;
  brand: string;
}

export default function CertificationForm({ onCancel }: { onCancel: () => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [importirs, setImportirs] = useState<Importir[]>([{ id: 1, name: '', brand: '' }]);

  const nextStep = (direction: number) => {
    if (direction === 1 && currentStep === totalSteps) {
      alert('Proyek Sertifikasi Berhasil Dibuat!');
      onCancel();
      return;
    }
    setCurrentStep(prev => Math.max(1, Math.min(totalSteps, prev + direction)));
  };

  const addImportir = () => {
    const newId = Math.max(...importirs.map(i => i.id)) + 1;
    setImportirs([...importirs, { id: newId, name: '', brand: '' }]);
  };

  const updateImportir = (id: number, field: 'name' | 'brand', value: string) => {
    setImportirs(importirs.map(i => i.id === id ? { ...i, [field]: value } : i));
  };

  const removeImportir = (id: number) => {
    if (importirs.length > 1) {
      setImportirs(importirs.filter(i => i.id !== id));
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <main className="p-8 flex-1 bg-slate-50/80">
      <div className="max-w-4xl mx-auto py-10">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Sertifikasi Baru</h1>
          <p className="text-slate-500 max-w-lg mx-auto leading-relaxed">
            Selamat datang di wizard pendaftaran. Kami akan memandu Anda langkah demi langkah untuk menyelesaikan proyek sertifikasi ini.
          </p>
        </div>

        <div className="mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-black text-primary uppercase tracking-widest" id="step-label">
              Langkah {currentStep} dari {totalSteps}
            </span>
            <span className="text-xs font-bold text-slate-400" id="step-percentage">
              {Math.round(progressPercentage)}% Selesai
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 rounded-full bg-slate-200 overflow-hidden relative">
              <div
                className="absolute inset-y-0 left-0 bg-primary transition-all duration-700 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          {/* Step 1 */}
          <div className={`wizard-step ${currentStep === 1 ? 'active' : ''}`}>
            <div className="bg-white rounded-[2rem] p-10 border border-slate-200 active-step-card transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-full md:w-1/3 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl font-bold">fingerprint</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">Identifikasi Dasar</h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Mulai dengan memasukkan nomor referensi unik untuk proyek sertifikasi ini agar mudah dilacak nantinya.
                  </p>
                </div>
                <div className="flex-1 w-full space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">
                        Nomor Registrasi
                      </label>
                      <input
                        className="w-full bg-slate-50/50 border-slate-200 rounded-2xl px-5 py-4 font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-lg"
                        placeholder="Contoh: REG-2024-001"
                        type="text"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">
                        Nomor Indeks
                      </label>
                      <input
                        className="w-full bg-slate-50/50 border-slate-200 rounded-2xl px-5 py-4 font-semibold focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all text-lg"
                        placeholder="Masukkan nomor indeks..."
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 - Importir Details */}
          <div className={`wizard-step ${currentStep === 5 ? 'active' : ''}`}>
            <div className="bg-white rounded-[2rem] p-10 border border-slate-200 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-full md:w-1/3 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <span className="material-symbols-outlined text-3xl font-bold">local_shipping</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight">Detail Importir</h2>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Kelola daftar importir yang terkait dengan sertifikasi ini secara dinamis.
                  </p>
                </div>
                <div className="flex-1 w-full space-y-6">
                  <div className="space-y-6" id="importir-container">
                    {importirs.map((importir, index) => (
                      <div key={importir.id} className="importir-pair bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 relative group">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            Detail Importir {index + 1}
                          </h3>
                          <button
                            type="button"
                            onClick={() => removeImportir(importir.id)}
                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all border border-red-100 bg-white shadow-sm flex items-center justify-center hover:scale-105 active:scale-95"
                          >
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">
                              Nama Importir
                            </label>
                            <input
                              className="w-full bg-white border-slate-200 rounded-2xl px-5 py-4 font-semibold focus:ring-primary focus:border-primary"
                              placeholder="Masukkan nama importir..."
                              type="text"
                              value={importir.name}
                              onChange={(e) => updateImportir(importir.id, 'name', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">
                              Merek (Importir)
                            </label>
                            <input
                              className="w-full bg-white border-slate-200 rounded-2xl px-5 py-4 font-semibold focus:ring-primary focus:border-primary"
                              placeholder="Merek yang diimpor..."
                              type="text"
                              value={importir.brand}
                              onChange={(e) => updateImportir(importir.id, 'brand', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="w-full mt-4 flex items-center justify-center gap-3 text-primary font-bold text-sm hover:bg-primary/10 transition-all bg-primary/5 py-5 rounded-[2rem] border-2 border-dashed border-primary/20"
                    onClick={addImportir}
                    type="button"
                  >
                    <span className="material-symbols-outlined">add_circle</span> Tambah Importir Baru
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-10">
            <button
              className={`px-10 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black hover:bg-slate-200 transition-all ${
                currentStep === 1 ? 'invisible' : ''
              }`}
              onClick={() => nextStep(-1)}
              type="button"
            >
              Sebelumnya
            </button>
            <button
              className={`px-12 py-4 text-white rounded-2xl font-black shadow-xl hover:translate-y-[-4px] active:translate-y-0 transition-all text-lg ${
                currentStep === totalSteps ? 'bg-emerald-600' : 'bg-primary'
              }`}
              onClick={() => nextStep(1)}
              type="button"
            >
              {currentStep === totalSteps ? 'Selesaikan & Kirim Permohonan' : 'Lanjut Langkah Berikutnya'}
            </button>
          </div>
        </form>

        <div className="mt-20 text-center">
          <button
            className="text-slate-400 hover:text-red-500 font-bold text-sm flex items-center gap-2 mx-auto transition-colors"
            onClick={onCancel}
          >
            <span className="material-symbols-outlined text-lg">cancel</span> Batalkan & Kembali ke Dashboard
          </button>
        </div>
      </div>
    </main>
  );
}
