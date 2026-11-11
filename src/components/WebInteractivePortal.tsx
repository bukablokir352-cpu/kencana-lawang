import React, { useState, useMemo } from 'react';
import { Photo, PhotoCategory, Dimension, Village } from '../types/kencana';
import { INITIAL_DIMENSIONS, VILLAGES_DATA, INITIAL_EWS_TEMPLATES, KENCANA_REGISTRATION_PROFILE, OFFICIAL_VERIFICATION } from '../data/kencanaData';
import { KencanaProfileCard } from './KencanaProfileCard';
import { sortPhotosByActivityDate } from '../utils/dateUtils';
import { 
  Award, 
  ShieldCheck, 
  AlertTriangle, 
  PhoneCall, 
  Radio, 
  MapPin, 
  Search, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  FileText, 
  Printer, 
  CheckCircle2, 
  Users, 
  Truck, 
  ChevronRight, 
  Send, 
  Copy, 
  Check, 
  Flame, 
  Info,
  Maximize2,
  Calendar,
  Layers,
  ArrowRight,
  ArrowUpDown,
  LayoutGrid
} from 'lucide-react';

interface WebInteractivePortalProps {
  photos: Photo[];
  onOpenAddModal: () => void;
  onOpenAddModalWithCategory: (category: PhotoCategory) => void;
  onOpenEditModal: (photo: Photo) => void;
  onDeletePhoto: (id: string | number) => void;
  onOpenLightbox: (photo: Photo) => void;
  onSwitchToA4: () => void;
  onPrint: () => void;
}

export const WebInteractivePortal: React.FC<WebInteractivePortalProps> = ({
  photos,
  onOpenAddModal,
  onOpenAddModalWithCategory,
  onOpenEditModal,
  onDeletePhoto,
  onOpenLightbox,
  onSwitchToA4,
  onPrint,
}) => {
  const [selectedDimensionId, setSelectedDimensionId] = useState<string>('dimensi-3');
  const [activePhotoCategory, setActivePhotoCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [galleryViewMode, setGalleryViewMode] = useState<'wide' | 'grid'>('wide');
  const [selectedVillageId, setSelectedVillageId] = useState<string>('srigading');
  
  // EWS Simulator State
  const [ewsLevel, setEwsLevel] = useState<'WASPADA' | 'SIAGA' | 'AWAS'>('SIAGA');
  const [ewsTargetVillage, setEwsTargetVillage] = useState<string>('Desa Srigading & Ketindan');
  const [ewsAlertActive, setEwsAlertActive] = useState<boolean>(false);
  const [copiedEws, setCopiedEws] = useState<boolean>(false);

  const selectedDimension = INITIAL_DIMENSIONS.find(d => d.id === selectedDimensionId) || INITIAL_DIMENSIONS[0];
  const selectedVillage = VILLAGES_DATA.find(v => v.id === selectedVillageId) || VILLAGES_DATA[0];

  // Filter and sort photos chronologically by activity date
  const filteredPhotos = useMemo(() => {
    const filtered = photos.filter(p => {
      const matchesCategory = activePhotoCategory === 'all' || p.category === activePhotoCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        p.title.toLowerCase().includes(query) || 
        p.desc.toLowerCase().includes(query) ||
        (p.location && p.location.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });

    return sortPhotosByActivityDate(filtered, sortOrder);
  }, [photos, activePhotoCategory, searchQuery, sortOrder]);

  const getDimensionPhotoCount = (category: PhotoCategory) => {
    return photos.filter(p => p.category === category).length;
  };

  const handleTriggerEws = () => {
    setEwsAlertActive(true);
    setTimeout(() => {
      setEwsAlertActive(false);
    }, 7000);
  };

  const currentEwsTemplate = INITIAL_EWS_TEMPLATES.find(t => t.level === ewsLevel) || INITIAL_EWS_TEMPLATES[1];

  const handleCopyEws = () => {
    const textToCopy = `*[PERINGATAN DINI RESMI KENCANA LAWANG]*\nLevel: ${ewsLevel}\nBahaya: ${currentEwsTemplate.hazard}\nLokasi: ${ewsTargetVillage}\nWaktu: ${new Date().toLocaleTimeString('id-ID')} WIB\n\nPesan:\n${currentEwsTemplate.message}\n\nInstruksi Warga:\n${currentEwsTemplate.guidance.map((g, i) => `${i + 1}. ${g}`).join('\n')}\n\nPosko Siaga TRC Kecamatan Lawang: 0811-3400-247`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedEws(true);
    setTimeout(() => setCopiedEws(false), 2500);
  };

  return (
    <div className="w-full min-h-screen text-slate-100 pb-20">
      
      {/* ================= SIMULATION TOAST ALERT ================= */}
      {ewsAlertActive && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-xl bg-red-600 text-white p-4 rounded-2xl shadow-2xl border-2 border-red-300 animate-bounce flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5 text-white" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded">
                Simulasi EWS Broadcast Terkirim!
              </span>
              <button 
                onClick={() => setEwsAlertActive(false)}
                className="text-xs text-white/80 hover:text-white font-bold ml-2"
              >
                Tutup
              </button>
            </div>
            <p className="text-sm font-bold mt-1">
              {currentEwsTemplate.hazard} ({ewsLevel})
            </p>
            <p className="text-xs text-red-100 mt-0.5">
              Target Broadcast: {ewsTargetVillage}. Pesan peringatan terkirim ke 1.400 kontak RT/RW & Tim Relawan Destana.
            </p>
          </div>
        </div>
      )}

      {/* ================= HERO BRIEFING SECTION ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 pt-8 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,88,12,0.15),rgba(255,255,255,0))] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Official Badge & Subtitle */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
              <Award className="w-3.5 h-3.5" />
              <span>Top 10 Finalis Kencana Award 2026 Kabupaten Malang</span>
            </span>
            <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Predikat Kencana Pratama</span>
            </span>
            <span className="text-xs text-slate-400 ml-1 hidden sm:inline">
              BPBD Kab. Malang & Forkopimcam Lawang
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Buku Profil & Album Dokumentasi <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                  Kecamatan Tangguh Bencana
                </span>
              </h1>
              
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
                Portofolio akuntabilitas lapangan dan sistem kesiapsiagaan bencana hidrometeorologi terpadu di wilayah Kecamatan Lawang (10 Desa & 2 Kelurahan) di bawah lereng kaki Gunung Arjuno.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button
                  onClick={onSwitchToA4}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-orange-600/30 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Buka Format Lembar Buku A4</span>
                </button>

                <button
                  onClick={onPrint}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-orange-400" />
                  <span>Cetak Buku Lengkap (PDF)</span>
                </button>

                <button
                  onClick={onOpenAddModal}
                  className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/80 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  <span>+ Tambah Foto Dokumentasi</span>
                </button>
              </div>
            </div>

            {/* Right Hero Card: Quick Posko Status */}
            <div className="lg:col-span-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl backdrop-blur-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Posko Komando TRC Siaga 24/7
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Aktif Normal
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Kantor Kecamatan Lawang, Jl. MH. Thamrin No. 2 Lawang</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">Hotline Darurat: 0811-3400-247 / 112</span>
                </div>

                <div className="flex items-center gap-2 text-slate-300">
                  <Truck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>12 Armada Ambulans & Mobil Siaga Siap Gerak</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Piket TRC Hari Ini:</span>
                <span className="text-xs font-bold text-slate-200">Regu Gabungan Forkopimcam</span>
              </div>
            </div>

          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mt-8 pt-8 border-t border-slate-800">
            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 block font-medium">5 Dimensi Penilaian</span>
              <span className="text-xl font-extrabold text-white mt-1 block">100% Terpenuhi</span>
              <span className="text-[10px] text-emerald-400 mt-0.5 block">Bobot Skor Akumulasi 100%</span>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 block font-medium">Cakupan Wilayah</span>
              <span className="text-xl font-extrabold text-white mt-1 block">12 Desa / Kelurahan</span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">100% Destana Mandiri</span>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 block font-medium">EWS & Rambu Evakuasi</span>
              <span className="text-xl font-extrabold text-white mt-1 block">32 Titik Rambu</span>
              <span className="text-[10px] text-orange-400 mt-0.5 block">WhatsApp Blast & Assembly Points</span>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-3.5">
              <span className="text-xs text-slate-400 block font-medium">Kelompok Rentan (BNBA)</span>
              <span className="text-xl font-extrabold text-white mt-1 block">842 Jiwa</span>
              <span className="text-[10px] text-purple-400 mt-0.5 block">Lansia & Disabilitas Terpetakan</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= PROFIL RESMI & DATA REGISTRASI KENCANA ================= */}
      <section id="profil-kencana-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
              Data Resmi Registrasi Gerakan Kencana
            </span>
            <h2 className="text-2xl font-black text-white">
              Buku Profil Kecamatan Tangguh Bencana Lawang
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Nomor Register Terakreditasi, Kontak Person In Charge (PIC), dan Ringkasan Wilayah Kerja.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToA4}
              className="bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 border border-orange-500/30 font-semibold px-3.5 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lihat Format Buku Cetak A4</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Exact 2-Card component from screenshot */}
          <div className="lg:col-span-5 flex justify-center">
            <KencanaProfileCard variant="full" />
          </div>

          {/* Right Column: Profil Wilayah, Camat & Informasi Verifikasi Lapangan BPBD */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Kartu Profil Geografis & Kewilayahan */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span>Geografis & Karakteristik Kerawanan Wilayah</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed text-justify">
                Kecamatan Lawang memiliki luas wilayah <strong>68,23 km²</strong> yang terdiri dari <strong>10 Desa dan 2 Kelurahan</strong> di lereng timur kaki Gunung Arjuno. Topografi perbukitan dan aliran sungai Kali Lawang serta Kali Surak menuntut kesiapsiagaan terpadu terhadap ancaman hidrometeorologi (tanah longsor, angin kencang, dan banjir genangan).
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-slate-700/60 text-xs">
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Desa / Kelurahan</span>
                  <span className="text-sm font-extrabold text-white mt-0.5 block">10 Desa + 2 Kel</span>
                  <span className="text-[10px] text-emerald-400">100% Destana Mandiri</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Skor Verifikasi</span>
                  <span className="text-sm font-extrabold text-white mt-0.5 block">{OFFICIAL_VERIFICATION.scores.total} Poin</span>
                  <span className="text-[10px] text-orange-400">Kencana Pratama</span>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-slate-400 uppercase block font-semibold">Tanggal Pratama</span>
                  <span className="text-sm font-extrabold text-white mt-0.5 block">{KENCANA_REGISTRATION_PROFILE.tanggalKencanaPratama}</span>
                  <span className="text-[10px] text-slate-400">Gerakan: {KENCANA_REGISTRATION_PROFILE.tanggalGerakanKencana}</span>
                </div>
              </div>
            </div>

            {/* Pimpinan & Penanggung Jawab Satgas */}
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Pimpinan & Penanggung Jawab Lapangan</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Camat Lawang</span>
                  <p className="text-sm font-extrabold text-white mt-1">{OFFICIAL_VERIFICATION.camat}</p>
                  <p className="text-[11px] text-slate-300">{OFFICIAL_VERIFICATION.camatPangkat} • NIP. {OFFICIAL_VERIFICATION.camatNip}</p>
                </div>

                <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Person In Charge (PIC)</span>
                  <p className="text-sm font-extrabold text-white mt-1">{KENCANA_REGISTRATION_PROFILE.namaPic}</p>
                  <p className="text-[11px] text-slate-300">HP: {KENCANA_REGISTRATION_PROFILE.noHp}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 truncate">{KENCANA_REGISTRATION_PROFILE.email}</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                  <span>{KENCANA_REGISTRATION_PROFILE.alamatKantor}</span>
                </span>
              </div>
            </div>

            {/* Quick Action Strip */}
            <div className="bg-gradient-to-r from-orange-950/40 to-slate-900/80 border border-orange-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-white">Ingin mengunduh atau mencetak Buku Profil lengkap?</p>
                <p className="text-[11px] text-slate-400">Format dokumen resmi A4 mencakup Kaver, Kata Pengantar, 5 Bab Dimensi, dan Berita Acara.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onSwitchToA4}
                  className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Buka Lembar A4</span>
                </button>
                <button
                  onClick={onPrint}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-orange-400" />
                  <span>Cetak PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 5 DIMENSI EXPLORER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
              Matriks Penilaian Standar BPBD
            </span>
            <h2 className="text-2xl font-black text-white">
              5 Dimensi Gerakan Kecamatan Tangguh Bencana
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Pilih dimensi untuk meninjau indikator pencapaian, regulasi pendukung, dan galeri dokumentasi.
            </p>
          </div>
          
          <button
            onClick={onSwitchToA4}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 self-start md:self-auto bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700"
          >
            <span>Buka Lembar Bab 1 - 5 di A4</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Dimensions Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
          {INITIAL_DIMENSIONS.map((dim) => {
            const isSelected = dim.id === selectedDimensionId;
            const photoCount = getDimensionPhotoCount(dim.category);
            return (
              <button
                key={dim.id}
                onClick={() => setSelectedDimensionId(dim.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-orange-500 shadow-md ring-1 ring-orange-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${dim.accentColor}`}>
                      {dim.chapterNumber}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded">
                      Bobot {dim.weight}%
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                    {dim.title}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{photoCount} Foto</span>
                  <span className="text-orange-400 font-semibold">{isSelected ? 'Aktif' : 'Lihat'}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Dimension Detail Card */}
        <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 border-b border-slate-700/80 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-extrabold uppercase px-2 py-0.5 rounded ${selectedDimension.bgBadge}`}>
                  {selectedDimension.chapterNumber} • Bobot {selectedDimension.weight}%
                </span>
                <span className="text-xs text-slate-400">Kode: {selectedDimension.code}</span>
              </div>
              <h3 className="text-xl font-black text-white">
                {selectedDimension.title}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {selectedDimension.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setActivePhotoCategory(selectedDimension.category);
                  const elem = document.getElementById('album-gallery-section');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Lihat Foto Bab Ini ({getDimensionPhotoCount(selectedDimension.category)})</span>
              </button>
              
              <button
                onClick={() => onOpenAddModalWithCategory(selectedDimension.category)}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>+ Tambah Foto</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 my-4 leading-relaxed">
            {selectedDimension.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            
            {/* Indikator Penilaian */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Indikator Teknis & Verifikasi</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {selectedDimension.indicators.map((ind, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-1.5"></span>
                    <span className="leading-relaxed">{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capaian Nyata & Legal Basis */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Realisasi & Bukti Terverifikasi</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedDimension.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5"></span>
                      <span className="leading-relaxed">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Dasar Regulasi: </span>
                <span>{selectedDimension.legalBasis}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ALBUM DOKUMENTASI INTERAKTIF ================= */}
      <section id="album-gallery-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
              Galeri Bukti Lapangan
            </span>
            <h2 className="text-2xl font-black text-white">
              Album Dokumentasi Kegiatan Kencana
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Arsip foto kegiatan mitigasi, gladi posko, simulasi EWS, rapat koordinasi satgas, dan sarana darurat.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tambah Foto Baru</span>
          </button>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-slate-800/70 p-3.5 rounded-2xl border border-slate-700/80 mb-6 flex flex-col gap-3">
          
          {/* Top Row: Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full">
            <button
              onClick={() => setActivePhotoCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePhotoCategory === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Semua Foto ({photos.length})
            </button>
            <button
              onClick={() => setActivePhotoCategory('simulasi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePhotoCategory === 'simulasi'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Dimensi 1: Tata Kelola ({getDimensionPhotoCount('simulasi')})
            </button>
            <button
              onClick={() => setActivePhotoCategory('mitigasi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePhotoCategory === 'mitigasi'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Dimensi 2: Mitigasi ({getDimensionPhotoCount('mitigasi')})
            </button>
            <button
              onClick={() => setActivePhotoCategory('posko')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePhotoCategory === 'posko'
                  ? 'bg-orange-600 text-white'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Dimensi 3: EWS ({getDimensionPhotoCount('posko')})
            </button>
            <button
              onClick={() => setActivePhotoCategory('respons')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePhotoCategory === 'respons'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Dimensi 4: Respons ({getDimensionPhotoCount('respons')})
            </button>
            <button
              onClick={() => setActivePhotoCategory('inovasi')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activePhotoCategory === 'inovasi'
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900/60 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Dimensi 5: Inovasi ({getDimensionPhotoCount('inovasi')})
            </button>
          </div>

          {/* Bottom Row: Date Sorting, View Density & Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-700/60">
            
            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
              {/* Sort by Date Controls */}
              <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-700 text-xs">
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
                  <span>Tanggal: Awal → Akhir</span>
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

              {/* View Layout Switcher */}
              <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-700 text-xs">
                <button
                  onClick={() => setGalleryViewMode('wide')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    galleryViewMode === 'wide'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tampilan Foto Lebar (2 Kolom)"
                >
                  <FileText className="w-3 h-3" />
                  <span>Foto Lebar</span>
                </button>
                <button
                  onClick={() => setGalleryViewMode('grid')}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    galleryViewMode === 'grid'
                      ? 'bg-orange-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Tampilan Grid Standar (3 Kolom)"
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>Grid 3-Kolom</span>
                </button>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kegiatan / lokasi / tanggal..."
                className="w-full bg-slate-900 text-xs text-white pl-9 pr-3 py-2 rounded-xl border border-slate-700 focus:outline-hidden focus:border-orange-500"
              />
            </div>

          </div>

        </div>

        {/* Gallery Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/40 rounded-2xl border border-dashed border-slate-700">
            <p className="text-sm text-slate-400">Tidak ada foto kegiatan yang sesuai dengan filter.</p>
            <button
              onClick={onOpenAddModal}
              className="mt-3 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Tambah Foto Sekarang</span>
            </button>
          </div>
        ) : (
          <div className={
            galleryViewMode === 'wide'
              ? "grid grid-cols-1 lg:grid-cols-2 gap-6"
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          }>
            {filteredPhotos.map((photo) => {
              const dim = INITIAL_DIMENSIONS.find(d => d.category === photo.category);
              return (
                <div
                  key={photo.id}
                  className="group bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-lg transition-all hover:border-slate-600 flex flex-col justify-between"
                >
                  <div>
                    {/* Wide Image Area with Actions */}
                    <div className={`relative bg-slate-900 overflow-hidden ${
                      galleryViewMode === 'wide' ? 'h-64 sm:h-72 md:h-80' : 'h-52'
                    }`}>
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                      <div className="photo-fallback hidden absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                        <FileText className="w-8 h-8 text-slate-600 mb-1" />
                        <span className="text-xs font-semibold">{photo.title}</span>
                      </div>

                      {/* Dimension Badge */}
                      <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-[10.5px] font-bold px-2.5 py-1 rounded-lg text-orange-400 border border-slate-700 shadow-xs">
                        {dim?.chapterNumber || photo.category.toUpperCase()}
                      </div>

                      {/* Date Badge on Image */}
                      {photo.date && (
                        <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-xs text-orange-300 text-[10.5px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-slate-700 shadow-xs">
                          <Calendar className="w-3 h-3 text-orange-400" />
                          <span>{photo.date}</span>
                        </div>
                      )}

                      {/* Action buttons on image */}
                      <div className="absolute bottom-3 right-3 flex items-center gap-1">
                        <button
                          onClick={() => onOpenLightbox(photo)}
                          title="Perbesar Foto"
                          className="p-2 bg-slate-900/85 hover:bg-slate-900 text-white rounded-lg backdrop-blur-xs transition-colors cursor-pointer shadow-md"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Location Badge on Image */}
                      {photo.location && (
                        <div className="absolute bottom-3 left-3 max-w-[70%] text-[10.5px] text-white bg-slate-950/85 backdrop-blur-xs px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1.5 font-medium truncate">
                          <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                          <span className="truncate">{photo.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Content Area (Keterangan Lengkap Tanpa Terpotong) */}
                    <div className="p-4 sm:p-5">
                      {/* Judul Kegiatan Penuh */}
                      <div className="mb-2">
                        <h4 className="font-extrabold text-sm sm:text-base text-white leading-snug">
                          {photo.title}
                        </h4>
                      </div>

                      {/* Baris Informasi Metadata (Tanggal, Lokasi, Sumber) */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-300 bg-slate-900/80 border border-slate-700/60 rounded-lg px-2.5 py-1.5 mb-2.5">
                        {photo.date && (
                          <div className="flex items-center gap-1 font-semibold text-orange-300">
                            <Calendar className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                            <span>{photo.date}</span>
                          </div>
                        )}
                        {photo.location && (
                          <div className="flex items-center gap-1 text-slate-200">
                            <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                            <span>{photo.location}</span>
                          </div>
                        )}
                        {photo.photographer && (
                          <div className="flex items-center gap-1 text-slate-400">
                            <span className="font-semibold text-slate-300">Sumber:</span>
                            <span>{photo.photographer}</span>
                          </div>
                        )}
                      </div>

                      {/* Keterangan Rinci Kegiatan (Penuh & Sesuai yang Diinput) */}
                      <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap text-justify">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          Keterangan Kegiatan:
                        </span>
                        <p>{photo.desc || <span className="italic text-slate-500">Tidak ada uraian keterangan.</span>}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-4 sm:px-5 py-3 bg-slate-900/60 border-t border-slate-700/80 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[10px] text-slate-400 font-mono">
                      ID: {photo.id} {photo.date ? `• ${photo.date}` : ''}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenEditModal(photo)}
                        className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md hover:bg-slate-800"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDeletePhoto(photo.id)}
                        className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer px-2 py-1 rounded-md hover:bg-slate-800"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= PETA SPASIAL RAWAN BENCANA & ASSEMBLY POINTS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800">
        <div className="mb-6">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
            Zonasi Risiko & Evakuasi
          </span>
          <h2 className="text-2xl font-black text-white">
            Peta Rawan Bencana & Assembly Points Lawang
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Visualisasi spasial lereng barat Arjuno (zona longsor), alur Kali Lawang (zona banjir luapan), dan titik kumpul aman.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Interactive SVG Diagrammatic Map */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Peta Interaktif 12 Desa/Kelurahan</span>
              </span>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="text-slate-400">Rawan Tinggi</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-slate-400">Rawan Sedang</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-400">Titik Kumpul</span>
                </span>
              </div>
            </div>

            {/* SVG Terrain & Village Network */}
            <div className="w-full aspect-4/3 bg-slate-950 rounded-xl border border-slate-800/80 p-4 relative flex flex-col justify-between overflow-hidden">
              
              {/* Background mountain lines representing Mt. Arjuno foothills */}
              <div className="absolute top-0 left-0 w-full h-full opacity-15 pointer-events-none">
                <svg viewBox="0 0 500 350" className="w-full h-full">
                  <path d="M 0 100 Q 150 40 300 120 T 500 80 L 500 350 L 0 350 Z" fill="#ea580c" />
                  <path d="M 50 180 Q 200 120 380 200 T 500 160" stroke="#f97316" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                  <path d="M 120 0 Q 180 150 250 350" stroke="#38bdf8" strokeWidth="3" fill="none" /> {/* Kali Lawang */}
                </svg>
              </div>

              {/* Water River Indicator */}
              <div className="absolute top-2 right-4 text-[10px] text-sky-400 font-semibold bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800/50">
                Alur Kali Lawang ~
              </div>

              {/* Mountain Label */}
              <div className="absolute top-2 left-4 text-[10px] text-orange-400 font-bold bg-orange-950/80 px-2 py-0.5 rounded border border-orange-800/50">
                ▲ Kaki Gunung Arjuno (Zona Lereng)
              </div>

              {/* Village Nodes Grid */}
              <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 gap-2 h-full py-6">
                {VILLAGES_DATA.map((v) => {
                  const isSelected = v.id === selectedVillageId;
                  const isHighRisk = v.riskLevel === 'Tinggi';
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVillageId(v.id)}
                      className={`p-2 rounded-xl text-left transition-all cursor-pointer flex flex-col justify-between border ${
                        isSelected
                          ? 'bg-orange-600/20 border-orange-500 shadow-md ring-2 ring-orange-500/40 text-white'
                          : isHighRisk
                          ? 'bg-red-950/40 border-red-900/60 hover:bg-red-900/40 text-slate-200'
                          : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`w-2 h-2 rounded-full ${isHighRisk ? 'bg-red-500' : 'bg-amber-400'}`}></span>
                          <span className="text-[9px] font-mono text-slate-400">{v.type === 'Kelurahan' ? 'Kel' : 'Des'}</span>
                        </div>
                        <p className="text-[11px] font-bold leading-tight truncate">{v.name.replace(/^(Desa |Kelurahan )/, '')}</p>
                      </div>
                      
                      <div className="mt-1 text-[9px] text-slate-400 flex items-center justify-between">
                        <span>{v.vulnerableCount.elderly + v.vulnerableCount.disability} Rentan</span>
                        {v.hasAmbulance && <span className="text-emerald-400">🚑</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend Bottom Bar */}
              <div className="relative z-10 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>Klik salah satu desa/kelurahan untuk detail profil kesiapsiagaan</span>
                <span className="text-orange-400 font-semibold">12 Titik Aktif</span>
              </div>
            </div>
          </div>

          {/* Selected Village Detail Panel */}
          <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
            <div className="flex items-start justify-between pb-3 border-b border-slate-700 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-extrabold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    {selectedVillage.type}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    selectedVillage.riskLevel === 'Tinggi' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    Tingkat Risiko: {selectedVillage.riskLevel}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white">{selectedVillage.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedVillage.kadesName}</p>
              </div>

              <span className="text-xs font-bold bg-slate-900 px-2.5 py-1 rounded text-slate-300 border border-slate-700">
                Destana: {selectedVillage.destanaStatus}
              </span>
            </div>

            {/* Ancaman Utama */}
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Potensi Bahaya Dominan:
              </span>
              <p className="text-xs text-slate-200 font-semibold leading-relaxed">
                {selectedVillage.primaryRisk}
              </p>
            </div>

            {/* Assembly Point & Evakuasi */}
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Titik Kumpul Aman (Assembly Point):</span>
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {selectedVillage.assemblyPoint}
              </p>
            </div>

            {/* BNBA Census Data */}
            <div className="mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 block mb-1.5 flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>Data By Name By Address (BNBA) Kelompok Rentan:</span>
              </span>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Lansia</span>
                  <span className="font-extrabold text-white text-sm">{selectedVillage.vulnerableCount.elderly}</span>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Disabilitas</span>
                  <span className="font-extrabold text-white text-sm">{selectedVillage.vulnerableCount.disability}</span>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Balita</span>
                  <span className="font-extrabold text-white text-sm">{selectedVillage.vulnerableCount.infants}</span>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Ibu Hamil</span>
                  <span className="font-extrabold text-white text-sm">{selectedVillage.vulnerableCount.pregnant}</span>
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Posko Darurat Desa:</span>
                <span className="font-bold text-orange-400">{selectedVillage.poskoContact}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Mobil Siaga Desa:</span>
                <span className="font-bold text-emerald-400">
                  {selectedVillage.hasAmbulance ? selectedVillage.ambulanceContact : 'Tersedia di Kecamatan'}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= EWS WHATSAPP BLAST SIMULATOR & DIREKTORI 12 DESA ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: EWS WhatsApp Gateway Simulator */}
          <div className="lg:col-span-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-orange-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Simulasi EWS WhatsApp Blast Kencana Lawang
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Inovasi Dimensi 3</span>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Format peringatan dini resmi BPBD yang disalurkan otomatis via WhatsApp Gateway ke koordinator Destana dan grup RW/RT saat sensor cuaca mendeteksi potensi bahaya.
            </p>

            {/* Select Status & Target */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tingkat Status:</label>
                <div className="grid grid-cols-3 gap-1">
                  {(['WASPADA', 'SIAGA', 'AWAS'] as const).map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setEwsLevel(lvl)}
                      className={`py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        ewsLevel === lvl
                          ? lvl === 'AWAS' 
                            ? 'bg-red-600 text-white' 
                            : lvl === 'SIAGA' 
                            ? 'bg-orange-600 text-white' 
                            : 'bg-amber-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Wilayah Terdampak:</label>
                <select
                  value={ewsTargetVillage}
                  onChange={(e) => setEwsTargetVillage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-hidden focus:border-orange-500"
                >
                  <option value="Seluruh Wilayah Kecamatan Lawang">Semua (12 Desa & Kelurahan)</option>
                  <option value="Desa Srigading & Ketindan">Zona Lereng (Srigading & Ketindan)</option>
                  <option value="Desa Sidodadi & Kelurahan Lawang">Zona Kali Lawang (Sidodadi & Kel. Lawang)</option>
                  <option value="Desa Bedali & Wonorejo">Zona Jalur Arteri (Bedali & Wonorejo)</option>
                </select>
              </div>
            </div>

            {/* Simulated WhatsApp Bubble */}
            <div className="bg-[#0b141a] rounded-xl p-3.5 border border-slate-700 font-sans text-xs shadow-inner">
              <div className="bg-[#202c33] text-slate-200 p-3 rounded-lg border-l-4 border-orange-500 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                  <span className="font-extrabold text-orange-400 text-[11px] flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    <span>[EWS KENCANA LAWANG 2026]</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Status: {ewsLevel}</span>
                </div>

                <p className="font-bold text-white text-xs">
                  {currentEwsTemplate.hazard}
                </p>

                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {currentEwsTemplate.message}
                </p>

                <div className="bg-[#111b21] p-2 rounded text-[10.5px] space-y-1">
                  <span className="font-semibold text-orange-300 block">Panduan Tanggap Warga:</span>
                  {currentEwsTemplate.guidance.map((g, idx) => (
                    <p key={idx} className="text-slate-300 flex items-start gap-1">
                      <span>•</span>
                      <span>{g}</span>
                    </p>
                  ))}
                </div>

                <div className="text-[10px] text-slate-400 pt-1 flex justify-between items-center">
                  <span>Posko Induk TRC: 0811-3400-247</span>
                  <span>14:30 WIB ✓✓</span>
                </div>
              </div>
            </div>

            {/* Simulator Action Buttons */}
            <div className="flex items-center justify-between gap-3 mt-4">
              <button
                onClick={handleCopyEws}
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedEws ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEws ? 'Tersalin ke Clipboard!' : 'Salin Pesan WA'}</span>
              </button>

              <button
                onClick={handleTriggerEws}
                className="bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-md shadow-orange-600/30 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Uji Broadcast Simulasi</span>
              </button>
            </div>

          </div>

          {/* Right Column: Direktori Cepat 12 Desa/Kelurahan */}
          <div className="lg:col-span-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Direktori Siaga 12 Desa & Kelurahan
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Kecamatan Lawang</span>
            </div>

            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Jaringan posko komunikasi darurat dan armada ambulans desa yang siaga dimobilisasi dalam hitungan menit.
            </p>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {VILLAGES_DATA.map((village) => (
                <div
                  key={village.id}
                  className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
                >
                  <div className="flex-1 mr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-white text-xs">{village.name}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold ${
                        village.riskLevel === 'Tinggi' ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {village.riskLevel}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {village.kadesName} • Posko: {village.poskoContact}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`tel:${village.poskoContact.replace(/[^0-9]/g, '')}`}
                      className="bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors flex items-center gap-1"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Hubungi</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
              <span>Integrasi Ambulans Siaga Desa: 12 Unit Aktif</span>
              <span className="text-emerald-400 font-semibold">100% Siap Operasi</span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
