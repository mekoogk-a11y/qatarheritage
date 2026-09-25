import React, { useState, useEffect } from 'react';
import { Dices, Sparkles, MapPin, Eye, X, ChevronLeft, RefreshCw } from 'lucide-react';
import { Landmark, City, Museum } from '../types';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  landmarks: Landmark[];
  cities: City[];
  museums: Museum[];
  onSelectItem: (item: any, type: string) => void;
}

export const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({
  isOpen,
  onClose,
  landmarks,
  cities,
  museums,
  onSelectItem,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<{ item: any; type: string } | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const pickRandom = () => {
    setIsSpinning(true);
    const pool = [
      ...landmarks.map((l) => ({ item: l, type: 'landmark' })),
      ...cities.map((c) => ({ item: c, type: 'city' })),
      ...museums.map((m) => ({ item: m, type: 'museum' })),
    ];

    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * pool.length);
      setSelectedPlace(pool[randomIdx]);
      setIsSpinning(false);
    }, 400);
  };

  useEffect(() => {
    if (isOpen && !selectedPlace) {
      pickRandom();
    }
  }, [isOpen]);

  if (!isOpen || !selectedPlace) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl text-stone-100 flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#8A1538] via-[#5e0d24] to-[#25040d] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <Dices className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                اكتشاف عشوائي مشوق
              </span>
              <h3 className="text-lg font-black text-white">اليوم سنأخذك إلى...</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media and Content */}
        <div className="p-6 space-y-4">
          <div className="relative h-60 rounded-2xl overflow-hidden border border-white/10 shadow-md">
            <img
              src={selectedPlace.item.heroImage}
              alt={selectedPlace.item.nameAr}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

            <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                  {selectedPlace.item.cityNameAr || selectedPlace.item.nameEn}
                </span>
                <h4 className="text-2xl font-black text-white drop-shadow">
                  {selectedPlace.item.nameAr}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#8A1538] text-white border border-[#D4AF37]/40 shadow">
                {selectedPlace.type === 'city' ? 'مدينة' : selectedPlace.type === 'museum' ? 'متحف' : 'معلم'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif-ar line-clamp-3">
            {selectedPlace.item.overview || selectedPlace.item.description || selectedPlace.item.historyStory}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={pickRandom}
              disabled={isSpinning}
              className="py-3 px-4 rounded-xl bg-stone-950 border border-white/10 hover:border-[#D4AF37] text-stone-200 hover:text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition"
            >
              <RefreshCw className={`w-4 h-4 text-[#D4AF37] ${isSpinning ? 'animate-spin' : ''}`} />
              <span>فاجئني بمكان آخر 🎲</span>
            </button>

            <button
              onClick={() => {
                onSelectItem(selectedPlace.item, selectedPlace.type);
                onClose();
              }}
              className="py-3 px-4 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition shadow"
            >
              <span>اكتشف المزيد</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
