import { useEffect, useRef } from "react";
import { isOpeningSoon } from "/helpers/locations";

/* Location picker used by the hero BOOK A TABLE / ORDER NOW buttons.
   `urlKey` decides which ACF field is the destination, so one component
   covers both flows — locations without that field are dropped, which is
   also how WordPress switches a venue off (clear the url). */
export default function LocationPickerModal({
  open,
  onClose,
  title,
  subtitle,
  ctaLabel,
  locations = [],
  urlKey,
  fallbackKey,
}) {
  const dialogRef = useRef(null);

  /* Booking falls back to dimmi_url: venues that are not open yet only have
     that field filled, and they still need to show as OPENING SOON. */
  const urlOf = (l) => (l.acf[urlKey] || (fallbackKey && l.acf[fallbackKey]) || "").trim();

  const venues = locations.filter((l) => l?.acf?.is_active && urlOf(l));

  /* Grouped by state so all WA venues sit together, then NSW, then VIC.
     Anything with an unexpected state code falls to the end under its own
     heading rather than disappearing. */
  const regionOrder = ["WA", "NSW", "VIC"];
  const regionNames = {
    WA: "Western Australia",
    NSW: "New South Wales",
    VIC: "Victoria",
  };

  const regions = venues.reduce((acc, l) => {
    const state = (l.acf.address_state || "Other").toUpperCase();
    (acc[state] = acc[state] || []).push(l);
    return acc;
  }, {});

  const orderedRegions = Object.keys(regions).sort(
    (a, b) =>
      (regionOrder.indexOf(a) + 1 || 99) - (regionOrder.indexOf(b) + 1 || 99)
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);

    // ponytail: plain overflow lock, no scroll-position restore library
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="loc-modal"
      role="presentation"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="loc-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          type="button"
          className="loc-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="loc-modal__title">{title}</h2>
        {subtitle && <p className="loc-modal__subtitle">{subtitle}</p>}

        {venues.length === 0 ? (
          <p className="loc-modal__subtitle">
            No locations available right now. Please try again shortly.
          </p>
        ) : (
          orderedRegions.map((state) => (
            <div className="loc-modal__region" key={state}>
              <h3 className="loc-modal__region-name">
                {regionNames[state] || state}
              </h3>

              <div className="loc-modal__grid">
                {regions[state].map((location) => {
                  const soon = isOpeningSoon(urlOf(location));

                  const body = (
                    <>
                      <span className="loc-card__name">
                        {location.post_title}
                      </span>
                      <span className="loc-card__place">
                        {[location.acf.address_suburb, location.acf.address_state]
                          .filter(Boolean)
                          /* most venues are named after their suburb — no point
                             printing "EAST PERTH / EAST PERTH, WA" */
                          .filter(
                            (part) =>
                              part.toLowerCase() !==
                              location.post_title.toLowerCase()
                          )
                          .join(", ")}
                      </span>
                      <span className="loc-card__cta">
                        {soon ? "OPENING SOON" : `${ctaLabel} →`}
                      </span>
                    </>
                  );

                  return soon ? (
                    <div
                      key={location.post_name}
                      className="loc-card loc-card--soon"
                      aria-disabled="true"
                    >
                      {body}
                    </div>
                  ) : (
                    <a
                      key={location.post_name}
                      className="loc-card"
                      href={urlOf(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {body}
                    </a>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
