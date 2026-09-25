import React from 'react';
import { Compass, MapPin, Landmark, History, Map, Sparkles, ArrowLeft } from 'lucide-react';

interface HeroSectionProps {
  onOpenAskAI: () => void;
  onOpenSurpriseMe?: () => void;
  onOpenSnapAndDiscover?: () => void;
  onOpenNearMe?: () => void;
  onOpenMicroStories?: () => void;
  onNavigateTo: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAskAI,
  onOpenSurpriseMe,
  onOpenSnapAndDiscover,
  onOpenNearMe,
  onOpenMicroStories,
  onNavigateTo,
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      
      {/* Cinematic Hero Background with Deep Qatar Maroon & Gold Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=2000&q=85"
          alt="قطر"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        {/* Layer 1: Dark Maroon Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-[#4d0a1d]/85 to-[#25040d]/80" />
        {/* Layer 2: Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-stone-950/95" />
      </div>

      {/* Decorative Traditional Qatar Flag Serration Motif (9 Teeth) at Bottom */}
      <div className="absolute bottom-0 inset-x-0 h-8 z-10 opacity-15 overflow-hidden flex justify-between pointer-events-none">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[30px] border-b-white"
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

        {/* Emblem & Sub-badge */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-[#D4AF37] uppercase">
            منصة المعرفة والتراث والسياحة القطرية
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Main Title & Branding */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md">
          اكتشف قطر <span className="inline-block hover:scale-110 transition-transform">🇶🇦</span>
        </h1>

        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FCEBA7] font-serif-ar mb-6">
          قطر كما لم تعرفها من قبل
        </p>

        <p className="text-base sm:text-lg md:text-xl text-stone-200/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          تاريخ، مدن، تراث، معالم، متاحف، طبيعة وقصص من أرض قطر.
        </p>

        {/* Main Action Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 max-w-4xl mx-auto">
          <button
            onClick={() => onNavigateTo('cities')}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#8A1538] to-[#ad1f49] hover:from-[#ad1f49] hover:to-[#8A1538] text-white font-bold text-xs sm:text-sm border border-[#D4AF37]/50 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>ابدأ رحلة الاكتشاف</span>
          </button>

          <button
            onClick={() => onNavigateTo('map')}
            className="px-4 py-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-stone-100 font-bold text-xs sm:text-sm border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 hover:border-[#D4AF37]/40"
          >
            <Map className="w-4 h-4 text-[#8A1538]" />
            <span>استكشف الخريطة</span>
          </button>

          <button
            onClick={() => onNavigateTo('did-you-know')}
            className="px-4 py-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-stone-100 font-bold text-xs sm:text-sm border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 hover:border-[#D4AF37]/40"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>هل تعلم؟</span>
          </button>

          <button
            onClick={() => onNavigateTo('then-and-now')}
            className="px-4 py-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-stone-100 font-bold text-xs sm:text-sm border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 hover:border-[#D4AF37]/40"
          >
            <History className="w-4 h-4 text-[#8A1538]" />
            <span>قطر زمان ↔ قطر اليوم</span>
          </button>

          <button
            onClick={() => onOpenSurpriseMe?.()}
            className="px-4 py-3 rounded-2xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#FCEBA7] font-bold text-xs sm:text-sm border border-[#D4AF37]/50 shadow transition-all flex items-center gap-2 hover:scale-105"
          >
            <span>🎲 فاجئني!</span>
          </button>

          <button
            onClick={() => onOpenSnapAndDiscover?.()}
            className="px-4 py-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-stone-100 font-bold text-xs sm:text-sm border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 hover:border-[#D4AF37]/40"
          >
            <span>📸 صوّر واكتشف</span>
          </button>

          <button
            onClick={() => onOpenNearMe?.()}
            className="px-4 py-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-stone-100 font-bold text-xs sm:text-sm border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 hover:border-[#D4AF37]/40"
          >
            <MapPin className="w-4 h-4 text-red-500" />
            <span>ماذا يوجد حولي؟</span>
          </button>

          <button
            onClick={() => onOpenMicroStories?.()}
            className="px-4 py-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-stone-100 font-bold text-xs sm:text-sm border border-white/10 backdrop-blur-md transition-all flex items-center gap-2 hover:border-[#D4AF37]/40"
          >
            <span>⏱️ قطر في 60 ثانية</span>
          </button>

          <button
            onClick={onOpenAskAI}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#8A1538] to-[#5e0d24] text-white font-bold text-xs sm:text-sm border border-[#D4AF37]/40 shadow transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>اسأل عن قطر 🇶🇦</span>
          </button>
        </div>

        {/* Designer Credit Note in Hero */}
        <div className="mt-12 text-xs text-stone-400/80 flex items-center justify-center gap-2">
          <span>تصميم كمال جعفر زكريا</span>
          <span>•</span>
          <span dir="ltr">واتساب: 00249919980435</span>
        </div>

      </div>

    </section>
  );
};
