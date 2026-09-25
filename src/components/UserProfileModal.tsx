import React from 'react';
import { Compass, Award, Flame, Heart, CheckCircle2, Lock, X, MapPin, Landmark, Building, BookOpen } from 'lucide-react';
import { Badge, UserProgress } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  badges: Badge[];
  favoritesCount: number;
  totalLocationsCount: number;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  progress,
  badges,
  favoritesCount,
  totalLocationsCount,
}) => {
  if (!isOpen) return null;

  const discoveryPercentage = Math.min(
    100,
    Math.round((progress.discoveredPlaces.length / Math.max(1, totalLocationsCount)) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl text-stone-100 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#8A1538] via-[#5e0d24] to-[#25040d] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl border border-[#D4AF37]/40 shadow">
              🧭
            </div>
            <div>
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
                جواز استكشاف قطر (حساب مستكشف)
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">رحلتي في قطر 🇶🇦</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Main Stats Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#8A1538]/30 to-stone-950 border border-[#D4AF37]/40 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-stone-300 font-semibold block">إجمالي الإنجاز الاستكشافي:</span>
                <h4 className="text-2xl sm:text-3xl font-black text-white">
                  أنت اكتشفت {progress.discoveredPlaces.length} مكانًا في قطر 🇶🇦
                </h4>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-xs">
                <Flame className="w-4 h-4 text-amber-400 fill-current" />
                <span>سلسلة: {Math.max(1, progress.dailyStreak)} أيام</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-300 font-semibold">
                <span>نسبة استكشاف معالم قطر</span>
                <span className="text-[#D4AF37] font-bold">{discoveryPercentage}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-stone-800 overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#8A1538] to-[#D4AF37] transition-all duration-500"
                  style={{ width: `${Math.max(5, discoveryPercentage)}%` }}
                />
              </div>
            </div>

            {/* 4 Mini Stat Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-lg font-black text-[#D4AF37] block">{progress.discoveredCities.length}</span>
                <span className="text-[11px] text-stone-300">مدن مكتشفة</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-lg font-black text-[#D4AF37] block">{progress.readStories.length}</span>
                <span className="text-[11px] text-stone-300">قصص مقروءة</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-lg font-black text-[#D4AF37] block">{progress.memoryStoriesListened.length}</span>
                <span className="text-[11px] text-stone-300">شهادات مسموعة</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-center">
                <span className="text-lg font-black text-[#D4AF37] block">{favoritesCount}</span>
                <span className="text-[11px] text-stone-300">في المفضلة</span>
              </div>
            </div>
          </div>

          {/* Badges & Achievements Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#FCEBA7] uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>شارات وإنجازات الاستكشاف ({badges.filter(b => b.isUnlocked).length} من {badges.length})</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                    badge.isUnlocked
                      ? 'bg-gradient-to-r from-[#8A1538]/20 to-stone-950 border-[#D4AF37]/50 shadow-md'
                      : 'bg-stone-950/60 border-white/5 opacity-60'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                      badge.isUnlocked
                        ? 'bg-[#8A1538] border border-[#D4AF37] text-white shadow'
                        : 'bg-stone-800 text-stone-500'
                    }`}
                  >
                    {badge.isUnlocked ? badge.icon : <Lock className="w-5 h-5 text-stone-500" />}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-bold text-white">{badge.title}</h5>
                      {badge.isUnlocked && (
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                          مكتمل ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
