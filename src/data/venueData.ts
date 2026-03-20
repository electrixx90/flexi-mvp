// ── Venue Business Mock Data ──

export interface VenueInfo {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  amenities: string[];
  highlights: string[];
  gallery: string[];
  openingHours: { day: string; hours: string }[];
}

export interface VenueMembership {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'time-based' | 'entries';
  durationDays?: number;
  durationLabel?: string;
  totalEntries?: number;
  price: number;
  discountedPrice?: number;
  status: 'active' | 'draft' | 'inactive';
  resaleEligible: boolean;
  visibility: 'published' | 'hidden';
  soldCount: number;
  activeCustomers: number;
  totalRevenue: number;
  resaleCount: number;
  createdAt: string;
}

export interface VenueSale {
  id: string;
  membershipTitle: string;
  customerName: string;
  type: 'primary' | 'resale';
  amount: number;
  venueFee: number;
  platformFee: number;
  sellerName?: string;
  buyerName?: string;
  date: string;
  status: 'completed' | 'pending' | 'refunded';
}

export interface AccessEvent {
  id: string;
  memberName: string;
  passTitle: string;
  passId: string;
  timestamp: string;
  method: 'qr-scan' | 'manual' | 'nfc';
  result: 'valid' | 'expired' | 'already-used' | 'blocked' | 'rejected';
  remainingEntries?: number;
  remainingDays?: number;
  expiresAt: string;
}

export interface DailyMetric {
  date: string;
  checkIns: number;
  membershipsSold: number;
  primaryRevenue: number;
  resaleRevenue: number;
  royalties: number;
}

// ── Venue profile ──
export const venueInfo: VenueInfo = {
  id: 'v1',
  name: 'Iron Temple Gym',
  logo: '🏋️',
  coverImage: '/placeholder.svg',
  shortDescription: 'Premium fitness & strength training in the heart of Milan.',
  longDescription: 'Iron Temple Gym is a state-of-the-art fitness facility located in Porta Venezia, Milano. We offer world-class equipment, expert trainers, and a motivating community environment. Our 800sqm space features free weights, machines, functional training zones, recovery areas, and a members-only lounge.',
  category: 'gym',
  location: 'Porta Venezia, Milano',
  address: 'Via Lecco 18, 20124 Milano MI',
  phone: '+39 02 8765 4321',
  email: 'info@irontemple.it',
  website: 'www.irontemple.it',
  amenities: ['Free Weights', 'Cardio Zone', 'Functional Area', 'Sauna', 'Showers', 'Lockers', 'Parking', 'WiFi', 'Recovery Room', 'Smoothie Bar'],
  highlights: ['Open 6am–11pm', '800sqm facility', 'Expert trainers', 'Members lounge'],
  gallery: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  openingHours: [
    { day: 'Mon–Fri', hours: '06:00 – 23:00' },
    { day: 'Saturday', hours: '07:00 – 21:00' },
    { day: 'Sunday', hours: '08:00 – 20:00' },
  ],
};

// ── Memberships ──
export const venueMemberships: VenueMembership[] = [
  {
    id: 'vm1', title: 'Annual Unlimited', description: 'Full access for 12 months, no limits.', category: 'gym',
    type: 'time-based', durationDays: 365, durationLabel: '12 months', price: 960, discountedPrice: 840,
    status: 'active', resaleEligible: true, visibility: 'published',
    soldCount: 142, activeCustomers: 98, totalRevenue: 136320, resaleCount: 18, createdAt: '2024-06-01',
  },
  {
    id: 'vm2', title: 'Monthly Pass', description: 'Flexible monthly access, cancel anytime.', category: 'gym',
    type: 'time-based', durationDays: 30, durationLabel: '1 month', price: 89,
    status: 'active', resaleEligible: true, visibility: 'published',
    soldCount: 310, activeCustomers: 185, totalRevenue: 27590, resaleCount: 5, createdAt: '2024-06-01',
  },
  {
    id: 'vm3', title: '10-Session Pack', description: 'Flexible 10 entries valid for 6 months.', category: 'gym',
    type: 'entries', totalEntries: 10, price: 250, discountedPrice: 220,
    status: 'active', resaleEligible: true, visibility: 'published',
    soldCount: 87, activeCustomers: 34, totalRevenue: 21750, resaleCount: 12, createdAt: '2024-09-01',
  },
  {
    id: 'vm4', title: 'Student Quarterly', description: '3-month pass for students with valid ID.', category: 'gym',
    type: 'time-based', durationDays: 90, durationLabel: '3 months', price: 180,
    status: 'active', resaleEligible: false, visibility: 'published',
    soldCount: 56, activeCustomers: 41, totalRevenue: 10080, resaleCount: 0, createdAt: '2025-01-01',
  },
  {
    id: 'vm5', title: 'Weekend Warrior', description: 'Access on weekends only.', category: 'gym',
    type: 'time-based', durationDays: 30, durationLabel: '1 month', price: 49,
    status: 'draft', resaleEligible: false, visibility: 'hidden',
    soldCount: 0, activeCustomers: 0, totalRevenue: 0, resaleCount: 0, createdAt: '2026-03-10',
  },
  {
    id: 'vm6', title: 'Summer Promo 2025', description: 'Special summer 2-month pass.', category: 'gym',
    type: 'time-based', durationDays: 60, durationLabel: '2 months', price: 140, discountedPrice: 99,
    status: 'inactive', resaleEligible: true, visibility: 'hidden',
    soldCount: 64, activeCustomers: 0, totalRevenue: 6336, resaleCount: 3, createdAt: '2025-06-01',
  },
];

// ── Sales ──
export const venueSales: VenueSale[] = [
  { id: 's1', membershipTitle: 'Annual Unlimited', customerName: 'Marco Rossi', type: 'primary', amount: 960, venueFee: 0, platformFee: 48, date: '2026-03-16', status: 'completed' },
  { id: 's2', membershipTitle: 'Monthly Pass', customerName: 'Giulia Bianchi', type: 'primary', amount: 89, venueFee: 0, platformFee: 4.45, date: '2026-03-16', status: 'completed' },
  { id: 's3', membershipTitle: 'Annual Unlimited', customerName: 'Luca Verdi', type: 'resale', amount: 640, venueFee: 32, platformFee: 32, sellerName: 'Anna Neri', buyerName: 'Luca Verdi', date: '2026-03-15', status: 'completed' },
  { id: 's4', membershipTitle: '10-Session Pack', customerName: 'Sara Ferrari', type: 'primary', amount: 220, venueFee: 0, platformFee: 11, date: '2026-03-15', status: 'completed' },
  { id: 's5', membershipTitle: 'Monthly Pass', customerName: 'Paolo Conti', type: 'resale', amount: 52, venueFee: 2.60, platformFee: 2.60, sellerName: 'Elena Rizzo', buyerName: 'Paolo Conti', date: '2026-03-14', status: 'completed' },
  { id: 's6', membershipTitle: 'Student Quarterly', customerName: 'Marta Colombo', type: 'primary', amount: 180, venueFee: 0, platformFee: 9, date: '2026-03-14', status: 'completed' },
  { id: 's7', membershipTitle: 'Annual Unlimited', customerName: 'Davide Moretti', type: 'resale', amount: 580, venueFee: 29, platformFee: 29, sellerName: 'Chiara Galli', buyerName: 'Davide Moretti', date: '2026-03-13', status: 'pending' },
  { id: 's8', membershipTitle: '10-Session Pack', customerName: 'Francesca Russo', type: 'resale', amount: 150, venueFee: 7.50, platformFee: 7.50, sellerName: 'Marco Rossi', buyerName: 'Francesca Russo', date: '2026-03-12', status: 'completed' },
  { id: 's9', membershipTitle: 'Monthly Pass', customerName: 'Andrea Ricci', type: 'primary', amount: 89, venueFee: 0, platformFee: 4.45, date: '2026-03-12', status: 'completed' },
  { id: 's10', membershipTitle: 'Annual Unlimited', customerName: 'Sofia Lombardi', type: 'primary', amount: 840, venueFee: 0, platformFee: 42, date: '2026-03-11', status: 'completed' },
  { id: 's11', membershipTitle: 'Monthly Pass', customerName: 'Tommaso Greco', type: 'resale', amount: 60, venueFee: 3, platformFee: 3, sellerName: 'Giulia Bianchi', buyerName: 'Tommaso Greco', date: '2026-03-10', status: 'completed' },
  { id: 's12', membershipTitle: '10-Session Pack', customerName: 'Valentina Costa', type: 'primary', amount: 250, venueFee: 0, platformFee: 12.50, date: '2026-03-09', status: 'refunded' },
];

// ── Access events ──
export const accessEvents: AccessEvent[] = [
  { id: 'a1', memberName: 'Marco Rossi', passTitle: 'Annual Unlimited', passId: 'NFT-1A2B', timestamp: '2026-03-17T08:15:00', method: 'qr-scan', result: 'valid', remainingDays: 168, expiresAt: '2026-08-31' },
  { id: 'a2', memberName: 'Giulia Bianchi', passTitle: 'Monthly Pass', passId: 'NFT-3C4D', timestamp: '2026-03-17T08:32:00', method: 'qr-scan', result: 'valid', remainingDays: 14, expiresAt: '2026-03-31' },
  { id: 'a3', memberName: 'Sara Ferrari', passTitle: '10-Session Pack', passId: 'NFT-5E6F', timestamp: '2026-03-17T09:05:00', method: 'manual', result: 'valid', remainingEntries: 8, expiresAt: '2026-09-01' },
  { id: 'a4', memberName: 'Luca Verdi', passTitle: 'Annual Unlimited', passId: 'NFT-7G8H', timestamp: '2026-03-17T09:18:00', method: 'qr-scan', result: 'valid', remainingDays: 168, expiresAt: '2026-08-31' },
  { id: 'a5', memberName: 'Elena Rizzo', passTitle: 'Monthly Pass', passId: 'NFT-9I0J', timestamp: '2026-03-17T09:45:00', method: 'qr-scan', result: 'expired', remainingDays: 0, expiresAt: '2026-02-28' },
  { id: 'a6', memberName: 'Paolo Conti', passTitle: 'Monthly Pass', passId: 'NFT-K1L2', timestamp: '2026-03-17T10:02:00', method: 'nfc', result: 'valid', remainingDays: 14, expiresAt: '2026-03-31' },
  { id: 'a7', memberName: 'Francesca Russo', passTitle: '10-Session Pack', passId: 'NFT-M3N4', timestamp: '2026-03-17T10:30:00', method: 'qr-scan', result: 'already-used', remainingEntries: 0, expiresAt: '2026-06-15' },
  { id: 'a8', memberName: 'Andrea Ricci', passTitle: 'Monthly Pass', passId: 'NFT-O5P6', timestamp: '2026-03-17T11:15:00', method: 'manual', result: 'valid', remainingDays: 14, expiresAt: '2026-03-31' },
  { id: 'a9', memberName: 'Marta Colombo', passTitle: 'Student Quarterly', passId: 'NFT-Q7R8', timestamp: '2026-03-16T17:40:00', method: 'qr-scan', result: 'valid', remainingDays: 77, expiresAt: '2026-06-01' },
  { id: 'a10', memberName: 'Davide Moretti', passTitle: 'Annual Unlimited', passId: 'NFT-S9T0', timestamp: '2026-03-16T18:05:00', method: 'qr-scan', result: 'blocked', remainingDays: 168, expiresAt: '2026-08-31' },
  { id: 'a11', memberName: 'Sofia Lombardi', passTitle: 'Annual Unlimited', passId: 'NFT-U1V2', timestamp: '2026-03-16T07:50:00', method: 'nfc', result: 'valid', remainingDays: 168, expiresAt: '2026-08-31' },
  { id: 'a12', memberName: 'Tommaso Greco', passTitle: 'Monthly Pass', passId: 'NFT-W3X4', timestamp: '2026-03-16T08:20:00', method: 'qr-scan', result: 'valid', remainingDays: 14, expiresAt: '2026-03-31' },
  { id: 'a13', memberName: 'Marco Rossi', passTitle: 'Annual Unlimited', passId: 'NFT-1A2B', timestamp: '2026-03-15T08:10:00', method: 'qr-scan', result: 'valid', remainingDays: 169, expiresAt: '2026-08-31' },
  { id: 'a14', memberName: 'Valentina Costa', passTitle: '10-Session Pack', passId: 'NFT-Y5Z6', timestamp: '2026-03-15T14:30:00', method: 'manual', result: 'rejected', remainingEntries: 0, expiresAt: '2026-05-01' },
];

// ── Daily metrics (last 30 days) ──
export const dailyMetrics: DailyMetric[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date('2026-03-17');
  d.setDate(d.getDate() - (29 - i));
  const isWeekend = d.getDay() === 0 || d.getDay() === 6;
  const base = isWeekend ? 35 : 55;
  return {
    date: d.toISOString().split('T')[0],
    checkIns: base + Math.floor(Math.random() * 20),
    membershipsSold: Math.floor(Math.random() * 6) + (isWeekend ? 1 : 2),
    primaryRevenue: Math.floor(Math.random() * 800) + 200,
    resaleRevenue: Math.floor(Math.random() * 200) + 20,
    royalties: Math.floor(Math.random() * 50) + 5,
  };
});

// ── KPI summary ──
export const venueKPIs = {
  todayCheckIns: 42,
  todaySales: 5,
  activeResales: 12,
  pendingValidations: 3,
  activeMemberships: 358,
  activeListings: 18,
  totalRevenuePrimary: 202076,
  totalRevenueResale: 8420,
  totalRoyalties: 1245,
  topSelling: 'Annual Unlimited',
};
