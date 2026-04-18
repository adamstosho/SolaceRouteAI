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
  /** project.md B2B benefit integration */
  isCommunityPartner?: boolean;
}

export interface CityStatus {
  weather: 'Sunny' | 'Cloudy' | 'Rainy' | 'Partly Cloudy';
  temp: number;
  activeEvent?: string;
}

export const mockCityStatus: CityStatus = {
  weather: 'Sunny',
  temp: 22,
  activeEvent: 'Gràcia District Festival (Local)',
};

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
    id: 'bcn-1',
    name: 'Sagrada Família',
    category: 'Architecture',
    crowdLevel: 5,
    description: 'Gaudí’s unfinished masterpiece and iconic basilica.',
    estTime: 120,
    lat: 41.4036,
    lng: 2.1744,
    gridX: 3,
    gridY: 1,
    bestVisitTime: 'After 5pm today',
    aiSuggestion: 'Currently at capacity — we’ll alert you when it clears.',
  },
  {
    id: 'bcn-2',
    name: 'Park Güell',
    category: 'Nature',
    crowdLevel: 3,
    description: 'Public park with mosaics and city views.',
    estTime: 90,
    lat: 41.4145,
    lng: 2.1527,
    gridX: 4,
    gridY: 1,
    bestVisitTime: 'After 3pm',
    aiSuggestion: 'Crowds ease in the late afternoon.',
  },
  {
    id: 'bcn-3',
    name: 'Gothic Quarter',
    category: 'Heritage',
    crowdLevel: 2,
    description: 'Medieval streets and historic charm.',
    estTime: 60,
    lat: 41.3833,
    lng: 2.1769,
    gridX: 2,
    gridY: 3,
    bestVisitTime: 'Now — 9am to 12pm',
    aiSuggestion: 'Visit now — currently only 18% capacity.',
    isCommunityPartner: true,
  },
  {
    id: 'bcn-4',
    name: 'Picasso Museum',
    category: 'Art',
    crowdLevel: 4,
    description: 'Extensive collection of artworks by Pablo Picasso.',
    estTime: 90,
    lat: 41.3852,
    lng: 2.1809,
    gridX: 2,
    gridY: 4,
    bestVisitTime: 'Before 11am',
    aiSuggestion: 'Crowds reduce mid-morning. Pre-booked ticket recommended.',
  },
  {
    id: 'bcn-5',
    name: 'La Boqueria Market',
    category: 'Food & Drink',
    crowdLevel: 3,
    description: 'Famous food market with local delicacies.',
    estTime: 60,
    lat: 41.3817,
    lng: 2.1714,
    gridX: 1,
    gridY: 3,
    bestVisitTime: 'Now',
    aiSuggestion: 'Local tip: side entrance has 40% less congestion.',
    isCommunityPartner: true,
  },
  {
    id: 'bcn-6',
    name: 'Casa Batlló',
    category: 'Architecture',
    crowdLevel: 2,
    description: 'Gaudí-designed modernisme building.',
    estTime: 75,
    lat: 41.3917,
    lng: 2.1649,
    gridX: 3,
    gridY: 2,
    bestVisitTime: 'After 1pm',
    aiSuggestion: 'Excellent alternative to Sagrada Família; currently ~22% capacity.',
  },
  {
    id: 'bcn-7',
    name: 'Montjuïc Castle',
    category: 'Heritage',
    crowdLevel: 1,
    description: 'Military fortress with panoramic views.',
    estTime: 110,
    lat: 41.3639,
    lng: 2.1666,
    gridX: 1,
    gridY: 6,
    bestVisitTime: 'Anytime today',
    aiSuggestion: 'Low footfall right now — a peaceful alternative to busy core sites.',
    isCommunityPartner: true,
  },
  {
    id: 'bcn-8',
    name: 'Barceloneta Beach',
    category: 'Nature',
    crowdLevel: 3,
    description: 'Iconic city beach and promenade.',
    estTime: 90,
    lat: 41.3784,
    lng: 2.1925,
    gridX: 4,
    gridY: 6,
    bestVisitTime: 'Early morning',
    aiSuggestion: 'Moderate crowds — good window before evening cruise rush.',
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

/** 
 * Heuristic Routing Engine for SolaceRouteAI prototype.
 * Optimizes based on crowd levels, interests, and distance.
 */
export function generateSmartItinerary(prefs: TripPreferences): ItineraryItem[] {
  // 1. Filter by interests
  let available = mockAttractions.filter((a) =>
    prefs.interests.includes(a.category)
  );
  
  // If no interests match, fallback to all (better for prototype UX)
  if (available.length === 0) available = [...mockAttractions];

  // 2. Sort by crowd level (lowest first) 
  const sorted = available.sort((a, b) => a.crowdLevel - b.crowdLevel);

  // 3. Select top 4 for the day
  const selected = sorted.slice(0, 4);

  // 4. Assign time slots
  const items: ItineraryItem[] = [];
  let currentStartTime = prefs.startTime;

  selected.forEach((attr, idx) => {
    const [hours, mins] = currentStartTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, mins, 0);

    const endDate = new Date(startDate.getTime() + attr.estTime * 60000);
    const endTimeStr = `${String(endDate.getHours()).padStart(2, '0')}:${String(
      endDate.getMinutes()
    ).padStart(2, '0')}`;

    items.push({
      id: `itn-${idx}`,
      attractionId: attr.id,
      startTime: currentStartTime,
      endTime: endTimeStr,
      order: idx + 1,
    });

    // Add 30 min buffer for travel/rest
    const nextStart = new Date(endDate.getTime() + 30 * 60000);
    currentStartTime = `${String(nextStart.getHours()).padStart(2, '0')}:${String(
      nextStart.getMinutes()
    ).padStart(2, '0')}`;
  });

  return items;
}

export const mockItinerary: ItineraryItem[] = [
  {
    id: 'itl1',
    attractionId: 'bcn-3',
    startTime: '09:00',
    endTime: '10:30',
    order: 1,
  },
  {
    id: 'itl2',
    attractionId: 'bcn-5',
    startTime: '11:00',
    endTime: '12:00',
    order: 2,
  },
  {
    id: 'itl3',
    attractionId: 'bcn-7',
    startTime: '13:00',
    endTime: '15:00',
    order: 3,
  },
  {
    id: 'itl4',
    attractionId: 'bcn-6',
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

