import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Landmark, City, Museum } from '../types';
import { Compass, Filter, MapPin, Layers, ExternalLink, Eye } from 'lucide-react';

interface QatarMapProps {
  landmarks: Landmark[];
  cities: City[];
  museums: Museum[];
  onSelectItem: (item: any, type: 'city' | 'landmark' | 'museum') => void;
}

export const QatarMap: React.FC<QatarMapProps> = ({
  landmarks,
  cities,
  museums,
  onSelectItem,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<{
    item: any;
    type: 'city' | 'landmark' | 'museum';
  } | null>(null);

  // Map marker color configurations
  const getMarkerIcon = (type: string, category?: string) => {
    let bg = '#8A1538'; // Qatar Maroon
    let symbol = '🏛️';

    if (type === 'museum' || category === 'museums') {
      bg = '#2563EB'; // Blue
      symbol = '🏛️';
    } else if (category === 'nature_desert' || category === 'beaches') {
      bg = '#059669'; // Green
      symbol = '🌴';
    } else if (category === 'souqs' || category === 'sports') {
      bg = '#D97706'; // Gold/Amber
      symbol = '🛍️';
    } else if (category === 'arts' || category === 'architecture_culture') {
      bg = '#9333EA'; // Purple
      symbol = '🎨';
    } else if (category === 'archaeology' || category === 'history_heritage') {
      bg = '#DC2626'; // Red
      symbol = '🏺';
    } else if (type === 'city') {
      bg = '#8A1538';
      symbol = '🏙️';
    }

    return L.divIcon({
      className: 'custom-qatar-marker',
      html: `
        <div style="
          background-color: ${bg};
          width: 38px;
          height: 38px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #D4AF37;
          box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          cursor: pointer;
          transition: transform 0.2s ease;
        ">
          <span style="
            transform: rotate(45deg);
            font-size: 16px;
            filter: drop-shadow(0 1px 2px rgba(0,0,0,0.4));
          ">${symbol}</span>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -36],
    });
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Qatar bounds: center [25.3548, 51.1839], zoom: 9
      const map = L.map(mapContainerRef.current, {
        center: [25.3548, 51.1839],
        zoom: 9,
        minZoom: 8,
        maxZoom: 17,
        scrollWheelZoom: false,
      });

      // CartoDB Dark Matter / Voyager tile layer for luxury look
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap contributors',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers when filter changes
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    // 1. Add Cities
    if (activeFilter === 'all' || activeFilter === 'cities') {
      cities.forEach((city) => {
        if (!city.geoCoords) return;
        const marker = L.marker(city.geoCoords, {
          icon: getMarkerIcon('city'),
        });

        marker.on('click', () => {
          setSelectedPlace({ item: city, type: 'city' });
        });

        markersLayerRef.current?.addLayer(marker);
      });
    }

    // 2. Add Museums
    if (activeFilter === 'all' || activeFilter === 'museums') {
      museums.forEach((museum) => {
        if (!museum.geoCoords) return;
        const marker = L.marker(museum.geoCoords, {
          icon: getMarkerIcon('museum'),
        });

        marker.on('click', () => {
          setSelectedPlace({ item: museum, type: 'museum' });
        });

        markersLayerRef.current?.addLayer(marker);
      });
    }

    // 3. Add Landmarks
    landmarks.forEach((landmark) => {
      if (!landmark.geoCoords) return;

      let shouldInclude = false;
      if (activeFilter === 'all') shouldInclude = true;
      else if (activeFilter === 'history' && (landmark.category === 'history_heritage' || landmark.category === 'archaeology')) shouldInclude = true;
      else if (activeFilter === 'nature' && (landmark.category === 'nature_desert' || landmark.category === 'beaches')) shouldInclude = true;
      else if (activeFilter === 'arts' && (landmark.category === 'arts' || landmark.category === 'architecture_culture')) shouldInclude = true;
      else if (activeFilter === 'souqs' && (landmark.category === 'souqs' || landmark.category === 'sports' || landmark.category === 'modern_landmarks')) shouldInclude = true;

      if (shouldInclude) {
        const marker = L.marker(landmark.geoCoords, {
          icon: getMarkerIcon('landmark', landmark.category),
        });

        marker.on('click', () => {
          setSelectedPlace({ item: landmark, type: 'landmark' });
        });

        markersLayerRef.current?.addLayer(marker);
      }
    });
  }, [activeFilter, cities, landmarks, museums]);

  return (
    <section id="map" className="py-16 sm:py-24 relative overflow-hidden bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8A1538]/20 border border-[#8A1538]/40 text-[#D4AF37] text-xs sm:text-sm font-semibold mb-3">
            <Compass className="w-4 h-4" />
            <span>خريطة تفاعلية شاملة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            اكتشف قطر على الخريطة 🗺️
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-300">
            انقر على أي موقع على خريطة شبه الجزيرة القطرية لاستكشاف قصته وتاريخه ومعالمه وموقعه الجغرافي الدقيق.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {[
            { id: 'all', label: 'الكل', color: 'bg-white/10 text-white' },
            { id: 'cities', label: '🏙️ المدن', color: 'bg-[#8A1538] text-white' },
            { id: 'history', label: '🔴 تاريخ وتراث', color: 'bg-red-700/80 text-white' },
            { id: 'museums', label: '🔵 متاحف', color: 'bg-blue-600/80 text-white' },
            { id: 'nature', label: '🟢 طبيعة وشواطئ', color: 'bg-emerald-600/80 text-white' },
            { id: 'arts', label: '🟣 فنون وعمارة', color: 'bg-purple-600/80 text-white' },
            { id: 'souqs', label: '🟡 أسواق ومعالم', color: 'bg-amber-600/80 text-white' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-[#8A1538] to-[#ad1f49] text-white ring-2 ring-[#D4AF37]'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Map Container & Preview Floating Card */}
        <div className="relative rounded-3xl overflow-hidden border border-[#8A1538]/40 shadow-2xl bg-stone-900 h-[520px] sm:h-[620px]">
          
          {/* Leaflet Map Div */}
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Map Overlay Legend */}
          <div className="absolute top-4 right-4 z-20 hidden md:flex flex-col gap-1.5 p-3 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-white/10 text-xs text-stone-300 shadow-xl">
            <span className="font-bold text-white mb-1">دليل العلامات:</span>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-600 shrink-0" /> مواقع أثرية وتاريخية</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-600 shrink-0" /> متاحف ومراكز ثقافية</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" /> محميات طبيعية وشواطئ</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-600 shrink-0" /> فنون وعمارة إسلامية</div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#8A1538] shrink-0" /> مدن وبلدات قطر</div>
          </div>

          {/* Selected Place Detail Box */}
          {selectedPlace && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 z-20 rounded-2xl bg-stone-900/95 backdrop-blur-xl border border-[#D4AF37]/40 shadow-2xl p-4 text-white animate-in slide-in-from-bottom-5">
              <div className="relative h-36 rounded-xl overflow-hidden mb-3 border border-white/10">
                <img
                  src={selectedPlace.item.heroImage}
                  alt={selectedPlace.item.nameAr}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 right-2 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#8A1538] text-white border border-[#D4AF37]/50 shadow">
                  {selectedPlace.type === 'city' ? 'مدينة قطرية' : selectedPlace.type === 'museum' ? 'متحف وطني' : 'معلم بارز'}
                </span>
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                >
                  ✕
                </button>
              </div>

              <h4 className="text-lg font-bold text-white mb-1">
                {selectedPlace.item.nameAr}
              </h4>
              <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed mb-3">
                {selectedPlace.item.overview || selectedPlace.item.description}
              </p>

              <button
                onClick={() => onSelectItem(selectedPlace.item, selectedPlace.type)}
                className="w-full py-2 px-3 rounded-xl bg-[#8A1538] hover:bg-[#ad1f49] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition shadow-md"
              >
                <Eye className="w-4 h-4" />
                <span>اكتشف المزيد عن {selectedPlace.item.nameAr}</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
