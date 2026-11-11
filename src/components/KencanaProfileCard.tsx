import React, { useState } from 'react';
import { KENCANA_REGISTRATION_PROFILE } from '../data/kencanaData';
import { KencanaEmblem } from './KencanaEmblem';
import { Mail, Smartphone, User, MapPin, Bookmark, Copy, Check, Calendar } from 'lucide-react';

interface KencanaProfileCardProps {
  variant?: 'full' | 'compact' | 'print';
  className?: string;
}

export const KencanaProfileCard: React.FC<KencanaProfileCardProps> = ({
  variant = 'full',
  className = ''
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const data = KENCANA_REGISTRATION_PROFILE;

  const copyToClipboard = (text: string, fieldName: string) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  if (variant === 'print') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-3.5 ${className}`}>
        {/* Card 1: Top Seal & Dates */}
        <div className="bg-white rounded-xl border border-slate-300 p-4 shadow-xs flex flex-col justify-between">
          <div className="flex items-center gap-3.5">
            <KencanaEmblem size={64} className="w-16 h-16 shrink-0" />
            <div>
              <h3 className="font-black text-sm tracking-wide text-slate-900 leading-tight">
                {data.kecamatan}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 tracking-wider mt-0.5">
                {data.nomorRegister}
              </p>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between items-center py-0.5 border-b border-slate-100">
              <span className="font-bold text-slate-800">Gerakan Kencana</span>
              <span className="font-extrabold text-orange-600">{data.tanggalGerakanKencana}</span>
            </div>
            <div className="flex justify-between items-center py-0.5">
              <span className="font-bold text-slate-800">Kencana Pratama</span>
              <span className="font-extrabold text-orange-600">{data.tanggalKencanaPratama}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Orange Header "Profil" & Contact Details */}
        <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-xs flex flex-col">
          <div className="bg-orange-600 px-4 py-2 flex items-center justify-between">
            <h4 className="text-white font-extrabold text-xs tracking-wide">
              Profil
            </h4>
            <span className="text-[10px] text-orange-100 font-semibold uppercase tracking-wider">
              Data Resmi
            </span>
          </div>

          <div className="p-3.5 space-y-2 text-[11px] flex-grow flex flex-col justify-between">
            <div className="border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Bookmark className="w-3.5 h-3.5 text-slate-600" />
                <span>Nomor Register</span>
              </div>
              <p className="text-slate-600 pl-5 text-[10.5px] font-medium">{data.nomorRegister}</p>
            </div>

            <div className="border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Mail className="w-3.5 h-3.5 text-slate-600" />
                <span>Email</span>
              </div>
              <p className="text-slate-600 pl-5 text-[10.5px] font-medium">{data.email}</p>
            </div>

            <div className="border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                <span>No. HP</span>
              </div>
              <p className="text-slate-600 pl-5 text-[10.5px] font-medium">{data.noHp}</p>
            </div>

            <div className="border-b border-slate-100 pb-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <User className="w-3.5 h-3.5 text-slate-600" />
                <span>Nama PIC</span>
              </div>
              <p className="text-slate-900 pl-5 font-bold text-[10.5px]">{data.namaPic}</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>Alamat Kantor</span>
              </div>
              <p className="text-slate-600 pl-5 text-[10px] leading-snug">{data.alamatKantor}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full / Interactive Card (Matches screenshot with 1:1 visual styling)
  return (
    <div className={`space-y-4 max-w-md w-full ${className}`}>
      
      {/* Top Card: Emblem + District + Dates */}
      <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg border border-slate-200/80 flex flex-col items-center text-center transition-all hover:shadow-xl">
        <div className="mb-3">
          <KencanaEmblem size={88} className="w-22 h-22 drop-shadow-sm" />
        </div>

        <h2 className="text-lg font-black tracking-wide text-slate-900 uppercase">
          {data.kecamatan}
        </h2>
        
        <p className="text-xs font-semibold text-slate-500 tracking-wider mt-1">
          {data.nomorRegister}
        </p>

        <div className="w-full mt-6 pt-3 border-t border-slate-100 space-y-3 text-left">
          <div className="flex justify-between items-center py-1 border-b border-slate-100 text-sm">
            <span className="font-bold text-slate-800">Gerakan Kencana</span>
            <span className="font-extrabold text-orange-600 tracking-wide">{data.tanggalGerakanKencana}</span>
          </div>

          <div className="flex justify-between items-center py-1 text-sm">
            <span className="font-bold text-slate-800">Kencana Pratama</span>
            <span className="font-extrabold text-orange-600 tracking-wide">{data.tanggalKencanaPratama}</span>
          </div>
        </div>
      </div>

      {/* Bottom Card: Orange Header "Profil" with Contact Information */}
      <div className="bg-white text-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 transition-all hover:shadow-xl">
        {/* Card Header (Orange bar exactly like screenshot) */}
        <div className="bg-orange-600 px-6 py-3.5 flex items-center justify-between">
          <h3 className="text-white font-extrabold text-base tracking-wide">
            Profil
          </h3>
          <span className="text-xs text-orange-100 bg-orange-700/60 px-2.5 py-0.5 rounded-full font-semibold">
            Terdaftar Resmi
          </span>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4 text-left">
          
          {/* Field 1: Nomor Register */}
          <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                <Bookmark className="w-4 h-4 text-slate-800" />
                <span>Nomor Register</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 pl-6 font-mono font-medium">
                {data.nomorRegister}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(data.nomorRegister, 'nomorRegister')}
              className="text-slate-400 hover:text-orange-600 p-1.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
              title="Salin Nomor Register"
            >
              {copiedField === 'nomorRegister' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Field 2: Email */}
          <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                <Mail className="w-4 h-4 text-slate-800" />
                <span>Email</span>
              </div>
              <a 
                href={`mailto:${data.email}`}
                className="text-xs text-slate-600 hover:text-orange-600 transition-colors mt-1 pl-6 block font-medium"
              >
                {data.email}
              </a>
            </div>
            <button
              onClick={() => copyToClipboard(data.email, 'email')}
              className="text-slate-400 hover:text-orange-600 p-1.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
              title="Salin Email"
            >
              {copiedField === 'email' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Field 3: No. HP */}
          <div className="border-b border-slate-100 pb-3 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
                <Smartphone className="w-4 h-4 text-slate-800" />
                <span>No. HP</span>
              </div>
              <a 
                href={`tel:${data.noHp}`}
                className="text-xs text-slate-600 hover:text-orange-600 transition-colors mt-1 pl-6 block font-semibold font-mono"
              >
                {data.noHp}
              </a>
            </div>
            <button
              onClick={() => copyToClipboard(data.noHp, 'noHp')}
              className="text-slate-400 hover:text-orange-600 p-1.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer"
              title="Salin No. HP"
            >
              {copiedField === 'noHp' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Field 4: Nama PIC */}
          <div className="border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
              <User className="w-4 h-4 text-slate-800" />
              <span>Nama PIC</span>
            </div>
            <p className="text-xs font-bold text-slate-900 mt-1 pl-6">
              {data.namaPic}
            </p>
          </div>

          {/* Field 5: Alamat Kantor */}
          <div>
            <div className="flex items-center gap-2 font-extrabold text-sm text-slate-900">
              <MapPin className="w-4 h-4 text-slate-800 shrink-0" />
              <span>Alamat Kantor</span>
            </div>
            <p className="text-xs text-slate-600 mt-1 pl-6 leading-relaxed">
              {data.alamatKantor}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
