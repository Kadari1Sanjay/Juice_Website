export type ScreenId = 'our-vibe-and-sourcing' | 'shop-juices' | 'build-a-box' | 'flavor-quiz' | 'drop-lab';

export interface JuiceProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'cognitive' | 'immune' | 'metabolic' | 'recovery' | 'detox';
  price: number;
  brix: string;
  psi: string;
  thermalExposure: string;
  actives: string;
  colorHex: string;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  ingredients: string[];
  tasteNotes: string;
  farmOrigin: string;
  nutrition: {
    calories: number;
    sugars: string;
    vitaminC: string;
    enzymesActive: string;
  };
  image: string;
}

export interface CartItem {
  product: JuiceProduct;
  quantity: number;
}

export interface FarmLocation {
  id: string;
  name: string;
  region: string;
  description: string;
  brix: string;
  tag1: string;
  tag2: string;
  coordinates: string;
  bgImage: string;
  batchNumber: string;
  statusText: string;
  accentColor: string;
  pinIcon: string;
}

export interface QuizAnswerState {
  goal: string;
  flavor: string;
  timing: string;
  sensitivity: string;
}
