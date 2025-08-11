import React from "react";
import "./Hero3D.css";

export default function Hero3D() {
  return (
    <div className="hero-3d-wrapper" aria-hidden="true">
      {/* Isometric / 3D-like SVG stack representing a resume/app */}
      <svg
        className="hero-3d-svg"
        width="560"
        height="360"
        viewBox="0 0 560 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="#2563eb" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0" stopColor="#06b6d4" />
            <stop offset="1" stopColor="#60a5fa" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#0b1220" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* ground plane */}
        <rect x="20" y="260" width="520" height="60" rx="8" fill="#0f1724" opacity="0.04" />

        {/* stack / isometric papers */}
        <g transform="translate(140,40) rotate(-12)">
          {/* bottom plate */}
          <rect x="0" y="120" rx="12" width="280" height="120" fill="#0f1724" opacity="0.03" />

          {/* card 1 (back) */}
          <g className="card card-back" filter="url(#shadow)">
            <rect x="8" y="0" rx="12" width="264" height="96" fill="url(#g2)" />
            <rect x="24" y="18" rx="6" width="220" height="18" fill="#ffffff" opacity="0.12" />
            <rect x="24" y="42" rx="6" width="170" height="12" fill="#ffffff" opacity="0.10" />
            <circle cx="40" cy="74" r="6" fill="#ffffff" opacity="0.12" />
            <rect x="56" y="70" width="150" height="8" rx="4" fill="#ffffff" opacity="0.10" />
          </g>

          {/* card 2 (middle) */}
          <g className="card card-mid" transform="translate(-6,-12)" filter="url(#shadow)">
            <rect x="8" y="0" rx="12" width="264" height="96" fill="#fff" />
            <rect x="20" y="14" rx="6" width="140" height="14" fill="#f3f4f6" />
            <rect x="20" y="36" rx="4" width="210" height="10" fill="#e6eefc" />
            <rect x="20" y="50" rx="4" width="180" height="10" fill="#eef2ff" />
            <rect x="20" y="68" rx="4" width="100" height="10" fill="#e6eefc" />
            {/* small badge */}
            <rect x="194" y="14" rx="6" width="62" height="22" fill="url(#g1)" />
            <text x="224" y="30" fontSize="11" textAnchor="middle" fill="#fff" fontFamily="Inter, Arial">CSE</text>
          </g>

          {/* card 3 (front) */}
          <g className="card card-front" transform="translate(-12,-24)" filter="url(#shadow)">
            <rect x="8" y="0" rx="12" width="264" height="96" fill="#fff" />
            {/* name bar */}
            <rect x="20" y="14" rx="6" width="170" height="14" fill="#0f1724" opacity="0.06" />
            <rect x="20" y="36" rx="4" width="230" height="10" fill="#f3f4f6" />
            <rect x="20" y="52" rx="4" width="120" height="10" fill="#eef2ff" />
            <rect x="20" y="72" rx="4" width="90" height="8" fill="#f3f4f6" />
            {/* keywords cluster */}
            <g transform="translate(192,32)">
              <rect x="0" y="0" width="56" height="16" rx="8" fill="#fef3c7" />
              <rect x="0" y="22" width="42" height="12" rx="6" fill="#ede9fe" />
            </g>
          </g>

          {/* small 3D accent cube */}
          <g transform="translate(280,90) rotate(-24)">
            <polygon points="0,0 26,-10 26,10 0,20" fill="#111827" opacity="0.06"/>
            <polygon points="26,-10 52,0 26,10" fill="url(#g1)" />
            <polygon points="0,0 26,10 26,30 0,20" fill="url(#g2)" opacity="0.92"/>
          </g>
        </g>

        {/* subtle glow */}
        <ellipse cx="300" cy="310" rx="160" ry="18" fill="#60a5fa" opacity="0.04" />
      </svg>
    </div>
  );
}
