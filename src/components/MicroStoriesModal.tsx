import React, { useState, useEffect, useRef } from 'react';
import { Timer, Volume2, Pause, ChevronRight, ChevronLeft, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { MICRO_STORIES_60S } from '../data/qatarData';
import { MicroStory60s } from '../types';

interface MicroStoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MicroStoriesModal: React.FC<MicroStoriesModalProps> = ({ isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const currentStory: MicroStory60s = MICRO_STORIES_60S[currentIndex];

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const fullText = `${currentStory.title}. ${currentStory.summary}. ${currentStory.bullets.join('. ')}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'ar-SA';
      utterance.rate = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleNext = () => {
    stopAudio();
    setCurrentIndex((prev) => (prev + 1) % MICRO_STORIES_60S.length);
  };

  const handlePrev = () => {
    stopAudio();
    setCurrentIndex((prev) => (prev - 1 + MICRO_STORIES_60S.length) % MICRO_STORIES_60S.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl text-stone-100 flex flex-col overflow-hidden max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#8A1538] via-[#5e0d24] to-[#25040d] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <Timer className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block">
                قصص سريعة ومكثفة
              </span>
              <h3 className="text-lg font-black text-white">قطر في 60 ثانية ⏱️</h3>
            </div>
          </div>

          <button
            onClick={() => {
              stopAudio();
              onClose();
            }}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Story Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shadow-md">
            <img
              src={currentStory.image}
              alt={currentStory.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

            <div className="absolute top-3 right-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                {currentStory.durationSeconds} ثانية
              </span>
            </div>

            <div className="absolute bottom-3 right-3 left-3 flex justify-between items-end">
              <h4 className="text-xl sm:text-2xl font-black text-white drop-shadow">
                {currentStory.title}
              </h4>

              <button
                onClick={handleToggleAudio}
                className="p-2.5 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white transition shadow"
                title="استمع للقصة"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <p className="text-sm font-bold text-[#FCEBA7] leading-relaxed">
            {currentStory.summary}
          </p>

          <div className="p-4 rounded-2xl bg-stone-950 border border-white/5 space-y-2">
            {currentStory.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-stone-400 pt-1">
            المصدر: {currentStory.source}
          </div>

          {/* Navigation between micro-stories */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-stone-300 flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السابقة</span>
            </button>

            <span className="text-xs text-stone-400 font-bold">
              {currentIndex + 1} من {MICRO_STORIES_60S.length}
            </span>

            <button
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-xs font-bold text-white flex items-center gap-1 shadow"
            >
              <span>التالية</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
