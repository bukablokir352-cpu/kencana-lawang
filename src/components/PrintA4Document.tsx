import React, { useState, useMemo } from 'react';
import { Photo, PhotoCategory, Dimension } from '../types/kencana';
import { INITIAL_DIMENSIONS, OFFICIAL_VERIFICATION, KENCANA_REGISTRATION_PROFILE } from '../data/kencanaData';
import { KencanaProfileCard } from './KencanaProfileCard';
import { KencanaEmblem } from './KencanaEmblem';
import { sortPhotosByActivityDate } from '../utils/dateUtils';
import { 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowUpDown, 
  LayoutGrid, 
  FileText,
  FileCheck2,
  ZoomIn,
  X
} from 'lucide-react';

interface PrintA4DocumentProps {
  photos: Photo[];
  onOpenEditModal: (photo: Photo) => void;
  onDeletePhoto: (id: string | number) => void;
  onOpenAddModalWithCategory: (category: PhotoCategory) => void;
}

export const PrintA4Document: React.FC<PrintA4DocumentProps> = ({
  photos,
  onOpenEditModal,
  onDeletePhoto,
  onOpenAddModalWithCategory,
}) => {
  // Sort state: 'asc' = earliest first (chronological), 'desc' = latest first
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  // Photos per page in A4: 2 (standard wide) or 1 (large hero)
  const [photosPerPage, setPhotosPerPage] = useState<number>(2);
  // Berita Acara mode: 'typed' = Clean Typed A4 (no logo/sig/stamp), 'all' = Typed + Scan, 'scan' = Signed Scans only
  const [docMode, setDocMode] = useState<'typed' | 'all' | 'scan'>('typed');
  // Modal for inspecting scan in full resolution
  const [previewScanImage, setPreviewScanImage] = useState<string | null>(null);

  // Sort all photos by activity date
  const sortedPhotos = useMemo(() => {
    return sortPhotosByActivityDate(photos, sortOrder);
  }, [photos, sortOrder]);

  // Group sorted photos by category and chunk them into pages
  const chapterPages = useMemo(() => {
    return INITIAL_DIMENSIONS.map((dimension) => {
      const dimPhotos = sortedPhotos.filter((p) => p.category === dimension.category);
      if (dimPhotos.length === 0) {
        return [{
          dimension,
          photos: [] as Photo[],
          pageIndex: 0,
          totalPages: 1
        }];
      }

      // Chunk photos by photosPerPage
      const chunks: Photo[][] = [];
      for (let i = 0; i < dimPhotos.length; i += photosPerPage) {
        chunks.push(dimPhotos.slice(i, i + photosPerPage));
      }

      return chunks.map((chunk, idx) => ({
        dimension,
        photos: chunk,
        pageIndex: idx,
        totalPages: chunks.length
      }));
    });
  }, [sortedPhotos, photosPerPage]);

  // Calculate Berita Acara pages based on display mode
  const beritaAcaraPagesCount = useMemo(() => {
    if (docMode === 'all') return 4; // 2 typed + 2 scan
    return 2; // 2 typed OR 2 scan
  }, [docMode]);

  // Calculate total pages for the whole document:
  // Page 1: Cover
  // Page 2: Kata Pengantar
  // + All chapter pages
  // + Berita Acara pages (2-4 pages depending on docMode)
  const totalDocumentPages = useMemo(() => {
    let count = 2; // Cover + Kata Pengantar
    chapterPages.forEach(pages => {
      count += pages.length;
    });
    count += beritaAcaraPagesCount;
    return count;
  }, [chapterPages, beritaAcaraPagesCount]);

  // Render a wide, elegant photo card
  const renderWidePhotoCard = (photo: Photo, isSingleOnPage: boolean) => {
    return (
      <div 
        key={photo.id}
        className={`photo-card border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/80 flex flex-col shadow-xs transition-shadow hover:shadow-sm ${
          isSingleOnPage ? 'mb-4' : 'mb-3.5'
        }`}
      >
        {/* Wide Panoramic Image Container */}
        <div className={`w-full bg-slate-200 overflow-hidden relative shrink-0 ${
          isSingleOnPage ? 'h-72 sm:h-80' : 'h-52 sm:h-56'
        }`}>
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallback = parent.querySelector('.photo-fallback');
                if (fallback) fallback.classList.remove('hidden');
              }
            }}
          />
          <div className="photo-fallback hidden absolute inset-0 bg-slate-200 flex flex-col items-center justify-center text-slate-500 p-4 text-center">
            <ImageIcon className="w-8 h-8 text-slate-400 mb-1" />
            <span className="text-xs font-semibold">{photo.title}</span>
            <span className="text-[10px] text-slate-400 mt-1">Dokumentasi Terverifikasi</span>
          </div>

          {/* Location Badge on Wide Image */}
          {photo.location && (
            <div className="absolute bottom-2.5 left-2.5 bg-slate-900/85 backdrop-blur-xs text-white text-[10.5px] px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-medium shadow-xs">
              <MapPin className="w-3 h-3 text-orange-400" />
              <span>{photo.location}</span>
            </div>
          )}

          {/* Date Badge on Wide Image */}
          {photo.date && (
            <div className="absolute top-2.5 right-2.5 bg-slate-900/85 backdrop-blur-xs text-orange-300 text-[10.5px] px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-bold shadow-xs">
              <Calendar className="w-3 h-3 text-orange-400" />
              <span>{photo.date}</span>
            </div>
          )}
        </div>
        
        {/* Text Details Area (Keterangan Lengkap Foto Dokumentasi A4 / PDF) */}
        <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between bg-white border-t border-slate-100">
          <div>
            {/* Judul Kegiatan Penuh (Tanpa Terpotong) */}
            <div className="mb-2">
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-950 leading-snug">
                {photo.title}
              </h4>
            </div>

            {/* Baris Informasi Metadata (Tanggal, Lokasi, Sumber Dokumentasi) */}
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[10.5px] text-slate-700 bg-slate-50 border border-slate-200/80 rounded-lg px-2.5 py-1.5 mb-2">
              {photo.date && (
                <div className="flex items-center gap-1 font-semibold text-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{photo.date}</span>
                </div>
              )}
              {photo.location && (
                <div className="flex items-center gap-1 font-semibold text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  <span>{photo.location}</span>
                </div>
              )}
              {photo.photographer && (
                <div className="flex items-center gap-1 text-slate-600">
                  <span className="font-semibold text-slate-700">Sumber:</span>
                  <span>{photo.photographer}</span>
                </div>
              )}
            </div>

            {/* Keterangan Rinci Kegiatan (Penuh & Sesuai yang Diinput) */}
            <div className="text-[11px] sm:text-xs text-slate-700 leading-relaxed text-justify whitespace-pre-wrap">
              <span className="font-bold text-slate-900 block mb-0.5">Keterangan Kegiatan:</span>
              <p>{photo.desc || <span className="italic text-slate-400">Tidak ada uraian keterangan.</span>}</p>
            </div>
          </div>

          {/* Action buttons (Hidden during printing) */}
          <div className="no-print flex items-center justify-between gap-3 mt-3 pt-2.5 border-t border-slate-100 text-[11px] font-semibold">
            <span className="text-[10px] text-slate-400 font-mono">ID: {photo.id}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenEditModal(photo)}
                className="text-blue-600 hover:text-blue-800 transition-colors cursor-pointer flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-blue-50"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDeletePhoto(photo.id)}
                className="text-red-500 hover:text-red-700 transition-colors cursor-pointer flex items-center gap-1 px-2 py-0.5 rounded-md hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Helper to calculate page number
  let currentPageNumber = 0;
  const getNextPageNumber = () => {
    currentPageNumber += 1;
    return currentPageNumber;
  };

  return (
    <div className="w-full py-4 print:py-0">
      
      {/* Control Toolbar (Web Only - Hidden on Print) */}
      <div className="no-print max-w-4xl mx-auto mb-4 px-4">
        <div className="bg-slate-800/95 border border-slate-700 rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-200 shadow-xl">
          
          {/* Status info */}
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
            <div>
              <span className="font-bold text-white">Mode Lembar A4 Fleksibel: </span>
              <span className="text-slate-300">
                Otomatis bertambah ke halaman berikutnya ({totalDocumentPages} Halaman Total).
              </span>
            </div>
          </div>

          {/* Controls: Date Sort & Layout Density */}
          <div className="flex items-center gap-2 flex-wrap">
            
            {/* Sort Toggle */}
            <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-700">
              <button
                onClick={() => setSortOrder('asc')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  sortOrder === 'asc'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Urutkan dari kegiatan terlama ke terbaru (Kronologis)"
              >
                <ArrowUpDown className="w-3 h-3" />
                <span>Urut Tanggal (Awal → Akhir)</span>
              </button>
              <button
                onClick={() => setSortOrder('desc')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  sortOrder === 'desc'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Urutkan dari kegiatan terbaru ke terlama"
              >
                <span>Terbaru</span>
              </button>
            </div>

            {/* Density Toggle */}
            <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-700">
              <button
                onClick={() => setPhotosPerPage(2)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  photosPerPage === 2
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="2 Foto Lebar per Halaman A4"
              >
                <LayoutGrid className="w-3 h-3" />
                <span>2 Foto/Hal</span>
              </button>
              <button
                onClick={() => setPhotosPerPage(1)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  photosPerPage === 1
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="1 Foto Sangat Lebar (Hero) per Halaman A4"
              >
                <FileText className="w-3 h-3" />
                <span>1 Foto Besar</span>
              </button>
            </div>

            {/* Berita Acara Display Mode */}
            <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-700">
              <button
                onClick={() => setDocMode('typed')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  docMode === 'typed'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Format Dokumen Resmi Ketik A4 (Tanpa Logo, Tanda Tangan, dan Stempel)"
              >
                <FileText className="w-3 h-3" />
                <span>Format Ketik (Resmi)</span>
              </button>
              <button
                onClick={() => setDocMode('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  docMode === 'all'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Tampilkan Berita Acara Ketik Bersih dan Lampiran Scan Asli"
              >
                <FileCheck2 className="w-3 h-3" />
                <span>Format Ketik + Scan Asli</span>
              </button>
              <button
                onClick={() => setDocMode('scan')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                  docMode === 'scan'
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Hanya Lampiran Scan Asli (2 Lembar)"
              >
                <ImageIcon className="w-3 h-3" />
                <span>Scan Asli (2 Lembar)</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Main Document Pages Container */}
      <div className="document-container">
        
        {/* ================= HALAMAN 1: KAVER UTAMA (A4) ================= */}
        {(() => {
          const pageNum = getNextPageNumber();
          return (
            <section className="document-section border-t-8 border-orange-600">
              <div>
                {/* Kop Resmi Surat Pemerintah */}
                <div className="flex justify-between items-center border-b-2 border-slate-900 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center font-extrabold text-white text-xl shadow-md">
                      BPBD
                    </div>
                    <KencanaEmblem size={48} className="w-12 h-12 shrink-0 drop-shadow-xs" />
                    <div>
                      <h4 className="font-bold text-[11px] uppercase tracking-wider text-slate-500 leading-tight">
                        Pemerintah Kabupaten Malang
                      </h4>
                      <h3 className="font-extrabold text-sm text-slate-900 leading-tight">
                        Badan Penanggulangan Bencana Daerah
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Sekretariat Tim Verifikasi Gerakan Kecamatan Tangguh Bencana
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="bg-orange-100 text-orange-900 text-[11px] font-extrabold px-3.5 py-1 rounded-full uppercase border border-orange-300 inline-block tracking-wider">
                      Kencana Pratama
                    </span>
                    <p className="text-[10px] text-slate-500 font-semibold mt-1">
                      Edisi Akuntabilitas Lapangan
                    </p>
                  </div>
                </div>

                {/* Banner Utama Kaver */}
                <div className="text-center my-5 py-8 px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white rounded-3xl shadow-xl border-b-8 border-orange-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                  
                  <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3 border border-orange-500/30">
                    <Award className="w-3 h-3 text-orange-400" />
                    <span>Gelar Peralatan & Puncak Acara Kencana Award 2026</span>
                  </div>
                  
                  <h1 className="text-2xl font-black tracking-tight leading-tight mb-2 text-white">
                    BUKU PROFIL & ALBUM DOKUMENTASI
                  </h1>
                  <h2 className="text-base font-extrabold text-slate-200 tracking-wide">
                    GERAKAN KECAMATAN TANGGUH BENCANA (KENCANA)
                  </h2>
                  
                  <div className="w-16 h-1 bg-orange-500 mx-auto my-3 rounded-full"></div>
                  
                  <p className="text-xs font-semibold text-orange-300 tracking-wider">
                    WILAYAH KERJA KECAMATAN LAWANG
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Kesiapsiagaan Menyeluruh Menuju Ketahanan Komunitas Mandiri & Berkelanjutan
                  </p>
                </div>

                {/* Strip Registrasi Resmi Kencana */}
                <div className="bg-orange-50/90 border border-orange-200 rounded-2xl p-3 my-3.5 flex flex-wrap items-center justify-between gap-2 shadow-xs">
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                      Nomor Register
                    </span>
                    <span className="font-extrabold text-slate-900 text-xs font-mono">
                      {KENCANA_REGISTRATION_PROFILE.nomorRegister}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="text-slate-600">
                      Gerakan Kencana: <strong className="text-orange-700">{KENCANA_REGISTRATION_PROFILE.tanggalGerakanKencana}</strong>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">
                      Kencana Pratama: <strong className="text-orange-700">{KENCANA_REGISTRATION_PROFILE.tanggalKencanaPratama}</strong>
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600">
                      PIC: <strong className="text-slate-900">{KENCANA_REGISTRATION_PROFILE.namaPic}</strong> ({KENCANA_REGISTRATION_PROFILE.noHp})
                    </span>
                  </div>
                </div>

                {/* Ringkasan Capaian & Indikator Wilayah */}
                <div className="grid grid-cols-2 gap-3.5 my-3">
                  <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50">
                    <p className="text-[11px] text-slate-500 font-medium">Predikat & Status Penilaian</p>
                    <p className="text-base font-extrabold text-slate-900 mt-0.5">Top 10 Finalis Kabupaten</p>
                    <p className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Kategori Kencana Pratama (Skor Terverifikasi)</span>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50">
                    <p className="text-[11px] text-slate-500 font-medium">Cakupan Wilayah Administrasi</p>
                    <p className="text-base font-extrabold text-slate-900 mt-0.5">10 Desa & 2 Kelurahan</p>
                    <p className="text-[10px] text-slate-600 mt-1">
                      100% Destana Aktif & Terpetakan KRB Partisipatif
                    </p>
                  </div>
                </div>

                {/* Indikator Pendukung Singkat */}
                <div className="grid grid-cols-3 gap-2.5 mt-2">
                  <div className="border border-slate-200 rounded-xl p-2.5 text-center bg-white">
                    <span className="text-[10px] text-slate-500 uppercase block font-medium">Sistem EWS</span>
                    <span className="text-xs font-extrabold text-slate-800">WhatsApp Gateway</span>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-2.5 text-center bg-white">
                    <span className="text-[10px] text-slate-500 uppercase block font-medium">Posko Siaga</span>
                    <span className="text-xs font-extrabold text-slate-800">24/7 Terintegrasi</span>
                  </div>
                  <div className="border border-slate-200 rounded-xl p-2.5 text-center bg-white">
                    <span className="text-[10px] text-slate-500 uppercase block font-medium">Armada Darurat</span>
                    <span className="text-xs font-extrabold text-slate-800">12 Mobil Siaga</span>
                  </div>
                </div>
              </div>

              {/* Footer Kaver */}
              <div className="border-t border-slate-200 pt-3 text-center text-[11px] text-slate-600 flex justify-between items-center">
                <span>Kantor Kecamatan Lawang • Jl. MH. Thamrin No. 2 Lawang, Kab. Malang</span>
                <span className="font-extrabold text-slate-800">Tahun 2026 • Halaman {pageNum} dari {totalDocumentPages}</span>
              </div>
            </section>
          );
        })()}

        {/* ================= HALAMAN 2: KATA PENGANTAR & PROFIL WILAYAH (A4) ================= */}
        {(() => {
          const pageNum = getNextPageNumber();
          return (
            <section className="document-section border-t-8 border-slate-800">
              <div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-2.5 mb-3">
                  <div>
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                      Profil Registrasi & Kata Pengantar Wilayah Kebencanaan
                    </h3>
                    <p className="text-[10px] text-slate-500">Pemerintah Kecamatan Lawang, Kabupaten Malang</p>
                  </div>
                  <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                    Kencana Award 2026
                  </span>
                </div>

                {/* Kartu Profil Registrasi Kencana Resmi */}
                <KencanaProfileCard variant="print" className="my-2" />

                <div className="space-y-2 text-[10.5px] text-slate-700 leading-relaxed text-justify mt-3">
                  <p>
                    <strong>Puji syukur kehadirat Allah SWT</strong>, Buku Profil dan Album Dokumentasi Gerakan Kecamatan Tangguh Bencana (KENCANA) Kecamatan Lawang ini disusun sebagai wujud akuntabilitas, komitmen, serta transparansi tata kelola kesiapsiagaan bencana di wilayah Kecamatan Lawang, Kabupaten Malang. Sebagai salah satu finalis Top 10 Kencana Award 2026 dengan predikat <strong>Kencana Pratama</strong>, Kecamatan Lawang secara konsisten mengoptimalkan mitigasi struktural maupun kultural.
                  </p>
                  <p>
                    Secara geografis, wilayah Kecamatan Lawang memiliki luas 68,23 km² dengan topografi perbukitan dan lereng kaki Gunung Arjuno di sisi barat yang menyimpan potensi kerawanan bencana hidrometeorologi, seperti tanah longsor di zona lereng (khususnya Desa Srigading dan Ketindan), potensi luapan banjir bandang di alur Kali Lawang, serta angin puting beliung pada musim transisi. Untuk menekan risiko tersebut, Kecamatan Lawang mengembangkan tata kelola ketangguhan terpadu melalui 5 Dimensi Penilaian Kencana:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 my-2 text-left">
                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="font-bold text-slate-900 text-[11px]">1. Tata Kelola & Kelembagaan (20%)</p>
                        <span className="text-[9.5px] text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">Terpenuhi</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-tight">SK Satgas Kencana 2026, sinergi Forkopimcam & Puskesmas, 3 SOP baku tanggap darurat, dan alokasi APBD/CSR.</p>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="font-bold text-slate-900 text-[11px]">2. Pencegahan & Mitigasi (20%)</p>
                        <span className="text-[9.5px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">Terpenuhi</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-tight">Peta KRB GIS, 100% Destana aktif, normalisasi aliran sungai, dan penanaman 4.500 vetiver lereng tebing.</p>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="font-bold text-slate-900 text-[11px]">3. Kesiapsiagaan & EWS (25%)</p>
                        <span className="text-[9.5px] text-orange-700 font-semibold bg-orange-50 px-1.5 py-0.2 rounded border border-orange-200">Prioritas</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-tight">EWS WhatsApp API & sirine terhubung 1.400 kontak RT/RW, 32 plang rambu evakuasi, dan simulasi mandiri.</p>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="font-bold text-slate-900 text-[11px]">4. Respons & Darurat (20%)</p>
                        <span className="text-[9.5px] text-red-700 font-semibold bg-red-50 px-1.5 py-0.2 rounded border border-red-200">24/7 Siaga</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-tight">Posko TRC Jl. MH. Thamrin No. 2, repeater radio VHF/UHF, 12 unit Ambulans/Mobil Siaga, respons cepat &lt;15 menit.</p>
                    </div>

                    <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 col-span-2">
                      <div className="flex justify-between items-center mb-0.5">
                        <p className="font-bold text-slate-900 text-[11px]">5. Partisipasi & Inovasi Unggulan (15%)</p>
                        <span className="text-[9.5px] text-purple-700 font-semibold bg-purple-50 px-1.5 py-0.2 rounded border border-purple-200">Inovasi Digital</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-tight">Pentahelix Digital Platform, direktori darurat 12 desa/kelurahan, serta pemetaan BNBA 842 kelompok rentan (lansia dan disabilitas).</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-2 text-center text-[10.5px] text-slate-500 flex justify-between items-center">
                <span>#KecamatanLawangTangguh • #KencanaAward2026</span>
                <span>Halaman {pageNum} dari {totalDocumentPages} • Profil & Kata Pengantar</span>
              </div>
            </section>
          );
        })()}

        {/* ================= HALAMAN BAB 1 - 5: DINAMIS & FLEKSIBEL SESUAI JUMLAH FOTO ================= */}
        {chapterPages.map((pagesGroup, groupIdx) => {
          return pagesGroup.map((pageData) => {
            const pageNum = getNextPageNumber();
            const { dimension, photos: pagePhotos, pageIndex, totalPages } = pageData;
            const isFirstPage = pageIndex === 0;

            return (
              <section 
                key={`${dimension.id}-page-${pageIndex}`}
                className={`document-section border-t-8 ${dimension.borderTopColor}`}
              >
                <div>
                  
                  {/* Top Bar Indicator */}
                  <div className="flex justify-between items-center mb-2.5 border-b border-slate-200 pb-2">
                    <span className={`text-xs font-extrabold tracking-wider uppercase ${dimension.accentColor}`}>
                      {dimension.title} • Bobot {dimension.weight}% {dimension.category === 'posko' ? '(PRIORITAS)' : ''}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {totalPages > 1 ? `Bagian ${pageIndex + 1} dari ${totalPages}` : 'Kencana Award 2026'}
                    </span>
                  </div>

                  {/* Header Title: Full Banner on Page 1, Continuation Banner on Subsequent Pages */}
                  {isFirstPage ? (
                    <div className="mb-3.5 flex justify-between items-start">
                      <div>
                        <span className="text-xl font-black text-slate-300 leading-none">
                          {dimension.chapterNumber}
                        </span>
                        <h2 className="text-base font-black text-slate-900 leading-snug">
                          {dimension.title}
                        </h2>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {dimension.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => onOpenAddModalWithCategory(dimension.category)}
                        className="no-print text-xs text-orange-600 hover:text-orange-800 font-semibold flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-200 cursor-pointer shrink-0"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>+ Foto {dimension.chapterNumber}</span>
                      </button>
                    </div>
                  ) : (
                    <div className="mb-3.5 flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-xs font-black text-slate-700 mr-2">
                          {dimension.chapterNumber} (Lanjutan)
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          Dokumentasi Tambahan Kegiatan Terverifikasi
                        </span>
                      </div>
                      <button
                        onClick={() => onOpenAddModalWithCategory(dimension.category)}
                        className="no-print text-xs text-orange-600 hover:text-orange-800 font-semibold flex items-center gap-1 bg-white px-2.5 py-1 rounded-md border border-slate-200 cursor-pointer shrink-0"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>+ Foto</span>
                      </button>
                    </div>
                  )}

                  {/* Wide Photos Dynamic List */}
                  <div className="dynamic-gallery my-2">
                    {pagePhotos.length === 0 ? (
                      <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                        <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs text-slate-500 font-medium">Belum ada foto dokumentasi untuk bab ini.</p>
                        <button
                          onClick={() => onOpenAddModalWithCategory(dimension.category)}
                          className="no-print mt-3 text-xs bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-xl cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          <span>Tambah Foto Dokumentasi Sekarang</span>
                        </button>
                      </div>
                    ) : (
                      pagePhotos.map((photo) => renderWidePhotoCard(photo, pagePhotos.length === 1))
                    )}
                  </div>

                </div>

                {/* Footer with Real Dynamic Page Number */}
                <div className="text-center text-[10.5px] text-slate-500 border-t border-slate-100 pt-2 flex justify-between items-center">
                  <span>Dokumentasi Resmi {dimension.chapterNumber} — {dimension.title}</span>
                  <span className="font-semibold text-slate-700">
                    Halaman {pageNum} dari {totalDocumentPages}
                  </span>
                </div>
              </section>
            );
          });
        })}

        {/* ================= BERITA ACARA RESMI (FORMAT KETIK A4 - HALAMAN 1 & 2) ================= */}
        {(docMode === 'all' || docMode === 'typed') && (
          <>
            {/* --- BERITA ACARA HALAMAN 1 --- */}
            {(() => {
              const pageNum = getNextPageNumber();
              return (
                <section className="document-section border-t-8 border-slate-900 bg-white">
                  <div>
                    {/* Kop Surat Resmi BPBD Kabupaten Malang (Tanpa Logo) */}
                    <div className="text-center pb-2 mb-2">
                      <h4 className="font-bold text-[13.5px] tracking-wide text-slate-800 leading-tight">
                        PEMERINTAH KABUPATEN MALANG
                      </h4>
                      <h3 className="font-extrabold text-[15.5px] tracking-tight text-slate-950 uppercase leading-snug">
                        BADAN PENANGGULANGAN BENCANA DAERAH
                      </h3>
                      <p className="text-[10.5px] text-slate-700 leading-tight mt-0.5">
                        Jalan Trunojoyo Kepanjen, Kabupaten Malang, Jawa Timur
                      </p>
                      <p className="text-[10px] text-slate-700 leading-tight">
                        Telepon/ Faksimile (0341) 392121 Laman : bpbd.malangkab.go.id
                      </p>
                      <p className="text-[10px] text-slate-700 leading-tight">
                        Pos-el : bpbd@malangkab.go.id, Kode Pos : 65163
                      </p>
                    </div>

                    {/* Garis Ganda Kop Surat Resmi */}
                    <div className="border-b-[2.5px] border-black mb-[1.5px]"></div>
                    <div className="border-b-[1px] border-black mb-4"></div>

                    {/* Judul & Nomor Berita Acara */}
                    <div className="text-center mb-3">
                      <h2 className="font-bold text-xs uppercase tracking-wide text-slate-950 underline underline-offset-2">
                        BERITA ACARA VERIFIKASI LAPANGAN
                      </h2>
                      <h2 className="font-bold text-xs uppercase tracking-wide text-slate-950">
                        KENCANA AWARD TAHUN 2026
                      </h2>
                      <p className="text-[11px] text-slate-900 mt-1 font-mono">
                        Nomor : {OFFICIAL_VERIFICATION.nomorSurat}
                      </p>
                    </div>

                    {/* Narasi Dasar Pelaksanaan */}
                    <p className="text-[11px] text-slate-800 leading-relaxed text-justify mb-3">
                      Pada hari <span className="font-bold uppercase tracking-wider">{OFFICIAL_VERIFICATION.hariVerifikasi}</span> tanggal <span className="font-semibold">{OFFICIAL_VERIFICATION.tanggalVerifikasi}</span>, bertempat di <span className="font-semibold">{OFFICIAL_VERIFICATION.tempat}</span>, telah dijadwalkan verifikasi lapangan KENCANA Award 2026 berdasarkan Surat Perintah Kepala Pelaksana BPBD Kabupaten Malang Nomor : {OFFICIAL_VERIFICATION.nomorSuratPerintah} tanggal {OFFICIAL_VERIFICATION.tanggalSuratPerintah}.
                    </p>

                    {/* A. IDENTITAS PELAKSANAAN */}
                    <div className="mb-3.5">
                      <h3 className="font-bold text-[11px] text-slate-950 mb-1 uppercase tracking-wide">
                        A. IDENTITAS PELAKSANAAN
                      </h3>
                      <table className="w-full text-[11px] border-collapse border border-black">
                        <tbody>
                          <tr>
                            <td className="border border-black px-3 py-1.5 w-60 font-medium text-slate-800 bg-slate-50/50">
                              Kecamatan
                            </td>
                            <td className="border border-black px-3 py-1.5 font-bold uppercase tracking-wide text-slate-950">
                              {OFFICIAL_VERIFICATION.kecamatan}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black px-3 py-1.5 font-medium text-slate-800 bg-slate-50/50">
                              Jadwal
                            </td>
                            <td className="border border-black px-3 py-1.5 text-slate-900 font-mono text-[10.5px]">
                              {OFFICIAL_VERIFICATION.jadwal}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black px-3 py-1.5 font-medium text-slate-800 bg-slate-50/50">
                              Penanggung jawab surat perintah
                            </td>
                            <td className="border border-black px-3 py-1.5 font-semibold text-slate-950">
                              {OFFICIAL_VERIFICATION.penanggungJawab}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black px-3 py-1.5 font-medium text-slate-800 bg-slate-50/50">
                              Anggota tim (perwakilan)
                            </td>
                            <td className="border border-black px-3 py-1.5 font-semibold text-slate-950">
                              {OFFICIAL_VERIFICATION.anggotaTim}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black px-3 py-1.5 font-medium text-slate-800 bg-slate-50/50">
                              Camat / wakil kecamatan
                            </td>
                            <td className="border border-black px-3 py-1.5 font-bold text-slate-950">
                              {OFFICIAL_VERIFICATION.camat}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* B. RUANG LINGKUP DAN METODE */}
                    <div className="mb-3.5">
                      <h3 className="font-bold text-[11px] text-slate-950 mb-1 uppercase tracking-wide">
                        B. RUANG LINGKUP DAN METODE
                      </h3>
                      <p className="text-[11px] text-slate-800 leading-relaxed text-justify">
                        Pemeriksaan fisik dokumen dan eviden; klarifikasi dan wawancara; observasi implementasi; serta pencatatan temuan dan pemberian skor berdasarkan instrumen verifikasi lapangan pada lima dimensi penilaian.
                      </p>
                    </div>

                    {/* C. REKAP DATA SISTEM */}
                    <div className="mb-2">
                      <h3 className="font-bold text-[11px] text-slate-950 mb-1 uppercase tracking-wide">
                        C. REKAP DATA SISTEM
                      </h3>
                      <table className="w-full text-[11px] border-collapse border border-black">
                        <thead>
                          <tr className="bg-slate-100 font-bold text-slate-950">
                            <th className="border border-black px-3 py-1.5 text-left">Dimensi</th>
                            <th className="border border-black px-3 py-1.5 text-center w-36">Nilai / skor</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-black px-3 py-1.5 text-slate-900">Tata Kelola & Kelembagaan</td>
                            <td className="border border-black px-3 py-1.5 text-center font-mono font-semibold text-slate-950">
                              16 . 80
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black px-3 py-1.5 text-slate-900">Pencegahan & Mitigasi</td>
                            <td className="border border-black px-3 py-1.5 text-center font-mono font-semibold text-slate-950">
                              15 . 29
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black px-3 py-1.5 text-slate-900">Kesiapsiagaan & Peringatan Dini</td>
                            <td className="border border-black px-3 py-1.5 text-center font-mono font-semibold text-slate-950">
                              20 . 00
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black px-3 py-1.5 text-slate-900">Respons & Kapasitas Penanganan</td>
                            <td className="border border-black px-3 py-1.5 text-center font-mono font-semibold text-slate-950">
                              20 . 00
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black px-3 py-1.5 text-slate-900">Partisipasi & Inovasi Masyarakat</td>
                            <td className="border border-black px-3 py-1.5 text-center font-mono font-semibold text-slate-950">
                              9 . 55
                            </td>
                          </tr>
                          <tr className="font-bold bg-slate-50">
                            <td className="border border-black px-3 py-2 text-slate-950">Total yang tercantum</td>
                            <td className="border border-black px-3 py-2 text-center text-slate-950 font-black text-xs font-mono">
                              81 . 64
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Footer Halaman 1 */}
                  <div className="text-center text-[10.5px] text-slate-500 border-t border-slate-200 pt-2 flex justify-between items-center">
                    <span>Berita Acara Verifikasi Lapangan Kencana Award 2026 • Lembar 1 dari 2</span>
                    <span className="font-semibold text-slate-700">
                      Halaman {pageNum} dari {totalDocumentPages}
                    </span>
                  </div>
                </section>
              );
            })()}

            {/* --- BERITA ACARA HALAMAN 2 --- */}
            {(() => {
              const pageNum = getNextPageNumber();
              return (
                <section className="document-section border-t-8 border-slate-900 bg-white">
                  <div>
                    {/* Catatan Ekspor Sistem */}
                    <div className="mb-4 pt-4">
                      <p className="text-[11px] text-slate-800 italic">
                        {OFFICIAL_VERIFICATION.catatanEkspor}
                      </p>
                    </div>

                    {/* D. PENUTUP */}
                    <div className="mb-8">
                      <h3 className="font-bold text-[11px] text-slate-950 mb-1.5 uppercase tracking-wide">
                        D. PENUTUP
                      </h3>
                      <p className="text-[11px] text-slate-800 leading-relaxed text-justify">
                        Berita acara ini ditandatangani setelah pemeriksaan lapangan benar-benar selesai. Rincian skor dan catatan indikator terlampir serta menjadi bagian yang tidak terpisahkan. Tanda tangan pihak kecamatan menyatakan kegiatan telah dilaksanakan, bukan persetujuan otomatis atas seluruh skor.
                      </p>
                    </div>

                    {/* Kolom Tanda Tangan Resmi (Tanpa Tanda Tangan Digital & Stempel Digital) */}
                    <div className="grid grid-cols-2 gap-8 pt-6 mb-16 relative">
                      
                      {/* Sisi Kiri: Tim Verifikasi BPBD */}
                      <div className="text-center">
                        <p className="text-[11px] text-slate-900 font-medium">Ketua Rombongan</p>
                        <p className="text-[11px] text-slate-900 font-medium">Tim Verifikasi Lapangan</p>
                        
                        {/* Ruang Kosong Bersih untuk Tanda Tangan Fisik Basah */}
                        <div className="h-28 flex items-center justify-center"></div>

                        <p className="font-bold text-[11.5px] text-slate-950 mt-1">
                          ( {OFFICIAL_VERIFICATION.penanggungJawab} )
                        </p>
                      </div>

                      {/* Sisi Kanan: Pihak Kecamatan Lawang */}
                      <div className="text-center">
                        <p className="text-[11px] text-slate-900 font-medium">Pihak Kecamatan</p>
                        
                        {/* Ruang Kosong Bersih untuk Tanda Tangan Fisik & Cap Stempel Basah */}
                        <div className="h-28 flex items-center justify-center"></div>

                        <p className="font-bold text-[11.5px] text-slate-950 underline underline-offset-2">
                          {OFFICIAL_VERIFICATION.camat}
                        </p>
                        <p className="text-[10.5px] text-slate-800 font-medium mt-0.5">
                          {OFFICIAL_VERIFICATION.camatPangkat}
                        </p>
                        <p className="text-[10px] text-slate-700 font-mono">
                          NIP. {OFFICIAL_VERIFICATION.camatNip}
                        </p>
                      </div>

                    </div>

                    {/* Lampiran di Bagian Bawah */}
                    <div className="pt-6 border-t border-slate-200">
                      <p className="text-[10.5px] text-slate-700 italic">
                        Lampiran : lembar skor indikator; daftar hadir; dokumentasi;
                      </p>
                    </div>
                  </div>

                  {/* Footer Halaman 2 */}
                  <div className="text-center text-[10.5px] text-slate-500 border-t border-slate-200 pt-2 flex justify-between items-center">
                    <span>Berita Acara Verifikasi Lapangan Kencana Award 2026 • Lembar 2 dari 2</span>
                    <span className="font-semibold text-slate-700">
                      Halaman {pageNum} dari {totalDocumentPages}
                    </span>
                  </div>
                </section>
              );
            })()}
          </>
        )}

        {/* ================= LAMPIRAN SCAN ASLI BERSTEMPEL & BERTANDA TANGAN (2 LEMBAR) ================= */}
        {(docMode === 'all' || docMode === 'scan') && (
          <>
            {/* --- SCAN ASLI LEMBAR 1 --- */}
            {(() => {
              const pageNum = getNextPageNumber();
              return (
                <section className="document-section border-t-8 border-indigo-700 bg-slate-50/70">
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-300 pb-2.5 mb-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 bg-indigo-100 text-indigo-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border border-indigo-300">
                          <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                          <span>Lampiran Dokumen Otentik</span>
                        </div>
                        <h3 className="font-extrabold text-xs text-slate-900 mt-1">
                          SCAN ASLI: BERITA ACARA VERIFIKASI LAPANGAN (LEMBAR 1)
                        </h3>
                        <p className="text-[10px] text-slate-600 font-mono">
                          Nomor: {OFFICIAL_VERIFICATION.nomorSurat}
                        </p>
                      </div>

                      <button
                        onClick={() => setPreviewScanImage(OFFICIAL_VERIFICATION.scanImages[0])}
                        className="no-print text-[11px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Perbesar Scan</span>
                      </button>
                    </div>

                    {/* Scanned Image Container (Crisp & Centered) */}
                    <div className="flex flex-col items-center justify-center my-1">
                      <div className="relative border border-slate-300 rounded-xl overflow-hidden shadow-md bg-white w-full max-h-[220mm] flex items-center justify-center">
                        <img
                          src={OFFICIAL_VERIFICATION.scanImages[0]}
                          alt="Scan Berita Acara Lembar 1 - BPBD Kabupaten Malang"
                          className="max-h-[215mm] w-auto max-w-full object-contain cursor-zoom-in"
                          onClick={() => setPreviewScanImage(OFFICIAL_VERIFICATION.scanImages[0])}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Scan Lembar 1 */}
                  <div className="text-center text-[10px] text-slate-500 border-t border-slate-200 pt-2 flex justify-between items-center">
                    <span>Scan Dokumen Asli Lembar 1 • BPBD Kab. Malang & Kec. Lawang</span>
                    <span className="font-semibold text-slate-700">
                      Halaman {pageNum} dari {totalDocumentPages}
                    </span>
                  </div>
                </section>
              );
            })()}

            {/* --- SCAN ASLI LEMBAR 2 (STEMPEL & TANDA TANGAN) --- */}
            {(() => {
              const pageNum = getNextPageNumber();
              return (
                <section className="document-section border-t-8 border-indigo-700 bg-slate-50/70">
                  <div>
                    <div className="flex justify-between items-center border-b border-slate-300 pb-2.5 mb-3">
                      <div>
                        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Bukti Sah Stempel Basah & Tanda Tangan</span>
                        </div>
                        <h3 className="font-extrabold text-xs text-slate-900 mt-1">
                          SCAN ASLI: BERITA ACARA VERIFIKASI LAPANGAN (LEMBAR 2)
                        </h3>
                        <p className="text-[10px] text-slate-600">
                          Pengesahan Camat Lawang & Tim Verifikator Lapangan BPBD
                        </p>
                      </div>

                      <button
                        onClick={() => setPreviewScanImage(OFFICIAL_VERIFICATION.scanImages[1])}
                        className="no-print text-[11px] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <ZoomIn className="w-3.5 h-3.5" />
                        <span>Perbesar Scan</span>
                      </button>
                    </div>

                    {/* Scanned Image Container (Crisp & Centered) */}
                    <div className="flex flex-col items-center justify-center my-1">
                      <div className="relative border border-slate-300 rounded-xl overflow-hidden shadow-md bg-white w-full max-h-[220mm] flex items-center justify-center">
                        <img
                          src={OFFICIAL_VERIFICATION.scanImages[1]}
                          alt="Scan Berita Acara Lembar 2 - Pengesahan & Stempel Basah"
                          className="max-h-[215mm] w-auto max-w-full object-contain cursor-zoom-in"
                          onClick={() => setPreviewScanImage(OFFICIAL_VERIFICATION.scanImages[1])}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Scan Lembar 2 */}
                  <div className="text-center text-[10px] text-slate-500 border-t border-slate-200 pt-2 flex justify-between items-center">
                    <span>Scan Dokumen Asli Lembar 2 • Terverifikasi Cap Stempel Ungu & Tanda Tangan</span>
                    <span className="font-semibold text-slate-700">
                      Halaman {pageNum} dari {totalDocumentPages}
                    </span>
                  </div>
                </section>
              );
            })()}
          </>
        )}

      </div>

      {/* Modal Lightbox untuk Perbesar Scan Asli Resolusi Penuh */}
      {previewScanImage && (
        <div
          className="no-print fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in"
          onClick={() => setPreviewScanImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 text-white">
              <span className="text-xs font-bold flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-orange-400" />
                <span>Dokumen Fisik Berita Acara Kencana Award 2026 (Resolusi Penuh)</span>
              </span>
              <button
                onClick={() => setPreviewScanImage(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 overflow-auto flex items-center justify-center bg-black/40">
              <img
                src={previewScanImage}
                alt="Dokumen Fisik Berita Acara Resolusi Penuh"
                className="max-h-[82vh] w-auto object-contain rounded-lg"
              />
            </div>
            <div className="px-4 py-2.5 bg-slate-800 text-[11px] text-slate-300 flex justify-between items-center">
              <span>Klik di luar gambar atau tombol silang untuk menutup</span>
              <span className="font-mono text-orange-300">Skor Terverifikasi: 81.64</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
