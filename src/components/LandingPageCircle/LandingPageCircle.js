import React from "react";
import styles from "./LandingPageCircle.module.css";
import batmanDre from "../../image/batmanDre.jpeg";

// Ellipse path for animateMotion: traces full ellipse rx=68, ry=22
// Going through four cardinal points clockwise
const ELLIPSE_PATH = "M68,0 A68,22,0,0,1,0,22 A68,22,0,0,1,-68,0 A68,22,0,0,1,0,-22 A68,22,0,0,1,68,0";

function LandingPageCircle() {
  return (
    <div className={styles.circleWrapper}>
      {/* SVG orbital rings drawn around the photo */}
      <svg
        className={styles.orbitals}
        viewBox="-80 -80 160 160"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-purple" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glow-green" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Orbital 1 — equatorial plane, cyan, 5s */}
        <g transform="rotate(0)">
          <ellipse cx="0" cy="0" rx="68" ry="22"
            fill="none" stroke="#00d4ff" strokeWidth="0.8" strokeOpacity="0.45" />
          <circle r="3.5" fill="#00d4ff" filter="url(#glow-cyan)">
            <animateMotion dur="5s" repeatCount="indefinite" path={ELLIPSE_PATH} />
          </circle>
        </g>

        {/* Orbital 2 — tilted 60°, purple, 8s */}
        <g transform="rotate(60)">
          <ellipse cx="0" cy="0" rx="68" ry="22"
            fill="none" stroke="#7b2fff" strokeWidth="0.8" strokeOpacity="0.45" />
          <circle r="3" fill="#7b2fff" filter="url(#glow-purple)">
            <animateMotion dur="8s" repeatCount="indefinite" path={ELLIPSE_PATH} />
          </circle>
        </g>

        {/* Orbital 3 — tilted 120°, green, 13s */}
        <g transform="rotate(120)">
          <ellipse cx="0" cy="0" rx="68" ry="22"
            fill="none" stroke="#00ff88" strokeWidth="0.7" strokeOpacity="0.35" />
          <circle r="2.5" fill="#00ff88" filter="url(#glow-green)">
            <animateMotion dur="13s" repeatCount="indefinite" path={ELLIPSE_PATH} />
          </circle>
        </g>
      </svg>

      {/* Photo */}
      <div className={styles.circle}>
        <img className={styles.circleImage} src={batmanDre} alt="Andre in a batman mask" />
      </div>
    </div>
  );
}

export default LandingPageCircle;
