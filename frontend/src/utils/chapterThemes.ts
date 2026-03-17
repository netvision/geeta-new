/**
 * Visual theme system for chapters.
 * Each chapter gets a unique gradient, accent colour, and SVG illustration
 * that reflects its philosophical theme from geetapath.md.
 */

export interface ChapterTheme {
  gradient: string       // CSS gradient string for card/banner backgrounds
  accentHex: string      // Primary accent colour (for badges, borders, etc.)
  darkText: boolean      // Whether body text should be dark (for light backgrounds)
  illustration: string   // Inline SVG markup (decorative, aria-hidden)
}

// ── Per-chapter themes (keyed by chapter number) ──────────────────────────────

const themes: Record<number, ChapterTheme> = {

  // ── 1: मोह — Attachment / Kurukshetra Battlefield ────────────────────────
  1: {
    gradient: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 50%, #dc2626 100%)',
    accentHex: '#fca5a5',
    darkText: false,
    illustration: `
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <!-- Radial glow -->
        <radialGradient id="g1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fca5a5" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#7f1d1d" stop-opacity="0"/>
        </radialGradient>
        <ellipse cx="200" cy="130" rx="160" ry="110" fill="url(#g1)"/>

        <!-- Left army — spear formation -->
        <polygon points="30,230 110,60 130,230" fill="rgba(252,165,165,0.12)" stroke="rgba(252,165,165,0.35)" stroke-width="1.5" stroke-linejoin="round"/>
        <line x1="70" y1="230" x2="70" y2="120" stroke="rgba(252,165,165,0.3)" stroke-width="1"/>
        <line x1="95" y1="230" x2="95" y2="90" stroke="rgba(252,165,165,0.3)" stroke-width="1"/>

        <!-- Right army — spear formation -->
        <polygon points="370,230 290,60 270,230" fill="rgba(252,165,165,0.12)" stroke="rgba(252,165,165,0.35)" stroke-width="1.5" stroke-linejoin="round"/>
        <line x1="330" y1="230" x2="330" y2="120" stroke="rgba(252,165,165,0.3)" stroke-width="1"/>
        <line x1="305" y1="230" x2="305" y2="90" stroke="rgba(252,165,165,0.3)" stroke-width="1"/>

        <!-- Dharma Chakra (wheel) in centre -->
        <circle cx="200" cy="130" r="48" fill="none" stroke="rgba(251,191,36,0.55)" stroke-width="2"/>
        <circle cx="200" cy="130" r="14" fill="none" stroke="rgba(251,191,36,0.7)" stroke-width="2"/>
        <!-- 8 spokes -->
        <g stroke="rgba(251,191,36,0.5)" stroke-width="1.5">
          <line x1="200" y1="82" x2="200" y2="178"/>
          <line x1="152" y1="130" x2="248" y2="130"/>
          <line x1="166" y1="96"  x2="234" y2="164"/>
          <line x1="166" y1="164" x2="234" y2="96"/>
        </g>
        <!-- Rim dots -->
        <g fill="rgba(251,191,36,0.6)">
          <circle cx="200" cy="82"  r="3"/>
          <circle cx="234" cy="96"  r="3"/>
          <circle cx="248" cy="130" r="3"/>
          <circle cx="234" cy="164" r="3"/>
          <circle cx="200" cy="178" r="3"/>
          <circle cx="166" cy="164" r="3"/>
          <circle cx="152" cy="130" r="3"/>
          <circle cx="166" cy="96"  r="3"/>
        </g>

        <!-- Ground line -->
        <line x1="0" y1="235" x2="400" y2="235" stroke="rgba(252,165,165,0.2)" stroke-width="1"/>

        <!-- Decorative corner ornaments -->
        <path d="M 20 20 Q 40 20 40 40" fill="none" stroke="rgba(252,165,165,0.2)" stroke-width="1.5"/>
        <path d="M 380 20 Q 360 20 360 40" fill="none" stroke="rgba(252,165,165,0.2)" stroke-width="1.5"/>
      </svg>`,
  },

  // ── 2: परिस्थिति — Duality of Circumstances (Farmer & Potter) ────────────
  2: {
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 55%, #0369a1 100%)',
    accentHex: '#93c5fd',
    darkText: false,
    illustration: `
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="skyL" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.7"/>
            <stop offset="50%" stop-color="#fbbf24" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="skyR" x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stop-color="#93c5fd" stop-opacity="0"/>
            <stop offset="100%" stop-color="#93c5fd" stop-opacity="0.6"/>
          </linearGradient>
          <radialGradient id="sunGlow" cx="25%" cy="35%" r="30%">
            <stop offset="0%" stop-color="#fde68a" stop-opacity="0.7"/>
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Ambient glow halves -->
        <rect x="0" y="0" width="200" height="260" fill="url(#skyL)"/>
        <rect x="200" y="0" width="200" height="260" fill="url(#skyR)"/>
        <ellipse cx="100" cy="90" rx="90" ry="70" fill="url(#sunGlow)"/>

        <!-- Dividing line -->
        <line x1="200" y1="0" x2="200" y2="260" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" stroke-dasharray="6 4"/>

        <!-- ── Left: Sun (farmer's wish) ── -->
        <!-- Sun circle -->
        <circle cx="100" cy="88" r="32" fill="rgba(251,191,36,0.8)" opacity="0.85"/>
        <!-- Sun rays -->
        <g stroke="rgba(251,191,36,0.6)" stroke-width="2" stroke-linecap="round">
          <line x1="100" y1="44" x2="100" y2="54"/>
          <line x1="100" y1="122" x2="100" y2="132"/>
          <line x1="56" y1="88"  x2="66" y2="88"/>
          <line x1="134" y1="88" x2="144" y2="88"/>
          <line x1="70"  y1="58" x2="77"  y2="65"/>
          <line x1="123" y1="111" x2="130" y2="118"/>
          <line x1="70"  y1="118" x2="77"  y2="111"/>
          <line x1="123" y1="65"  x2="130" y2="58"/>
        </g>
        <!-- Field rows (happy farmer) -->
        <g stroke="rgba(251,191,36,0.3)" stroke-width="1">
          <line x1="30" y1="190" x2="170" y2="190"/>
          <line x1="30" y1="205" x2="170" y2="205"/>
          <line x1="30" y1="220" x2="170" y2="220"/>
        </g>
        <!-- Small plant sprouting -->
        <line x1="80" y1="190" x2="80" y2="172" stroke="rgba(110,231,183,0.7)" stroke-width="2"/>
        <ellipse cx="80" cy="168" rx="10" ry="7" fill="rgba(110,231,183,0.5)"/>
        <line x1="120" y1="205" x2="120" y2="185" stroke="rgba(110,231,183,0.6)" stroke-width="2"/>
        <ellipse cx="120" cy="181" rx="10" ry="7" fill="rgba(110,231,183,0.4)"/>

        <!-- ── Right: Rain cloud (potter's sorrow) ── -->
        <!-- Cloud -->
        <g fill="rgba(147,197,253,0.75)" opacity="0.9">
          <ellipse cx="300" cy="75" rx="50" ry="30"/>
          <ellipse cx="270" cy="85" rx="32" ry="22"/>
          <ellipse cx="330" cy="85" rx="32" ry="22"/>
        </g>
        <!-- Rain drops -->
        <g fill="rgba(147,197,253,0.7)">
          <ellipse cx="264" cy="118" rx="2.5" ry="5"/>
          <ellipse cx="280" cy="130" rx="2.5" ry="5"/>
          <ellipse cx="296" cy="115" rx="2.5" ry="5"/>
          <ellipse cx="312" cy="128" rx="2.5" ry="5"/>
          <ellipse cx="328" cy="118" rx="2.5" ry="5"/>
          <ellipse cx="272" cy="148" rx="2.5" ry="5"/>
          <ellipse cx="288" cy="160" rx="2.5" ry="5"/>
          <ellipse cx="304" cy="145" rx="2.5" ry="5"/>
          <ellipse cx="320" cy="158" rx="2.5" ry="5"/>
          <ellipse cx="260" cy="168" rx="2.5" ry="5"/>
          <ellipse cx="336" cy="147" rx="2.5" ry="5"/>
        </g>
        <!-- Broken pots -->
        <path d="M 260 210 Q 270 200 280 210 Q 290 220 280 225 L 260 225 Z" fill="rgba(147,197,253,0.25)" stroke="rgba(147,197,253,0.4)" stroke-width="1"/>
        <path d="M 315 205 Q 325 195 335 205 Q 345 215 335 220 L 315 220 Z" fill="rgba(147,197,253,0.25)" stroke="rgba(147,197,253,0.4)" stroke-width="1"/>

        <!-- Corner ornaments -->
        <path d="M 18 18 Q 38 18 38 38" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
        <path d="M 382 18 Q 362 18 362 38" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      </svg>`,
  },

  // ── 3: नित्य/अनित्य — Eternal River over Bedrock ────────────────────────
  3: {
    gradient: 'linear-gradient(135deg, #134e4a 0%, #0f766e 55%, #115e59 100%)',
    accentHex: '#5eead4',
    darkText: false,
    illustration: `
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5eead4" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#0d9488" stop-opacity="0.2"/>
          </linearGradient>
        </defs>

        <!-- Bedrock / eternal foundation -->
        <rect x="0" y="185" width="400" height="75" fill="rgba(20,83,45,0.6)" rx="0"/>
        <!-- Rock texture lines -->
        <g stroke="rgba(255,255,255,0.08)" stroke-width="1">
          <line x1="0" y1="200" x2="400" y2="200"/>
          <line x1="0" y1="218" x2="400" y2="218"/>
          <line x1="50"  y1="185" x2="50"  y2="260"/>
          <line x1="130" y1="185" x2="130" y2="260"/>
          <line x1="210" y1="185" x2="210" y2="260"/>
          <line x1="300" y1="185" x2="300" y2="260"/>
          <line x1="370" y1="185" x2="370" y2="260"/>
        </g>
        <!-- Rock label area with cracking pattern -->
        <path d="M 90 200 L 105 215 L 90 230" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
        <path d="M 250 202 L 265 217 L 250 232" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

        <!-- Flowing river — 3 wave bands -->
        <path d="M 0 100 Q 50 70 100 100 Q 150 130 200 100 Q 250 70 300 100 Q 350 130 400 100 L 400 185 L 0 185 Z"
              fill="url(#riverGrad)"/>
        <path d="M 0 125 Q 60 95 120 125 Q 180 155 240 125 Q 300 95 360 125 Q 380 133 400 125 L 400 185 L 0 185 Z"
              fill="rgba(20,184,166,0.18)"/>
        <path d="M 0 150 Q 55 130 110 150 Q 165 170 220 150 Q 275 130 330 150 Q 365 162 400 150 L 400 185 L 0 185 Z"
              fill="rgba(20,184,166,0.12)"/>

        <!-- Wave top highlight lines -->
        <path d="M 0 100 Q 50 70 100 100 Q 150 130 200 100 Q 250 70 300 100 Q 350 130 400 100"
              fill="none" stroke="rgba(94,234,212,0.5)" stroke-width="1.5"/>
        <path d="M 0 125 Q 60 95 120 125 Q 180 155 240 125 Q 300 95 360 125 Q 380 133 400 125"
              fill="none" stroke="rgba(94,234,212,0.3)" stroke-width="1"/>

        <!-- Lotus floating on water -->
        <!-- Lotus petals -->
        <g transform="translate(200,105)">
          <g fill="rgba(249,168,212,0.75)" stroke="rgba(251,207,232,0.5)" stroke-width="0.8">
            <ellipse rx="12" ry="22" transform="rotate(0)   translate(0,-16)"/>
            <ellipse rx="12" ry="22" transform="rotate(45)  translate(0,-16)"/>
            <ellipse rx="12" ry="22" transform="rotate(90)  translate(0,-16)"/>
            <ellipse rx="12" ry="22" transform="rotate(135) translate(0,-16)"/>
            <ellipse rx="12" ry="22" transform="rotate(180) translate(0,-16)"/>
            <ellipse rx="12" ry="22" transform="rotate(225) translate(0,-16)"/>
            <ellipse rx="12" ry="22" transform="rotate(270) translate(0,-16)"/>
            <ellipse rx="12" ry="22" transform="rotate(315) translate(0,-16)"/>
          </g>
          <circle r="12" fill="rgba(251,191,36,0.8)" stroke="rgba(253,224,71,0.6)" stroke-width="1"/>
          <circle r="5"  fill="rgba(161,98,7,0.7)"/>
        </g>

        <!-- Sky — distant mountains -->
        <path d="M 0 80 Q 50 30 100 80 Q 150 130 200 80 Q 250 30 300 80 Q 350 130 400 80 L 400 0 L 0 0 Z"
              fill="rgba(20,78,70,0.3)"/>

        <!-- Om symbol floating -->
        <text x="340" y="55" font-size="42" fill="rgba(94,234,212,0.18)" font-family="serif" text-anchor="middle">ॐ</text>
        <text x="60" y="55" font-size="42" fill="rgba(94,234,212,0.18)" font-family="serif" text-anchor="middle">ॐ</text>

        <!-- Corner ornaments -->
        <path d="M 18 18 Q 38 18 38 38" fill="none" stroke="rgba(94,234,212,0.2)" stroke-width="1.5"/>
        <path d="M 382 18 Q 362 18 362 38" fill="none" stroke="rgba(94,234,212,0.2)" stroke-width="1.5"/>
        <path d="M 18 242 Q 38 242 38 222" fill="none" stroke="rgba(94,234,212,0.2)" stroke-width="1.5"/>
        <path d="M 382 242 Q 362 242 362 222" fill="none" stroke="rgba(94,234,212,0.2)" stroke-width="1.5"/>
      </svg>`,
  },

  // ── 4: उद्देश्य परिवर्तन — Diya Lamp of Purpose ────────────────────────
  4: {
    gradient: 'linear-gradient(135deg, #3b0764 0%, #6d28d9 55%, #4c1d95 100%)',
    accentHex: '#c4b5fd',
    darkText: false,
    illustration: `
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="flameGlow" cx="50%" cy="55%" r="45%">
            <stop offset="0%"   stop-color="#fde68a" stop-opacity="0.6"/>
            <stop offset="50%"  stop-color="#f59e0b" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#6d28d9" stop-opacity="0"/>
          </radialGradient>
          <radialGradient id="outerGlow" cx="50%" cy="55%" r="55%">
            <stop offset="0%"   stop-color="#fde68a" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#3b0764" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Ambient glow -->
        <ellipse cx="200" cy="145" rx="180" ry="130" fill="url(#outerGlow)"/>
        <ellipse cx="200" cy="135" rx="100" ry="90" fill="url(#flameGlow)"/>

        <!-- 16 light rays -->
        <g stroke="rgba(253,230,138,0.3)" stroke-width="1.5" stroke-linecap="round">
          <line x1="200" y1="60"  x2="200" y2="10"/>
          <line x1="200" y1="210" x2="200" y2="255"/>
          <line x1="100" y1="130" x2="50"  y2="130"/>
          <line x1="300" y1="130" x2="350" y2="130"/>
          <line x1="129" y1="59"  x2="95"  y2="25"/>
          <line x1="271" y1="59"  x2="305" y2="25"/>
          <line x1="271" y1="201" x2="305" y2="235"/>
          <line x1="129" y1="201" x2="95"  y2="235"/>
          <line x1="108" y1="85"  x2="78"  y2="56"/>
          <line x1="292" y1="85"  x2="322" y2="56"/>
          <line x1="108" y1="175" x2="78"  y2="204"/>
          <line x1="292" y1="175" x2="322" y2="204"/>
        </g>

        <!-- Medium rays (partially transparent) -->
        <g stroke="rgba(253,230,138,0.15)" stroke-width="1">
          <line x1="155" y1="65"  x2="140" y2="18"/>
          <line x1="245" y1="65"  x2="260" y2="18"/>
          <line x1="155" y1="195" x2="140" y2="242"/>
          <line x1="245" y1="195" x2="260" y2="242"/>
        </g>

        <!-- Diya body -->
        <path d="M 160 175 Q 155 195 175 200 Q 200 205 225 200 Q 245 195 240 175 Z"
              fill="rgba(161,98,7,0.85)" stroke="rgba(202,138,4,0.6)" stroke-width="1.5"/>
        <ellipse cx="200" cy="175" rx="42" ry="10" fill="rgba(120,53,15,0.8)" stroke="rgba(180,83,9,0.5)" stroke-width="1"/>
        <!-- Oil surface shimmer -->
        <ellipse cx="200" cy="172" rx="28" ry="6" fill="rgba(251,191,36,0.3)"/>

        <!-- Wick -->
        <line x1="200" y1="172" x2="200" y2="148" stroke="rgba(180,83,9,0.7)" stroke-width="2"/>

        <!-- Flame -->
        <path d="M 200 148 Q 208 138 204 118 Q 200 105 200 98 Q 200 105 196 118 Q 192 138 200 148 Z"
              fill="rgba(253,224,71,0.9)"/>
        <path d="M 200 145 Q 205 137 203 122 Q 200 112 200 105 Q 200 112 197 122 Q 195 137 200 145 Z"
              fill="rgba(254,249,195,0.95)"/>
        <!-- Flame core -->
        <path d="M 200 143 Q 202 137 201 128 Q 200 122 200 118 Q 200 122 199 128 Q 198 137 200 143 Z"
              fill="rgba(255,255,255,0.8)"/>

        <!-- Base plate -->
        <rect x="150" y="198" width="100" height="8" rx="4"
              fill="rgba(161,98,7,0.5)" stroke="rgba(202,138,4,0.3)" stroke-width="1"/>

        <!-- Sanskrit OM in corners -->
        <text x="40"  y="50"  font-size="32" fill="rgba(196,181,253,0.15)" font-family="serif">ॐ</text>
        <text x="340" y="50"  font-size="32" fill="rgba(196,181,253,0.15)" font-family="serif">ॐ</text>
        <text x="40"  y="245" font-size="32" fill="rgba(196,181,253,0.12)" font-family="serif">ॐ</text>
        <text x="340" y="245" font-size="32" fill="rgba(196,181,253,0.12)" font-family="serif">ॐ</text>

        <!-- Corner ornaments -->
        <path d="M 18 18 Q 38 18 38 38" fill="none" stroke="rgba(196,181,253,0.25)" stroke-width="1.5"/>
        <path d="M 382 18 Q 362 18 362 38" fill="none" stroke="rgba(196,181,253,0.25)" stroke-width="1.5"/>
        <path d="M 18 242 Q 38 242 38 222" fill="none" stroke="rgba(196,181,253,0.25)" stroke-width="1.5"/>
        <path d="M 382 242 Q 362 242 362 222" fill="none" stroke="rgba(196,181,253,0.25)" stroke-width="1.5"/>
      </svg>`,
  },

  // ── 5: करने योग्य — Karma Lotus & Chakra ────────────────────────────────
  5: {
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 55%, #ea580c 100%)',
    accentHex: '#fdba74',
    darkText: false,
    illustration: `
      <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stop-color="#fdba74" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#7c2d12" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <!-- Ambient glow -->
        <ellipse cx="200" cy="130" rx="160" ry="120" fill="url(#lotusGlow)"/>

        <!-- Dharma Chakra ring (outer) -->
        <circle cx="200" cy="130" r="95" fill="none" stroke="rgba(253,186,116,0.2)" stroke-width="1.5"/>
        <circle cx="200" cy="130" r="78" fill="none" stroke="rgba(253,186,116,0.15)" stroke-width="1"/>
        <!-- 24 chakra spokes (Ashoka style) -->
        <g stroke="rgba(253,186,116,0.25)" stroke-width="1">
          <line x1="200" y1="35"  x2="200" y2="225"/>
          <line x1="105" y1="130" x2="295" y2="130"/>
          <line x1="133" y1="63"  x2="267" y2="197"/>
          <line x1="133" y1="197" x2="267" y2="63"/>
          <line x1="105" y1="62"  x2="295" y2="198"/>
          <line x1="200" y1="35"  x2="200" y2="225"/>
          <line x1="162" y1="37"  x2="238" y2="223"/>
          <line x1="105" y1="98"  x2="295" y2="162"/>
          <line x1="105" y1="162" x2="295" y2="98"/>
          <line x1="238" y1="37"  x2="162" y2="223"/>
          <line x1="295" y1="62"  x2="105" y2="198"/>
          <line x1="295" y1="198" x2="105" y2="62"/>
        </g>

        <!-- Lotus — 16 petals -->
        <g transform="translate(200,130)">
          <!-- Outer petals -->
          <g fill="rgba(253,186,116,0.55)" stroke="rgba(254,215,170,0.5)" stroke-width="0.8">
            <ellipse rx="14" ry="32" transform="rotate(0)    translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(22.5) translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(45)   translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(67.5) translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(90)   translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(112.5)translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(135)  translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(157.5)translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(180)  translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(202.5)translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(225)  translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(247.5)translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(270)  translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(292.5)translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(315)  translate(0,-38)"/>
            <ellipse rx="14" ry="32" transform="rotate(337.5)translate(0,-38)"/>
          </g>
          <!-- Inner petals -->
          <g fill="rgba(254,215,170,0.7)" stroke="rgba(255,237,213,0.6)" stroke-width="0.8">
            <ellipse rx="9"  ry="20" transform="rotate(0)    translate(0,-20)"/>
            <ellipse rx="9"  ry="20" transform="rotate(45)   translate(0,-20)"/>
            <ellipse rx="9"  ry="20" transform="rotate(90)   translate(0,-20)"/>
            <ellipse rx="9"  ry="20" transform="rotate(135)  translate(0,-20)"/>
            <ellipse rx="9"  ry="20" transform="rotate(180)  translate(0,-20)"/>
            <ellipse rx="9"  ry="20" transform="rotate(225)  translate(0,-20)"/>
            <ellipse rx="9"  ry="20" transform="rotate(270)  translate(0,-20)"/>
            <ellipse rx="9"  ry="20" transform="rotate(315)  translate(0,-20)"/>
          </g>
          <!-- Pericarp -->
          <circle r="18" fill="rgba(251,191,36,0.85)" stroke="rgba(253,224,71,0.7)" stroke-width="1.5"/>
          <circle r="9"  fill="rgba(161,98,7,0.9)"   stroke="rgba(202,138,4,0.6)" stroke-width="1"/>
          <!-- Stamen dots -->
          <g fill="rgba(253,224,71,0.8)">
            <circle cx="0" cy="-5" r="2"/>
            <circle cx="4" cy="3" r="2"/>
            <circle cx="-4" cy="3" r="2"/>
          </g>
        </g>

        <!-- Water ripples beneath lotus -->
        <ellipse cx="200" cy="195" rx="70" ry="12" fill="none" stroke="rgba(253,186,116,0.2)" stroke-width="1.5"/>
        <ellipse cx="200" cy="198" rx="90" ry="15" fill="none" stroke="rgba(253,186,116,0.12)" stroke-width="1"/>

        <!-- Corner ornaments -->
        <path d="M 18 18 Q 38 18 38 38" fill="none" stroke="rgba(253,186,116,0.3)" stroke-width="1.5"/>
        <path d="M 382 18 Q 362 18 362 38" fill="none" stroke="rgba(253,186,116,0.3)" stroke-width="1.5"/>
        <path d="M 18 242 Q 38 242 38 222" fill="none" stroke="rgba(253,186,116,0.3)" stroke-width="1.5"/>
        <path d="M 382 242 Q 362 242 362 222" fill="none" stroke="rgba(253,186,116,0.3)" stroke-width="1.5"/>
      </svg>`,
  },
}

// ── Fallback for chapters not yet illustrated ────────────────────────────────

const fallbackPalettes = [
  { grad: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)', accent: '#93c5fd' },
  { grad: 'linear-gradient(135deg, #134e4a 0%, #0f766e 100%)', accent: '#5eead4' },
  { grad: 'linear-gradient(135deg, #3b0764 0%, #6d28d9 100%)', accent: '#c4b5fd' },
  { grad: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)', accent: '#fdba74' },
  { grad: 'linear-gradient(135deg, #065f46 0%, #059669 100%)', accent: '#6ee7b7' },
]

function fallbackIllustration(num: number): string {
  return `
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="fbg${num}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="white" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="white" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="130" rx="140" ry="100" fill="url(#fbg${num})"/>
      <!-- Mandala rings -->
      <circle cx="200" cy="130" r="90" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>
      <circle cx="200" cy="130" r="65" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
      <circle cx="200" cy="130" r="40" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
      <!-- Chapter number -->
      <text x="200" y="150" font-size="80" font-weight="bold"
            fill="rgba(255,255,255,0.12)" font-family="sans-serif" text-anchor="middle">${num}</text>
      <!-- Corner ornaments -->
      <path d="M 18 18 Q 38 18 38 38" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M 382 18 Q 362 18 362 38" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M 18 242 Q 38 242 38 222" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
      <path d="M 382 242 Q 362 242 362 222" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
    </svg>`
}

export function getTheme(chapterNumber: number): ChapterTheme {
  if (themes[chapterNumber]) return themes[chapterNumber]!
  const p = fallbackPalettes[(chapterNumber - 1) % fallbackPalettes.length]!
  return {
    gradient: p.grad,
    accentHex: p.accent,
    darkText: false,
    illustration: fallbackIllustration(chapterNumber),
  }
}
