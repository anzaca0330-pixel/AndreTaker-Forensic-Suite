import React, { useState, useEffect } from "react";

interface InvestigatorAvatarProps {
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  className?: string;
  showBadge?: boolean;
}

export const ANDREA_DEFAULT_AVATAR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="%230b0e14" />
      <stop offset="50%" stop-color="%23161b22" />
      <stop offset="100%" stop-color="%230a192f" />
    </linearGradient>
    <linearGradient id="cyberNeon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="%2300ffcc" />
      <stop offset="50%" stop-color="%2358a6ff" />
      <stop offset="100%" stop-color="%23bc8cff" />
    </linearGradient>
    <linearGradient id="suitGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="%232d333b" />
      <stop offset="100%" stop-color="%231c2128" />
    </linearGradient>
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="%23ffe4d6" />
      <stop offset="100%" stop-color="%23f7cbb4" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="400" height="400" fill="url(%23bgGrad)" />

  <!-- Cyberpunk Matrix Rain Stream Lines -->
  <g opacity="0.25" font-family="monospace" font-size="10" fill="%2339d353">
    <text x="25" y="40">100101</text>
    <text x="25" y="65">E-14</text>
    <text x="25" y="90">011010</text>
    <text x="25" y="115">XREF</text>
    <text x="25" y="140">1bpc</text>

    <text x="340" y="50">SHA256</text>
    <text x="340" y="75">010011</text>
    <text x="340" y="100">DFIR</text>
    <text x="340" y="125">2BL</text>
    <text x="340" y="150">001101</text>
  </g>

  <!-- Distant Neon Cyberpunk Street Lights -->
  <circle cx="80" cy="90" r="18" fill="%2358a6ff" opacity="0.15" filter="url(%23glow)" />
  <circle cx="320" cy="110" r="22" fill="%23bc8cff" opacity="0.15" filter="url(%23glow)" />
  <rect x="70" y="75" width="20" height="60" fill="%2358a6ff" opacity="0.1" />
  <rect x="310" y="90" width="24" height="80" fill="%23f778ba" opacity="0.1" />

  <!-- Unearthed Dirt Mound at Bottom -->
  <path d="M 20 400 Q 120 310 200 320 Q 280 310 380 400 Z" fill="%2338271d" />
  <path d="M 50 400 Q 140 330 200 335 Q 260 330 350 400 Z" fill="%232b1d16" />

  <!-- Unearthed Evidence: Hard Drive & USBs -->
  <g transform="translate(90, 340) rotate(-15)">
    <rect width="45" height="30" rx="3" fill="%238b949e" stroke="%2330363d" stroke-width="1.5" />
    <circle cx="22" cy="15" r="10" fill="%23d0d7de" stroke="%2358a6ff" stroke-width="1" />
    <circle cx="22" cy="15" r="3" fill="%2330363d" />
  </g>
  <!-- USB Stick -->
  <g transform="translate(60, 365) rotate(25)">
    <rect width="25" height="12" rx="2" fill="%2321262d" stroke="%2358a6ff" stroke-width="1" />
    <rect x="25" y="2" width="8" height="8" fill="%23d0d7de" />
  </g>
  <!-- E-14 Document Sheets -->
  <g transform="translate(260, 335) rotate(15)">
    <rect width="50" height="60" rx="2" fill="%23f0f6fc" stroke="%2330363d" stroke-width="1" />
    <line x1="8" y1="12" x2="42" y2="12" stroke="%2330363d" stroke-width="2" />
    <line x1="8" y1="20" x2="42" y2="20" stroke="%238b949e" stroke-width="1" />
    <line x1="8" y1="26" x2="35" y2="26" stroke="%238b949e" stroke-width="1" />
    <text x="8" y="42" font-family="monospace" font-size="7" font-weight="bold" fill="%23f85149">E-14 ACTA</text>
    <rect x="7" y="48" width="22" height="7" fill="%23f85149" rx="1" opacity="0.8" />
    <text x="9" y="53" font-family="monospace" font-size="5" fill="white" font-weight="bold">OFICIAL</text>
  </g>

  <!-- Shovel (Pala Forense) Held by Andrea -->
  <g id="shovel" stroke="%238b949e" stroke-linecap="round">
    <!-- Shovel Handle & Shaft -->
    <line x1="125" y1="155" x2="165" y2="350" stroke="%238d5b4c" stroke-width="7" />
    <!-- Metallic Grip -->
    <path d="M 115 145 L 135 160" stroke="%23d0d7de" stroke-width="6" />
    <rect x="110" y="140" width="20" height="10" rx="2" fill="%2358a6ff" opacity="0.8" />
    <!-- Shovel Blade Digging in Mud -->
    <path d="M 155 330 L 195 350 L 175 385 L 135 365 Z" fill="%236e7681" stroke="%2330363d" stroke-width="2" />
    <path d="M 155 355 L 175 365" stroke="%2358a6ff" stroke-width="2" />
  </g>

  <!-- Andrea Zabala (AndreTaker) Character -->
  <!-- Ponytail Hair Back -->
  <path d="M 230 110 C 270 90 290 140 280 180 C 270 200 240 185 240 160 Z" fill="%231a1a24" stroke="%230d1117" stroke-width="2" />
  <circle cx="240" cy="125" r="7" fill="%2358a6ff" /> <!-- Hairband Cyan -->

  <!-- Body / Tactical Black Suit -->
  <path d="M 160 220 Q 150 300 170 340 L 235 340 Q 255 300 245 220 Z" fill="url(%23suitGrad)" stroke="%230d1117" stroke-width="2.5" />

  <!-- Tactical Vest & Cyber Accents -->
  <path d="M 175 230 L 230 230 L 225 285 L 180 285 Z" fill="%23161b22" stroke="%2330363d" stroke-width="1.5" />
  <line x1="190" y1="245" x2="215" y2="245" stroke="%2358a6ff" stroke-width="2" filter="url(%23glow)" />
  <circle cx="185" cy="265" r="3" fill="%233fb950" />
  <circle cx="218" cy="265" r="3" fill="%2358a6ff" />

  <!-- Tactical Arms and Gloves -->
  <!-- Left Arm holding shovel -->
  <path d="M 165 225 L 125 190 L 130 165" stroke="%2321262d" stroke-width="14" stroke-linecap="round" fill="none" />
  <circle cx="130" cy="165" r="9" fill="%230d1117" stroke="%2358a6ff" stroke-width="1.5" /> <!-- Combat Glove -->

  <!-- Right Arm holding lower shaft -->
  <path d="M 238 230 L 185 270 L 160 260" stroke="%2321262d" stroke-width="13" stroke-linecap="round" fill="none" />
  <circle cx="160" cy="260" r="9" fill="%230d1117" stroke="%2358a6ff" stroke-width="1.5" />

  <!-- Legs & Boots -->
  <path d="M 175 325 L 165 375 L 145 375" stroke="%23161b22" stroke-width="16" stroke-linecap="round" fill="none" />
  <path d="M 225 325 L 245 375 L 265 375" stroke="%23161b22" stroke-width="16" stroke-linecap="round" fill="none" />
  <!-- Combat Boots -->
  <rect x="135" y="365" width="32" height="15" rx="4" fill="%230d1117" stroke="%2330363d" stroke-width="2" />
  <rect x="235" y="365" width="32" height="15" rx="4" fill="%230d1117" stroke="%2330363d" stroke-width="2" />

  <!-- Head & Neck -->
  <rect x="195" y="195" width="16" height="25" fill="url(%23skinGrad)" />
  <!-- Face Shape (Chibi / Anime Style) -->
  <path d="M 150 150 Q 145 205 200 215 Q 255 205 250 150 Q 248 105 200 105 Q 152 105 150 150 Z" fill="url(%23skinGrad)" stroke="%23d89d84" stroke-width="1.5" />

  <!-- Hair Front & Side Strands -->
  <path d="M 148 140 Q 165 110 200 108 Q 235 110 252 140 Q 258 115 240 95 Q 200 85 160 95 Q 142 115 148 140 Z" fill="%231a1a24" />
  <!-- Bangs / Strands -->
  <path d="M 152 130 Q 175 145 185 125 Q 198 150 220 120 Q 235 150 250 130 C 240 105 160 105 152 130 Z" fill="%23222733" />
  <!-- Sideburn strand -->
  <path d="M 148 145 Q 146 175 155 185 Q 150 165 150 145 Z" fill="%231a1a24" />
  <path d="M 252 145 Q 254 175 245 185 Q 250 165 250 145 Z" fill="%231a1a24" />

  <!-- Emerald Green Anime Eyes (Ojos Verdes Brillantes) -->
  <!-- Left Eye -->
  <g id="leftEye">
    <ellipse cx="178" cy="158" rx="14" ry="17" fill="%230d1117" />
    <ellipse cx="178" cy="159" rx="11" ry="14" fill="%23238636" />
    <ellipse cx="178" cy="159" rx="8" ry="10" fill="%2339d353" />
    <ellipse cx="178" cy="162" rx="4" ry="5" fill="%237ee787" />
    <!-- Pupil & Catchlights -->
    <circle cx="178" cy="159" r="4" fill="%230d1117" />
    <circle cx="174" cy="153" r="4" fill="%23ffffff" />
    <circle cx="182" cy="164" r="1.8" fill="%23ffffff" />
    <!-- Eyelash Line -->
    <path d="M 162 150 Q 178 142 194 150" stroke="%230d1117" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- Eyebrow -->
    <path d="M 164 138 Q 178 134 192 142" stroke="%231a1a24" stroke-width="2.5" stroke-linecap="round" fill="none" />
  </g>

  <!-- Right Eye -->
  <g id="rightEye">
    <ellipse cx="222" cy="158" rx="14" ry="17" fill="%230d1117" />
    <ellipse cx="222" cy="159" rx="11" ry="14" fill="%23238636" />
    <ellipse cx="222" cy="159" rx="8" ry="10" fill="%2339d353" />
    <ellipse cx="222" cy="162" rx="4" ry="5" fill="%237ee787" />
    <!-- Pupil & Catchlights -->
    <circle cx="222" cy="159" r="4" fill="%230d1117" />
    <circle cx="218" cy="153" r="4" fill="%23ffffff" />
    <circle cx="226" cy="164" r="1.8" fill="%23ffffff" />
    <!-- Eyelash Line -->
    <path d="M 206 150 Q 222 142 238 150" stroke="%230d1117" stroke-width="3" stroke-linecap="round" fill="none" />
    <!-- Eyebrow (Determined angle) -->
    <path d="M 208 142 Q 222 134 236 138" stroke="%231a1a24" stroke-width="2.5" stroke-linecap="round" fill="none" />
  </g>

  <!-- Confident Smirk / Smile -->
  <path d="M 190 190 Q 202 200 216 188" stroke="%230d1117" stroke-width="2.5" stroke-linecap="round" fill="none" />
  <path d="M 194 191 Q 203 197 212 190" fill="%23e06c75" opacity="0.6" />
  <!-- Small Blush Marks -->
  <ellipse cx="163" cy="175" rx="6" ry="3" fill="%23f778ba" opacity="0.3" />
  <ellipse cx="237" cy="175" rx="6" ry="3" fill="%23f778ba" opacity="0.3" />

  <!-- Rain Droplets Streaking in Neon Light -->
  <line x1="70" y1="20" x2="60" y2="70" stroke="%2358a6ff" stroke-width="1" opacity="0.4" />
  <line x1="140" y1="40" x2="130" y2="80" stroke="%2358a6ff" stroke-width="1.2" opacity="0.5" />
  <line x1="280" y1="10" x2="270" y2="60" stroke="%2358a6ff" stroke-width="1" opacity="0.4" />
  <line x1="360" y1="70" x2="350" y2="120" stroke="%2358a6ff" stroke-width="1.2" opacity="0.5" />

  <!-- Holographic Shield Badge at Top -->
  <g transform="translate(160, 20)">
    <rect width="80" height="22" rx="11" fill="%23161b22" stroke="%23388bfd" stroke-width="1.5" filter="url(%23glow)" />
    <text x="40" y="15" font-family="monospace" font-size="9" font-weight="bold" fill="%2358a6ff" text-anchor="middle">ANDRETAKER</text>
  </g>
</svg>`;

export const InvestigatorAvatar: React.FC<InvestigatorAvatarProps> = ({
  size = "md",
  className = "",
  showBadge = true,
}) => {
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("andretaker_investigator_avatar");
      if (saved) {
        setCustomAvatar(saved);
      }
    } catch {
      // ignore
    }
  }, []);

  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-12 h-12",
    xl: "w-20 h-20",
    hero: "w-36 h-36 sm:w-44 sm:h-44",
  };

  const currentSrc = customAvatar || ANDREA_DEFAULT_AVATAR_SVG;

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-[#388bfd] hover:border-[#58a6ff] transition-all bg-[#0d1117] shadow-md shadow-[#58a6ff]/10 flex items-center justify-center`}
      >
        <img
          src={currentSrc}
          alt="Andrea Zabala (AnZaCa / AndreTaker) - Principal DFIR Investigator"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {showBadge && (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3"
          title="Principal Investigator online • Custodia Criptográfica"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#238636] border border-[#0d1117]"></span>
        </span>
      )}
    </div>
  );
};
