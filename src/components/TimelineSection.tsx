import React, { useState } from 'react';
import { History, Calendar, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Sparkles } from 'lucide-react';
import { TIMELINE_DATA } from '../data/qatarData';
import { TimelineEvent } from '../types';

export const TimelineSection: React.FC = () => {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(TIMELINE_DATA[0].id);

  const toggleExpand = (id: string) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <section id="timeline" className="py-16 sm:py-24 bg-stone-900 border-t border-white/5 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <History className="w-4 h-4" />
            <span>خط زمني توثيقي دقيق</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            رحلة قطر عبر الزمن
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            من العصور الحجرية وتجارة الصبغ الأرجواني والغوص على دانات اللؤلؤ، إلى التأسيس واكتشاف الطاقة ونهضة قطر الحديثة.
          </p>
        </div>

        {/* Chronological Timeline Container */}
        <div className="relative border-r-2 border-[#8A1538]/40 mr-4 sm:mr-8 space-y-10">
          {TIMELINE_DATA.map((event, idx) => {
            const isExpanded = expandedEventId === event.id;

            return (
              <div key={event.id} className="relative pr-8 sm:pr-10 group">
                
                {/* Node Marker on Line */}
                <div
                  className={`absolute -right-[17px] top-1.5 w-8 h-8 rounded-full border-4 border-stone-900 transition-all flex items-center justify-center text-xs font-bold ${
                    isExpanded
                      ? 'bg-[#D4AF37] text-stone-950 scale-110 shadow-lg shadow-[#D4AF37]/30 ring-4 ring-[#8A1538]/50'
                      : 'bg-[#8A1538] text-white group-hover:bg-[#ad1f49]'
                  }`}
                >
                  {idx + 1}
                </div>

                {/* Event Card */}
                <div
                  onClick={() => toggleExpand(event.id)}
                  className={`rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden p-6 sm:p-7 ${
                    isExpanded
                      ? 'bg-stone-950 border-[#8A1538] shadow-2xl ring-1 ring-[#D4AF37]/30'
                      : 'bg-stone-950/70 hover:bg-stone-950 border-white/10 hover:border-white/20'
                  }`}
                >
                  
                  {/* Top Era & Year Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8A1538] text-white">
                        {event.era}
                      </span>
                      <span className="text-xs font-semibold text-[#D4AF37] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {event.yearOrPeriod}
                      </span>
                    </div>

                    <button className="text-stone-400 hover:text-white p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    {event.title}
                  </h3>

                  {/* Short summary or expanded details */}
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif-ar">
                    {event.description}
                  </p>

                  {/* Expanded Content with Photo & Historical Significance */}
                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-in fade-in">
                      {event.image && (
                        <div className="h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className="p-4 rounded-2xl bg-[#8A1538]/15 border border-[#8A1538]/30 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-xs font-bold text-[#FCEBA7] uppercase tracking-wider block mb-1">
                            الأثر والأهمية التاريخية:
                          </strong>
                          <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                            {event.significance}
                          </p>
                        </div>
                      </div>

                      {/* Source */}
                      {event.sources && event.sources.length > 0 && (
                        <div className="text-[11px] text-stone-400 flex items-center gap-2 pt-1">
                          <span>المصدر الموثق:</span>
                          <span className="text-white font-medium">{event.sources[0].title}</span>
                          <span>•</span>
                          <span className="text-stone-400">{event.sources[0].verifiedOrg}</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
