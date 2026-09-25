import React, { useState, useRef, useCallback } from 'react';
import { THEN_AND_NOW_DATA } from '../data/qatarData';
import { ThenAndNowItem } from '../types';
import { History, Eye, MapPin, Sparkles, ShieldCheck, ArrowRightLeft } from 'lucide-react';

interface ThenAndNowSectionProps {
  onSelectItem?: (item: any, type: string) => void;
}

export const ThenAndNowSection: React.FC<ThenAndNowSectionProps> = ({ onSelectItem }) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentItem = THEN_AND_NOW_DATA[selectedItemIndex];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="then-and-now" className="py-16 sm:py-24 bg-stone-950 border-t border-white/5 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <ArrowRightLeft className="w-4 h-4" />
            <span>ذاكرة بصرية حية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            قطر زمان ↔ قطر اليوم
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            حرك المؤشر التفاعلي يمينًا ويسارًا لمشاهدة التحول التاريخي والمعماري الاستثنائي لنفس المعلم في قطر.
          </p>
        </div>

        {/* Location selector tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {THEN_AND_NOW_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedItemIndex(idx);
                setSliderPosition(50);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                selectedItemIndex === idx
                  ? 'bg-[#8A1538] text-white border border-[#D4AF37]/50 ring-2 ring-[#8A1538]/30 shadow-md'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-white/5'
              }`}
            >
              {item.nameAr}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Slider Container */}
        <div className="rounded-3xl bg-stone-900 border border-[#8A1538]/40 shadow-2xl p-5 sm:p-7">
          
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8A1538]" />
              <span className="text-white text-base sm:text-lg font-black">{currentItem.nameAr}</span>
              <span className="text-stone-400">({currentItem.cityNameAr})</span>
            </div>

            <div className="flex items-center gap-4 text-stone-300">
              <span className="text-amber-400">قديمًا: {currentItem.periodOld}</span>
              <span>↔</span>
              <span className="text-emerald-400">حديثًا: {currentItem.periodNew}</span>
            </div>
          </div>

          {/* Interactive Split View Box */}
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-72 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-inner"
          >
            {/* Modern Image (Background - Right Side) */}
            <img
              src={currentItem.modernImage}
              alt={`${currentItem.nameAr} اليوم`}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />

            {/* Old Image (Clipped Overlay - Left Side) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img
                src={currentItem.oldImage}
                alt={`${currentItem.nameAr} قديماً`}
                className="absolute inset-0 w-full h-full object-cover filter sepia-[0.35] brightness-90"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  maxWidth: 'none'
                }}
                draggable={false}
              />
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.8)] z-20 flex items-center justify-center -translate-x-1/2"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-[#8A1538] border-2 border-white text-white flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
            </div>

            {/* Floating Labels */}
            <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-amber-500/30">
              قديمًا ({currentItem.periodOld})
            </div>

            <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
              حديثًا ({currentItem.periodNew})
            </div>

            {/* Hint overlay at bottom */}
            <div className="absolute bottom-3 inset-x-0 mx-auto w-fit z-10 px-4 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] text-stone-200 border border-white/10 pointer-events-none">
              اسحب المؤشر لمشاهدة الفارق الزمني
            </div>
          </div>

          {/* Description & Source Details */}
          <div className="mt-5 p-4 rounded-2xl bg-stone-950 border border-white/5 space-y-3">
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif-ar">
              {currentItem.story}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px] text-stone-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>المصدر والترخيص: {currentItem.source} • {currentItem.license}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
