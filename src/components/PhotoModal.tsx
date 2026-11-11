import React, { useState, useEffect } from 'react';
import { Photo, PhotoCategory } from '../types/kencana';
import { convertDriveUrl, VILLAGES_DATA } from '../data/kencanaData';
import { X, Upload, Link, Image as ImageIcon, Check, AlertCircle } from 'lucide-react';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (photoData: Omit<Photo, 'id'> & { id?: string | number }) => void;
  editingPhoto?: Photo | null;
  defaultCategory?: PhotoCategory;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingPhoto,
  defaultCategory = 'simulasi'
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PhotoCategory>(defaultCategory);
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('Kecamatan Lawang');
  const [photographer, setPhotographer] = useState('TRC Kencana Lawang');
  const [inputTab, setInputTab] = useState<'url' | 'upload'>('url');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (editingPhoto) {
      setTitle(editingPhoto.title || '');
      setCategory(editingPhoto.category || 'simulasi');
      setUrl(editingPhoto.url || '');
      setDesc(editingPhoto.desc || '');
      setDate(editingPhoto.date || '');
      setLocation(editingPhoto.location !== undefined ? editingPhoto.location : 'Kecamatan Lawang');
      setPhotographer(editingPhoto.photographer !== undefined ? editingPhoto.photographer : 'TRC Kencana Lawang');
      setImageError(false);
    } else {
      setTitle('');
      setCategory(defaultCategory);
      setUrl('');
      setDesc('');
      setDate(new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }));
      setLocation('Kecamatan Lawang');
      setPhotographer('Humas Satgas Kencana');
      setImageError(false);
    }
  }, [editingPhoto, defaultCategory, isOpen]);

  if (!isOpen) return null;

  const handleUrlChange = (value: string) => {
    const converted = convertDriveUrl(value);
    setUrl(converted);
    setImageError(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUrl(event.target.result as string);
          setImageError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;

    onSave({
      ...(editingPhoto ? { id: editingPhoto.id } : {}),
      title: title.trim(),
      category,
      url: convertDriveUrl(url),
      desc: desc.trim(),
      date: date.trim(),
      location: location.trim(),
      photographer: photographer.trim()
    });

    onClose();
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl text-slate-100 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">
              {editingPhoto ? 'Edit Foto Dokumentasi' : 'Tambah Foto Dokumentasi'}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Lampirkan bukti foto untuk 5 Dimensi Penilaian Kencana Award 2026.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Judul Kegiatan */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Judul Kegiatan / Nama Dokumentasi <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Rapat Forkopimcam Satgas Kencana"
              className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-orange-500"
            />
          </div>

          {/* Dimensi Penilaian / Bab */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Dimensi Penilaian / Bab <span className="text-red-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PhotoCategory)}
                className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-orange-500"
              >
                <option value="simulasi">Bab 01: Tata Kelola & Kelembagaan (20%)</option>
                <option value="mitigasi">Bab 02: Pencegahan & Mitigasi Risiko (20%)</option>
                <option value="posko">Bab 03: Kesiapsiagaan & EWS (25%)</option>
                <option value="respons">Bab 04: Respons & Darurat (20%)</option>
                <option value="inovasi">Bab 05: Partisipasi & Inovasi (15%)</option>
              </select>
            </div>

            {/* Lokasi / Desa Fleksibel (Bisa ketik bebas atau pilih rekomendasi) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Lokasi / Desa <span className="text-slate-400 font-normal">(Bebas Ketik / Pilih Cepat)</span>
                </label>
                {location && (
                  <button
                    type="button"
                    onClick={() => setLocation('')}
                    className="text-[10px] text-slate-400 hover:text-orange-400 cursor-pointer"
                  >
                    Kosongkan
                  </button>
                )}
              </div>

              <div className="relative">
                <input
                  type="text"
                  list="village-options-list"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ketik desa, dusun, RT/RW, sungai, atau pilih di bawah..."
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-orange-500 font-medium"
                />
                <datalist id="village-options-list">
                  <option value="Kantor Kecamatan Lawang (Posko Induk)" />
                  <option value="Desa Srigading (Zona Lereng)" />
                  <option value="Desa Ketindan (Zona Lereng)" />
                  <option value="Desa Sidodadi (Alur Kali Lawang)" />
                  <option value="Desa Wonorejo" />
                  <option value="Desa Turirejo" />
                  <option value="Desa Sumberporong" />
                  <option value="Desa Mulyoarjo" />
                  <option value="Desa Bedali (Jalur Arteri)" />
                  <option value="Desa Kalirejo" />
                  <option value="Desa Sumberngepoh" />
                  <option value="Kelurahan Kalirejo" />
                  <option value="Kelurahan Lawang" />
                  <option value="Alur Sungai Kali Lawang" />
                  <option value="Lereng Kaki Gunung Arjuno" />
                  <option value="Posko TRC Jl. MH. Thamrin No. 2 Lawang" />
                  <option value="Puskesmas Lawang / Wonosari" />
                  <option value="Assembly Point Alun-Alun Lawang" />
                </datalist>
              </div>

              {/* Quick-Pick Tags for 12 Villages and Key Landmarks */}
              <div className="mt-1.5 flex flex-wrap items-center gap-1 max-h-24 overflow-y-auto pt-1">
                <span className="text-[10px] text-slate-400 mr-1 font-medium">Pilihan Cepat:</span>
                {[
                  'Desa Srigading',
                  'Desa Ketindan',
                  'Desa Sidodadi',
                  'Desa Bedali',
                  'Kelurahan Lawang',
                  'Kel. Kalirejo',
                  'Desa Wonorejo',
                  'Desa Turirejo',
                  'Kantor Kecamatan Lawang',
                  'Alur Kali Lawang',
                  'Lereng Gn. Arjuno'
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setLocation(tag)}
                    className={`text-[10.5px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                      location === tag
                        ? 'bg-orange-600 text-white border-orange-500 font-bold shadow-xs'
                        : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image Input Options */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Sumber Berkas Foto <span className="text-red-400">*</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] bg-slate-950 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setInputTab('url')}
                  className={`px-2.5 py-0.5 rounded-md font-medium transition-colors ${
                    inputTab === 'url' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Tautan / Google Drive
                </button>
                <button
                  type="button"
                  onClick={() => setInputTab('upload')}
                  className={`px-2.5 py-0.5 rounded-md font-medium transition-colors ${
                    inputTab === 'upload' ? 'bg-orange-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Unggah Berkas
                </button>
              </div>
            </div>

            {inputTab === 'url' ? (
              <div>
                <input
                  type="text"
                  required={!url}
                  value={url}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://drive.google.com/... atau https://..."
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-orange-500 font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  *Tautan Google Drive dikonversi otomatis (pastikan akses tautan diatur ke &quot;Siapa saja yang memiliki tautan&quot;).
                </span>
              </div>
            ) : (
              <div>
                <label className="border-2 border-dashed border-slate-700 hover:border-orange-500 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-950/60 hover:bg-slate-950 transition-colors">
                  <Upload className="w-6 h-6 text-orange-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-200">Klik untuk memilih berkas gambar dari perangkat Anda</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">Mendukung format JPG, PNG, atau WEBP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Live Image Preview */}
          {url && (
            <div className="border border-slate-800 rounded-xl p-2.5 bg-slate-950">
              <span className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase tracking-wider">
                Pratinjau Foto:
              </span>
              <div className="relative h-36 bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
                {!imageError ? (
                  <img
                    src={url}
                    alt="Pratinjau"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-center p-3 text-amber-400">
                    <AlertCircle className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-xs">Gambar belum dapat dimuat. Pastikan tautan berkas valid.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tanggal & Dokumentator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">Tanggal Kegiatan</label>
                <input
                  type="date"
                  onChange={(e) => {
                    if (e.target.value) {
                      const [y, m, d] = e.target.value.split('-');
                      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
                      const monthName = months[parseInt(m, 10) - 1] || m;
                      setDate(`${parseInt(d, 10)} ${monthName} ${y}`);
                    }
                  }}
                  className="text-[11px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded cursor-pointer border border-slate-700"
                  title="Pilih dari Kalender"
                />
              </div>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Contoh: 15 Februari 2026"
                className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Sumber / Fotografer Dokumentasi</label>
              <input
                type="text"
                value={photographer}
                onChange={(e) => setPhotographer(e.target.value)}
                placeholder="Contoh: Humas Satgas Kencana"
                className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-orange-500"
              />
            </div>
          </div>

          {/* Deskripsi Kegiatan */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Keterangan Lengkap Kegiatan
            </label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Tuliskan uraian kegiatan, pihak yang terlibat, serta hasil kesiapsiagaan yang dicapai..."
              className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-3 py-2.5 focus:outline-hidden focus:border-orange-500 leading-relaxed"
            ></textarea>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-md shadow-orange-600/30 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Data Foto</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
