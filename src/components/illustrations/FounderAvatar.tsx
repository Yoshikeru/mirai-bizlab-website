/**
 * Stylized portrait illustration for the founder.
 * Pure SVG (no external dependencies), styled to fit MIRAI BizLab's accent palette.
 */
export function FounderAvatar({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 360"
      role="img"
      aria-label="Illustration of the founder"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="founder-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCE6E8" />
          <stop offset="100%" stopColor="#F4E5E6" />
        </linearGradient>
        <radialGradient id="founder-bg-glow" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F4E5E6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="skin-tone" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE2C9" />
          <stop offset="100%" stopColor="#F4C9A8" />
        </linearGradient>
        <linearGradient id="hair" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A2120" />
          <stop offset="100%" stopColor="#141010" />
        </linearGradient>
        <linearGradient id="suit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#23272F" />
          <stop offset="100%" stopColor="#15181E" />
        </linearGradient>
        <linearGradient id="shirt-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E6E6E6" />
        </linearGradient>
        <clipPath id="circle-mask">
          <circle cx="160" cy="160" r="148" />
        </clipPath>
      </defs>

      {/* Background disc */}
      <circle cx="160" cy="160" r="152" fill="url(#founder-bg)" />
      <circle cx="160" cy="160" r="148" fill="url(#founder-bg-glow)" />
      <circle
        cx="160"
        cy="160"
        r="148"
        fill="none"
        stroke="#D7000F"
        strokeOpacity="0.18"
        strokeWidth="2"
      />

      {/* Clipped portrait */}
      <g clipPath="url(#circle-mask)">
        {/* Suit shoulders / torso */}
        <path
          d="M 60 360
             L 60 280
             C 70 252 95 238 120 230
             L 142 224
             L 160 246
             L 178 224
             L 200 230
             C 225 238 250 252 260 280
             L 260 360 Z"
          fill="url(#suit)"
        />
        {/* Shirt collar V */}
        <path
          d="M 142 224
             L 160 246
             L 178 224
             L 178 258
             L 160 290
             L 142 258 Z"
          fill="url(#shirt-shadow)"
        />
        {/* Suit lapels */}
        <path
          d="M 120 230 L 158 268 L 160 246 L 142 224 Z"
          fill="#1A1D24"
        />
        <path
          d="M 200 230 L 162 268 L 160 246 L 178 224 Z"
          fill="#1A1D24"
        />
        {/* Tie */}
        <path
          d="M 156 246 L 152 274 L 160 296 L 168 274 L 164 246 Z"
          fill="#D7000F"
        />
        <path
          d="M 156 246 L 160 252 L 164 246 Z"
          fill="#A1000B"
        />

        {/* Neck */}
        <path
          d="M 142 208 L 142 232 C 148 240 158 244 160 244 C 162 244 172 240 178 232 L 178 208 Z"
          fill="url(#skin-tone)"
        />
        <path
          d="M 142 218 C 152 226 168 226 178 218 L 178 232 C 168 240 152 240 142 232 Z"
          fill="#D8A581"
          fillOpacity="0.5"
        />

        {/* Head — gentle oval */}
        <ellipse
          cx="160"
          cy="158"
          rx="56"
          ry="66"
          fill="url(#skin-tone)"
        />

        {/* Hair — back layer + side, swept-up modern style */}
        <path
          d="M 104 142
             C 100 110 122 86 152 80
             C 184 72 214 86 218 122
             C 220 138 218 154 214 164
             C 210 152 200 144 188 142
             C 194 130 192 116 180 112
             C 168 108 148 110 134 122
             C 124 130 116 140 114 154
             C 110 152 106 148 104 142 Z"
          fill="url(#hair)"
        />
        {/* Hair fringe accent */}
        <path
          d="M 138 112
             C 150 100 178 100 192 116
             C 188 110 178 104 160 104
             C 152 104 144 108 138 112 Z"
          fill="#3A2F2E"
        />

        {/* Ears */}
        <ellipse cx="106" cy="170" rx="6" ry="11" fill="url(#skin-tone)" />
        <ellipse cx="214" cy="170" rx="6" ry="11" fill="url(#skin-tone)" />
        <circle cx="106" cy="172" r="2" fill="#D8A581" opacity="0.55" />
        <circle cx="214" cy="172" r="2" fill="#D8A581" opacity="0.55" />

        {/* Eyebrows */}
        <path
          d="M 124 152 Q 138 144 152 152"
          stroke="#1F1614"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 168 152 Q 182 144 196 152"
          stroke="#1F1614"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes */}
        <g>
          <ellipse cx="138" cy="168" rx="6" ry="3.4" fill="#FFFFFF" />
          <ellipse cx="138" cy="168" rx="3" ry="3" fill="#1F1614" />
          <circle cx="139.2" cy="167" r="1" fill="#FFFFFF" />
        </g>
        <g>
          <ellipse cx="182" cy="168" rx="6" ry="3.4" fill="#FFFFFF" />
          <ellipse cx="182" cy="168" rx="3" ry="3" fill="#1F1614" />
          <circle cx="183.2" cy="167" r="1" fill="#FFFFFF" />
        </g>

        {/* Cheek hint */}
        <ellipse cx="124" cy="186" rx="9" ry="5" fill="#F4A698" opacity="0.4" />
        <ellipse cx="196" cy="186" rx="9" ry="5" fill="#F4A698" opacity="0.4" />

        {/* Nose */}
        <path
          d="M 160 168 Q 156 180 158 192 Q 161 196 164 192 Q 164 180 160 168"
          fill="none"
          stroke="#C9905E"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 155 196 Q 160 200 165 196"
          fill="none"
          stroke="#C9905E"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Mouth — subtle confident smile */}
        <path
          d="M 144 210 Q 160 220 176 210"
          stroke="#7A2A20"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 148 210 Q 160 216 172 210"
          fill="#C95B4A"
          opacity="0.4"
        />

        {/* Chin shadow */}
        <path
          d="M 144 214 Q 160 226 176 214 Q 168 222 160 224 Q 152 222 144 214 Z"
          fill="#E3B891"
          opacity="0.55"
        />

        {/* Jaw highlight */}
        <path
          d="M 110 184 Q 120 210 138 220"
          fill="none"
          stroke="#F6D5B7"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      {/* Outer rim ring */}
      <circle
        cx="160"
        cy="160"
        r="152"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.5"
        strokeWidth="3"
      />
    </svg>
  );
}
