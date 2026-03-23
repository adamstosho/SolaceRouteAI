'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ItineraryItem,
  TripPreferences,
  createDefaultPreferences,
} from './mockData';
import type { TripFeedback } from './tripFeedback';

function mergeFeedback(raw: unknown): TripFeedback | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Partial<TripFeedback>;
  return {
    satisfaction: typeof r.satisfaction === 'number' ? r.satisfaction : 5,
    comment: typeof r.comment === 'string' ? r.comment : '',
    wouldRecommend: r.wouldRecommend !== false,
    crowdAccuracy: r.crowdAccuracy ?? null,
    enjoymentTags: Array.isArray(r.enjoymentTags) ? r.enjoymentTags : [],
    skipped: r.skipped === true,
  };
}

function mergePreferences(raw: Partial<TripPreferences> | null): TripPreferences | null {
  if (!raw || typeof raw !== 'object') return null;
  const base = createDefaultPreferences();
  return {
    ...base,
    ...raw,
    interests:
      Array.isArray(raw.interests) && raw.interests.length > 0
        ? raw.interests
        : base.interests,
  };
}

interface TripContextType {
  preferences: TripPreferences | null;
  setPreferences: (prefs: TripPreferences) => void;
  itinerary: ItineraryItem[];
  setItinerary: (items: ItineraryItem[]) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  feedback: TripFeedback | null;
  setFeedback: (feedback: TripFeedback | null) => void;
  resetTrip: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const STORAGE_KEY = 'solaceRouteAI_trip';

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<TripPreferences | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState<TripFeedback | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPreferences(mergePreferences(data.preferences));
        setItinerary(data.itinerary);
        setCurrentStep(data.currentStep);
        setFeedback(mergeFeedback(data.feedback));
      } catch (e) {
        console.error('Failed to load trip data:', e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isHydrated) {
      const data = { preferences, itinerary, currentStep, feedback };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [preferences, itinerary, currentStep, feedback, isHydrated]);

  const resetTrip = () => {
    setPreferences(null);
    setItinerary([]);
    setCurrentStep(0);
    setFeedback(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <TripContext.Provider
      value={{
        preferences,
        setPreferences,
        itinerary,
        setItinerary,
        currentStep,
        setCurrentStep,
        feedback,
        setFeedback,
        resetTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
