# Project Structure

## Folder Organization

```
src/
├── app/
│   ├── layout.tsx          # Root layout dengan fonts
│   ├── page.tsx            # Home page (memanggil App.tsx)
│   └── globals.css         # Global styles & Tailwind config
│
├── components/
│   ├── App.tsx             # Main app container & state management
│   │
│   ├── layout/             # Layout components (shared across pages)
│   │   ├── Header.tsx      # Header dengan breadcrumb & profile
│   │   ├── Sidebar.tsx     # Navigation sidebar
│   │   └── Footer.tsx      # Footer
│   │
│   ├── dashboard/          # Dashboard & Certification features
│   │   ├── Dashboard.tsx   # Main dashboard dengan list sertifikasi
│   │   └── CertificationForm.tsx  # Form wizard untuk sertifikasi baru
│   │
│   └── auth/               # Authentication pages (future)
│       ├── UserLogin.tsx   # User login page
│       └── AdminLogin.tsx  # Admin login page
```

## Deskripsi Setiap Folder

### `/src/app/`
- **layout.tsx**: Root layout yang mengatur fonts (Space Grotesk, Manrope) dan metadata
- **page.tsx**: Halaman utama yang merender komponen App
- **globals.css**: Global CSS dan Tailwind configuration

### `/src/components/App.tsx`
- Main application container
- State management untuk page navigation dan form visibility
- Memanggil layout components (Sidebar, Header, Footer)
- Conditional rendering untuk Dashboard atau CertificationForm

### `/src/components/layout/`
Berisi komponen layout yang digunakan di seluruh aplikasi:
- **Header**: Navigation header dengan breadcrumb dan profile dropdown
- **Sidebar**: Navigation menu yang bisa collapse/expand
- **Footer**: Footer dengan info perusahaan

### `/src/components/dashboard/`
Berisi fitur-fitur dashboard:
- **Dashboard**: Menampilkan list sertifikasi dengan filter dan search
- **CertificationForm**: Multi-step wizard untuk membuat sertifikasi baru

### `/src/components/auth/`
Placeholder untuk halaman autentikasi (akan diimplementasikan nanti):
- **UserLogin**: Halaman login untuk user reguler
- **AdminLogin**: Halaman login untuk admin

## Flow Aplikasi

1. User masuk ke `/` → render `src/app/page.tsx`
2. Page mengimport dan merender `<App />`
3. App mengatur layout dengan Sidebar, Header, dan main content
4. Main content bisa berupa Dashboard atau CertificationForm tergantung state

## Penambahan di Masa Depan

- Tambahkan page routing di `/src/app/auth/` untuk login pages
- Buat komponen di `/src/components/auth/` untuk UI login
- Tambahkan folder `/src/components/ui/` untuk reusable UI components jika diperlukan
- Tambahkan folder `/src/utils/` untuk utility functions
- Tambahkan folder `/src/hooks/` untuk custom React hooks
