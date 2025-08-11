import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./ScoreMeter.css";

function getGradientColor(score) {
  if (score >= 70) {
    return `url(#gradHigh)`;
  } else if (score >= 40) {
    return `url(#gradMid)`;
  } else {
    return `url(#gradLow)`;
  }
}

export default function ScoreMeter({ score }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animateText, setAnimateText] = useState(false);

  useEffect(() => {
    let start = 0;
    const step = score / 30;
    const timer = setInterval(() => {
      start += step;
      if (start >= score) {
        start = score;
        clearInterval(timer);
      }
      setAnimatedScore(Math.round(start));
      setAnimateText(true);
      setTimeout(() => setAnimateText(false), 500); // Reset animation
    }, 20);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="meter-container">
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="gradHigh" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f260" />
            <stop offset="100%" stopColor="#0575e6" />
          </linearGradient>
          <linearGradient id="gradMid" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="gradLow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>

      <CircularProgressbar
        value={animatedScore}
        text="" // hide default text
        styles={buildStyles({
          textSize: "18px",
          pathColor: getGradientColor(animatedScore),
          textColor: "#111827",
          trailColor: "#e5e7eb",
        })}
      />

      {/* Animated score text overlay */}
      <div className={`meter-score ${animateText ? "pulse" : ""}`}>
        {animatedScore}%
      </div>
    </div>
  );
}
