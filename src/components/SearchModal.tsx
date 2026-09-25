import React, { useState, useMemo } from 'react';
import { Search, X, MapPin, Landmark, Building, BookOpen, ChevronLeft } from 'lucide-react';
import { City, Landmark as LandmarkType, Museum, Story } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  cities: City[];
  landmarks: LandmarkType[];
  museums: Museum[];
  stories: Story[];
  onSelectItem: (item: any, type: 'city' | 'landmark' | 'museum' | 'story') => void;
}

// Arabic normalization helper
function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ة]/g, 'ه')
    .replace(/[يى]/g, 'ي')
    .replace(/[\u064B-\u065F]/g, '') // remove tashkeel
    .toLowerCase()
    .trim();
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  cities,
  landmarks,
  museums,
  stories,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = normalizeArabic(query);
    if (!q || q.length < 2) return { cities: [], landmarks: [], museums: [], stories: [] };

    const matchedCities = cities.filter((c) =>
      normalizeArabic(c.nameAr).includes(q) ||
      c.nameEn.toLowerCase().includes(query.toLowerCase()) ||
      normalizeArabic(c.overview).includes(q)
    );

    const matchedLandmarks = landmarks.filter((l) =>
      normalizeArabic(l.nameAr).includes(q) ||
      normalizeArabic(l.cityNameAr).includes(q) ||
      normalizeArabic(l.description).includes(q)
    );

    const matchedMuseums = museums.filter((m) =>
      normalizeArabic(m.nameAr).includes(q) ||
      normalizeArabic(m.cityNameAr).includes(q) ||
      normalizeArabic(m.description).includes(q)
    );

    const matchedStories = stories.filter((s) =>
      normalizeArabic(s.title).includes(q) ||
      normalizeArabic(s.intro).includes(q)
    );

    return {
      cities: matchedCities,
      landmarks: matchedLandmarks,
      museums: matchedMuseums,
      stories: matchedStories,
    };
  }, [query, cities, landmarks, museums, stories]);

  const totalResults =
    searchResults.cities.length +
    searchResults.landmarks.length +
    searchResults.museums.length +
    searchResults.stories.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-4 pt-16 sm:pt-24 animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl text-stone-100 flex flex-col max-h-[80vh] overflow-hidden">
        
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-stone-950">
          <Search className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن مدينة، معلم، متحف، أو قصة (مثال: الزبارة، الخور، اللؤلؤ)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-stone-500 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-white text-xs bg-stone-800 px-2 py-1 rounded"
            >
              مسح
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-stone-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {query.trim().length < 2 ? (
            <div className="text-center py-10 text-stone-400 text-xs sm:text-sm">
              اكتب حرفين على الأقل للبحث السريع في قاعدة بيانات قطر الثقافية
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 text-stone-400 text-xs sm:text-sm">
              لم نعثر على نتائج مطابقة لـ "{query}". جرب البحث بكلمات أخرى مثل: الزبارة، سوق واقف، متحف، لوسيل.
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Cities */}
              {searchResults.cities.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>المدن والبلدات ({searchResults.cities.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {searchResults.cities.map((city) => (
                      <div
                        key={city.id}
                        onClick={() => {
                          onSelectItem(city, 'city');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-stone-950/60 hover:bg-[#8A1538]/20 border border-white/5 hover:border-[#8A1538]/50 flex items-center justify-between cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={city.heroImage}
                            alt={city.nameAr}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <span className="text-base font-bold text-white block">{city.nameAr}</span>
                            <span className="text-xs text-stone-400 line-clamp-1">{city.overview}</span>
                          </div>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Landmarks */}
              {searchResults.landmarks.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>المعالم التراثية والحديثة ({searchResults.landmarks.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {searchResults.landmarks.map((l) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          onSelectItem(l, 'landmark');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-stone-950/60 hover:bg-[#8A1538]/20 border border-white/5 hover:border-[#8A1538]/50 flex items-center justify-between cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={l.heroImage}
                            alt={l.nameAr}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <span className="text-base font-bold text-white block">{l.nameAr}</span>
                            <span className="text-xs text-stone-400 line-clamp-1">{l.cityNameAr} • {l.description}</span>
                          </div>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Museums */}
              {searchResults.museums.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>المتاحف الوطنية ({searchResults.museums.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {searchResults.museums.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          onSelectItem(m, 'museum');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-stone-950/60 hover:bg-[#8A1538]/20 border border-white/5 hover:border-[#8A1538]/50 flex items-center justify-between cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={m.heroImage}
                            alt={m.nameAr}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <span className="text-base font-bold text-white block">{m.nameAr}</span>
                            <span className="text-xs text-stone-400 line-clamp-1">{m.description}</span>
                          </div>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stories */}
              {searchResults.stories.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>قصص من قطر ({searchResults.stories.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {searchResults.stories.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onSelectItem(s, 'story');
                          onClose();
                        }}
                        className="p-3 rounded-2xl bg-stone-950/60 hover:bg-[#8A1538]/20 border border-white/5 hover:border-[#8A1538]/50 flex items-center justify-between cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={s.heroImage}
                            alt={s.title}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div>
                            <span className="text-base font-bold text-white block">{s.title}</span>
                            <span className="text-xs text-stone-400 line-clamp-1">{s.intro}</span>
                          </div>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-stone-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
