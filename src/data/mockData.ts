export interface Membership {
  id: string;
  venue: string;
  type: string;
  category: 'gym' | 'bjj' | 'dance' | 'wellness' | 'yoga';
  status: 'active' | 'partially-used' | 'listed' | 'sold' | 'expired';
  originalPrice: number;
  residualValue: number;
  startDate: string;
  endDate: string;
  remainingDays: number;
  totalDays: number;
  remainingEntries?: number;
  totalEntries?: number;
  resellEligible: boolean;
  imageGradient: string;
  location: string;
}

export interface MarketplaceListing {
  id: string;
  venue: string;
  type: string;
  category: string;
  source: 'venue' | 'resale';
  originalPrice: number;
  resalePrice: number;
  savings: number;
  remainingDays: number;
  remainingEntries?: number;
  totalEntries?: number;
  sellerRating: number;
  sellerName: string;
  sellerVerified: boolean;
  location: string;
  imageGradient: string;
  urgent: boolean;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'payout' | 'royalty';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'processing';
  venue?: string;
}

export const memberships: Membership[] = [
  {
    id: '1',
    venue: 'Iron Temple Gym',
    type: 'Annual Unlimited',
    category: 'gym',
    status: 'active',
    originalPrice: 960,
    residualValue: 640,
    startDate: '2025-09-01',
    endDate: '2026-08-31',
    remainingDays: 168,
    totalDays: 365,
    resellEligible: true,
    imageGradient: 'from-indigo to-primary',
    location: 'Porta Venezia, Milano',
  },
  {
    id: '2',
    venue: 'Gracie Barra Academy',
    type: '10-Class Pack',
    category: 'bjj',
    status: 'partially-used',
    originalPrice: 250,
    residualValue: 150,
    startDate: '2026-01-15',
    endDate: '2026-07-15',
    remainingDays: 121,
    totalDays: 181,
    remainingEntries: 6,
    totalEntries: 10,
    resellEligible: true,
    imageGradient: 'from-accent to-mint',
    location: 'Monza, MI',
  },
  {
    id: '3',
    venue: 'Flow Dance Studio',
    type: 'Monthly Unlimited',
    category: 'dance',
    status: 'active',
    originalPrice: 89,
    residualValue: 52,
    startDate: '2026-03-01',
    endDate: '2026-03-31',
    remainingDays: 15,
    totalDays: 31,
    resellEligible: true,
    imageGradient: 'from-pink-500 to-indigo',
    location: 'Navigli, Milano',
  },
  {
    id: '4',
    venue: 'Zen Wellness Spa',
    type: '5-Visit Pass',
    category: 'wellness',
    status: 'listed',
    originalPrice: 200,
    residualValue: 120,
    startDate: '2025-12-01',
    endDate: '2026-06-01',
    remainingDays: 77,
    totalDays: 183,
    remainingEntries: 3,
    totalEntries: 5,
    resellEligible: true,
    imageGradient: 'from-emerald-400 to-accent',
    location: 'Bergamo, BG',
  },
  {
    id: '5',
    venue: 'Sunrise Yoga Lab',
    type: 'Quarterly Pass',
    category: 'yoga',
    status: 'active',
    originalPrice: 320,
    residualValue: 195,
    startDate: '2026-01-01',
    endDate: '2026-03-31',
    remainingDays: 15,
    totalDays: 90,
    resellEligible: false,
    imageGradient: 'from-amber-400 to-orange-500',
    location: 'Isola, Milano',
  },
];

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: 'm1',
    venue: 'CrossFit Box Central',
    type: '3-Month Unlimited',
    category: 'gym',
    source: 'resale',
    originalPrice: 450,
    resalePrice: 280,
    savings: 170,
    remainingDays: 62,
    sellerRating: 4.8,
    sellerName: 'Marco T.',
    sellerVerified: true,
    location: 'Sempione, Milano',
    imageGradient: 'from-indigo to-primary',
    urgent: false,
  },
  {
    id: 'm2',
    venue: 'Alliance BJJ',
    type: '8-Class Pack',
    category: 'bjj',
    source: 'resale',
    originalPrice: 200,
    resalePrice: 110,
    savings: 90,
    remainingDays: 12,
    remainingEntries: 8,
    totalEntries: 10,
    sellerRating: 4.9,
    sellerName: 'Lena K.',
    sellerVerified: true,
    location: 'Monza, MI',
    imageGradient: 'from-accent to-emerald-500',
    urgent: true,
  },
  {
    id: 'm3',
    venue: 'Rhythm & Flow',
    type: 'Monthly Dance Pass',
    category: 'dance',
    source: 'resale',
    originalPrice: 95,
    resalePrice: 55,
    savings: 40,
    remainingDays: 22,
    sellerRating: 4.7,
    sellerName: 'Sofia M.',
    sellerVerified: false,
    location: 'Bergamo, BG',
    imageGradient: 'from-pink-500 to-violet-500',
    urgent: false,
  },
  {
    id: 'm4',
    venue: 'Deep Relax Spa',
    type: '4-Visit Wellness',
    category: 'wellness',
    source: 'venue',
    originalPrice: 180,
    resalePrice: 95,
    savings: 85,
    remainingDays: 90,
    remainingEntries: 4,
    totalEntries: 5,
    sellerRating: 5.0,
    sellerName: 'Deep Relax Spa',
    sellerVerified: true,
    location: 'Porta Venezia, Milano',
    imageGradient: 'from-emerald-400 to-teal-500',
    urgent: false,
  },
  {
    id: 'm5',
    venue: 'Power Gym Elite',
    type: '6-Month Membership',
    category: 'gym',
    source: 'resale',
    originalPrice: 540,
    resalePrice: 320,
    savings: 220,
    remainingDays: 8,
    sellerRating: 4.6,
    sellerName: 'Jonas R.',
    sellerVerified: true,
    location: 'Pavia, PV',
    imageGradient: 'from-secondary to-indigo',
    urgent: true,
  },
  {
    id: 'm6',
    venue: 'Mindful Yoga',
    type: '20-Class Pack',
    category: 'yoga',
    source: 'venue',
    originalPrice: 300,
    resalePrice: 165,
    savings: 135,
    remainingDays: 120,
    remainingEntries: 14,
    totalEntries: 20,
    sellerRating: 4.8,
    sellerName: 'Mindful Yoga',
    sellerVerified: true,
    location: 'Lodi, LO',
    imageGradient: 'from-amber-400 to-orange-400',
    urgent: false,
  },
];

export const transactions: Transaction[] = [
  { id: 't1', type: 'purchase', description: 'Iron Temple Gym — Annual Unlimited', amount: -960, date: '2025-09-01', status: 'completed', venue: 'Iron Temple Gym' },
  { id: 't2', type: 'sale', description: 'FitZone 3-Month Pass sold', amount: 185, date: '2026-02-18', status: 'completed', venue: 'FitZone' },
  { id: 't3', type: 'payout', description: 'Payout to bank account', amount: 172.05, date: '2026-02-20', status: 'completed' },
  { id: 't4', type: 'purchase', description: 'Gracie Barra Academy — 10-Class Pack', amount: -250, date: '2026-01-15', status: 'completed', venue: 'Gracie Barra Academy' },
  { id: 't5', type: 'royalty', description: 'Venue royalty — FitZone', amount: -9.25, date: '2026-02-18', status: 'completed', venue: 'FitZone' },
  { id: 't6', type: 'sale', description: 'Zen Wellness Spa listing active', amount: 95, date: '2026-03-10', status: 'pending', venue: 'Zen Wellness Spa' },
  { id: 't7', type: 'purchase', description: 'Flow Dance Studio — Monthly', amount: -89, date: '2026-03-01', status: 'completed', venue: 'Flow Dance Studio' },
];

export const walletData = {
  balance: 257.05,
  pendingPayout: 95,
  totalEarned: 357.05,
  totalSpent: 1299,
  paymentMethod: 'Visa •••• 4829',
  recentPayouts: [
    { id: 'p1', amount: 172.05, date: '2026-02-20', status: 'completed' as const },
    { id: 'p2', amount: 85.00, date: '2026-01-28', status: 'completed' as const },
  ],
};

export const categoryIcons: Record<string, string> = {
  gym: '🏋️',
  bjj: '🥋',
  dance: '💃',
  wellness: '🧖',
  yoga: '🧘',
};

export const categoryLabels: Record<string, string> = {
  gym: 'Gym',
  bjj: 'BJJ / Martial Arts',
  dance: 'Dance',
  wellness: 'Wellness & Spa',
  yoga: 'Yoga',
};
