import React, { useState } from 'react';
import { HelpCircle, ChevronLeft, BookOpen, Sparkles, X, ExternalLink } from 'lucide-react';
import { INTERACTIVE_QUESTIONS } from '../data/qatarData';
import { InteractiveQuestion } from '../types';

interface InteractiveQuestionsProps {
  onOpenStory?: (storyId: string) => void;
}

export const InteractiveQuestions: React.FC<InteractiveQuestionsProps> = ({ onOpenStory }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<InteractiveQuestion | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-stone-900 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>أسئلة تفتح أبواب المعرفة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            هل تعرف قطر حقاً؟
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            اكتشف أسرار التاريخ والحياة البحرية والتحول الحضاري من خلال قصص حقيقية موثقة من مصادر التاريخ القطري.
          </p>
        </div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INTERACTIVE_QUESTIONS.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-stone-950/70 hover:bg-stone-950 border border-white/10 hover:border-[#8A1538]/60 p-6 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#8A1538]/20 border border-[#8A1538]/30 flex items-center justify-center text-[#D4AF37] mb-4 group-hover:bg-[#8A1538] group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-[#FCEBA7] transition-colors">
                  {item.question}
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-3 mb-6">
                  {item.shortAnswer}
                </p>
              </div>

              <button
                onClick={() => setSelectedQuestion(item)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#8A1538]/20 hover:bg-[#8A1538] text-white border border-[#8A1538]/50 text-xs sm:text-sm font-bold flex items-center justify-between transition-all group-hover:shadow"
              >
                <span>اكتشف القصة</span>
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Question Full Story Modal */}
        {selectedQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
            <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl p-6 sm:p-8 text-stone-100 max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-start gap-4 mb-5 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    قصة موثقة من تاريخ قطر
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedQuestion.question}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-2xl bg-[#8A1538]/15 border border-[#8A1538]/30 p-4 mb-5 text-sm font-medium text-[#FCEBA7] leading-relaxed">
                {selectedQuestion.shortAnswer}
              </div>

              <div className="prose prose-invert max-w-none text-stone-200 text-sm sm:text-base leading-relaxed font-serif-ar space-y-4 mb-6">
                <p>{selectedQuestion.fullStory}</p>
              </div>

              {/* Verified Source */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-stone-300 flex items-center justify-between">
                <div>
                  <span className="text-stone-400">المصدر الموثق: </span>
                  <span className="font-semibold text-white">{selectedQuestion.source}</span>
                </div>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs font-bold transition"
                >
                  تم، إغلاق
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
