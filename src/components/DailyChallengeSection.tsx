import React, { useState, useEffect } from 'react';
import { Target, Flame, CheckCircle2, XCircle, Award, Sparkles, HelpCircle } from 'lucide-react';
import { DAILY_CHALLENGES } from '../data/qatarData';
import { DailyChallenge } from '../types';

interface DailyChallengeSectionProps {
  streak: number;
  onAnswerCorrect: () => void;
  onSelectLandmark?: (landmarkId: string) => void;
}

export const DailyChallengeSection: React.FC<DailyChallengeSectionProps> = ({
  streak,
  onAnswerCorrect,
  onSelectLandmark,
}) => {
  const challenge: DailyChallenge = DAILY_CHALLENGES[0];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [alreadyAnsweredToday, setAlreadyAnsweredToday] = useState(false);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem(`discover_qatar_daily_${todayStr}`);
    if (saved) {
      setAlreadyAnsweredToday(true);
      const parsed = JSON.parse(saved);
      setSelectedOption(parsed.selected);
      setIsSubmitted(true);
    }
  }, []);

  const handleSubmit = (optionIndex: number) => {
    if (isSubmitted) return;

    setSelectedOption(optionIndex);
    setIsSubmitted(true);

    const todayStr = new Date().toISOString().split('T')[0];
    localStorage.setItem(
      `discover_qatar_daily_${todayStr}`,
      JSON.stringify({ selected: optionIndex, correct: optionIndex === challenge.correctIndex })
    );

    if (optionIndex === challenge.correctIndex) {
      onAnswerCorrect();
    }
  };

  return (
    <section className="py-12 bg-stone-900 border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl bg-stone-950 border border-[#8A1538]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Top Bar with Streak */}
          <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#8A1538] text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30 shadow">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                  سؤال تفاعلي متجدد
                </span>
                <h3 className="text-xl font-black text-white">تحدي اليوم</h3>
              </div>
            </div>

            {/* Streak Counter Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-600/30 to-orange-600/30 border border-amber-500/40 text-amber-300 font-bold text-xs sm:text-sm shadow">
              <Flame className="w-4 h-4 text-amber-400 fill-current animate-pulse" />
              <span>سلسلة الاكتشاف: {Math.max(1, streak)} {streak === 1 ? 'يوم' : streak === 2 ? 'يومان' : 'أيام'}</span>
            </div>
          </div>

          {/* Image and Question */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-md">
              <img
                src={challenge.image}
                alt="تحدي اليوم"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {challenge.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {challenge.options.map((option, idx) => {
                  let btnClass = 'bg-stone-900 border-white/10 hover:border-[#8A1538] text-stone-200';

                  if (isSubmitted) {
                    if (idx === challenge.correctIndex) {
                      btnClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40';
                    } else if (selectedOption === idx) {
                      btnClass = 'bg-red-950 border-red-500 text-red-200 ring-2 ring-red-500/40';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSubmit(idx)}
                      disabled={isSubmitted}
                      className={`w-full p-3.5 rounded-xl border text-right font-medium text-xs sm:text-sm flex items-center justify-between transition-all ${btnClass}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center font-bold text-xs shrink-0">
                          {['أ', 'ب', 'ج', 'د'][idx]}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isSubmitted && idx === challenge.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {isSubmitted && selectedOption === idx && idx !== challenge.correctIndex && (
                        <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Feedback & Explanation */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl border mb-3 text-xs sm:text-sm animate-in fade-in ${
                selectedOption === challenge.correctIndex
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-red-950/40 border-red-500/40 text-red-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {selectedOption === challenge.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>إجابة صحيحة أحسنت! ✓</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span>إجابة غير صحيحة، الإجابة الصحيحة هي: {challenge.options[challenge.correctIndex]}</span>
                  </>
                )}
              </div>
              <p className="text-stone-300 font-serif-ar leading-relaxed mt-1">
                {challenge.explanation}
              </p>
              <div className="text-[11px] text-stone-400 mt-2">
                المصدر: {challenge.source}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
