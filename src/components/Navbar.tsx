import React, { useState, useEffect } from 'react';
import { Compass, Search, Heart, Sparkles, Shield, Menu, X, MapPin, Landmark, History, Building, User, Camera, Dices, Navigation, Timer } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  favoritesCount: number;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenAskAI: () => void;
  onOpenAdmin: () => void;
  onOpenAbout: () => void;
  onOpenProfile?: () => void;
  onOpenNearMe?: () => void;
  onOpenSnapAndDiscover?: () => void;
  onOpenSurpriseMe?: () => void;
  onOpenMicroStories?: () => void;
  onNavigateTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenSearch,
  onOpenFavorites,
  onOpenAskAI,
  onOpenAdmin,
  onOpenAbout,
  onOpenProfile,
  onOpenNearMe,
  onOpenSnapAndDiscover,
  onOpenSurpriseMe,
  onOpenMicroStories,
  onNavigateTo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'cities', label: 'المدن' },
    { id: 'landmarks', label: 'المعالم' },
    { id: 'museums', label: 'المتاحف' },
    { id: 'then-and-now', label: 'قطر زمان' },
    { id: 'memory', label: 'ذاكرة قطر' },
    { id: 'timeline', label: 'التاريخ' },
    { id: 'heritage', label: 'التراث' },
    { id: 'map', label: 'الخريطة' },
    { id: 'quiz', label: 'المسابقة' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-950/90 backdrop-blur-xl border-b border-[#8A1538]/30 shadow-xl py-2.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8A1538] to-[#4d0a1d] border-2 border-[#D4AF37] flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-xl">🇶🇦</span>
              </div>
              <div className="text-right">
                <span className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-1">
                  اكتشف قطر
                </span>
                <span className="text-[10px] text-[#D4AF37] font-semibold tracking-wider block">
                  قطر كما لم تعرفها من قبل
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigateTo(item.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-stone-200 hover:text-white hover:bg-white/10 transition"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions Bar */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Ask AI */}
              <button
                onClick={onOpenAskAI}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#8A1538] hover:bg-[#ad1f49] text-white font-bold text-xs border border-[#D4AF37]/50 shadow transition hover:scale-105"
                title="اسأل عن قطر عبر الذكاء الاصطناعي"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden sm:inline">اسأل عن قطر</span>
              </button>

              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white transition"
                title="بحث ذكي"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Favorites Button */}
              <button
                onClick={onOpenFavorites}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white relative transition"
                title="المفضلة"
              >
                <Heart className="w-4 h-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Snap & Discover */}
              <button
                onClick={onOpenSnapAndDiscover}
                className="hidden md:flex p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white transition"
                title="صوّر واكتشف المكان بالكاميرا"
              >
                <Camera className="w-4 h-4 text-[#D4AF37]" />
              </button>

              {/* My Profile / Journey Tracker */}
              <button
                onClick={onOpenProfile}
                className="p-2 rounded-xl bg-[#8A1538]/30 hover:bg-[#8A1538] border border-[#D4AF37]/30 text-white transition flex items-center gap-1"
                title="رحلتي في قطر والشارات"
              >
                <User className="w-4 h-4" />
              </button>

              {/* PWA Install Button */}
              <div className="hidden lg:block">
                <PWAInstallButton />
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 hover:text-white transition"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-between xl:hidden animate-in slide-in-from-top-10">
          <div>
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇶🇦</span>
                <span className="text-xl font-black text-white">اكتشف قطر</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl bg-white/10 text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigateTo(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="p-3.5 rounded-2xl bg-stone-900 border border-white/5 hover:border-[#8A1538] text-white font-bold text-sm text-right transition"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  onOpenProfile?.();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-stone-900 border border-[#D4AF37]/40 text-[#FCEBA7] font-bold text-sm flex items-center justify-center gap-2 shadow"
              >
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>🧭 رحلتي في قطر والشارات</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenNearMe?.();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-stone-900 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>ماذا يوجد حولي؟</span>
                </button>

                <button
                  onClick={() => {
                    onOpenSnapAndDiscover?.();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-stone-900 border border-white/10 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>صوّر واكتشف</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onOpenAskAI();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 px-4 rounded-2xl bg-[#8A1538] text-white font-bold text-sm flex items-center justify-center gap-2 shadow"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>اسأل عن قطر عبر الذكاء الاصطناعي 🇶🇦</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
            <button
              onClick={() => {
                onOpenAbout();
                setMobileMenuOpen(false);
              }}
              className="text-stone-300 hover:text-white underline"
            >
              عن المنصة
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-stone-300 hover:text-white flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>لوحة الإدارة</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
