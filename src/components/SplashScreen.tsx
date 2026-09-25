import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Show splash for 2.2 seconds then fade out smoothly
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsVisible(false);
        onFinish();
      }, 600);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#8A1538] via-[#5e0d24] to-[#25040d] text-white transition-opacity duration-600 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center px-4 animate-in zoom-in-95 duration-700">
        
        {/* Qatar Flag Emblem */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 backdrop-blur-md border-2 border-[#D4AF37] flex items-center justify-center mx-auto mb-6 shadow-2xl relative">
          <span className="text-5xl sm:text-6xl select-none">🇶🇦</span>
          <div className="absolute -inset-1 rounded-3xl border border-[#D4AF37]/30 animate-ping opacity-40 pointer-events-none" />
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-2 drop-shadow-lg">
          اكتشف قطر
        </h1>

        <p className="text-lg sm:text-xl font-bold text-[#FCEBA7] font-serif-ar mb-6">
          قطر كما لم تعرفها من قبل
        </p>

        {/* Tagline */}
        <div className="inline-block px-5 py-2 rounded-full bg-black/30 border border-[#D4AF37]/30 text-xs sm:text-sm font-semibold text-stone-200 tracking-wider">
          تاريخ • تراث • مدن • معالم • ثقافة
        </div>

        {/* Loading Spinner Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>

      </div>
    </div>
  );
};
