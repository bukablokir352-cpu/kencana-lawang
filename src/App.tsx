import React, { useState, useEffect, useRef } from 'react';
import { Photo, PhotoCategory } from './types/kencana';
import { INITIAL_PHOTOS } from './data/kencanaData';
import { Navbar } from './components/Navbar';
import { PrintA4Document } from './components/PrintA4Document';
import { WebInteractivePortal } from './components/WebInteractivePortal';
import { PhotoModal } from './components/PhotoModal';
import { PhotoLightbox } from './components/PhotoLightbox';
import { ShieldCheck, Printer, RefreshCw, FileText, CheckCircle2, AlertTriangle, X } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'kencana_bound_photos_a4_v4';

// Automatically sanitizes and corrects known sentence discrepancies
function sanitizePhotos(photosList: Photo[]): Photo[] {
  return photosList.map((p) => {
    let desc = p.desc || '';
    if (
      (p.title?.toUpperCase().includes('TURIREJO') || String(p.id) === '1794294301568') &&
      desc.includes('Srigading')
    ) {
      desc = desc.replace(/Ambulans Desa Srigading/g, 'Ambulans Desa Turirejo');
    }
    if (desc.includes('sungai Kali ini')) {
      desc = desc.replace(/sungai Kali ini/g, 'alur Kali Surak');
    }
    return { ...p, desc };
  });
}

interface ConfirmDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  isDestructive?: boolean;
  confirmText?: string;
  onConfirm: () => void;
}

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem('kencana_bound_photos_a4_strict');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return sanitizePhotos(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading photos from localStorage:', e);
    }
    return sanitizePhotos(INITIAL_PHOTOS);
  });

  const [viewMode, setViewMode] = useState<'web' | 'a4'>('web');
  const [currentTab, setCurrentTab] = useState<string>('overview');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null);
  const [defaultCategory, setDefaultCategory] = useState<PhotoCategory>('simulasi');
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'synced' | 'error'>('idle');
  const isInitialMount = useRef(true);

  // In-app modal and toast notifications (replaces window.alert / window.confirm)
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  };

  // 1. Initial Load: Fetch shared photos from server backend (/api/photos)
  useEffect(() => {
    let isMounted = true;
    async function loadServerPhotos() {
      try {
        const res = await fetch('/api/photos');
        if (res.ok) {
          const data = await res.json();
          if (data?.photos && Array.isArray(data.photos) && data.photos.length > 0) {
            if (isMounted) {
              const cleaned = sanitizePhotos(data.photos);
              setPhotos(cleaned);
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cleaned));
              setSyncStatus('synced');
            }
            return;
          }
        }
        
        // If server is clean/empty but this browser already has custom photos in localStorage,
        // automatically push localStorage photos to the server so all other computers get them!
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              await fetch('/api/photos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ photos: parsed })
              });
              if (isMounted) setSyncStatus('synced');
            }
          } catch (e) {
            console.error('Error parsing stored photos for server seed:', e);
          }
        }
      } catch (err) {
        console.warn('Backend server sync not available, using offline localStorage:', err);
        if (isMounted) setSyncStatus('idle');
      }
    }

    loadServerPhotos();
    return () => { isMounted = false; };
  }, []);

  // 2. Auto-sync to both localStorage and server whenever photos change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Save locally
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }

    // Debounced sync to server backend so all shared computers see the updates
    const timer = setTimeout(async () => {
      try {
        setSyncStatus('saving');
        const res = await fetch('/api/photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ photos })
        });
        if (res.ok) {
          setSyncStatus('synced');
        } else {
          setSyncStatus('error');
        }
      } catch (err) {
        console.warn('Auto-sync to server error:', err);
        setSyncStatus('error');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [photos]);

  const handleOpenAddModal = () => {
    setEditingPhoto(null);
    setDefaultCategory('simulasi');
    setIsAddModalOpen(true);
  };

  const handleOpenAddModalWithCategory = (category: PhotoCategory) => {
    setEditingPhoto(null);
    setDefaultCategory(category);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (photo: Photo) => {
    setEditingPhoto(photo);
    setDefaultCategory(photo.category);
    setIsAddModalOpen(true);
  };

  const handleDeletePhoto = (id: string | number) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Hapus Dokumentasi Foto',
      message: 'Apakah Anda yakin ingin menghapus foto ini dari album dokumentasi Kencana Lawang 2026?',
      isDestructive: true,
      confirmText: 'Hapus Foto',
      onConfirm: () => {
        setPhotos((prev) => prev.filter((p) => String(p.id) !== String(id)));
        setConfirmDialog(null);
        showToast('Foto dokumentasi berhasil dihapus.', 'info');
      }
    });
  };

  const handleSavePhoto = (photoData: Omit<Photo, 'id'> & { id?: string | number }) => {
    if (photoData.id !== undefined && photoData.id !== null) {
      // Edit: match both string and number IDs accurately
      setPhotos((prev) =>
        prev.map((p) =>
          String(p.id) === String(photoData.id)
            ? ({
                ...p,
                ...photoData,
                id: p.id // Preserve original id
              } as Photo)
            : p
        )
      );
      showToast('Perubahan data foto berhasil disimpan.', 'success');
    } else {
      // Add
      const newPhoto: Photo = {
        ...photoData,
        id: Date.now()
      };
      setPhotos((prev) => [newPhoto, ...prev]);
      showToast('Foto baru berhasil ditambahkan ke album.', 'success');
    }
  };

  const handlePrint = () => {
    // If not in A4 mode, temporarily switch to A4 for cleanest print output
    if (viewMode !== 'a4') {
      setViewMode('a4');
      setTimeout(() => {
        window.print();
      }, 250);
    } else {
      window.print();
    }
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(photos, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kencana_lawang_photos_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('File cadangan JSON berhasil diunduh.', 'success');
  };

  const handleImportDataTrigger = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPhotos(parsed);
            showToast(`Berhasil mengimpor ${parsed.length} data foto dokumentasi.`, 'success');
          } else {
            showToast('Format file JSON tidak sesuai.', 'error');
          }
        } catch (err) {
          showToast('Gagal membaca file JSON.', 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetDefaults = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Muat Ulang Data Resmi',
      message: 'Muat ulang data awal resmi Kencana Lawang 2026? Foto tambahan yang belum dicadangkan akan kembali ke daftar default 17 foto kegiatan.',
      isDestructive: false,
      confirmText: 'Muat Ulang',
      onConfirm: () => {
        setPhotos(INITIAL_PHOTOS);
        setConfirmDialog(null);
        showToast('Data awal resmi 17 foto berhasil dimuat ulang.', 'success');
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Hidden file input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'overview') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else if (tab === 'gallery') {
            const el = document.getElementById('album-gallery-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          } else if (tab === 'map') {
            window.scrollTo({ top: 900, behavior: 'smooth' });
          } else if (tab === 'ews') {
            window.scrollTo({ top: 1600, behavior: 'smooth' });
          }
        }}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenAddModal={handleOpenAddModal}
        onPrint={handlePrint}
        onExportData={handleExportData}
        onImportData={handleImportDataTrigger}
        photoCount={photos.length}
        syncStatus={syncStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {viewMode === 'a4' ? (
          <PrintA4Document
            photos={photos}
            onOpenEditModal={handleOpenEditModal}
            onDeletePhoto={handleDeletePhoto}
            onOpenAddModalWithCategory={handleOpenAddModalWithCategory}
          />
        ) : (
          <WebInteractivePortal
            photos={photos}
            onOpenAddModal={handleOpenAddModal}
            onOpenAddModalWithCategory={handleOpenAddModalWithCategory}
            onOpenEditModal={handleOpenEditModal}
            onDeletePhoto={handleDeletePhoto}
            onOpenLightbox={(photo) => setLightboxPhoto(photo)}
            onSwitchToA4={() => setViewMode('a4')}
            onPrint={handlePrint}
          />
        )}
      </main>

      {/* Official Institutional Footer (Hidden on print) */}
      <footer className="no-print bg-slate-900 border-t border-slate-800 text-slate-400 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center font-extrabold text-white text-xs">
              BPBD
            </div>
            <div>
              <p className="font-extrabold text-slate-200">
                Pemerintah Kecamatan Lawang • Kabupaten Malang
              </p>
              <p className="text-[11px] text-slate-400">
                Tim Verifikasi Gerakan Kecamatan Tangguh Bencana (Kencana Award 2026)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              onClick={() => setViewMode(viewMode === 'web' ? 'a4' : 'web')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Ganti ke {viewMode === 'web' ? 'Mode Lembar A4' : 'Mode Portal Web'}</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="hover:text-orange-400 transition-colors cursor-pointer flex items-center gap-1"
              title="Reset ke data bawaan resmi"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Muat Ulang Data Awal</span>
            </button>

            <span>Jl. MH. Thamrin No. 2 Lawang</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">© 2026 Kencana Lawang</span>
          </div>
        </div>
      </footer>

      {/* Add / Edit Photo Modal */}
      <PhotoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSavePhoto}
        editingPhoto={editingPhoto}
        defaultCategory={defaultCategory}
      />

      {/* Full Photo Lightbox */}
      <PhotoLightbox
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
      />

      {/* In-app Confirmation Modal (No native dialogs) */}
      {confirmDialog?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl text-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl ${confirmDialog.isDestructive ? 'bg-red-500/15 text-red-400' : 'bg-orange-500/15 text-orange-400'}`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">{confirmDialog.title}</h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {confirmDialog.message}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={confirmDialog.onConfirm}
                className={`px-4 py-2 text-sm font-bold text-white rounded-xl transition-colors shadow-md cursor-pointer ${
                  confirmDialog.isDestructive
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-orange-600 hover:bg-orange-500'
                }`}
              >
                {confirmDialog.confirmText || 'Konfirmasi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating In-App Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full pointer-events-none">
          <div className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl border shadow-xl text-sm font-medium transition-all ${
            toast.type === 'success'
              ? 'bg-slate-900/95 border-emerald-500/50 text-emerald-300'
              : toast.type === 'error'
              ? 'bg-slate-900/95 border-red-500/50 text-red-300'
              : 'bg-slate-900/95 border-sky-500/50 text-sky-300'
          }`}>
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : toast.type === 'error' ? (
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" />
            )}
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
