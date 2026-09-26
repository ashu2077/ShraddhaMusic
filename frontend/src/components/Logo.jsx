/**
 * Placeholder wordmark lockup. The handoff's real asset
 * (assets/shraddha-lockup.png, "logo_temp") wasn't included in this
 * upload — swap this component for an <img> once the final vector logo
 * arrives from the client.
 */
export default function Logo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 260 64"
      role="img"
      aria-label="Shraddha's Music Academy"
      height="100%"
    >
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={i * 8} y="10" width="6.5" height="30" rx="1.5" fill="#d6a63b" />
        ))}
      </g>
      <text x="52" y="30" fontFamily="Montserrat, sans-serif" fontWeight="800" fontSize="20" fill="#fff">
        Shraddha's
      </text>
      <text x="52" y="49" fontFamily="Montserrat, sans-serif" fontWeight="600" fontSize="13" letterSpacing="1" fill="#d6a63b">
        MUSIC ACADEMY
      </text>
    </svg>
  );
}
