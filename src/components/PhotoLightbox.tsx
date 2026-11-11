import React from 'react';
import { Photo } from '../types/kencana';
import { INITIAL_DIMENSIONS } from '../data/kencanaData';
import { X, MapPin, Calendar, User, ExternalLink, Download } from 'lucide-react';

interface PhotoLightboxProps {
  photo: Photo | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ photo, onClose }) => {
  if (!photo) return null;

  const dim = INITIAL_DIMENSIONS.find(d => d.category === photo.category);

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="max-w-4xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
              {dim?.chapterNumber || 'KENCANA'}
            </span>
            <h3 className="text-sm font-bold text-white truncate max-w-md">
              {photo.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={photo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Buka Gambar Asli"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] max-h-[55vh]">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Bottom Details */}
        <div className="p-5 bg-slate-900 border-t border-slate-800 text-xs text-slate-300 space-y-2.5">
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-400 border-b border-slate-800 pb-2">
            {photo.location && (
              <span className="flex items-center gap-1 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
                <span>{photo.location}</span>
              </span>
            )}
            {photo.date && (
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{photo.date}</span>
              </span>
            )}
            {photo.photographer && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>{photo.photographer}</span>
              </span>
            )}
          </div>

          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
            {photo.desc}
          </p>
        </div>

      </div>
    </div>
  );
};
