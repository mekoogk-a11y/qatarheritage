import React, { useState, useEffect } from 'react';
import {
  CITIES_DATA,
  LANDMARKS_DATA,
  MUSEUMS_DATA,
  STORIES_DATA,
  DID_YOU_KNOW_FACTS,
} from './data/qatarData';
import { City, Landmark, Museum, Story, DidYouKnowFact } from './types';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveQuestions } from './components/InteractiveQuestions';
import { CitiesSection } from './components/CitiesSection';
import { LandmarksSection } from './components/LandmarksSection';
import { MuseumsSection } from './components/MuseumsSection';
import { TimelineSection } from './components/TimelineSection';
import { HeritageSection } from './components/HeritageSection';
import { QatarMap } from './components/QatarMap';
import { DidYouKnowSection } from './components/DidYouKnowSection';
import { QuizSection } from './components/QuizSection';
import { StoriesSection } from './components/StoriesSection';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SplashScreen } from './components/SplashScreen';

// Modals
import { AIAssistantModal } from './components/AIAssistantModal';
import { SearchModal } from './components/SearchModal';
import { FavoritesModal } from './components/FavoritesModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { AboutModal } from './components/AboutModal';
import { ShareModal } from './components/ShareModal';
import { DetailModal } from './components/DetailModal';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Dynamic Data Store (with localStorage caching & Admin updates)
  const [cities, setCities] = useState<City[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('discover_qatar_cities');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return CITIES_DATA;
  });

  const [landmarks, setLandmarks] = useState<Landmark[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('discover_qatar_landmarks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return LANDMARKS_DATA;
  });

  const [museums, setMuseums] = useState<Museum[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('discover_qatar_museums');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return MUSEUMS_DATA;
  });

  const [stories, setStories] = useState<Story[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('discover_qatar_stories');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return STORIES_DATA;
  });

  const [facts, setFacts] = useState<DidYouKnowFact[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('discover_qatar_facts');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return DID_YOU_KNOW_FACTS;
  });

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('discover_qatar_favorites');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {}
      }
    }
    return [];
  });

  // Modal controls
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Detail Modal
  const [detailItem, setDetailItem] = useState<any | null>(null);
  const [detailType, setDetailType] = useState<'city' | 'landmark' | 'museum' | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Share Modal
  const [shareData, setShareData] = useState<{ isOpen: boolean; title: string; text: string }>({
    isOpen: false,
    title: '',
    text: '',
  });

  // Sync favorites to localStorage
  useEffect(() => {
    localStorage.setItem('discover_qatar_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenDetail = (item: any, type: 'city' | 'landmark' | 'museum') => {
    setDetailItem(item);
    setDetailType(type);
    setIsDetailOpen(true);
  };

  const handleOpenShare = (title: string, text: string) => {
    setShareData({ isOpen: true, title, text });
  };

  const handleNavigateTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // CMS Admin Handlers
  const handleAddCity = (newCity: City) => {
    const updated = [newCity, ...cities];
    setCities(updated);
    localStorage.setItem('discover_qatar_cities', JSON.stringify(updated));
  };

  const handleUpdateCity = (updatedCity: City) => {
    const updated = cities.map((c) => (c.id === updatedCity.id ? updatedCity : c));
    setCities(updated);
    localStorage.setItem('discover_qatar_cities', JSON.stringify(updated));
  };

  const handleDeleteCity = (id: string) => {
    const updated = cities.filter((c) => c.id !== id);
    setCities(updated);
    localStorage.setItem('discover_qatar_cities', JSON.stringify(updated));
  };

  const handleUpdateMuseumHours = (id: string, hours: { days: string; hours: string }[]) => {
    const updated = museums.map((m) =>
      m.id === id ? { ...m, openingHours: hours, lastUpdated: new Date().toISOString().split('T')[0] } : m
    );
    setMuseums(updated);
    localStorage.setItem('discover_qatar_museums', JSON.stringify(updated));
  };

  const handleAddFact = (newFact: DidYouKnowFact) => {
    const updated = [newFact, ...facts];
    setFacts(updated);
    localStorage.setItem('discover_qatar_facts', JSON.stringify(updated));
  };

  const handleAddLandmark = (newLandmark: Landmark) => {
    const updated = [newLandmark, ...landmarks];
    setLandmarks(updated);
    localStorage.setItem('discover_qatar_landmarks', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-[#8A1538] selection:text-white">
      
      {/* Splash Screen */}
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Offline Status Toast Indicator */}
      <OfflineIndicator />

      {/* Main Top Navigation */}
      <Navbar
        favoritesCount={favorites.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAskAI={() => setIsAskAIOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onNavigateTo={handleNavigateTo}
      />

      {/* Main Sections */}
      <main className="flex-1">
        
        {/* 1. Cinematic Hero Section */}
        <HeroSection
          onOpenAskAI={() => setIsAskAIOpen(true)}
          onNavigateTo={handleNavigateTo}
        />

        {/* 2. Interactive "هل تعرف قطر حقاً؟" */}
        <InteractiveQuestions />

        {/* 3. Daily "هل تعلم؟" */}
        <DidYouKnowSection />

        {/* 4. Cities and Towns (مدن وبلدات قطر) */}
        <CitiesSection
          cities={cities.filter((c) => c.status === 'published')}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectCity={(city) => handleOpenDetail(city, 'city')}
          onOpenShare={handleOpenShare}
        />

        {/* 5. Landmarks (معالم قطر) */}
        <LandmarksSection
          landmarks={landmarks.filter((l) => l.status === 'published')}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectLandmark={(l) => handleOpenDetail(l, 'landmark')}
          onOpenShare={handleOpenShare}
        />

        {/* 6. Interactive Qatar Map (Leaflet) */}
        <QatarMap
          cities={cities.filter((c) => c.status === 'published')}
          landmarks={landmarks.filter((l) => l.status === 'published')}
          museums={museums.filter((m) => m.status === 'published')}
          onSelectItem={handleOpenDetail}
        />

        {/* 7. Museums (متاحف قطر) */}
        <MuseumsSection
          museums={museums.filter((m) => m.status === 'published')}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onSelectMuseum={(m) => handleOpenDetail(m, 'museum')}
          onOpenShare={handleOpenShare}
        />

        {/* 8. Timeline (رحلة قطر عبر الزمن) */}
        <TimelineSection />

        {/* 9. Heritage (تراث قطر) */}
        <HeritageSection />

        {/* 10. Stories (قصص من قطر) */}
        <StoriesSection onOpenShare={handleOpenShare} />

        {/* 11. Quiz (كم تعرف عن قطر؟) */}
        <QuizSection />

      </main>

      {/* Footer */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateTo={handleNavigateTo}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomBar
        favoritesCount={favorites.length}
        onNavigateTo={handleNavigateTo}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenProfile={() => setIsAboutOpen(true)}
        onOpenNearMe={() => setIsSearchOpen(true)}
        onOpenSnapAndDiscover={() => setIsAskAIOpen(true)}
      />

      {/* Modals & Dialogs */}

      {/* Smart Search Engine Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        cities={cities.filter((c) => c.status === 'published')}
        landmarks={landmarks.filter((l) => l.status === 'published')}
        museums={museums.filter((m) => m.status === 'published')}
        stories={stories.filter((s) => s.status === 'published')}
        onSelectItem={(item, type) => {
          if (type === 'story') {
            handleOpenShare(item.title, item.intro);
          } else {
            handleOpenDetail(item, type as any);
          }
        }}
      />

      {/* AI Assistant "اسأل عن قطر 🇶🇦" */}
      <AIAssistantModal
        isOpen={isAskAIOpen}
        onClose={() => setIsAskAIOpen(false)}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        cities={cities}
        landmarks={landmarks}
        museums={museums}
        stories={stories}
        onRemoveFavorite={toggleFavorite}
        onSelectItem={(item, type) => {
          if (type === 'story') {
            handleOpenShare(item.title, item.intro);
          } else {
            handleOpenDetail(item, type as any);
          }
        }}
      />

      {/* Admin Dashboard Modal (CMS) */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        cities={cities}
        landmarks={landmarks}
        museums={museums}
        stories={stories}
        facts={facts}
        onAddCity={handleAddCity}
        onUpdateCity={handleUpdateCity}
        onDeleteCity={handleDeleteCity}
        onUpdateMuseumHours={handleUpdateMuseumHours}
        onAddFact={handleAddFact}
        onAddLandmark={handleAddLandmark}
      />

      {/* About Application Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareData.isOpen}
        onClose={() => setShareData({ isOpen: false, title: '', text: '' })}
        title={shareData.title}
        text={shareData.text}
      />

      {/* Detailed Modal for City/Landmark/Museum */}
      <DetailModal
        item={detailItem}
        type={detailType}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setDetailItem(null);
          setDetailType(null);
        }}
        isFavorite={detailItem ? favorites.includes(detailItem.id) : false}
        onToggleFavorite={toggleFavorite}
        onOpenShare={handleOpenShare}
      />

    </div>
  );
}
