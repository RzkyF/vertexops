export default function LoginUserPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 modern-bg font-body text-on-surface selection:bg-primary/10 selection:text-primary">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="w-full glass-card p-10 md:p-12 rounded-3xl relative overflow-hidden h-full flex flex-col border border-slate-200/50">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-[100px]"></div>
            <div className="relative z-10 flex-grow flex flex-col justify-center">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-[2px] bg-secondary"></span>
                  <span className="font-headline font-bold text-xs text-secondary tracking-[0.3em] uppercase">Enterprise Access</span>
                </div>
                <h1 className="font-headline font-bold text-5xl text-primary tracking-tighter mb-4">Vertex Global Indonesia</h1>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-sm">Secure authentication for Vertex Operational Workflow Management System.</p>
              </div>
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-primary/80 ml-1" htmlFor="employee-id">Username</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">fingerprint</span>
                    </div>
                    <input
                      className="precision-input block w-full pl-12 pr-4 py-4 bg-surface-container-low/40 rounded-2xl focus:ring-0 focus:bg-white placeholder-outline/50 font-medium"
                      id="employee-id"
                      name="employee-id"
                      placeholder="Enter your Username"
                      type="text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-bold text-primary/80" htmlFor="password">Password</label>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors">lock</span>
                    </div>
                    <input
                      className="precision-input block w-full pl-12 pr-4 py-4 bg-surface-container-low/40 rounded-2xl focus:ring-0 focus:bg-white placeholder-outline/50 font-medium"
                      id="password"
                      name="password"
                      placeholder="••••••••••••"
                      type="password"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between px-1 py-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input className="peer hidden" type="checkbox" />
                      <div className="w-6 h-6 rounded-lg border-2 border-outline-variant peer-checked:bg-primary peer-checked:border-primary transition-all flex items-center justify-center">
                        <span className="material-symbols-outlined text-[16px] text-on-primary scale-0 peer-checked:scale-100 transition-transform font-bold">check</span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-on-surface-variant group-hover:text-primary transition-colors">Persistent Session</span>
                  </label>
                </div>
                <button
                  className="primary-btn-gradient w-full py-5 rounded-2xl text-on-primary font-headline font-bold text-lg tracking-wide shadow-xl shadow-primary/10 hover:shadow-primary/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
                  type="submit"
                >
                  Initialize Authentication
                  <span className="material-symbols-outlined">login</span>
                </button>
              </form>
            </div>
            <div className="mt-12 pt-8 border-t border-primary/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-outline uppercase tracking-widest relative z-10">
              <span>© 2026 Vertex Global Indonesia</span>
              <div className="flex gap-6">
                <a className="hover:text-primary transition-colors" href="https://vertexglobal.id">Home</a>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="px-2 mb-2">
            <h2 className="font-headline font-bold text-2xl text-primary flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">construction</span>
              Professional Tools
            </h2>
            <p className="text-on-surface-variant text-sm mt-1">Ready-to-use precision calculators for Certification Processes.</p>
          </div>
          <div className="space-y-6 flex flex-col h-full">
            <div className="action-card glass-card p-8 md:p-10 rounded-3xl border border-slate-200/50 flex flex-col md:flex-row items-center gap-8 flex-1">
              <div className="w-28 h-28 rounded-full bg-secondary-container/20 flex-shrink-0 flex items-center justify-center border-[6px] border-white shadow-xl shadow-secondary/5 relative">
                <div className="absolute inset-0 rounded-full bg-secondary/5"></div>
                <span className="material-symbols-outlined text-on-secondary-container text-5xl relative z-10">bolt</span>
              </div>
              <div className="flex-grow text-center md:text-left flex flex-col">
                <div className="mb-4">
                  <h3 className="header-underline-gradient font-headline font-bold text-2xl md:text-3xl text-primary">Kalkulator Hemat Energi</h3>
                </div>
                <p className="text-on-surface-variant text-base md:text-lg mb-8 leading-relaxed max-w-xl">Kalkulator Penghitung Daya energi perangkat elektronik rumah tangga.</p>
                <a
                  className="primary-btn-gradient w-full inline-flex items-center justify-center text-on-primary py-5 rounded-2xl text-base font-bold hover:brightness-110 transition-all group/btn shadow-lg shadow-primary/10 border-b-4 border-primary-container/20"
                  href="#"
                >
                  Mulai Perhitungan
                  <span className="material-symbols-outlined ml-3 text-xl group-hover/btn:translate-x-1 transition-transform">open_in_new</span>
                </a>
              </div>
            </div>
            <div className="action-card glass-card p-8 md:p-10 rounded-3xl border border-slate-200/50 flex flex-col md:flex-row items-center gap-8 flex-1">
              <div className="w-28 h-28 rounded-full bg-primary/5 flex-shrink-0 flex items-center justify-center border-[6px] border-white shadow-xl shadow-primary/5 relative">
                <div className="absolute inset-0 rounded-full bg-primary/5"></div>
                <span className="material-symbols-outlined text-primary text-5xl relative z-10">checklist</span>
              </div>
              <div className="flex-grow text-center md:text-left flex flex-col">
                <div className="mb-4">
                  <h3 className="header-underline-gradient font-headline font-bold text-2xl md:text-3xl text-primary">Kalkulator Mandays Audit LSSM</h3>
                </div>
                <p className="text-on-surface-variant text-base md:text-lg mb-8 leading-relaxed max-w-xl">Kalkulator Mandays Audiit untuk Sertifikasi ISO 9001</p>
                <button
                  className="w-full inline-flex items-center justify-center text-secondary py-5 rounded-2xl text-base font-bold bg-secondary/10 transition-all group/btn shadow-lg shadow-secondary/10 border-b-4 border-secondary-container/20 disabled:grayscale disabled:opacity-70 disabled:cursor-not-allowed disabled:shadow-none"
                  disabled
                >
                  Coming Soon
                  <span className="material-symbols-outlined ml-3 text-xl group-hover/btn:translate-x-1 transition-transform">schedule</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
