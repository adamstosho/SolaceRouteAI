export type CrowdAccuracy = 'spot_on' | 'slightly_off' | 'very_wrong';

export const ENJOYMENT_OPTIONS = [
  'No queues',
  'Discovered something new',
  'Easy navigation',
  'Felt safe',
] as const;

export interface TripFeedback {
  satisfaction: number;
  comment: string;
  wouldRecommend: boolean;
  crowdAccuracy: CrowdAccuracy | null;
  enjoymentTags: string[];
  skipped?: boolean;
}
