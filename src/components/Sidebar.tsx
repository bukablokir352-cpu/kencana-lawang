import React, { useState } from 'react';
import {
  Printer,
  PlusCircle,
  FileText,
  LayoutDashboard,
  Layers,
  MapPin,
  Radio,
  Download,
  Upload,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  viewMode: 'web' | 'a4';
  setViewMode: (mode: 'web' | 'a4') => void;
  onOpenAddModal: () => void;
  onPrint: () => void;
  onExportData: () => void;
  onImportData: () => void;
  photoCount: number;
  syncStatus?: 'idle' | 'saving' | 'synced' | 'error';
  onReloadServer?: () => void;
}

interface NavItem {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { key: 'overview', label: 'Profil & 5 Dimensi', icon: LayoutDashboard },
  { key: 'gallery', label: 'Album Foto', icon: Layers },
  { key: 'map', label: 'Peta Rawan & Posko', icon: MapPin },
  { key: 'ews', label: 'EWS & 12 Desa', icon: Radio }
];

const SyncBadge: React.FC<{ syncStatus: 'idle' | 'saving' | 'synced' | 'error' }> = ({ syncStatus }) => (
  <div
    className={`flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] font-semibold border ${
      syncStatus === 'synced'
        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60'
        : syncStatus === 'saving'
        ? 'bg-amber-950/60 text-amber-300 border-amber-800/60'
        : 'bg-slate-800 text-slate-400 border-slate-700'
    }`}
    title={
      syncStatus === 'synced'
        ? 'Data album tersimpan di Cloud Server (Tersinkron untuk semua komputer)'
        : syncStatus === 'saving'
        ? 'Sedang menyimpan perubahan ke Cloud Server...'
        : 'Penyimpanan lokal browser aktif'
    }
  >
    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
      syncStatus === 'synced' ? 'bg-emerald-400 animate-pulse' :
      syncStatus === 'saving' ? 'bg-amber-400 animate-spin' : 'bg-slate-400'
    }`} />
    <span className="truncate">
      {syncStatus === 'synced' ? 'Tersinkron Server' : syncStatus === 'saving' ? 'Menyimpan...' : 'Lokal'}
    </span>
  </div>
);

const SidebarContent: React.FC<SidebarProps & { onNavigate?: () => void }> = ({
  currentTab,
  setCurrentTab,
  viewMode,
  setViewMode,
  onOpenAddModal,
  onPrint,
  onExportData,
  onImportData,
  photoCount,
  syncStatus = 'idle',
  onNavigate
}) => {
  const isActive = (key: string) => viewMode === 'web' && currentTab === key;

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="flex items-start gap-3 px-4 pt-5 pb-4">
        <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center font-extrabold text-white text-xs shadow-md shadow-orange-600/30 shrink-0">
          BPBD
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-extrabold tracking-tight text-white leading-tight">
              KENCANA LAWANG 2026
            </span>
            <span className="text-[9px] bg-orange-500/20 text-orange-400 font-bold px-1.5 py-0.5 rounded border border-orange-500/30 whitespace-nowrap">
              Top 10 Finalis
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug mt-1">
            Buku Profil &amp; Album Dokumentasi Tangguh Bencana
          </p>
        </div>
      </div>

      {/* Vertical Navigation Menu */}
      <nav className="flex flex-col gap-1 px-3 text-xs font-semibold text-slate-300">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => { setViewMode('web'); setCurrentTab(item.key); onNavigate?.(); }}
              className={`px-3 py-2 rounded-lg transition-colors text-left flex items-center gap-2.5 ${
                isActive(item.key)
                  ? 'bg-slate-800 text-orange-400 font-bold'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.key === 'gallery' && (
                <span className="text-[10px] bg-slate-700/80 text-slate-300 px-1.5 py-0.5 rounded">
                  {photoCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 my-4 mx-4" />

      {/* View Mode Switch */}
      <div className="px-4">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2">Mode Tampilan</p>
        <div className="flex flex-col gap-1 bg-slate-800/90 p-1 rounded-lg border border-slate-700/60 text-xs">
          <button
            onClick={() => setViewMode('web')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all text-left ${
              viewMode === 'web'
                ? 'bg-orange-600 text-white shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Portal Web
          </button>
          <button
            onClick={() => setViewMode('a4')}
            className={`px-3 py-1.5 rounded-md font-medium transition-all flex items-center gap-2 text-left ${
              viewMode === 'a4'
                ? 'bg-orange-600 text-white shadow-sm font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Lembar A4</span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 mt-4 flex flex-col gap-2">
        <button
          onClick={onOpenAddModal}
          className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer hover:border-slate-600"
        >
          <PlusCircle className="w-4 h-4 text-orange-400" />
          <span>Tambah Foto</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onExportData}
            title="Cadangkan / Ekspor Data Foto ke File JSON (Bisa dibuka di komputer lain)"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2 py-2 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Cadangkan</span>
          </button>
          <button
            onClick={onImportData}
            title="Impor Data Foto dari File JSON (Pulihkan data di komputer lain)"
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2 py-2 rounded-lg text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-emerald-400" />
            <span>Impor</span>
          </button>
        </div>

        <button
          onClick={onPrint}
          className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-orange-600/30 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak A4 (PDF)</span>
        </button>

        <SyncBadge syncStatus={syncStatus} />
      </div>

      <div className="mt-auto px-4 py-4 text-[10px] text-slate-500 leading-relaxed">
        Pemerintah Kecamatan Lawang • Kabupaten Malang
      </div>
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar with hamburger */}
      <div className="no-print lg:hidden sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-extrabold text-white text-[10px] shrink-0">
              BPBD
            </div>
            <span className="text-sm font-extrabold tracking-tight text-white truncate">
              KENCANA LAWANG 2026
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
            aria-label="Buka menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop fixed left sidebar */}
      <aside className="no-print hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-40 overflow-y-auto">
        <SidebarContent {...props} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 border-r border-slate-800 shadow-2xl overflow-y-auto animate-in fade-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between px-4 pt-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <SidebarContent
              {...props}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};
