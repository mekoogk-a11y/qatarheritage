import React, { useState, useMemo } from 'react';
import { Landmark, LandmarkCategory } from '../types';
import { Landmark as LandmarkIcon, Search, Heart, Share2, MapPin, ExternalLink, ChevronLeft } from 'lucide-react';

interface LandmarksSectionProps {
  landmarks: Landmark[];
  favorites: string[];
  onToggleFavorite: (id: string, type: string) => void;
  onSelectLandmark: (landmark: Landmark) => void;
  onOpenShare: (title: string, text: string) => void;
}

export const LandmarksSection: React.FC<LandmarksSectionProps> = ({
  landmarks,
  favorites,
  onToggleFavorite,
  onSelectLandmark,
  onOpenShare,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: string; label: string; icon: string }[] = [
    { id: 'all', label: 'الكل', icon: '✨' },
    { id: 'history_heritage', label: 'تاريخ وتراث', icon: '🏛️' },
    { id: 'archaeology', label: 'مواقع أثرية', icon: '🏺' },
    { id: 'architecture_culture', label: 'عمارة وثقافة', icon: '🕌' },
    { id: 'modern_landmarks', label: 'معالم حديثة', icon: '🏙️' },
    { id: 'souqs', label: 'أسواق', icon: '🛍️' },
    { id: 'nature_desert', label: 'طبيعة وصحراء', icon: '🏜️' },
    { id: 'sports', label: 'رياضة', icon: '🏟️' },
  ];

  const filteredLandmarks = useMemo(() => {
    return landmarks.filter((item) => {
      const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cityNameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [landmarks, selectedCategory, searchQuery]);

  return (
    <section id="landmarks" className="py-16 sm:py-24 bg-stone-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <LandmarkIcon className="w-4 h-4" />
            <span>شواهد الحضارة والتراث</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            معالم قطر
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            اكتشف المعالم الأثرية والمعمارية والطبيعية والأسواق التراثية الموثقة في كافة مناطق الدولة.
          </p>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن معلم، سوق، قلعة، أو موقع طبيعي..."
              className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-stone-950 border border-white/10 focus:border-[#8A1538] focus:ring-2 focus:ring-[#8A1538]/40 text-stone-100 placeholder-stone-500 text-sm sm:text-base outline-none transition"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                  selectedCategory === cat.id
                    ? 'bg-[#8A1538] text-white border border-[#D4AF37]/50 shadow-md ring-2 ring-[#8A1538]/30'
                    : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-white/5'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Landmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredLandmarks.map((landmark) => {
            const isFav = favorites.includes(landmark.id);

            return (
              <div
                key={landmark.id}
                className="group rounded-3xl bg-stone-950/80 border border-white/10 hover:border-[#8A1538]/60 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Photo & Actions */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={landmark.heroImage}
                    alt={landmark.nameAr}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

                  {/* Actions */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(landmark.id, 'landmark');
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
                          `معلم: ${landmark.nameAr} 🇶🇦`,
                          `تعرف على قصة وتاريخ ${landmark.nameAr} في ${landmark.cityNameAr} عبر منصة اكتشف قطر.`
                        );
                      }}
                      className="p-2 rounded-xl bg-black/50 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md transition"
                      title="مشاركة"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* City Badge */}
                  <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
                    <div>
                      <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                        {landmark.cityNameAr}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                        {landmark.nameAr}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3">
                    {landmark.description}
                  </p>

                  {/* History snippet */}
                  <div className="p-3 rounded-xl bg-stone-900 border border-white/5 text-xs text-stone-300 leading-relaxed font-serif-ar">
                    <p className="line-clamp-2">{landmark.historyStory}</p>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => onSelectLandmark(landmark)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <span>تفاصيل المعلم والقصة الكاملة</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
