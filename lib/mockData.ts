// Mock data for SolaceRouteAI prototype — aligned with idea.md PRD

export interface Attraction {
  id: string;
  name: string;
  category: string;
  crowdLevel: number; // 1-5
  description: string;
  estTime: number; // minutes
  lat: number;
  lng: number;
  gridX: number;
  gridY: number;
  /** e.g. "4–6pm" for heatmap cards (PRD) */
  bestVisitTime?: string;
  /** Short italic-style AI rationale (PRD) */
  aiSuggestion?: string;
}

export interface ItineraryItem {
  id: string;
  attractionId: string;
  startTime: string;
  endTime: string;
  order: number;
}

export interface TripPreferences {
  startTime: string;
  duration: number;
  interests: string[];
  crowdAvoidance: boolean;
  /** PRD Screen 2 */
  destination: string;
  arrivalDate: string;
  departureDate: string;
  wheelchairAccessible: boolean;
  /** Thank-you personalization (PRD Screen 7) */
  displayName?: string;
}

export function createDefaultPreferences(): TripPreferences {
  return {
    startTime: '09:00',
    duration: 240,
    interests: ['Culture', 'Heritage', 'Hidden Gems'],
    crowdAvoidance: true,
    destination: 'Barcelona, Spain',
    arrivalDate: '2026-04-12',
    departureDate: '2026-04-16',
    wheelchairAccessible: false,
    displayName: 'Maria',
  };
}

export const INTEREST_OPTIONS_PRD = [
  'Culture',
  'Nature',
  'Food & Drink',
  'Heritage',
  'Art',
  'Architecture',
  'Markets',
  'Hidden Gems',
] as const;

export const mockAttractions: Attraction[] = [
  {
    id: 'att1',
    name: 'Central Museum',
    category: 'Museum',
    crowdLevel: 4,
    description: 'Historic art and culture museum',
    estTime: 120,
    lat: 40.7128,
    lng: -74.006,
    gridX: 3,
    gridY: 2,
    bestVisitTime: 'After 5pm',
    aiSuggestion:
      'Crowds thin in late afternoon — pre-book online to skip the line.',
  },
  {
    id: 'att2',
    name: 'Riverside Park',
    category: 'Nature',
    crowdLevel: 2,
    description: 'Beautiful waterfront park with trails',
    estTime: 90,
    lat: 40.7195,
    lng: -73.9925,
    gridX: 5,
    gridY: 1,
    bestVisitTime: '9–11am',
    aiSuggestion:
      'Quietest in the morning — ideal for a calm start to your day.',
  },
  {
    id: 'att3',
    name: 'Downtown Market',
    category: 'Markets',
    crowdLevel: 5,
    description: 'Bustling street market with local goods',
    estTime: 60,
    lat: 40.7125,
    lng: -74.005,
    gridX: 2,
    gridY: 3,
    bestVisitTime: 'Before 10am',
    aiSuggestion:
      'At peak capacity midday — try the side alleys or come early.',
  },
  {
    id: 'att4',
    name: 'Garden District',
    category: 'Nature',
    crowdLevel: 1,
    description: 'Serene botanical garden',
    estTime: 75,
    lat: 40.72,
    lng: -74.008,
    gridX: 4,
    gridY: 5,
    bestVisitTime: 'Visit now',
    aiSuggestion:
      'Low footfall right now — a peaceful alternative to busy core sites.',
  },
  {
    id: 'att5',
    name: 'Historic Harbor',
    category: 'Heritage',
    crowdLevel: 3,
    description: 'Iconic waterfront with historic buildings',
    estTime: 45,
    lat: 40.7026,
    lng: -74.013,
    gridX: 1,
    gridY: 6,
    bestVisitTime: '2–4pm',
    aiSuggestion: 'Moderate crowds — good window before evening cruise rush.',
  },
  {
    id: 'att6',
    name: 'Cultural District',
    category: 'Art',
    crowdLevel: 2,
    description: 'Galleries, theaters, and cultural venues',
    estTime: 110,
    lat: 40.717,
    lng: -74.002,
    gridX: 6,
    gridY: 4,
    bestVisitTime: 'After 3pm',
    aiSuggestion:
      'Galleries clear after tour groups — perfect for a slower browse.',
  },
];

/** PRD semantic colours: low / moderate / high */
export const getCrowdColor = (level: number): string => {
  switch (level) {
    case 1:
    case 2:
      return '#1D9E75';
    case 3:
      return '#EF9F27';
    case 4:
    case 5:
      return '#E24B4A';
    default:
      return '#B4B2A9';
  }
};

export const getCrowdLabel = (level: number): string => {
  switch (level) {
    case 1:
      return 'Low';
    case 2:
      return 'Low';
    case 3:
      return 'Moderate';
    case 4:
      return 'High';
    case 5:
      return 'At capacity';
    default:
      return 'Unknown';
  }
};

export const mockItinerary: ItineraryItem[] = [
  {
    id: 'itl1',
    attractionId: 'att2',
    startTime: '09:00',
    endTime: '10:30',
    order: 1,
  },
  {
    id: 'itl2',
    attractionId: 'att4',
    startTime: '10:45',
    endTime: '12:00',
    order: 2,
  },
  {
    id: 'itl3',
    attractionId: 'att1',
    startTime: '13:00',
    endTime: '15:00',
    order: 3,
  },
  {
    id: 'itl4',
    attractionId: 'att6',
    startTime: '15:30',
    endTime: '17:00',
    order: 4,
  },
];

export const impactStats = {
  peopleAvoided: 340,
  timeOptimized: 140,
  emissionReduced: 12,
  satisfactionRate: 94,
  communitySitesVisited: 2,
  redirectedFrom: 'Sagrada Família',
};

/** Suggested alternative when main site is at capacity (PRD Screen 5) */
export const mockAlertAlternative: Attraction = {
  id: 'att-alt',
  name: 'Casa Batlló',
  category: 'Architecture',
  crowdLevel: 2,
  description:
    'Designed by the same architect as the landmark cathedral — stunning façade, smaller crowds.',
  estTime: 90,
  lat: 41.3917,
  lng: 2.1649,
  gridX: 4,
  gridY: 2,
  bestVisitTime: 'Now',
  aiSuggestion:
    'Equally iconic Modernisme — currently ~22% capacity vs main site at limit.',
};

export const formatTripDate = (iso: string): string => {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(iso + 'T12:00:00'));
  } catch {
    return iso;
  }
};
