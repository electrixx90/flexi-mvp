import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NearbyListing, categoryIcons } from "@/data/nearbyListings";

interface Props {
  listings: NearbyListing[];
  userPos: [number, number];
  center: [number, number];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onPurchase: (listing: NearbyListing) => void;
  onMoveEnd: () => void;
}

/** Round coords to group co-located listings */
const locationKey = (lat: number, lng: number) =>
  `${lat.toFixed(5)}_${lng.toFixed(5)}`;

/** Pin colors by source */
const pinColors = {
  venue: { bg: 'hsl(239 84% 67%)', border: 'hsl(239 84% 67%)', selectedBg: 'hsl(239 84% 50%)' },
  resale: { bg: 'white', border: 'hsl(172 66% 50%)', selectedBg: 'hsl(172 66% 50%)' },
};

/** Single-listing pin — different border color for venue vs resale */
const createPinIcon = (category: string, source: 'venue' | 'resale', selected: boolean) => {
  const emoji = categoryIcons[category] || '📍';
  const colors = pinColors[source];
  const size = selected ? 44 : 36;
  return L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="
      width:${size}px;height:${size}px;
      display:flex;align-items:center;justify-content:center;
      border-radius:50%;
      background:${selected ? colors.selectedBg : colors.bg};
      border:3px solid ${colors.border};
      box-shadow:0 4px 12px rgba(0,0,0,0.15);
      font-size:${selected ? 20 : 16}px;
      transition:all 0.2s;
      cursor:pointer;
    ">${emoji}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

/** Cluster pin — mixed sources get dual-tone, otherwise source color */
const createClusterIcon = (count: number, sources: Set<string>, selected: boolean) => {
  const size = selected ? 48 : 42;
  const hasVenue = sources.has('venue');
  const hasResale = sources.has('resale');
  const borderColor = hasVenue && hasResale
    ? 'hsl(239 84% 67%)'
    : hasVenue ? 'hsl(239 84% 67%)' : 'hsl(172 66% 50%)';
  const dotColor = hasVenue ? 'hsl(239 84% 67%)' : 'hsl(172 66% 50%)';
  return L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="
      width:${size}px;height:${size}px;
      display:flex;align-items:center;justify-content:center;
      border-radius:50%;
      background:${selected ? 'hsl(239 84% 67%)' : 'white'};
      border:3px solid ${borderColor};
      box-shadow:0 4px 12px rgba(0,0,0,0.15);
      transition:all 0.2s;
      cursor:pointer;
      position:relative;
    ">
      <span style="
        font-size:13px;font-weight:800;
        color:${selected ? 'white' : 'hsl(239 84% 67%)'};
        font-family:'Plus Jakarta Sans',Inter,system-ui,sans-serif;
      ">${count}</span>
      <span style="
        position:absolute;top:-4px;right:-4px;
        width:18px;height:18px;
        border-radius:50%;
        background:${dotColor};
        color:white;
        font-size:9px;font-weight:800;
        display:flex;align-items:center;justify-content:center;
        border:2px solid white;
        box-shadow:0 2px 6px rgba(0,0,0,0.15);
      ">●</span>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const userIcon = L.divIcon({
  className: 'user-location-pin',
  html: `<div style="
    width:20px;height:20px;
    border-radius:50%;
    background:hsl(239 84% 67%);
    border:4px solid white;
    box-shadow:0 0 0 2px hsl(239 84% 67% / 0.3), 0 2px 8px rgba(0,0,0,0.2);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

function buildSinglePopup(listing: NearbyListing): string {
  const savings = listing.originalPrice - listing.price;
  const savingsPercent = Math.round((savings / listing.originalPrice) * 100);

  const highlightBadge = listing.highlight === 'hot-deal'
    ? '<span style="background:hsl(239 84% 67%);color:white;font-size:10px;font-weight:700;padding:2px 6px;border-radius:6px">🔥 Hot Deal</span>'
    : listing.highlight === 'ending-soon'
      ? '<span style="background:hsl(0 84% 60%);color:white;font-size:10px;font-weight:700;padding:2px 6px;border-radius:6px">⏳ Ending Soon</span>'
      : listing.highlight === 'new'
        ? '<span style="background:hsl(172 66% 50%);color:hsl(222 47% 11%);font-size:10px;font-weight:700;padding:2px 6px;border-radius:6px">✨ New</span>'
        : '';

  const sourceBadge = listing.source === 'venue'
    ? '<span style="background:hsl(239 84% 67%);color:white;font-size:9px;font-weight:700;padding:2px 6px;border-radius:6px">🏢 Direct</span>'
    : '<span style="background:hsl(214 32% 91%);color:hsl(215 20% 40%);font-size:9px;font-weight:700;padding:2px 6px;border-radius:6px">Resale</span>';

  const entriesInfo = listing.remainingEntries
    ? `<span style="font-size:11px;color:#64748b">${listing.remainingEntries} entries left</span>`
    : '';

  return `
    <div data-listing-id="${listing.id}" style="min-width:220px;max-width:260px;font-family:'Plus Jakarta Sans',Inter,system-ui,sans-serif;padding:4px 0;cursor:pointer">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
        <span style="font-size:18px">${categoryIcons[listing.category] || '📍'}</span>
        <div style="flex:1;min-width:0">
          <p style="margin:0;font-weight:800;font-size:14px;color:hsl(222 47% 11%);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${listing.venueName}</p>
          <p style="margin:0;font-size:11px;color:#94a3b8">${listing.location}</p>
        </div>
      </div>
      <div style="display:flex;gap:4px;margin-bottom:8px">${sourceBadge} ${highlightBadge}</div>
      <p style="margin:0 0 6px;font-size:12px;color:#64748b">${listing.passType} · ${listing.distance} km away</p>
      <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:6px">
        <span style="font-weight:800;font-size:18px;color:hsl(239 84% 67%)">€${listing.price}</span>
        <span style="font-size:12px;color:#94a3b8;text-decoration:line-through">€${listing.originalPrice}</span>
      </div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
        <span style="background:hsl(172 66% 50% / 0.12);color:hsl(172 66% 40%);font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px">−${savingsPercent}% · Save €${savings}</span>
        ${entriesInfo}
      </div>
      <div style="display:flex;align-items:center;gap:6px;padding-top:6px;border-top:1px solid hsl(214 32% 91%)">
        <span style="font-size:11px;color:#64748b">★ ${listing.sellerRating}</span>
        ${listing.verified ? '<span style="font-size:10px;font-weight:600;color:hsl(172 66% 50%)">✓ Verified</span>' : ''}
        <span style="margin-left:auto;font-size:11px;color:#94a3b8">Valid until ${listing.validUntil}</span>
      </div>
      <div style="margin-top:8px;padding-top:8px;border-top:1px solid hsl(214 32% 91%);font-size:11px;font-weight:700;color:hsl(239 84% 67%);text-align:center">
        Click to review and purchase
      </div>
    </div>
  `;
}

function buildClusterPopup(group: NearbyListing[]): string {
  const items = group.map((listing, i) => {
    const savings = listing.originalPrice - listing.price;
    const savingsPercent = Math.round((savings / listing.originalPrice) * 100);

    const highlightBadge = listing.highlight === 'hot-deal'
      ? '<span style="background:hsl(239 84% 67%);color:white;font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px">🔥 Hot</span>'
      : listing.highlight === 'ending-soon'
        ? '<span style="background:hsl(0 84% 60%);color:white;font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px">⏳ Soon</span>'
        : listing.highlight === 'new'
          ? '<span style="background:hsl(172 66% 50%);color:hsl(222 47% 11%);font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px">✨ New</span>'
          : '';

    const srcBadge = listing.source === 'venue'
      ? '<span style="background:hsl(239 84% 67%);color:white;font-size:8px;font-weight:700;padding:1px 4px;border-radius:4px">Direct</span>'
      : '<span style="background:hsl(214 32% 91%);color:hsl(215 20% 40%);font-size:8px;font-weight:700;padding:1px 4px;border-radius:4px">Resale</span>';

    return `
      <div data-listing-id="${listing.id}" style="
        padding:10px;
        ${i < group.length - 1 ? 'border-bottom:1px solid hsl(214 32% 91%);' : ''}
        cursor:pointer;
        transition:background 0.15s;
      " onmouseover="this.style.background='hsl(214 32% 91% / 0.4)'" onmouseout="this.style.background='transparent'">
        <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px">
          <span style="font-size:14px">${categoryIcons[listing.category] || '📍'}</span>
          <p style="margin:0;font-weight:700;font-size:13px;color:hsl(222 47% 11%);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${listing.passType}</p>
          ${srcBadge}
          ${highlightBadge}
        </div>
        <div style="display:flex;align-items:baseline;gap:6px">
          <span style="font-weight:800;font-size:16px;color:hsl(239 84% 67%)">€${listing.price}</span>
          <span style="font-size:11px;color:#94a3b8;text-decoration:line-through">€${listing.originalPrice}</span>
          <span style="margin-left:auto;background:hsl(172 66% 50% / 0.12);color:hsl(172 66% 40%);font-size:10px;font-weight:700;padding:1px 6px;border-radius:4px">−${savingsPercent}%</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;margin-top:4px">
          <span style="font-size:10px;color:#64748b">★ ${listing.sellerRating}</span>
          ${listing.verified ? '<span style="font-size:9px;font-weight:600;color:hsl(172 66% 50%)">✓ Verified</span>' : ''}
          ${listing.remainingEntries ? `<span style="font-size:10px;color:#64748b">${listing.remainingEntries} entries</span>` : ''}
          <span style="margin-left:auto;font-size:10px;color:#94a3b8">${listing.validUntil}</span>
        </div>
      </div>
    `;
  }).join('');

  const venueName = group[0].venueName;
  const location = group[0].location;

  return `
    <div style="min-width:260px;max-width:300px;font-family:'Plus Jakarta Sans',Inter,system-ui,sans-serif">
      <div style="padding:10px 10px 8px;border-bottom:1px solid hsl(214 32% 91%)">
        <div style="display:flex;align-items:center;gap:6px">
          <span style="font-size:16px">${categoryIcons[group[0].category] || '📍'}</span>
          <div>
            <p style="margin:0;font-weight:800;font-size:14px;color:hsl(222 47% 11%)">${venueName}</p>
            <p style="margin:0;font-size:11px;color:#94a3b8">${location}</p>
          </div>
        </div>
        <p style="margin:6px 0 0;font-size:11px;font-weight:600;color:hsl(239 84% 67%)">${group.length} membership${group.length > 1 ? 's' : ''} available</p>
      </div>
      <div style="max-height:220px;overflow-y:auto">
        ${items}
      </div>
    </div>
  `;
}

export function NearbyMembershipMap({ listings, userPos, center, selectedId, onSelect, onPurchase, onMoveEnd }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const userMarkerRef = useRef<L.Marker | null>(null);
  const prevCenterRef = useRef(center);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png").addTo(map);
    map.on('moveend', onMoveEnd);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fly to center when it changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (prevCenterRef.current[0] !== center[0] || prevCenterRef.current[1] !== center[1]) {
      map.flyTo(center, 13, { duration: 1 });
      prevCenterRef.current = center;
    }
  }, [center]);

  // User marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (userMarkerRef.current) userMarkerRef.current.remove();
    const marker = L.marker(userPos, { icon: userIcon })
      .addTo(map)
      .bindPopup('<p style="margin:0;font-weight:600;font-size:13px">📍 You are here</p>');
    userMarkerRef.current = marker;
  }, [userPos]);

  // Listing markers — grouped by location
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current.clear();

    // Group listings by location
    const groups = new Map<string, NearbyListing[]>();
    listings.forEach(listing => {
      const key = locationKey(listing.latitude, listing.longitude);
      const group = groups.get(key) || [];
      group.push(listing);
      groups.set(key, group);
    });

    groups.forEach((group) => {
      const first = group[0];
      const isCluster = group.length > 1;
      const groupIds = group.map(l => l.id);
      const isSelected = selectedId !== null && groupIds.includes(selectedId);

      const icon = isCluster
        ? createClusterIcon(group.length, new Set(group.map(l => l.source)), isSelected)
        : createPinIcon(first.category, first.source, isSelected);

      const popupContent = isCluster
        ? buildClusterPopup(group)
        : buildSinglePopup(first);

      const marker = L.marker([first.latitude, first.longitude], { icon }).addTo(map);

      marker.bindPopup(popupContent, {
        closeButton: true,
        className: 'flexi-map-popup',
        maxWidth: 320,
        offset: [0, -8],
      });

      marker.on('click', () => {
        onSelect(first.id);
      });

      marker.on('popupopen', () => {
        const popupElement = marker.getPopup()?.getElement();
        if (!popupElement) return;

        popupElement.querySelectorAll<HTMLElement>('[data-listing-id]').forEach((element) => {
          element.onclick = (event) => {
            event.preventDefault();
            event.stopPropagation();

            const listingId = element.dataset.listingId;
            const clickedListing = group.find((listing) => listing.id === listingId);
            if (!clickedListing) return;

            onSelect(clickedListing.id);
            onPurchase(clickedListing);
          };
        });
      });

      if (isSelected) {
        marker.openPopup();
      }

      // Store marker for all IDs in the group
      groupIds.forEach(id => markersRef.current.set(id, marker));
    });
  }, [listings, selectedId, onPurchase, onSelect]);

  return <div ref={containerRef} className="h-full w-full" />;
}
