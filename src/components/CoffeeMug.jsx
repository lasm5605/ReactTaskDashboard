import "./CoffeeMug.css";

// A small animated coffee mug with steam rising out of it.
// `size` is the width/height in pixels (default 44).
export default function CoffeeMug({ size = 44 }) {
  return (
    <svg
      className="coffee-mug"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Steaming cup of coffee"
    >
      {/* Steam: three wavy lines that float up and fade out */}
      <g className="coffee-mug__steam">
        <path className="wisp wisp--1" d="M15 18 q-3 -3 0 -6 q3 -3 0 -6" />
        <path className="wisp wisp--2" d="M21 18 q-3 -3 0 -6 q3 -3 0 -6" />
        <path className="wisp wisp--3" d="M27 18 q-3 -3 0 -6 q3 -3 0 -6" />
      </g>

      {/* Handle */}
      <path
        className="coffee-mug__handle"
        d="M33 25 h3 a5 5 0 0 1 0 10 h-3"
      />

      {/* Mug body */}
      <path
        className="coffee-mug__body"
        d="M9 21 h24 v14 a7 7 0 0 1 -7 7 h-10 a7 7 0 0 1 -7 -7 z"
      />

      {/* Coffee surface */}
      <ellipse className="coffee-mug__coffee" cx="21" cy="21" rx="12" ry="2.2" />

      {/* Little check mark on the mug, to match the TO DO TA DA logo */}
      <path className="coffee-mug__check" d="M17 31 l3 3 l6 -6" />
    </svg>
  );
}