import React, { useState, useMemo } from 'react';
import { Search, MapPin, Heart, Share2, Compass, Layers, ExternalLink, ChevronLeft, Info } from 'lucide-react';
import { City } from '../types';

interface CitiesSectionProps {
  cities: City[];
  favorites: string[];
  onToggleFavorite: (id: string, type: string) => void;
  onSelectCity: (city: City) => void;
  onOpenShare: (title: string, text: string) => void;
}

export const CitiesSection: React.FC<CitiesSectionProps> = ({
  cities,
  favorites,
  onToggleFavorite,
  onSelectCity,
  onOpenShare,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'coastal' | 'historical' | 'natural' | 'heritage'>('all');

  const filteredCities = useMemo(() => {
    return cities.filter((city) => {
      // Search matching (Arabic and English)
      const matchesSearch =
        city.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        city.overview.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Filter matching
      if (activeFilter === 'coastal') return city.isCoastal;
      if (activeFilter === 'historical') return city.isHistorical;
      if (activeFilter === 'natural') return city.isNatural;
      if (activeFilter === 'heritage') return city.isHeritage;
      return true;
    });
  }, [cities, searchTerm, activeFilter]);

  return (
    <section id="cities" className="py-16 sm:py-24 bg-stone-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <MapPin className="w-4 h-4" />
            <span>حواضر ومرافئ شبه الجزيرة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            مدن وبلدات قطر
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            قاعدة بيانات حية وشاملة توثق تاريخ مدن قطر وأسباب تسمياتها ومعالمها ومصادرها التاريخية الموثقة.
          </p>
        </div>

        {/* Search Bar & Filter Tabs */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن مدينة أو بلدة (مثال: الدوحة، الوكرة، الخور، الزبارة)..."
              className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-stone-900 border border-white/10 focus:border-[#8A1538] focus:ring-2 focus:ring-[#8A1538]/40 text-stone-100 placeholder-stone-500 text-sm sm:text-base transition outline-none shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs bg-stone-800 px-2 py-1 rounded-md"
              >
                مسح
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'جميع المدن والبلدات' },
              { id: 'coastal', label: '🌊 مدن ساحلية' },
              { id: 'historical', label: '🏛️ مدن تاريخية' },
              { id: 'natural', label: '🏜️ أماكن طبيعية' },
              { id: 'heritage', label: '🏺 مواقع تراثية' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  activeFilter === tab.id
                    ? 'bg-[#8A1538] text-white border border-[#D4AF37]/50 shadow-md ring-2 ring-[#8A1538]/30'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Cities Grid */}
        {filteredCities.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/50 rounded-3xl border border-white/5">
            <Info className="w-12 h-12 text-[#D4AF37] mx-auto mb-3 opacity-70" />
            <h3 className="text-lg font-bold text-white mb-1">لم يتم العثور على مدينة مطابقة</h3>
            <p className="text-sm text-stone-400 max-w-md mx-auto">
              جرب البحث باسم آخر أو إزالة الفلاتر، أو استخدم المساعد الذكي "اسأل عن قطر" للبحث الموسع.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCities.map((city) => {
              const isFav = favorites.includes(city.id);

              return (
                <div
                  key={city.id}
                  className="group rounded-3xl bg-stone-900/90 border border-white/10 hover:border-[#8A1538]/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Hero Photo & Badges */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={city.heroImage}
                      alt={city.nameAr}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                    {/* Favorite & Share Buttons */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(city.id, 'city');
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
                            `اكتشف مدينة ${city.nameAr} 🇶🇦`,
                            `تعرف على تاريخ ${city.nameAr} وسبب تسميتها ومعالمها الموثقة عبر منصة اكتشف قطر.`
                          );
                        }}
                        className="p-2 rounded-xl bg-black/50 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md transition"
                        title="مشاركة"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* City Tag & Badges */}
                    <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
                      <div>
                        <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                          {city.nameEn}
                        </span>
                        <h3 className="text-2xl font-black text-white drop-shadow">
                          {city.nameAr}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#8A1538] text-white border border-[#D4AF37]/40 shadow-sm">
                        {city.isCoastal ? 'ساحلية' : 'داخلية'}
                      </span>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-[#FCEBA7] mb-2">
                        {city.tag}
                      </p>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
                        {city.overview}
                      </p>
                    </div>

                    {/* Naming reason snippet */}
                    {city.namingReason && (
                      <div className="p-3 rounded-xl bg-stone-950/80 border border-white/5 text-xs text-stone-300 leading-relaxed">
                        <strong className="text-[#D4AF37] block mb-1">سبب التسمية:</strong>
                        <p className="line-clamp-2">{city.namingReason}</p>
                      </div>
                    )}

                    {/* Landmarks pill tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {city.landmarks.slice(0, 3).map((l, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[11px] text-stone-300"
                        >
                          {l}
                        </span>
                      ))}
                      {city.landmarks.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-[#8A1538]/20 text-[#D4AF37] text-[11px]">
                          +{city.landmarks.length - 3} معالم
                        </span>
                      )}
                    </div>

                    {/* Card Action Button */}
                    <button
                      onClick={() => onSelectCity(city)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md mt-2"
                    >
                      <span>استكشف تاريخ ومعالم {city.nameAr}</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
