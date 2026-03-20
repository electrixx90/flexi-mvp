import { motion } from "framer-motion";
import { MapPin, Clock, ShieldCheck, Ticket, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NearbyListing, categoryIcons, categoryLabels } from "@/data/nearbyListings";
import { Link } from "react-router-dom";

interface Props {
  listing: NearbyListing;
  selected: boolean;
  onSelect: () => void;
}

export function NearbyListingCard({ listing, selected, onSelect }: Props) {
  const savings = listing.originalPrice - listing.price;
  const savingsPercent = Math.round((savings / listing.originalPrice) * 100);

  return (
    <motion.div
      layout
      onClick={onSelect}
      className={`rounded-2xl bg-card p-4 shadow-card cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-elevated ${
        selected ? 'ring-2 ring-primary shadow-glow-indigo' : ''
      }`}
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${listing.imageGradient} flex items-center justify-center text-xl shrink-0`}>
          {categoryIcons[listing.category]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-bold font-display text-[15px] text-foreground truncate">{listing.venueName}</p>
              <p className="text-[13px] text-muted-foreground truncate">{categoryLabels[listing.category]} · {listing.passType}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {listing.source === 'venue' ? (
                <Badge variant="default" className="text-[10px] gap-0.5 px-1.5 py-0">
                  <Building2 className="h-2.5 w-2.5" /> Direct
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  Resale
                </Badge>
              )}
              {listing.highlight && (
                <Badge
                  variant={listing.highlight === 'hot-deal' ? 'default' : listing.highlight === 'ending-soon' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {listing.highlight === 'hot-deal' ? '🔥 Hot' : listing.highlight === 'ending-soon' ? '⏰ Soon' : '✨ New'}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 shrink-0" /> {listing.distance} km
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 shrink-0" /> {listing.validUntil}
            </span>
            {listing.remainingEntries && (
              <span className="flex items-center gap-1">
                <Ticket className="h-3.5 w-3.5 shrink-0" /> {listing.remainingEntries} entries
              </span>
            )}
            {listing.verified && (
              <span className="flex items-center gap-1 text-accent">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" /> Verified
              </span>
            )}
          </div>

          <div className="flex items-end justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold font-display text-primary">€{listing.price}</span>
              <span className="text-xs text-muted-foreground line-through">€{listing.originalPrice}</span>
              <span className="text-xs font-bold text-accent">-{savingsPercent}%</span>
            </div>
            <Button size="sm" variant="default" className="h-8 text-[13px] shrink-0" asChild>
              <Link to="/marketplace">View pass</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
