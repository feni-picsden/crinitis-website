// ponytail: Google My Maps embed — keyless, no billing, all pins in one map.
// Pins are maintained at https://www.google.com/mymaps (map id below), not from WordPress.
// Swap back to the Maps JavaScript API only if pins need to sync with the location API.
const MY_MAPS_ID = "18K_rYuMyJbord_6mps3kxtyCNei7jis";

// My Maps has no option to hide its title/author bar, so the iframe is grown by
// HEADER_H and pulled up by the same amount; the wrapper clips the bar off.
const HEADER_H = 72;
const MAP_H = 500;

export default function LocationsMap() {
  return (
    <div style={{ height: MAP_H, overflow: "hidden", position: "relative" }}>
      <iframe
        src={`https://www.google.com/maps/d/embed?mid=${MY_MAPS_ID}&ll=-28.5%2C138.0&z=4`}
        width="100%"
        height={MAP_H + HEADER_H}
        style={{ border: 0, position: "absolute", top: -HEADER_H }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Criniti's locations"
      />
    </div>
  );
}
