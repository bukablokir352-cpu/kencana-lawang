import React from 'react';

interface KencanaEmblemProps {
  className?: string;
  size?: number;
}

export const KencanaEmblem: React.FC<KencanaEmblemProps> = ({ 
  className = "w-20 h-20", 
  size = 80 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Emblem Gerakan Kecamatan Tangguh Bencana"
    >
      <defs>
        {/* Curved path for top text "K E N C A N A" */}
        <path
          id="topTextPath"
          d="M 28 100 A 72 72 0 0 1 172 100"
          fill="none"
        />
        {/* Curved path for bottom text "KECAMATAN TANGGUH BENCANA" */}
        <path
          id="bottomTextPath"
          d="M 172 100 A 72 72 0 0 1 28 100"
          fill="none"
        />
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>
      </defs>

      {/* Outer green ring */}
      <circle cx="100" cy="100" r="94" stroke="#15803d" strokeWidth="4" fill="#ffffff" />
      <circle cx="100" cy="100" r="86" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      
      {/* Top Arc Text */}
      <text fill="#15803d" fontSize="13" fontWeight="900" letterSpacing="4.5">
        <textPath href="#topTextPath" startOffset="50%" textAnchor="middle">
          K E N C A N A
        </textPath>
      </text>

      {/* Stars on Left & Right */}
      <text x="24" y="103" fill="#15803d" fontSize="12" textAnchor="middle">★</text>
      <text x="176" y="103" fill="#15803d" fontSize="12" textAnchor="middle">★</text>

      {/* Bottom Arc Text */}
      <text fill="#15803d" fontSize="8.5" fontWeight="800" letterSpacing="1.2">
        <textPath href="#bottomTextPath" startOffset="50%" textAnchor="middle">
          KECAMATAN TANGGUH BENCANA
        </textPath>
      </text>

      {/* Inner Ring */}
      <circle cx="100" cy="100" r="62" stroke="#15803d" strokeWidth="2.5" fill="#fefce8" />

      {/* 8-Point Star / Petal Sunburst Pattern */}
      <g transform="translate(100, 100)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
          <g key={idx} transform={`rotate(${angle})`}>
            {/* Outer Diamond Tip */}
            <polygon 
              points="0,-56 12,-36 0,-24 -12,-36" 
              fill={idx % 2 === 0 ? "url(#goldGradient)" : "url(#orangeGradient)"} 
              stroke="#b45309"
              strokeWidth="0.8"
            />
            {/* Inner Ray */}
            <line x1="0" y1="-24" x2="0" y2="-52" stroke="#ffffff" strokeWidth="1" opacity="0.8" />
          </g>
        ))}

        {/* Central Circular Badge */}
        <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="#d97706" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="24" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />

        {/* Bold Letter K in Center */}
        <text 
          x="0" 
          y="9" 
          fill="#b45309" 
          fontSize="26" 
          fontWeight="900" 
          fontFamily="system-ui, sans-serif" 
          textAnchor="middle"
        >
          K
        </text>
      </g>
    </svg>
  );
};
