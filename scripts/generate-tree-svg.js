const fs = require('fs');
const path = require('path');

function generateSkillTreeSvg() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 660" width="100%" height="100%">
  <defs>
    <!-- Background Gradients -->
    <radialGradient id="treeGlow" cx="50%" cy="45%" r="55%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.95" />
      <stop offset="60%" stop-color="#0f172a" stop-opacity="0.98" />
      <stop offset="100%" stop-color="#020617" stop-opacity="1" />
    </radialGradient>

    <!-- Trunk Gradient -->
    <linearGradient id="trunkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#3e2723" />
      <stop offset="40%" stop-color="#4e342e" />
      <stop offset="80%" stop-color="#6d4c41" />
      <stop offset="100%" stop-color="#8d6e63" />
    </linearGradient>

    <!-- Canopy Glows -->
    <radialGradient id="leafGreen" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.45" />
      <stop offset="60%" stop-color="#059669" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#064e3b" stop-opacity="0.05" />
    </radialGradient>

    <radialGradient id="leafCyan" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.45" />
      <stop offset="60%" stop-color="#0284c7" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#0c4a6e" stop-opacity="0.05" />
    </radialGradient>

    <radialGradient id="leafPurple" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.45" />
      <stop offset="60%" stop-color="#7c3aed" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#4c1d95" stop-opacity="0.05" />
    </radialGradient>

    <radialGradient id="leafAmber" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.45" />
      <stop offset="60%" stop-color="#d97706" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#78350f" stop-opacity="0.05" />
    </radialGradient>

    <!-- Leaf Badge Shadow -->
    <filter id="leafShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000000" flood-opacity="0.7" />
    </filter>
  </defs>

  <style>
    .title { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; font-weight: 800; fill: #ffffff; }
    .branch-tag { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; font-size: 13px; font-weight: 800; letter-spacing: 1px; }
    .leaf-text { font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; font-size: 12px; font-weight: 700; fill: #f8fafc; }
  </style>

  <!-- Background Frame -->
  <rect width="980" height="660" rx="16" fill="url(#treeGlow)" stroke="#334155" stroke-width="1.5" />

  <!-- Organic Tree Foliage (Canopy Clouds) -->
  <circle cx="490" cy="110" r="105" fill="url(#leafCyan)" />
  <circle cx="440" cy="130" r="85" fill="url(#leafCyan)" />
  <circle cx="540" cy="130" r="85" fill="url(#leafCyan)" />

  <circle cx="230" cy="160" r="120" fill="url(#leafPurple)" />
  <circle cx="150" cy="200" r="90" fill="url(#leafPurple)" />
  <circle cx="300" cy="210" r="90" fill="url(#leafPurple)" />

  <circle cx="170" cy="390" r="110" fill="url(#leafGreen)" />
  <circle cx="105" cy="420" r="80" fill="url(#leafGreen)" />
  <circle cx="245" cy="420" r="80" fill="url(#leafGreen)" />

  <circle cx="750" cy="160" r="120" fill="url(#leafAmber)" />
  <circle cx="680" cy="210" r="90" fill="url(#leafAmber)" />
  <circle cx="820" cy="200" r="90" fill="url(#leafAmber)" />

  <circle cx="810" cy="390" r="110" fill="url(#leafCyan)" />
  <circle cx="735" cy="420" r="80" fill="url(#leafCyan)" />
  <circle cx="875" cy="420" r="80" fill="url(#leafCyan)" />

  <!-- Roots Spreading into Ground -->
  <path d="M 490 600 Q 430 625 330 640 M 490 600 Q 550 625 650 640 M 470 605 Q 400 635 360 650 M 510 605 Q 580 635 620 650" 
        stroke="#4e342e" stroke-width="9" stroke-linecap="round" fill="none" />

  <!-- Main Trunk -->
  <path d="M 440 610 
           C 450 500, 455 420, 460 340 
           C 465 270, 480 210, 490 140 
           C 500 210, 515 270, 520 340 
           C 525 420, 530 500, 540 610 Z" 
        fill="url(#trunkGrad)" stroke="#271406" stroke-width="2.5" />

  <!-- Bark Texture -->
  <path d="M 475 570 Q 490 560 505 570 M 472 515 Q 490 505 508 515 M 478 455 Q 490 445 502 455 M 482 385 Q 490 377 498 385" 
        stroke="#271406" stroke-width="2.5" fill="none" opacity="0.6" stroke-linecap="round" />

  <!-- Major Branches -->
  <path d="M 468 320 C 430 300, 340 270, 240 220" stroke="url(#trunkGrad)" stroke-width="16" stroke-linecap="round" fill="none" />
  <path d="M 330 265 C 290 240, 230 200, 150 190" stroke="url(#trunkGrad)" stroke-width="9" stroke-linecap="round" fill="none" />
  <path d="M 270 235 C 260 180, 240 150, 220 130" stroke="url(#trunkGrad)" stroke-width="7" stroke-linecap="round" fill="none" />

  <path d="M 460 410 C 390 420, 300 430, 190 420" stroke="url(#trunkGrad)" stroke-width="15" stroke-linecap="round" fill="none" />
  <path d="M 290 425 C 230 445, 170 460, 115 455" stroke="url(#trunkGrad)" stroke-width="8" stroke-linecap="round" fill="none" />
  <path d="M 230 422 C 200 385, 170 360, 125 350" stroke="url(#trunkGrad)" stroke-width="7" stroke-linecap="round" fill="none" />

  <path d="M 512 320 C 550 300, 640 270, 740 220" stroke="url(#trunkGrad)" stroke-width="16" stroke-linecap="round" fill="none" />
  <path d="M 640 265 C 680 240, 750 200, 820 190" stroke="url(#trunkGrad)" stroke-width="9" stroke-linecap="round" fill="none" />
  <path d="M 700 235 C 710 180, 730 150, 750 130" stroke="url(#trunkGrad)" stroke-width="7" stroke-linecap="round" fill="none" />

  <path d="M 520 410 C 585 420, 680 430, 790 420" stroke="url(#trunkGrad)" stroke-width="15" stroke-linecap="round" fill="none" />
  <path d="M 685 425 C 745 445, 810 460, 860 455" stroke="url(#trunkGrad)" stroke-width="8" stroke-linecap="round" fill="none" />
  <path d="M 745 422 C 775 385, 810 360, 850 350" stroke="url(#trunkGrad)" stroke-width="7" stroke-linecap="round" fill="none" />

  <path d="M 490 230 C 475 170, 465 140, 450 95" stroke="url(#trunkGrad)" stroke-width="11" stroke-linecap="round" fill="none" />
  <path d="M 490 230 C 505 170, 515 140, 530 95" stroke="url(#trunkGrad)" stroke-width="11" stroke-linecap="round" fill="none" />

  <!-- Trunk Name Badge -->
  <g transform="translate(490, 555)">
    <rect x="-120" y="-22" width="240" height="44" rx="22" fill="#0f172a" stroke="#38bdf8" stroke-width="2" filter="url(#leafShadow)" />
    <circle cx="-85" cy="0" r="12" fill="#38bdf8" />
    <text x="-85" y="4" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="900" fill="#0f172a">R</text>
    <text x="12" y="6" text-anchor="middle" class="title" font-size="16" fill="#38bdf8">RAJ SATHVARA</text>
  </g>

  <!-- ================= LEAF NODES (PURE VALID SVG) ================= -->

  <!-- BRANCH 1: BACKEND CORE (Upper Left) -->
  <text x="220" y="70" text-anchor="middle" class="branch-tag" fill="#c084fc">🌿 BACKEND CORE</text>
  
  <!-- Node: Node.js -->
  <g transform="translate(130, 105)">
    <rect x="-55" y="-15" width="110" height="30" rx="15" fill="#1e1b4b" stroke="#339933" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-38" cy="0" r="5" fill="#339933" />
    <text x="5" y="4" text-anchor="middle" class="leaf-text">Node.js</text>
  </g>
  <!-- Node: TypeScript -->
  <g transform="translate(255, 110)">
    <rect x="-60" y="-15" width="120" height="30" rx="15" fill="#1e1b4b" stroke="#3178C6" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-42" cy="0" r="5" fill="#3178C6" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">TypeScript</text>
  </g>
  <!-- Node: Express.js -->
  <g transform="translate(100, 160)">
    <rect x="-56" y="-15" width="112" height="30" rx="15" fill="#1e1b4b" stroke="#ffffff" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-40" cy="0" r="5" fill="#ffffff" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Express.js</text>
  </g>
  <!-- Node: Python -->
  <g transform="translate(225, 165)">
    <rect x="-50" y="-15" width="100" height="30" rx="15" fill="#1e1b4b" stroke="#3776AB" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-35" cy="0" r="5" fill="#3776AB" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Python</text>
  </g>
  <!-- Node: GraphQL -->
  <g transform="translate(340, 155)">
    <rect x="-54" y="-15" width="108" height="30" rx="15" fill="#1e1b4b" stroke="#E10098" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-38" cy="0" r="5" fill="#E10098" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">GraphQL</text>
  </g>
  <!-- Node: TypeORM -->
  <g transform="translate(155, 215)">
    <rect x="-52" y="-15" width="104" height="30" rx="15" fill="#1e1b4b" stroke="#f43f5e" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-36" cy="0" r="5" fill="#f43f5e" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">TypeORM</text>
  </g>
  <!-- Node: Microservices -->
  <g transform="translate(280, 215)">
    <rect x="-65" y="-15" width="130" height="30" rx="15" fill="#1e1b4b" stroke="#38bdf8" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-48" cy="0" r="5" fill="#38bdf8" />
    <text x="7" y="4" text-anchor="middle" class="leaf-text">Microservices</text>
  </g>

  <!-- BRANCH 2: FRONTEND UI (Lower Left) -->
  <text x="175" y="315" text-anchor="middle" class="branch-tag" fill="#34d399">🌿 FRONTEND &amp; UI</text>
  
  <!-- Node: React.js -->
  <g transform="translate(95, 355)">
    <rect x="-50" y="-15" width="100" height="30" rx="15" fill="#064e3b" stroke="#61DAFB" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-35" cy="0" r="5" fill="#61DAFB" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">React.js</text>
  </g>
  <!-- Node: Vite.js -->
  <g transform="translate(205, 355)">
    <rect x="-46" y="-15" width="92" height="30" rx="15" fill="#064e3b" stroke="#646CFF" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-32" cy="0" r="5" fill="#646CFF" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Vite.js</text>
  </g>
  <!-- Node: Redux -->
  <g transform="translate(305, 360)">
    <rect x="-46" y="-15" width="92" height="30" rx="15" fill="#064e3b" stroke="#764ABC" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-32" cy="0" r="5" fill="#764ABC" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Redux</text>
  </g>
  <!-- Node: JavaScript -->
  <g transform="translate(85, 405)">
    <rect x="-58" y="-15" width="116" height="30" rx="15" fill="#064e3b" stroke="#F7DF1E" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-42" cy="0" r="5" fill="#F7DF1E" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">JavaScript</text>
  </g>
  <!-- Node: HTML5 & CSS3 -->
  <g transform="translate(210, 410)">
    <rect x="-56" y="-15" width="112" height="30" rx="15" fill="#064e3b" stroke="#E34F26" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-40" cy="0" r="5" fill="#E34F26" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">HTML / CSS</text>
  </g>
  <!-- Node: Material UI -->
  <g transform="translate(325, 415)">
    <rect x="-54" y="-15" width="108" height="30" rx="15" fill="#064e3b" stroke="#007FFF" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-38" cy="0" r="5" fill="#007FFF" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Material UI</text>
  </g>
  <!-- Node: Bootstrap -->
  <g transform="translate(165, 460)">
    <rect x="-54" y="-15" width="108" height="30" rx="15" fill="#064e3b" stroke="#7952B3" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-38" cy="0" r="5" fill="#7952B3" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Bootstrap</text>
  </g>

  <!-- BRANCH 3: ARCHITECTURE & CLOUD (Top Center) -->
  <text x="490" y="35" text-anchor="middle" class="branch-tag" fill="#38bdf8">🌿 CLOUD &amp; ARCHITECTURE</text>

  <!-- Node: Docker -->
  <g transform="translate(415, 68)">
    <rect x="-48" y="-15" width="96" height="30" rx="15" fill="#0c4a6e" stroke="#2496ED" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-32" cy="0" r="5" fill="#2496ED" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Docker</text>
  </g>
  <!-- Node: Google Cloud -->
  <g transform="translate(560, 68)">
    <rect x="-64" y="-15" width="128" height="30" rx="15" fill="#0c4a6e" stroke="#4285F4" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-48" cy="0" r="5" fill="#4285F4" />
    <text x="7" y="4" text-anchor="middle" class="leaf-text">Google Cloud</text>
  </g>
  <!-- Node: System Design -->
  <g transform="translate(425, 118)">
    <rect x="-60" y="-15" width="120" height="30" rx="15" fill="#0c4a6e" stroke="#34d399" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-45" cy="0" r="5" fill="#34d399" />
    <text x="7" y="4" text-anchor="middle" class="leaf-text">System Design</text>
  </g>
  <!-- Node: Linux -->
  <g transform="translate(560, 118)">
    <rect x="-46" y="-15" width="92" height="30" rx="15" fill="#0c4a6e" stroke="#FCC624" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-32" cy="0" r="5" fill="#FCC624" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Linux</text>
  </g>

  <!-- BRANCH 4: DATABASES & QUEUES (Upper Right) -->
  <text x="760" y="70" text-anchor="middle" class="branch-tag" fill="#fbbf24">🌿 DATABASES &amp; QUEUES</text>

  <!-- Node: PostgreSQL -->
  <g transform="translate(675, 105)">
    <rect x="-58" y="-15" width="116" height="30" rx="15" fill="#451a03" stroke="#4169E1" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-42" cy="0" r="5" fill="#4169E1" />
    <text x="7" y="4" text-anchor="middle" class="leaf-text">PostgreSQL</text>
  </g>
  <!-- Node: Redis -->
  <g transform="translate(805, 105)">
    <rect x="-50" y="-15" width="100" height="30" rx="15" fill="#451a03" stroke="#FF4438" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-35" cy="0" r="5" fill="#FF4438" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Redis</text>
  </g>
  <!-- Node: BullMQ -->
  <g transform="translate(650, 160)">
    <rect x="-48" y="-15" width="96" height="30" rx="15" fill="#451a03" stroke="#f97316" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-34" cy="0" r="5" fill="#f97316" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">BullMQ</text>
  </g>
  <!-- Node: MongoDB -->
  <g transform="translate(765, 160)">
    <rect x="-54" y="-15" width="108" height="30" rx="15" fill="#451a03" stroke="#47A248" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-38" cy="0" r="5" fill="#47A248" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">MongoDB</text>
  </g>
  <!-- Node: MySQL -->
  <g transform="translate(875, 160)">
    <rect x="-46" y="-15" width="92" height="30" rx="15" fill="#451a03" stroke="#4479A1" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-32" cy="0" r="5" fill="#4479A1" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">MySQL</text>
  </g>
  <!-- Node: Firebase -->
  <g transform="translate(705, 215)">
    <rect x="-48" y="-15" width="96" height="30" rx="15" fill="#451a03" stroke="#FFCA28" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-34" cy="0" r="5" fill="#FFCA28" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Firebase</text>
  </g>
  <!-- Node: DSA -->
  <g transform="translate(820, 215)">
    <rect x="-56" y="-15" width="112" height="30" rx="15" fill="#451a03" stroke="#c084fc" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-40" cy="0" r="5" fill="#c084fc" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">DSA &amp; Trees</text>
  </g>

  <!-- BRANCH 5: DEVOPS, REALTIME & MOBILE (Lower Right) -->
  <text x="800" y="315" text-anchor="middle" class="branch-tag" fill="#38bdf8">🌿 REALTIME &amp; MOBILE</text>

  <!-- Node: Socket.io -->
  <g transform="translate(710, 355)">
    <rect x="-52" y="-15" width="104" height="30" rx="15" fill="#0c4a6e" stroke="#ffffff" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-36" cy="0" r="5" fill="#ffffff" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Socket.io</text>
  </g>
  <!-- Node: Git & GitHub -->
  <g transform="translate(830, 355)">
    <rect x="-56" y="-15" width="112" height="30" rx="15" fill="#0c4a6e" stroke="#F05032" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-40" cy="0" r="5" fill="#F05032" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Git / GitHub</text>
  </g>
  <!-- Node: Java -->
  <g transform="translate(695, 410)">
    <rect x="-44" y="-15" width="88" height="30" rx="15" fill="#0c4a6e" stroke="#ED8B00" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-30" cy="0" r="5" fill="#ED8B00" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Java</text>
  </g>
  <!-- Node: Android Studio -->
  <g transform="translate(815, 410)">
    <rect x="-65" y="-15" width="130" height="30" rx="15" fill="#0c4a6e" stroke="#3DDC84" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-48" cy="0" r="5" fill="#3DDC84" />
    <text x="7" y="4" text-anchor="middle" class="leaf-text">Android Studio</text>
  </g>
  <!-- Node: Postman -->
  <g transform="translate(755, 460)">
    <rect x="-52" y="-15" width="104" height="30" rx="15" fill="#0c4a6e" stroke="#FF6C37" stroke-width="1.6" filter="url(#leafShadow)"/>
    <circle cx="-36" cy="0" r="5" fill="#FF6C37" />
    <text x="6" y="4" text-anchor="middle" class="leaf-text">Postman</text>
  </g>
</svg>`;

  const assetsDir = path.resolve(__dirname, '..', 'assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const svgPath = path.join(assetsDir, 'skill-tree.svg');
  fs.writeFileSync(svgPath, svg.trim(), 'utf8');
  console.log('Skill tree SVG generated with 100% valid XML & entity escaping!');
}

generateSkillTreeSvg();
