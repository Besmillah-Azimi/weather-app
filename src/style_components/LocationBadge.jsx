export default function LocationBadge({
  width = 600,
  height = 140,
  size,
  label = "Your text here",
  className = "fixed top-0 left-0 z-50",
}) {
  const finalWidth = size ? size : width;
  const finalHeight = size ? size * (height / width) : height;

  // Usage :
  // <LocationBadge width={200} height={50} label="Quetta, Pakistan" />

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 140"
      width={finalWidth}
      height={finalHeight}
      className={className}
    >
      {/* Outer pill */}
      <rect
        x="120"
        y="20"
        width="450"
        height="100"
        rx="30"
        fill="#b8860b"
        stroke="#b8860b"
        strokeWidth="6"
      />

      {/* TEXT inside pill */}
      <text
        x="345" // horizontal center of pill (120 + 450/2)
        y="78" // vertical center (approx)
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="36"
        fontFamily="Arial, sans-serif"
        fill="#d60000"
        fontWeight="600"
      >
        {label}
      </text>

      {/* Location circle badge */}
      <circle
        cx="100"
        cy="70"
        r="65"
        fill="#fff"
        stroke="#d60000"
        strokeWidth="6"
      />
      <circle cx="100" cy="70" r="50" fill="#e70000" />

      {/* Location pin centered at the circle */}
      <g transform="translate(100,60)">
        {/* Pin shape is drawn centered around 0,0 */}
        <path
          d="
      M0 -25
      C13 -25 25 -13 25 0
      C25 12 10 30 0 45
      C-10 30 -25 12 -25 0
      C-25 -13 -13 -25 0 -25Z
    "
          fill="#fff"
        />

        {/* Pin inner hole */}
        <circle cx="0" cy="-8" r="7" fill="#e70000" />
      </g>
    </svg>
  );
}
