export type LandmarkCategory =
  | 'history_heritage' // 🏛️ تاريخ وتراث
  | 'archaeology' // 🏺 مواقع أثرية
  | 'architecture_culture' // 🕌 عمارة وثقافة
  | 'modern_landmarks' // 🏙️ معالم حديثة
  | 'beaches' // 🌊 شواطئ
  | 'nature_desert' // 🏜️ طبيعة وصحراء
  | 'arts' // 🎨 فنون
  | 'sports' // 🏟️ رياضة
  | 'souqs' // 🛍️ أسواق
  | 'museums'; // 🏛️ متاحف

export interface Source {
  title: string;
  url?: string;
  verifiedOrg: string;
  accessDate: string;
}

export interface ImageAttribution {
  source: string;
  license: string;
  copyright?: string;
  photographer?: string;
}

export interface City {
  id: string;
  nameAr: string;
  nameEn: string;
  tag: string;
  overview: string;
  history: string;
  namingReason?: string;
  geoCoords: [number, number]; // [latitude, longitude]
  landmarks: string[];
  naturalFeatures: string[];
  heritageSites: string[];
  heroImage: string;
  gallery: string[];
  sources: Source[];
  isCoastal: boolean;
  isHistorical: boolean;
  isNatural: boolean;
  isHeritage: boolean;
  status: 'published' | 'draft' | 'archived';
  population?: string;
  areaKm2?: string;
}

export interface Landmark {
  id: string;
  nameAr: string;
  nameEn: string;
  cityId: string;
  cityNameAr: string;
  category: LandmarkCategory;
  description: string;
  historyStory: string;
  geoCoords: [number, number];
  heroImage: string;
  gallery: string[];
  officialUrl?: string;
  sources: Source[];
  status: 'published' | 'draft' | 'archived';
  lastUpdated: string;
  features?: string[];
  imageAttribution?: ImageAttribution;
}

export interface Museum {
  id: string;
  nameAr: string;
  nameEn: string;
  cityId: string;
  cityNameAr: string;
  description: string;
  highlights: string[];
  openingHours: { days: string; hours: string }[];
  ticketInfo: string;
  officialUrl: string;
  geoCoords: [number, number];
  heroImage: string;
  gallery: string[];
  sources: Source[];
  status: 'published' | 'draft' | 'archived';
  lastUpdated: string;
  imageAttribution?: ImageAttribution;
}

export interface HeritageSite {
  id: string;
  nameAr: string;
  nameEn: string;
  period: string;
  location: string;
  overview: string;
  historicalSignificance: string;
  unescoStatus?: boolean;
  heroImage: string;
  gallery?: string[];
  imageAttribution: ImageAttribution;
  sources: Source[];
  geoCoords: [number, number];
  status: 'published' | 'draft' | 'archived';
}

export interface TimelineEvent {
  id: string;
  era: string;
  yearOrPeriod: string;
  title: string;
  description: string;
  significance: string;
  image: string;
  sources: Source[];
}

export interface HeritageTradition {
  id: string;
  title: string;
  category: 'diving' | 'architecture' | 'majlis' | 'costumes' | 'cuisine' | 'crafts' | 'customs' | 'forts';
  categoryLabel: string;
  description: string;
  details: string[];
  icon: string;
  image: string;
  sources: Source[];
}

export interface Story {
  id: string;
  title: string;
  intro: string;
  content: string[];
  readTime: string;
  category: string;
  heroImage: string;
  gallery: string[];
  historicalContext: string;
  sources: Source[];
  status: 'published' | 'draft' | 'archived';
}

export interface DidYouKnowFact {
  id: string;
  fact: string;
  detailedStory: string;
  source: string;
  sourceUrl?: string;
  relatedCategory?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface InteractiveQuestion {
  id: string;
  question: string;
  shortAnswer: string;
  fullStory: string;
  source: string;
}

export interface ThenAndNowItem {
  id: string;
  nameAr: string;
  nameEn: string;
  cityNameAr: string;
  periodOld: string;
  periodNew: string;
  oldImage: string;
  modernImage: string;
  story: string;
  source: string;
  photographerOld?: string;
  photographerNew?: string;
  license: string;
}

export interface OralMemoryStory {
  id: string;
  title: string;
  topic: 'pearl_diving' | 'markets' | 'sea_life' | 'majlis' | 'weddings' | 'pre_oil' | 'desert_trips';
  topicLabel: string;
  narratorName: string;
  narratorRole: string;
  dateOfRecord: string;
  content: string;
  audioDuration: string;
  image: string;
  verifiedSource: string;
  consentAndCopyright: string;
  tags: string[];
}

export interface DailyChallenge {
  id: string;
  date: string; // YYYY-MM-DD
  question: string;
  image: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  source: string;
  landmarkId?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
  requiredCount: number;
  currentCount: number;
  isUnlocked: boolean;
}

export interface MicroStory60s {
  id: string;
  title: string;
  durationSeconds: number;
  image: string;
  summary: string;
  bullets: string[];
  source: string;
}

export interface UserProgress {
  discoveredPlaces: string[];
  discoveredCities: string[];
  answeredQuizzes: number;
  readStories: string[];
  memoryStoriesListened: string[];
  dailyStreak: number;
  lastDailyChallengeDate: string;
  earnedBadges: string[];
}

export interface LandmarkIdentificationResult {
  matched: boolean;
  landmarkNameAr?: string;
  landmarkNameEn?: string;
  cityNameAr?: string;
  confidenceScore: number;
  description?: string;
  matchedId?: string;
}

