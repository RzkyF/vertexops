export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-4 px-8 flex flex-col md:flex-row justify-between items-center gap-4 mt-auto">
      <p className="text-slate-400 text-[10px] font-medium uppercase tracking-wider">
        © 2026 Vertex Global Indonesia Enterprise. Confidential Internal Use Only.
      </p>
      <div className="flex gap-6">
        <a className="text-slate-400 hover:text-primary text-[10px] font-bold transition-colors uppercase" href="#">
          Internal SOP
        </a>
      </div>
    </footer>
  );
}
