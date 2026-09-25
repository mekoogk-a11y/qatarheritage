import React from 'react';
import { Museum } from '../types';
import { Building, Clock, MapPin, ExternalLink, Heart, Share2, Sparkles, ChevronLeft } from 'lucide-react';

interface MuseumsSectionProps {
  museums: Museum[];
  favorites: string[];
  onToggleFavorite: (id: string, type: string) => void;
  onSelectMuseum: (museum: Museum) => void;
  onOpenShare: (title: string, text: string) => void;
}

export const MuseumsSection: React.FC<MuseumsSectionProps> = ({
  museums,
  favorites,
  onToggleFavorite,
  onSelectMuseum,
  onOpenShare,
}) => {
  return (
    <section id="museums" className="py-16 sm:py-24 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <Building className="w-4 h-4" />
            <span>صروح الفن وحفظ الذاكرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            متاحف قطر
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            متاحف عالمية وتاريخية توثق الحضارة الإسلامية وتاريخ شبه الجزيرة والرياضة والفنون المعاصرة بأحدث أساليب العرض المتحفي.
          </p>
        </div>

        {/* Museums List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {museums.map((museum) => {
            const isFav = favorites.includes(museum.id);

            return (
              <div
                key={museum.id}
                className="group rounded-3xl bg-stone-900 border border-white/10 hover:border-[#8A1538]/60 overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col sm:flex-row justify-between"
              >
                {/* Image on Top (Mobile) or Left/Right (Desktop) */}
                <div className="relative sm:w-2/5 h-64 sm:h-auto overflow-hidden shrink-0">
                  <img
                    src={museum.heroImage}
                    alt={museum.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-stone-900 via-stone-900/20 to-transparent" />

                  {/* Actions */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(museum.id, 'museum');
                      }}
                      className={`p-2 rounded-xl backdrop-blur-md transition ${
                        isFav
                          ? 'bg-red-600 text-white'
                          : 'bg-black/50 text-white/80 hover:bg-black/80 hover:text-white'
                      }`}
                      title="إضافة للمفضلة"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenShare(
                          `متحف: ${museum.nameAr} 🇶🇦`,
                          `استكشف مقتنيات وساعات عمل ${museum.nameAr} في قطر.`
                        );
                      }}
                      className="p-2 rounded-xl bg-black/50 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md transition"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider">
                        {museum.nameEn}
                      </span>
                      <span className="text-xs text-stone-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#8A1538]" />
                        {museum.cityNameAr}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                      {museum.nameAr}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3 mb-4">
                      {museum.description}
                    </p>

                    {/* Opening hours badge (dynamic) */}
                    <div className="p-3 rounded-xl bg-stone-950/80 border border-white/5 space-y-1.5 mb-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#FCEBA7]">
                        <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>ساعات الزيارة المعتمدة:</span>
                      </div>
                      {museum.openingHours.map((schedule, i) => (
                        <div key={i} className="flex justify-between text-[11px] text-stone-300">
                          <span>{schedule.days}</span>
                          <span className="font-mono text-stone-200">{schedule.hours}</span>
                        </div>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1">
                      {museum.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-300">
                          <Sparkles className="w-3 h-3 text-[#D4AF37] shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => onSelectMuseum(museum)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-md"
                    >
                      <span>استكشف المتحف ومقتنياته</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {museum.officialUrl && (
                      <a
                        href={museum.officialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white border border-white/10 transition"
                        title="البوابة الرسمية للحجز والاستعلام"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
