import React from 'react';
import { DISCOVERY_OF_THE_DAY_ITEMS } from '../data/qatarData';
import { Sparkles, Calendar, ArrowLeft, ChevronLeft } from 'lucide-react';

interface DiscoveryOfTheDayProps {
  onSelectDiscovery: (targetId: string, targetType: string) => void;
}

export const DiscoveryOfTheDay: React.FC<DiscoveryOfTheDayProps> = ({ onSelectDiscovery }) => {
  // Rotate based on day of month
  const dayIndex = new Date().getDate() % DISCOVERY_OF_THE_DAY_ITEMS.length;
  const currentItem = DISCOVERY_OF_THE_DAY_ITEMS[dayIndex];

  return (
    <section className="py-6 sm:py-8 bg-stone-950 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-stone-900 group">
          
          {/* Background Image with Gradient */}
          <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />
            <div className="absolute inset-0 bg-[#8A1538]/20 mix-blend-multiply" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
              
              {/* Badge Header */}
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#8A1538] text-white text-xs font-bold border border-[#D4AF37]/50 shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>اكتشاف اليوم 🇶🇦</span>
                </span>
                <span className="text-xs text-stone-300 bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-[#D4AF37]" />
                  <span>{new Date().toLocaleDateString('ar-QA', { month: 'long', day: 'numeric' })}</span>
                </span>
              </div>

              {/* Title & Description */}
              <div className="max-w-xl">
                <span className="text-xs font-bold text-[#D4AF37] block mb-1">
                  {currentItem.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 leading-tight">
                  {currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif-ar line-clamp-2 sm:line-clamp-3 mb-4">
                  {currentItem.fact}
                </p>

                <button
                  onClick={() => onSelectDiscovery(currentItem.targetId, currentItem.targetType)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8A1538] to-[#ad1f49] hover:from-[#ad1f49] hover:to-[#8A1538] text-white text-xs sm:text-sm font-bold border border-[#D4AF37]/50 shadow-lg transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <span>اكتشف القصة كاملة</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
