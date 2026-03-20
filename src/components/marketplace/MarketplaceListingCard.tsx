import { motion } from "framer-motion";
import { Clock, MapPin, ShoppingBag, ShieldCheck, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type MarketplaceListing, categoryIcons } from "@/data/mockData";

import gymImg from "@/assets/category-gym.jpg";
import bjjImg from "@/assets/category-bjj.jpg";
import danceImg from "@/assets/category-dance.jpg";
import wellnessImg from "@/assets/category-wellness.jpg";
import yogaImg from "@/assets/category-yoga.jpg";

const categoryImages: Record<string, string> = {
  gym: gymImg,
  bjj: bjjImg,
  dance: danceImg,
  wellness: wellnessImg,
  yoga: yogaImg,
};

interface Props {
  listing: MarketplaceListing;
  onBuy?: (listing: MarketplaceListing) => void;
}

export function MarketplaceListingCard({ listing, onBuy }: Props) {
  const isUrgent = listing.remainingDays <= 14;
  const isCritical = listing.remainingDays <= 7;

  const urgencyColor = isCritical
    ? "bg-destructive text-destructive-foreground"
    : isUrgent
      ? "bg-amber-500 text-white"
      : "bg-muted text-muted-foreground";

  const urgencyLabel = isCritical
    ? `${listing.remainingDays}d left — Expiring!`
    : isUrgent
      ? `${listing.remainingDays}d left`
      : `${listing.remainingDays} days left`;

  const discountPercent = Math.round(
    ((listing.originalPrice - listing.resalePrice) / listing.originalPrice) * 100
  );

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="rounded-2xl bg-card shadow-card overflow-hidden group cursor-pointer flex flex-col"
    >
      {/* Hero image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={categoryImages[listing.category] || gymImg}
          alt={`${listing.venue} — ${listing.type}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Category badge top-left */}
        <span className="absolute top-3 left-3 text-xs font-bold bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
          {categoryIcons[listing.category] || "🎯"} {listing.type}
        </span>

        {/* Source badge top-right area (below wishlist) */}
        <span className={`absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${
          listing.source === 'venue'
            ? 'bg-primary/90 text-primary-foreground'
            : 'bg-card/90 backdrop-blur-sm text-muted-foreground'
        }`}>
          {listing.source === 'venue' ? 'Direct' : 'Resale'}
        </span>

        {/* Wishlist / save top-right */}
        <button className="absolute top-3 right-3 h-8 w-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:bg-card transition-colors">
          <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Discount badge bottom-left on image */}
        {discountPercent >= 20 && (
          <span className="absolute bottom-3 left-3 text-xs font-extrabold bg-accent text-accent-foreground px-2.5 py-1 rounded-full shadow-sm">
            −{discountPercent}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title & location */}
        <h3 className="font-bold font-display text-[15px] text-foreground leading-snug">
          {listing.venue}
        </h3>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {listing.location}
        </p>

        {/* Price block */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-xl font-extrabold font-display text-primary">
            €{listing.resalePrice}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            €{listing.originalPrice}
          </span>
          <span className="text-xs font-bold text-accent ml-auto">
            Save €{listing.savings}
          </span>
        </div>

        {/* Urgency / time remaining */}
        <div className="mt-3 flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${urgencyColor}`}
          >
            <Clock className="h-3 w-3" />
            {urgencyLabel}
          </span>
          {listing.remainingEntries !== undefined && listing.totalEntries !== undefined && (
            <span className="text-xs text-muted-foreground font-medium">
              {listing.remainingEntries}/{listing.totalEntries} entries
            </span>
          )}
        </div>

        {/* Time progress bar for urgent items */}
        {isUrgent && (
          <div className="mt-2 h-1.5 rounded-full bg-border overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isCritical ? "bg-destructive" : "bg-amber-500"
              }`}
              style={{
                width: `${Math.max(5, Math.min(100, (listing.remainingDays / 90) * 100))}%`,
              }}
            />
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1 min-h-3" />

        {/* Seller section */}
        <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-border">
          <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
            listing.source === 'venue' ? 'bg-primary/10' : 'bg-muted'
          }`}>
            {listing.source === 'venue'
              ? <Building2 className="h-4 w-4 text-primary" />
              : <User className="h-4 w-4 text-muted-foreground" />
            }
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">
              {listing.sellerName}
            </p>
            {listing.source === 'venue' ? (
              <p className="text-xs text-primary flex items-center gap-0.5 font-medium">
                <Building2 className="h-3 w-3" /> Official venue
              </p>
            ) : listing.sellerVerified ? (
              <p className="text-xs text-accent flex items-center gap-0.5 font-medium">
                <ShieldCheck className="h-3 w-3" /> Verified seller
              </p>
            ) : null}
          </div>
          <div className="text-right shrink-0">
            <p className="text-xs text-muted-foreground">Rating</p>
            <p className="text-xs font-bold text-foreground">
              ★ {listing.sellerRating}
            </p>
          </div>
        </div>

        {/* CTA */}
        <Button variant="hero" size="sm" className="w-full mt-4" onClick={() => onBuy?.(listing)}>
          <ShoppingBag className="h-3.5 w-3.5" /> Buy Now
        </Button>
      </div>
    </motion.div>
  );
}
