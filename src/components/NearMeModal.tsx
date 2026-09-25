import React, { useState, useEffect, useMemo } from 'react';
import { MapPin, Navigation, Compass, ExternalLink, X, ChevronLeft, Sparkles, AlertCircle } from 'lucide-react';
import { Landmark, City, Museum } from '../types';

interface NearMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  landmarks: Landmark[];
  cities: City[];
  museums: Museum[];
  onSelectItem: (item: any, type: string) => void;
}

// Haversine formula in KM
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const NearMeModal: React.FC<NearMeModalProps> = ({
  isOpen,
  onClose,
  landmarks,
  cities,
  museums,
  onSelectItem,
}) => {
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [distanceFilter, setDistanceFilter] = useState<number>(15); // max km

  // Preset location simulations in case user is remote or denied GPS
  const simulatedPresets = [
    { name: 'سوق واقف (الدوحة)', coords: { lat: 25.2882, lng: 51.5327 } },
    { name: 'ممشى لوسيل المارينا', coords: { lat: 25.42, lng: 51.5 } },
    { name: 'مدينة الخور الساحلية', coords: { lat: 25.6839, lng: 51.5058 } },
    { name: 'قلعة الزبارة التاريخية', coords: { lat: 25.9767, lng: 51.0475 } },
  ];

  const requestGeolocation = () => {
    if (!('geolocation' in navigator)) {
      setLocationError('خاصية تحديد الموقع غير مدعومة في متصفحك.');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        setIsLoadingLocation(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError('تم رفض إذن تحديد الموقع. يمكنك اختيار موقع تجريبي في قطر للاستكشاف.');
        } else {
          setLocationError('تعذر تحديد الموقع الدقيق. يمكنك اختيار موقع تجريبي في قطر.');
        }
        // Set default to Doha
        setUserCoords({ lat: 25.2867, lng: 51.5333 });
      },
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    if (isOpen && !userCoords) {
      requestGeolocation();
    }
  }, [isOpen]);

  // Combine and sort places by distance
  const allPlacesWithDistance = useMemo(() => {
    if (!userCoords) return [];

    const items: Array<{
      item: any;
      type: 'landmark' | 'museum' | 'city';
      distanceKm: number;
    }> = [];

    landmarks.forEach((l) => {
      if (l.geoCoords) {
        const d = calculateDistanceKm(userCoords.lat, userCoords.lng, l.geoCoords[0], l.geoCoords[1]);
        items.push({ item: l, type: 'landmark', distanceKm: d });
      }
    });

    museums.forEach((m) => {
      if (m.geoCoords) {
        const d = calculateDistanceKm(userCoords.lat, userCoords.lng, m.geoCoords[0], m.geoCoords[1]);
        items.push({ item: m, type: 'museum', distanceKm: d });
      }
    });

    cities.forEach((c) => {
      if (c.geoCoords) {
        const d = calculateDistanceKm(userCoords.lat, userCoords.lng, c.geoCoords[0], c.geoCoords[1]);
        items.push({ item: c, type: 'city', distanceKm: d });
      }
    });

    return items
      .filter((x) => x.distanceKm <= distanceFilter)
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [userCoords, landmarks, museums, cities, distanceFilter]);

  const closestPlace = allPlacesWithDistance[0];

  const formatDistance = (km: number) => {
    if (km < 1) {
      return `${Math.round(km * 1000)} م`;
    }
    return `${km.toFixed(1)} كم`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-stone-900 border border-[#8A1538]/50 shadow-2xl text-stone-100 flex flex-col max-h-[88vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-[#8A1538] via-[#5e0d24] to-[#25040d] border-b border-[#D4AF37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/30">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                <span>ماذا يوجد حولي في قطر؟</span>
                <span className="text-xs bg-[#D4AF37] text-stone-950 font-bold px-2 py-0.5 rounded-full">حي ومباشر</span>
              </h3>
              <p className="text-xs text-stone-300">
                استكشف المعالم والمتاحف والأماكن التراثية الأقرب إلى موقعك الحالي
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scroll Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* Closest Highlight Banner ("أنا هنا") */}
          {closestPlace && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#8A1538]/30 via-stone-950 to-stone-950 border border-[#D4AF37]/40 shadow-lg">
              <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5 mb-1">
                <MapPin className="w-4 h-4 text-red-500 animate-bounce" />
                <span>أنت الآن بالقرب من ({formatDistance(closestPlace.distanceKm)}):</span>
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mb-1">
                {closestPlace.item.nameAr}
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 font-serif-ar mb-3 line-clamp-2">
                {closestPlace.item.overview || closestPlace.item.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#FCEBA7] font-semibold">
                  هل تعرف قصة وتاريخ هذا المكان؟
                </span>
                <button
                  onClick={() => {
                    onSelectItem(closestPlace.item, closestPlace.type);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs font-bold transition shadow flex items-center gap-1"
                >
                  <span>اكتشف القصة</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Quick Presets / Simulated Locations */}
          <div className="p-4 rounded-2xl bg-stone-950 border border-white/5 space-y-2">
            <span className="text-xs text-stone-400 block font-semibold">
              أو حدد موقعك في إحدى مدن قطر للاستكشاف التجريبي:
            </span>
            <div className="flex flex-wrap gap-2">
              {simulatedPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setUserCoords(preset.coords)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-[#8A1538]/30 border border-white/10 hover:border-[#8A1538] text-xs text-stone-200 transition"
                >
                  📍 {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Distance Filter Selector */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
            <span className="text-xs font-bold text-stone-300">نطاق المسافة:</span>
            <div className="flex items-center gap-1.5">
              {[5, 15, 30, 60].map((km) => (
                <button
                  key={km}
                  onClick={() => setDistanceFilter(km)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    distanceFilter === km
                      ? 'bg-[#8A1538] text-white'
                      : 'bg-stone-800 text-stone-400 hover:text-white'
                  }`}
                >
                  {km} كم
                </button>
              ))}
            </div>
          </div>

          {/* Places List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              الأماكن المكتشفة في محيطك ({allPlacesWithDistance.length} مواقع):
            </h4>

            {allPlacesWithDistance.length === 0 ? (
              <div className="text-center py-8 text-xs text-stone-400">
                لا توجد مواقع ضمن هذا النطاق، جرب زيادة نطاق المسافة.
              </div>
            ) : (
              allPlacesWithDistance.map(({ item, type, distanceKm }) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item, type);
                    onClose();
                  }}
                  className="p-3 rounded-2xl bg-stone-950/70 hover:bg-[#8A1538]/20 border border-white/5 hover:border-[#8A1538]/50 flex items-center justify-between cursor-pointer transition gap-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.heroImage}
                      alt={item.nameAr}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-white">{item.nameAr}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8A1538] text-white">
                          {formatDistance(distanceKm)}
                        </span>
                      </div>
                      <span className="text-xs text-stone-400 line-clamp-1">
                        {item.cityNameAr || item.tag} • {item.overview || item.description}
                      </span>
                    </div>
                  </div>

                  <ChevronLeft className="w-4 h-4 text-stone-400" />
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
