import { useState, useCallback, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Search, SlidersHorizontal, X, Locate, ChevronUp, ChevronDown, Loader2, MapPinOff, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { nearbyListings, NearbyListing, categoryIcons, categoryLabels } from "@/data/nearbyListings";
import { walletData, type MarketplaceListing } from "@/data/mockData";
import { NearbyMembershipMap } from "@/components/nearby/NearbyMembershipMap";
import { NearbyListingCard } from "@/components/nearby/NearbyListingCard";
import { PurchaseDialog } from "@/components/marketplace/PurchaseDialog";

type SortOption = 'nearest' | 'best-deal' | 'newest';
type SourceFilter = 'all' | 'venue' | 'resale';
type GeoState = 'idle' | 'requesting' | 'granted' | 'denied';

const categories = ['gym', 'bjj', 'dance', 'wellness', 'yoga'] as const;

const toMarketplaceListing = (listing: NearbyListing): MarketplaceListing => {
  const validUntil = new Date(`${listing.validUntil}T23:59:59`);
  const remainingDays = Number.isNaN(validUntil.getTime())
    ? 0
    : Math.max(0, Math.ceil((validUntil.getTime() - Date.now()) / 86400000));

  return {
    id: listing.id,
    venue: listing.venueName,
    type: listing.passType,
    category: listing.category,
    source: listing.source,
    originalPrice: listing.originalPrice,
    resalePrice: listing.price,
    savings: listing.originalPrice - listing.price,
    remainingDays,
    remainingEntries: listing.remainingEntries,
    totalEntries: listing.remainingEntries,
    sellerRating: listing.sellerRating,
    sellerName: listing.source === 'venue' ? listing.venueName : 'Marketplace Seller',
    sellerVerified: listing.verified,
    location: listing.location,
    imageGradient: listing.imageGradient,
    urgent: listing.highlight === 'ending-soon',
  };
};

export default function NearbyMap() {
  const isMobile = useIsMobile();

  // Geolocation state
  const [geoState, setGeoState] = useState<GeoState>('idle');
  const [userPos, setUserPos] = useState<[number, number]>([45.4642, 9.1900]); // Milano default
  const [mapCenter, setMapCenter] = useState<[number, number]>([45.4642, 9.1900]);
  const [mapMoved, setMapMoved] = useState(false);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(5);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('nearest');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');

  // Selection
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(walletData.balance);
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set());

  // Mobile bottom sheet
  const [sheetExpanded, setSheetExpanded] = useState(false);

  // Loading sim
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(() => {
    setGeoState('requesting');
    if (!navigator.geolocation) {
      setGeoState('denied');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(coords);
        setMapCenter(coords);
        setGeoState('granted');
      },
      () => setGeoState('denied'),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  // Auto-request on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const recenter = useCallback(() => {
    setMapCenter([...userPos]);
    setMapMoved(false);
  }, [userPos]);

  const searchThisArea = useCallback(() => {
    setLoading(true);
    setMapMoved(false);
    setTimeout(() => setLoading(false), 800);
  }, []);

  // Active filter chips
  const activeFilters = useMemo(() => {
    const chips: { label: string; clear: () => void }[] = [];
    selectedCategories.forEach(c => chips.push({
      label: categoryLabels[c] || c,
      clear: () => setSelectedCategories(prev => prev.filter(x => x !== c)),
    }));
    if (verifiedOnly) chips.push({ label: 'Verified only', clear: () => setVerifiedOnly(false) });
    if (maxDistance < 5) chips.push({ label: `≤${maxDistance} km`, clear: () => setMaxDistance(5) });
    if (priceRange[0] > 0 || priceRange[1] < 600) chips.push({
      label: `€${priceRange[0]}–€${priceRange[1]}`,
      clear: () => setPriceRange([0, 600]),
    });
    return chips;
  }, [selectedCategories, verifiedOnly, maxDistance, priceRange]);

  // Filtered listings
  const filtered = useMemo(() => {
    let list = [...nearbyListings];
    list = list.filter((listing) => !purchasedIds.has(listing.id));
    if (selectedCategories.length) list = list.filter(l => selectedCategories.includes(l.category));
    if (verifiedOnly) list = list.filter(l => l.verified);
    if (sourceFilter !== 'all') list = list.filter(l => l.source === sourceFilter);
    list = list.filter(l => l.distance <= maxDistance);
    list = list.filter(l => l.price >= priceRange[0] && l.price <= priceRange[1]);
    if (sortBy === 'nearest') list.sort((a, b) => a.distance - b.distance);
    if (sortBy === 'best-deal') list.sort((a, b) => (b.originalPrice - b.price) - (a.originalPrice - a.price));
    if (sortBy === 'newest') list.sort((a, b) => (a.highlight === 'new' ? -1 : 1));
    return list;
  }, [maxDistance, priceRange, purchasedIds, selectedCategories, sortBy, sourceFilter, verifiedOnly]);

  const handleOpenPurchase = useCallback((listing: NearbyListing) => {
    setSelectedId(listing.id);
    setSelectedListing(toMarketplaceListing(listing));
    setDialogOpen(true);
  }, []);

  const handlePurchaseComplete = useCallback((listing: MarketplaceListing, walletUsed: number) => {
    setWalletBalance((prev) => Math.max(0, prev - walletUsed));
    setPurchasedIds((prev) => new Set(prev).add(listing.id));
    setSelectedId((prev) => (prev === listing.id ? null : prev));
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="px-4 lg:px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl lg:text-2xl font-extrabold font-display text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" /> Nearby Memberships
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Discover deals around you</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'border-primary text-primary' : ''}
            >
              <SlidersHorizontal className="h-4 w-4" />
              {!isMobile && 'Filters'}
            </Button>
            <Button variant="outline" size="sm" onClick={recenter}>
              <Locate className="h-4 w-4" />
              {!isMobile && 'My location'}
            </Button>
          </div>
        </div>

        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-2xl bg-card shadow-card p-4 mb-3 space-y-4">
                {/* Categories */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Category</p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                          selectedCategories.includes(cat)
                            ? 'bg-primary text-primary-foreground shadow-glow-indigo'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {categoryIcons[cat]} {categoryLabels[cat]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {/* Distance */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Distance: ≤{maxDistance} km
                    </p>
                    <Slider
                      value={[maxDistance]}
                      onValueChange={([v]) => setMaxDistance(v)}
                      min={1}
                      max={10}
                      step={0.5}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Price: €{priceRange[0]}–€{priceRange[1]}
                    </p>
                    <Slider
                      value={priceRange}
                      onValueChange={([min, max]) => setPriceRange([min, max])}
                      min={0}
                      max={600}
                      step={10}
                    />
                  </div>

                  {/* Source */}
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Source</p>
                    <div className="flex gap-1">
                      {([['all', 'All'], ['venue', 'Direct'], ['resale', 'Resale']] as const).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setSourceFilter(key)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                            sourceFilter === key
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort + Verified */}
                  <div className="flex gap-3 items-end">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sort by</p>
                      <div className="flex gap-1">
                        {([['nearest', 'Nearest'], ['best-deal', 'Best deal'], ['newest', 'Newest']] as const).map(([key, label]) => (
                          <button
                            key={key}
                            onClick={() => setSortBy(key)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                              sortBy === key
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setVerifiedOnly(!verifiedOnly)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                        verifiedOnly
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {activeFilters.map((f, i) => (
              <Badge key={i} variant="secondary" className="gap-1 text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={f.clear}>
                {f.label} <X className="h-3 w-3" />
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className={`flex-1 min-h-0 px-4 lg:px-6 pb-4 ${isMobile ? 'relative' : 'flex gap-4'}`}>
        {/* Map */}
        <div className={`${isMobile ? 'h-full rounded-2xl overflow-hidden' : 'flex-1 rounded-2xl overflow-hidden'} relative shadow-card`}>
          {geoState === 'requesting' ? (
            <div className="absolute inset-0 bg-card flex flex-col items-center justify-center gap-3 z-10">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm font-medium text-muted-foreground">Finding your location…</p>
            </div>
          ) : (
            <NearbyMembershipMap
              listings={filtered}
              userPos={userPos}
              center={mapCenter}
              selectedId={selectedId}
              onSelect={setSelectedId}
              onPurchase={handleOpenPurchase}
              onMoveEnd={() => setMapMoved(true)}
            />
          )}

          {/* Map overlay buttons */}
          <AnimatePresence>
            {mapMoved && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]"
              >
                <Button size="sm" variant="hero" onClick={searchThisArea} className="shadow-elevated">
                  <Search className="h-4 w-4" /> Search this area
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {loading && (
            <div className="absolute inset-0 bg-card/60 backdrop-blur-sm flex items-center justify-center z-[1000]">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          )}

          {geoState === 'denied' && (
            <div className="absolute bottom-4 left-4 right-4 z-[1000]">
              <div className="rounded-xl bg-card shadow-elevated p-3 flex items-center gap-3">
                <Navigation className="h-5 w-5 text-muted-foreground shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">Location access denied</p>
                  <p className="text-xs text-muted-foreground">Showing results in Berlin. Enable location for nearby results.</p>
                </div>
                <Button size="sm" variant="outline" onClick={requestLocation}>Retry</Button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop results panel */}
        {!isMobile && (
          <div className="w-[380px] flex-shrink-0 overflow-y-auto space-y-3 pr-1">
            <p className="text-sm font-semibold text-muted-foreground">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''} nearby
            </p>
            {filtered.length === 0 ? (
              <EmptyNearbyState />
            ) : (
              filtered.map(listing => (
                <NearbyListingCard
                  key={listing.id}
                  listing={listing}
                  selected={selectedId === listing.id}
                  onSelect={() => setSelectedId(listing.id === selectedId ? null : listing.id)}
                />
              ))
            )}
          </div>
        )}

        {/* Mobile bottom sheet */}
        {isMobile && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 z-[1000] bg-card rounded-t-2xl shadow-elevated"
            animate={{ height: sheetExpanded ? '65%' : 120 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              onClick={() => setSheetExpanded(!sheetExpanded)}
              className="w-full flex flex-col items-center pt-2 pb-1"
            >
              <div className="w-10 h-1 rounded-full bg-muted mb-2" />
              <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                {sheetExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
                {filtered.length} result{filtered.length !== 1 ? 's' : ''} nearby
              </div>
            </button>
            <div className="overflow-y-auto px-4 pb-4 space-y-3" style={{ maxHeight: 'calc(100% - 48px)' }}>
              {filtered.length === 0 ? (
                <EmptyNearbyState />
              ) : (
                filtered.map(listing => (
                  <NearbyListingCard
                    key={listing.id}
                    listing={listing}
                    selected={selectedId === listing.id}
                    onSelect={() => setSelectedId(listing.id === selectedId ? null : listing.id)}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </div>

      <PurchaseDialog
        listing={selectedListing}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        walletBalance={walletBalance}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </div>
  );
}

function EmptyNearbyState() {
  return (
    <div className="rounded-2xl bg-card shadow-card p-8 flex flex-col items-center text-center">
      <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
        <MapPinOff className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="font-bold font-display text-foreground mb-1">No memberships nearby</h3>
      <p className="text-sm text-muted-foreground mb-4">Try expanding your search radius or adjusting your filters.</p>
      <Button variant="outline" size="sm">
        <Search className="h-4 w-4" /> Broaden search
      </Button>
    </div>
  );
}
