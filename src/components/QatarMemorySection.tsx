import React, { useState, useRef, useEffect } from 'react';
import { ORAL_MEMORY_STORIES } from '../data/qatarData';
import { OralMemoryStory } from '../types';
import { Mic, Volume2, Play, Pause, ShieldCheck, Calendar, User, Clock, ChevronLeft, Sparkles, X } from 'lucide-react';

interface QatarMemorySectionProps {
  onStoryRead?: (storyId: string) => void;
}

export const QatarMemorySection: React.FC<QatarMemorySectionProps> = ({ onStoryRead }) => {
  const [selectedStory, setSelectedStory] = useState<OralMemoryStory | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingId(null);
  };

  const handleTogglePlay = (story: OralMemoryStory) => {
    if (playingId === story.id) {
      stopAudio();
      return;
    }

    stopAudio();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(story.content);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.95;
      utterance.pitch = 0.95;

      utterance.onend = () => {
        setPlayingId(null);
      };
      utterance.onerror = () => {
        setPlayingId(null);
      };

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setPlayingId(story.id);

      if (onStoryRead) {
        onStoryRead(story.id);
      }
    } else {
      alert('ميزة القراءة الصوتية مدعومة في متصفحات الويب الحديثة.');
    }
  };

  const filteredStories = filterTopic === 'all'
    ? ORAL_MEMORY_STORIES
    : ORAL_MEMORY_STORIES.filter(s => s.topic === filterTopic);

  return (
    <section id="memory" className="py-16 sm:py-24 bg-stone-900 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <Mic className="w-4 h-4" />
            <span>الروايات والشهادات الشفوية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            🎙️ ذاكرة قطر
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            حفظ الروايات الشفوية وقصص الأجداد عن الغوص والأسواق والمجالس والحياة في قطر قبل النفط من مصادرها الموثقة.
          </p>
        </div>

        {/* Topic Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'جميع الروايات' },
            { id: 'pearl_diving', label: '🌊 الغوص على اللؤلؤ' },
            { id: 'markets', label: '🛍️ الأسواق القديمة' },
            { id: 'majlis', label: '☕ المجالس القطرية' },
            { id: 'pre_oil', label: '⏳ الحياة قبل النفط' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterTopic(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                filterTopic === tab.id
                  ? 'bg-[#8A1538] text-white border border-[#D4AF37]/50 shadow-md ring-2 ring-[#8A1538]/30'
                  : 'bg-stone-950 text-stone-300 hover:bg-stone-800 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStories.map((story) => {
            const isPlayingThis = playingId === story.id;

            return (
              <div
                key={story.id}
                className="group rounded-3xl bg-stone-950/80 border border-white/10 hover:border-[#8A1538]/60 overflow-hidden transition-all duration-300 p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl"
              >
                <div>
                  
                  {/* Top Bar with topic & audio trigger */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#8A1538] text-white border border-[#D4AF37]/30">
                      {story.topicLabel}
                    </span>

                    <button
                      onClick={() => handleTogglePlay(story)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        isPlayingThis
                          ? 'bg-amber-600 text-white animate-pulse'
                          : 'bg-white/10 hover:bg-[#8A1538] text-stone-200 hover:text-white'
                      }`}
                    >
                      {isPlayingThis ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>إيقاف الاستماع</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>استمع للرواية</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#FCEBA7] transition-colors leading-snug">
                    {story.title}
                  </h3>

                  {/* Narrator Info Badge */}
                  <div className="p-3 rounded-2xl bg-stone-900 border border-white/5 space-y-1 mb-4 text-xs text-stone-300">
                    <div className="flex items-center gap-1.5 text-white font-bold">
                      <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>الراوي: {story.narratorName}</span>
                    </div>
                    <p className="text-stone-400 text-[11px] pr-5">{story.narratorRole}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-400 pt-1 border-t border-white/5">
                      <Calendar className="w-3 h-3 text-stone-500" />
                      <span>{story.dateOfRecord}</span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif-ar line-clamp-4 mb-4">
                    "{story.content}"
                  </p>
                </div>

                {/* Footer and source */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="line-clamp-1">{story.verifiedSource}</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedStory(story);
                      if (onStoryRead) onStoryRead(story.id);
                    }}
                    className="text-[#D4AF37] hover:underline font-bold text-xs flex items-center gap-1 self-end sm:self-auto"
                  >
                    <span>قراءة الشهادة كاملة</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal for full testimony */}
        {selectedStory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
            <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl p-6 sm:p-8 text-stone-100 max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-start mb-5 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#D4AF37] block mb-1">
                    {selectedStory.topicLabel} • {selectedStory.dateOfRecord}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {selectedStory.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedStory(null)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Narrator Card */}
              <div className="p-4 rounded-2xl bg-[#8A1538]/15 border border-[#8A1538]/30 mb-5 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">{selectedStory.narratorName}</h4>
                  <p className="text-xs text-stone-300">{selectedStory.narratorRole}</p>
                </div>

                <button
                  onClick={() => handleTogglePlay(selectedStory)}
                  className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs font-bold flex items-center gap-2 shadow"
                >
                  <Volume2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>{playingId === selectedStory.id ? 'إيقاف الصوت' : 'تشغيل القراءة الصوتية'}</span>
                </button>
              </div>

              {/* Full Text */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/5 mb-6 text-sm sm:text-base leading-relaxed text-stone-200 font-serif-ar">
                "{selectedStory.content}"
              </div>

              {/* Source & Consent */}
              <div className="p-4 rounded-2xl bg-stone-950 border border-white/5 space-y-2 text-xs text-stone-400 mb-6">
                <div>
                  <strong className="text-white">المصدر الموثق: </strong>
                  <span>{selectedStory.verifiedSource}</span>
                </div>
                <div>
                  <strong className="text-white">حقوق وموافقة التوثيق: </strong>
                  <span>{selectedStory.consentAndCopyright}</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs font-bold transition"
                >
                  إغلاق الرواية
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
