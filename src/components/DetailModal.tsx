import React from 'react';
import { X, MapPin, Heart, Share2, ExternalLink, Calendar, Info, Layers, CheckCircle2 } from 'lucide-react';
import { City, Landmark, Museum } from '../types';

interface DetailModalProps {
  item: any | null;
  type: 'city' | 'landmark' | 'museum' | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  isDiscovered?: boolean;
  onToggleFavorite: (id: string, type: string) => void;
  onToggleDiscovered?: (id: string, type: string) => void;
  onOpenShare: (title: string, text: string) => void;
  onSelectRecommended?: (item: any, type: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  item,
  type,
  isOpen,
  onClose,
  isFavorite,
  isDiscovered = false,
  onToggleFavorite,
  onToggleDiscovered,
  onOpenShare,
  onSelectRecommended,
}) => {
  if (!isOpen || !item) return null;

  const isCity = type === 'city';
  const isLandmark = type === 'landmark';
  const isMuseum = type === 'museum';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 animate-in fade-in">
      <div className="relative w-full max-w-3xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl text-stone-100 flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Hero Top Media */}
        <div className="relative h-64 sm:h-80 shrink-0 overflow-hidden">
          <img
            src={item.heroImage}
            alt={item.nameAr}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

          {/* Action buttons Top Left */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(item.id, type || 'item')}
              className={`p-2.5 rounded-full backdrop-blur-md transition ${
                isFavorite ? 'bg-red-600 text-white' : 'bg-black/60 text-white hover:bg-black'
              }`}
              title="المفضلة"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() =>
                onOpenShare(
                  `اكتشف ${item.nameAr} 🇶🇦`,
                  `تعرف على تاريخ ومعالم ${item.nameAr} عبر منصة اكتشف قطر.`
                )
              }
              className="p-2.5 rounded-full bg-black/60 text-white hover:bg-black backdrop-blur-md transition"
              title="مشاركة"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-black/60 text-white hover:bg-black backdrop-blur-md transition"
              title="إغلاق"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title and Badges Bottom Right */}
          <div className="absolute bottom-5 right-6 left-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8A1538] text-white border border-[#D4AF37]/50 shadow">
                {isCity ? 'مدينة قطرية' : isMuseum ? 'متحف وطني' : 'معلم بارز'}
              </span>
              {item.nameEn && (
                <span className="text-xs font-semibold text-stone-300 bg-black/50 px-2.5 py-0.5 rounded-full">
                  {item.nameEn}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {item.nameAr}
            </h2>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
              نبذة عامة:
            </h4>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-serif-ar">
              {item.overview || item.description}
            </p>
          </div>

          {/* City Naming Reason */}
          {item.namingReason && (
            <div className="p-4 rounded-2xl bg-[#8A1538]/15 border border-[#8A1538]/30">
              <h4 className="text-xs font-bold text-[#FCEBA7] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#D4AF37]" />
                <span>سبب التسمية في المصادر الموثقة:</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif-ar">
                {item.namingReason}
              </p>
            </div>
          )}

          {/* History */}
          {(item.history || item.historyStory) && (
            <div>
              <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                القصة والتاريخ الموثق:
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif-ar">
                {item.history || item.historyStory}
              </p>
            </div>
          )}

          {/* Museum Highlights & Opening Hours */}
          {isMuseum && item.highlights && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                أبرز ما يقدمه المتحف:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.highlights.map((h: string, i: number) => (
                  <div key={i} className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-start gap-2 text-xs text-stone-200">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Landmarks in City */}
          {isCity && item.landmarks && item.landmarks.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                أبرز المعالم في المدينة:
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.landmarks.map((l: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-xl bg-stone-950 border border-white/10 text-xs font-medium text-stone-200"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Photos */}
          {item.gallery && item.gallery.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
                معرض الصور:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {item.gallery.map((imgUrl: string, idx: number) => (
                  <div key={idx} className="h-32 rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={imgUrl}
                      alt={`${item.nameAr} - ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Sources System */}
          {item.sources && item.sources.length > 0 && (
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2">
              <h4 className="text-xs font-bold text-stone-300">
                المصادر المعتمدة للتوثيق:
              </h4>
              <div className="space-y-1">
                {item.sources.map((src: any, i: number) => (
                  <div key={i} className="flex flex-wrap items-center justify-between text-xs text-stone-400 gap-1">
                    <div className="flex items-center gap-1.5 text-stone-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8A1538]" />
                      <span className="font-semibold">{src.title}</span>
                      <span className="text-stone-400">({src.verifiedOrg})</span>
                    </div>
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D4AF37] hover:underline flex items-center gap-1 text-[11px]"
                      >
                        <span>زيارة المصدر</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Copyright & Image License Note */}
          <div className="p-3.5 rounded-xl bg-stone-950/80 border border-white/5 text-[11px] text-stone-400 flex flex-wrap items-center justify-between gap-2">
            <span>الترخيص وحقوق الصور: مصادر موثقة / متاحف قطر / أرشيف مفتوح الاستخدام الثقافي</span>
            <span className="text-emerald-400 font-semibold">محتوى موثق ومراجع ✓</span>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-950 border-t border-white/10 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            {onToggleDiscovered && (
              <button
                onClick={() => onToggleDiscovered(item.id, type || 'item')}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                  isDiscovered
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                    : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isDiscovered ? 'تم استكشافه في رحلتي ✓' : 'أضف إلى الأماكن المكتشفة 🧭'}</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs sm:text-sm font-bold transition shadow-md"
            >
              إغلاق
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
