import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, HelpCircle, ChevronLeft, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/qatarData';

export const QuizSection: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      if (score >= Math.floor(QUIZ_QUESTIONS.length * 0.7)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
  };

  const getRankLevel = (finalScore: number, total: number) => {
    const ratio = finalScore / total;
    if (ratio >= 0.9) return { title: 'باحث ومؤرخ في تاريخ وتراث قطر 🇶🇦👑', desc: 'معرفة استثنائية وعميقة بتاريخ قطر ومدنها ومعالمها!' };
    if (ratio >= 0.7) return { title: 'خبير في معالم وتاريخ قطر 🌟', desc: 'إلمام ممتاز وشغف حقيقي بالتراث والمعالم القطرية.' };
    if (ratio >= 0.4) return { title: 'مستكشف لتراث وثقافة قطر 🧭', desc: 'بداية رائعة في التعرف على تاريخ ومعالم شبه الجزيرة القطرية.' };
    return { title: 'مبتدئ في استكشاف قطر 🌱', desc: 'فرصة مميزة لمواصلة القراءة واكتشاف أسرار قطر الرائعة عبر التطبيق!' };
  };

  return (
    <section id="quiz" className="py-16 sm:py-24 bg-stone-900 border-t border-white/5 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <Award className="w-4 h-4" />
            <span>مسابقة ثقافية معرفية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            كم تعرف عن قطر؟
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            اختبر معلوماتك التاريخية والجغرافية والتراثية عن دولة قطر واكتشف مستواك المعرفي.
          </p>
        </div>

        {/* Quiz Box */}
        <div className="rounded-3xl bg-stone-950 border border-[#8A1538]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {!isQuizCompleted ? (
            <div>
              {/* Progress Bar & Counter */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-stone-400 mb-3">
                <span className="text-[#D4AF37]">
                  السؤال {currentQuestionIndex + 1} من {QUIZ_QUESTIONS.length}
                </span>
                <span>النتيجة الحالية: {score} نقاط</span>
              </div>

              <div className="w-full h-2 rounded-full bg-stone-800 mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#8A1538] to-[#D4AF37] transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Text */}
              <div className="mb-6">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  تصنيف: {currentQ.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  let buttonStyle = 'bg-stone-900 border-white/10 hover:border-[#8A1538] text-stone-200';

                  if (selectedOption === idx) {
                    buttonStyle = 'bg-[#8A1538]/30 border-[#8A1538] text-white ring-2 ring-[#8A1538]/50';
                  }

                  if (isAnswerSubmitted) {
                    if (idx === currentQ.correctIndex) {
                      buttonStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/50';
                    } else if (selectedOption === idx) {
                      buttonStyle = 'bg-red-950/80 border-red-500 text-red-200 ring-2 ring-red-500/50';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between text-sm sm:text-base font-medium ${buttonStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold shrink-0">
                          {['أ', 'ب', 'ج', 'د'][idx]}
                        </span>
                        <span>{option}</span>
                      </div>

                      {isAnswerSubmitted && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {isAnswerSubmitted && selectedOption === idx && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 rounded-2xl border mb-6 text-xs sm:text-sm animate-in fade-in ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-red-950/40 border-red-500/40 text-red-200'
                  }`}
                >
                  <strong className="block font-bold mb-1">
                    {selectedOption === currentQ.correctIndex ? 'إجابة صحيحة ✓' : 'حاول مرة أخرى!'}
                  </strong>
                  <p className="text-stone-300 leading-relaxed font-serif-ar">{currentQ.explanation}</p>
                </div>
              )}

              {/* Next / Submit Button */}
              <div>
                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className="w-full py-3.5 rounded-2xl bg-[#8A1538] hover:bg-[#ad1f49] disabled:opacity-40 disabled:hover:bg-[#8A1538] text-white font-bold text-sm sm:text-base shadow-lg transition"
                  >
                    تأكيد الإجابة
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#b89528] text-stone-950 font-bold text-sm sm:text-base shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <span>{currentQuestionIndex + 1 < QUIZ_QUESTIONS.length ? 'السؤال التالي' : 'عرض النتيجة النهائية'}</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 animate-in zoom-in-95">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#8A1538] to-[#D4AF37] text-white flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Award className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                انتهت المسابقة المعرفية
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                نتيجتك: {score} من {QUIZ_QUESTIONS.length}
              </h3>

              {(() => {
                const rank = getRankLevel(score, QUIZ_QUESTIONS.length);
                return (
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10 max-w-lg mx-auto my-6">
                    <h4 className="text-lg font-bold text-[#FCEBA7] mb-2">{rank.title}</h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">{rank.desc}</p>
                  </div>
                );
              })()}

              <button
                onClick={restartQuiz}
                className="px-8 py-3.5 rounded-2xl bg-[#8A1538] hover:bg-[#ad1f49] text-white font-bold text-sm sm:text-base transition inline-flex items-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة المسابقة وتحدي جديد</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
