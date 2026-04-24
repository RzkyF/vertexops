export default function LoginAdminPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden bg-[#0f172a] text-[#f1f5f9] font-body selection:bg-[#fbbf24]/30 selection:text-[#fbbf24]">
      <div className="absolute inset-0 digital-blueprint"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#3b82f6]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#fbbf24]/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-12 left-12 w-32 h-32 border-l border-t border-[#3b82f6]/40 pointer-events-none">
        <div className="absolute top-0 left-0 w-2 h-2 bg-[#fbbf24] shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
      </div>
      <div className="absolute bottom-12 right-12 w-32 h-32 border-r border-b border-[#3b82f6]/40 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#fbbf24] shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="flex justify-center mb-10">
          <div className="bg-[#1e293b]/80 border border-[#fbbf24]/30 px-5 py-2 rounded-full flex items-center gap-2.5 backdrop-blur-md">
            <span
              className="material-symbols-outlined text-[#fbbf24] text-[18px] animate-pulse"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock_person
            </span>
            <span className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-[#fbbf24]/80">
              Restricted Access
            </span>
          </div>
        </div>
        <div className="glass-panel rounded-xl p-10 shadow-2xl relative overflow-hidden border border-[#3b82f6]/10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3b82f6]/50 to-transparent"></div>
          <header className="mb-10 text-center">
            <h1 className="font-headline text-3xl font-bold text-[#f1f5f9] tracking-tight mb-2">
              Vertex System Admin
            </h1>
            <p className="text-[#94a3b8] text-sm leading-relaxed">
              Enter your admin credentials to access the system
            </p>
          </header>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="font-label text-[10px] font-bold uppercase tracking-widest text-[#3b82f6]/80 px-1">
                Username
              </label>
              <div className="relative flex items-center bg-[#0f172a]/50 border border-[#64748b]/30 rounded-lg transition-all duration-300 focus-within:border-[#3b82f6]/60 focus-within:bg-[#0f172a]/80">
                <span className="material-symbols-outlined absolute left-4 text-[#94a3b8] text-[20px]">
                  verified_user
                </span>
                <input
                  className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-[#f1f5f9] font-medium placeholder:text-[#94a3b8]/50 focus:ring-0"
                  placeholder="Username"
                  type="text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-label text-[10px] font-bold uppercase tracking-widest text-[#3b82f6]/80 px-1">
                Password
              </label>
              <div className="relative flex items-center bg-[#0f172a]/50 border border-[#64748b]/30 rounded-lg transition-all duration-300 focus-within:border-[#3b82f6]/60 focus-within:bg-[#0f172a]/80">
                <span className="material-symbols-outlined absolute left-4 text-[#94a3b8] text-[20px]">
                  key
                </span>
                <input
                  className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-[#f1f5f9] font-medium placeholder:text-[#94a3b8]/50 focus:ring-0"
                  placeholder="••••••••••••"
                  type="password"
                />
              </div>
            </div>
            <div className="pt-4">
              <button
                className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white font-headline font-bold py-4 rounded-lg shadow-lg shadow-[#3b82f6]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-white/10"
                type="submit"
              >
                Authenticate System Access
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </button>
            </div>
          </form>
          <div className="mt-8 pt-8 relative">
            <div className="technical-line absolute top-0 left-0"></div>
            <div className="flex items-center justify-between text-[11px] font-label font-bold uppercase tracking-widest text-[#94a3b8]">
              <div className="flex items-center gap-2 text-[#94a3b8]">
                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></span>
                Vertex OPS Management System
              </div>
              <a
                className="text-[#fbbf24] hover:text-[#fbbf24]/80 transition-colors"
                rel="noreferrer"
              >
                Version 1.0.0<p className="italic">(Beta)</p>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 px-2 flex justify-between items-center opacity-60 text-[10px] font-label font-medium uppercase tracking-[0.25em] text-[#fbbf24]/80">
          <span>VGI-WFM-01</span>
          <span>Node: Jakarta</span>
        </div>
      </div>
      <footer className="fixed bottom-0 w-full flex flex-col md:flex-row justify-between items-center px-8 py-6 opacity-40 bg-transparent text-[#f1f5f9]">
        <div className="text-[10px] font-label font-medium uppercase tracking-widest">
          © 2026 Vertex Global Indonesia. Security Level: Restricted.
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a className="text-[10px] font-label font-medium uppercase tracking-widest text-[#f1f5f9] hover:text-[#3b82f6] transition-colors duration-300" href="#">
            Terms of Access
          </a>
          <a className="text-[10px] font-label font-medium uppercase tracking-widest text-[#f1f5f9] hover:text-[#3b82f6] transition-colors duration-300" href="#">
            Security Policy
          </a>
          <a className="text-[10px] font-label font-medium uppercase tracking-widest text-[#f1f5f9] hover:text-[#3b82f6] transition-colors duration-300" href="#">
            Contact Systems Admin
          </a>
        </div>
      </footer>
    </main>
  );
}
