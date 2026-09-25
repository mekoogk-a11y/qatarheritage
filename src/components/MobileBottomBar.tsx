import React from 'react';
import { Home, Map, Compass, Heart, Navigation, User, Camera } from 'lucide-react';

interface MobileBottomBarProps {
  favoritesCount: number;
  onNavigateTo: (sectionId: string) => void;
  onOpenFavorites: () => void;
  onOpenProfile: () => void;
  onOpenNearMe: () => void;
  onOpenSnapAndDiscover: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  favoritesCount,
  onNavigateTo,
  onOpenFavorites,
  onOpenProfile,
  onOpenNearMe,
  onOpenSnapAndDiscover,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-white/10 py-2 px-2 sm:hidden shadow-2xl">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-white"
        >
          <Home className="w-5 h-5 text-[#8A1538]" />
          <span className="text-[10px] font-bold">الرئيسية</span>
        </button>

        {/* Map */}
        <button
          onClick={() => onNavigateTo('map')}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-white"
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] font-bold">الخريطة</span>
        </button>

        {/* Near Me */}
        <button
          onClick={onOpenNearMe}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-white"
        >
          <Navigation className="w-5 h-5 text-red-500" />
          <span className="text-[10px] font-bold">حولي</span>
        </button>

        {/* Snap & Discover */}
        <button
          onClick={onOpenSnapAndDiscover}
          className="flex flex-col items-center gap-1 text-[#D4AF37] hover:text-white"
        >
          <Camera className="w-5 h-5" />
          <span className="text-[10px] font-bold">صوّر</span>
        </button>

        {/* Favorites */}
        <button
          onClick={onOpenFavorites}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-white relative"
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-bold">المفضلة</span>
          {favoritesCount > 0 && (
            <span className="absolute -top-1 right-2 w-3.5 h-3.5 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* Profile / Journey */}
        <button
          onClick={onOpenProfile}
          className="flex flex-col items-center gap-1 text-stone-300 hover:text-white"
        >
          <User className="w-5 h-5 text-[#D4AF37]" />
          <span className="text-[10px] font-bold">رحلتي</span>
        </button>

      </div>
    </div>
  );
};
