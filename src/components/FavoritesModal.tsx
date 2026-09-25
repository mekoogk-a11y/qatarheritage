import React from 'react';
import { Heart, Trash2, X, ChevronLeft, MapPin, Landmark, Building, BookOpen } from 'lucide-react';
import { City, Landmark as LandmarkType, Museum, Story } from '../types';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  cities: City[];
  landmarks: LandmarkType[];
  museums: Museum[];
  stories: Story[];
  onRemoveFavorite: (id: string) => void;
  onSelectItem: (item: any, type: 'city' | 'landmark' | 'museum' | 'story') => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  cities,
  landmarks,
  museums,
  stories,
  onRemoveFavorite,
  onSelectItem,
}) => {
  if (!isOpen) return null;

  // Resolve favorite items
  const favoriteItems: { item: any; type: 'city' | 'landmark' | 'museum' | 'story' }[] = [];

  favorites.forEach((favId) => {
    const c = cities.find((x) => x.id === favId);
    if (c) favoriteItems.push({ item: c, type: 'city' });

    const l = landmarks.find((x) => x.id === favId);
    if (l) favoriteItems.push({ item: l, type: 'landmark' });

    const m = museums.find((x) => x.id === favId);
    if (m) favoriteItems.push({ item: m, type: 'museum' });

    const s = stories.find((x) => x.id === favId);
    if (s) favoriteItems.push({ item: s, type: 'story' });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl text-stone-100 flex flex-col max-h-[85vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-stone-950">
          <div className="flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-lg font-bold">مفضلاتي المحفوظة</h3>
              <span className="text-xs text-stone-400">({favoriteItems.length} عناصر محفوظة)</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-xl text-stone-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {favoriteItems.length === 0 ? (
            <div className="text-center py-16 text-stone-400 text-xs sm:text-sm">
              <Heart className="w-12 h-12 text-stone-600 mx-auto mb-3" />
              <p className="font-bold text-white mb-1">لم تقم بإضافة أي عناصر للمفضلة بعد</p>
              <p>اضغط على رمز القلب ❤️ في أي مدينة أو معلم أو متحف لحفظه هنا.</p>
            </div>
          ) : (
            favoriteItems.map(({ item, type }) => (
              <div
                key={item.id}
                className="group p-3 rounded-2xl bg-stone-950/70 border border-white/5 hover:border-[#8A1538]/50 flex items-center justify-between gap-3 transition"
              >
                <div
                  onClick={() => {
                    onSelectItem(item, type);
                    onClose();
                  }}
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                >
                  <img
                    src={item.heroImage}
                    alt={item.nameAr || item.title}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[11px] font-bold text-[#D4AF37] block uppercase">
                      {type === 'city' ? 'مدينة' : type === 'museum' ? 'متحف' : type === 'landmark' ? 'معلم' : 'قصة'}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-[#FCEBA7] transition-colors">
                      {item.nameAr || item.title}
                    </h4>
                    <p className="text-xs text-stone-400 line-clamp-1">
                      {item.overview || item.description || item.intro}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onRemoveFavorite(item.id)}
                    className="p-2 rounded-xl text-stone-400 hover:text-red-400 hover:bg-red-950/30 transition"
                    title="حذف من المفضلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectItem(item, type);
                      onClose();
                    }}
                    className="p-2 rounded-xl text-stone-400 hover:text-white"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
