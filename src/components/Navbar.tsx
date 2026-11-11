import React from 'react';
import { 
  Printer, 
  PlusCircle, 
  FileText, 
  LayoutDashboard, 
  ShieldCheck, 
  Layers, 
  MapPin, 
  Radio, 
  Download,
  Upload
} from 'lucide-react';

interface NavbarProps {
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

export const Navbar: React.FC<NavbarProps> = ({
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
  onReloadServer
}) => {
  return (
    <header className="no-print sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center font-extrabold text-white text-xs shadow-md shadow-orange-600/30">
              BPBD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-extrabold tracking-tight text-white whitespace-nowrap">
                  KENCANA LAWANG 2026
                </span>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded border border-orange-500/30 hidden sm:inline-block">
                  Top 10 Finalis
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none truncate max-w-xs hidden md:block mt-0.5">
                Buku Profil & Album Dokumentasi Tangguh Bencana
              </p>
            </div>
          </div>

          {/* Zone 2: Navigation Links (Single Line) */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-300">
            <button
              onClick={() => { setViewMode('web'); setCurrentTab('overview'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                viewMode === 'web' && currentTab === 'overview'
                  ? 'bg-slate-800 text-orange-400 font-bold'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Profil & 5 Dimensi</span>
            </button>

            <button
              onClick={() => { setViewMode('web'); setCurrentTab('gallery'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                viewMode === 'web' && currentTab === 'gallery'
                  ? 'bg-slate-800 text-orange-400 font-bold'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Album Foto ({photoCount})</span>
            </button>

            <button
              onClick={() => { setViewMode('web'); setCurrentTab('map'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                viewMode === 'web' && currentTab === 'map'
                  ? 'bg-slate-800 text-orange-400 font-bold'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Peta Rawan & Posko</span>
            </button>

            <button
              onClick={() => { setViewMode('web'); setCurrentTab('ews'); }}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                viewMode === 'web' && currentTab === 'ews'
                  ? 'bg-slate-800 text-orange-400 font-bold'
                  : 'hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>EWS & 12 Desa</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions & Mode Switch */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* View Mode Segmented Control */}
            <div className="flex items-center bg-slate-800/90 p-1 rounded-lg border border-slate-700/60 text-xs">
              <button
                onClick={() => setViewMode('web')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap ${
                  viewMode === 'web'
                    ? 'bg-orange-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Portal Interaktif"
              >
                Portal Web
              </button>
              <button
                onClick={() => setViewMode('a4')}
                className={`px-2.5 py-1 rounded-md font-medium transition-all whitespace-nowrap flex items-center gap-1 ${
                  viewMode === 'a4'
                    ? 'bg-orange-600 text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Tampilan Format Lembar Buku A4 Siap Cetak"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Lembar A4</span>
              </button>
            </div>

            {/* Server Sync Status & Shared Backup Actions */}
            <div className="flex items-center gap-1.5 border-l border-slate-700 pl-2">
              
              {/* Sync Badge */}
              <div 
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold border ${
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
                <span className={`w-1.5 h-1.5 rounded-full ${
                  syncStatus === 'synced' ? 'bg-emerald-400 animate-pulse' :
                  syncStatus === 'saving' ? 'bg-amber-400 animate-spin' : 'bg-slate-400'
                }`} />
                <span className="hidden md:inline">
                  {syncStatus === 'synced' ? 'Tersinkron Server' : syncStatus === 'saving' ? 'Menyimpan...' : 'Lokal'}
                </span>
              </div>

              {/* Ekspor & Impor Data (Cadangkan untuk dibagikan ke komputer lain) */}
              <button
                onClick={onExportData}
                title="Cadangkan / Ekspor Data Foto ke File JSON (Bisa dibuka di komputer lain)"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline text-[11px]">Cadangkan</span>
              </button>

              <button
                onClick={onImportData}
                title="Impor Data Foto dari File JSON (Pulihkan data di komputer lain)"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-2 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline text-[11px]">Impor</span>
              </button>

            </div>

            {/* Add Photo Button */}
            <button
              onClick={onOpenAddModal}
              className="bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap hover:border-slate-600"
            >
              <PlusCircle className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Tambah Foto</span>
              <span className="sm:hidden">Foto</span>
            </button>

            {/* Print PDF Button */}
            <button
              onClick={onPrint}
              className="bg-orange-600 hover:bg-orange-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-orange-600/30 cursor-pointer whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak A4 (PDF)</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
