import { useState } from "react";
import { motion } from "framer-motion";
import { marketplaceListings, categoryIcons, walletData, type MarketplaceListing } from "@/data/mockData";
import { Search, ShoppingBag } from "lucide-react";
import { MarketplaceListingCard } from "@/components/marketplace/MarketplaceListingCard";
import { PurchaseDialog } from "@/components/marketplace/PurchaseDialog";

const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } };
const categories = ["All", "Gym", "BJJ / Martial Arts", "Dance", "Wellness & Spa", "Yoga"];
const catKeys: Record<string, string> = { All: "", Gym: "gym", "BJJ / Martial Arts": "bjj", Dance: "dance", "Wellness & Spa": "wellness", Yoga: "yoga" };
const sourceFilters = ["All", "Direct from venue", "Resale"] as const;
type SourceFilter = typeof sourceFilters[number];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("All");
  const [selectedListing, setSelectedListing] = useState<MarketplaceListing | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(walletData.balance);
  const [purchasedIds, setPurchasedIds] = useState<Set<string>>(new Set());

  const filtered = marketplaceListings.filter((l) => {
    if (purchasedIds.has(l.id)) return false;
    const matchCat = activeCategory === "All" || l.category === catKeys[activeCategory];
    const matchSearch = l.venue.toLowerCase().includes(searchQuery.toLowerCase()) || l.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSource = sourceFilter === "All" || (sourceFilter === "Direct from venue" ? l.source === 'venue' : l.source === 'resale');
    return matchCat && matchSearch && matchSource;
  });

  const handleBuy = (listing: MarketplaceListing) => {
    setSelectedListing(listing);
    setDialogOpen(true);
  };

  const handlePurchaseComplete = (listing: MarketplaceListing, walletUsed: number) => {
    setWalletBalance((prev) => Math.max(0, prev - walletUsed));
    setPurchasedIds((prev) => new Set(prev).add(listing.id));
  };

  return (
    <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }} className="space-y-6 max-w-7xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-extrabold font-display text-foreground">Marketplace</h1>
        <p className="text-sm text-muted-foreground mt-1">Discover discounted memberships and access passes.</p>
      </motion.div>

      {/* Filter bar */}
      <motion.div variants={item} className="rounded-2xl bg-card shadow-card p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search venues, activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-xl px-4 py-2 text-xs font-bold font-display transition-all ${
                activeCategory === cat
                  ? 'gradient-hero text-primary-foreground shadow-glow-indigo'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {sourceFilters.map((sf) => (
            <button
              key={sf}
              onClick={() => setSourceFilter(sf)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                sourceFilter === sf
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {sf}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((listing) => (
          <MarketplaceListingCard key={listing.id} listing={listing} onBuy={handleBuy} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <motion.div variants={item} className="flex flex-col items-center py-16 text-center">
          <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-bold font-display text-foreground">No Listings Found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search query.</p>
        </motion.div>
      )}

      {/* Purchase dialog */}
      <PurchaseDialog
        listing={selectedListing}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        walletBalance={walletBalance}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </motion.div>
  );
}
