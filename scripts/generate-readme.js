const fs = require('fs');
const path = require('path');
require('./generate-tree-svg');

const DATA_URLS = {
  skills: 'https://raw.githubusercontent.com/Raj5222/Portfolio-data/main/skills.json'
};

async function fetchData(url) {
  try {
    const response = await fetch(`${url}?t=${Date.now()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Warning: Failed to fetch ${url}:`, error.message);
    return null;
  }
}

// Map skill names to skillicons identifiers
const SKILL_MAP = {
  'javascript': 'js',
  'typescript': 'ts',
  'python': 'py',
  'react js': 'react',
  'vite js': 'vite',
  'redux': 'redux',
  'html': 'html',
  'css': 'css',
  'bootstrap': 'bootstrap',
  'material ui': 'materialui',
  'node js': 'nodejs',
  'express js': 'express',
  'graphql': 'graphql',
  'postgresql': 'postgres',
  'mysql': 'mysql',
  'mongodb': 'mongodb',
  'redis': 'redis',
  'docker': 'docker',
  'git': 'git',
  'github': 'github',
  'google cloud': 'gcp',
  'firebase': 'firebase',
  'linux': 'linux',
  'android studio': 'androidstudio',
  'java': 'java',
  'postman': 'postman',
  'figma': 'figma'
};

async function generateReadme() {
  console.log('Fetching live skills from portfolio...');
  const skillsData = await fetchData(DATA_URLS.skills);

  let skillsSection = '';

  if (skillsData && skillsData.length > 0) {
    const categoryAccents = {
      'Frontend': { emoji: '🌿', label: 'Frontend & UI Canopy' },
      'Backend': { emoji: '🌿', label: 'Backend Core Branch' },
      'Android': { emoji: '🌿', label: 'Mobile & Systems Branch' },
      'Others': { emoji: '🌿', label: 'Cloud, DevOps & Tools' }
    };

    const skillCards = skillsData.map(cat => {
      const iconCodes = cat.skills
        .map(s => SKILL_MAP[s.name.toLowerCase().trim()])
        .filter(Boolean);

      if (iconCodes.length === 0) return '';
      const meta = categoryAccents[cat.title] || { emoji: '🌿', label: `${cat.title} Layer` };

      return `<td width="50%" align="center" valign="top">
<p><b>${meta.emoji} ${meta.label}</b></p>
<a href="https://skillicons.dev">
<img src="https://skillicons.dev/icons?i=${iconCodes.join(',')}&perline=6" />
</a>
</td>`;
    }).filter(Boolean);

    let rows = [];
    for (let i = 0; i < skillCards.length; i += 2) {
      rows.push(`<tr>\n${skillCards[i] || ''}\n${skillCards[i+1] || '<td width="50%"></td>'}\n</tr>`);
    }

    skillsSection = `<table width="100%">\n${rows.join('\n')}\n</table>`;
  }

  const fullReadme = `<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=20,24&height=220&section=header&text=Raj%20Sathvara&fontSize=44&fontColor=ffffff&desc=Full%20Stack%20%7C%20Backend%20Engineer&descSize=18&descAlignY=64" width="100%" />

<p align="center">
<a href="https://raj5222.github.io/" target="_blank">
<img src="https://img.shields.io/badge/🌐_PORTFOLIO-00F0FF?style=for-the-badge&logoColor=black&labelColor=0d1117" alt="Portfolio" />
</a>
&nbsp;
<a href="https://github.com/Raj5222" target="_blank">
<img src="https://img.shields.io/badge/💻_GITHUB-8A2BE2?style=for-the-badge&logoColor=white&labelColor=0d1117" alt="GitHub" />
</a>
&nbsp;
<img src="https://komarev.com/ghpvc/?username=Raj5222&label=VISITS&style=for-the-badge&color=38BDF8&labelColor=0d1117" alt="Profile Views" />
</p>

</div>

---

### 🌳 \`Living Skill Tree\`

<div align="center">
  <img src="https://raw.githubusercontent.com/Raj5222/Raj5222/main/assets/skill-tree.svg" width="100%" alt="Raj Sathvara Living Skill Tree" />
</div>

---

### ⚡ \`Engineering Benchmarks\`

| ⚡ Query Execution Speed | ⏱️ API Latency Drop | 🛡️ DB Load Relief | 📈 Queue Throughput |
| :---: | :---: | :---: | :---: |
| **🚀 70% Speedup** | **⚡ 40% Reduction** | **🛡️ 60% Load Relief** | **🔥 3× Throughput (BullMQ)** |

---

### 🛠️ \`Tech Matrix\`

<div align="center">

${skillsSection}

</div>

---

### 📊 \`GitHub Activity & Insights\`

<div align="center">
<a href="https://github.com/Raj5222">
<img height="180em" src="https://github-readme-stats-anuraghazra1.vercel.app/api?username=Raj5222&show_icons=true&bg_color=0D1117&title_color=00F0FF&icon_color=38BDF8&text_color=E2E8F0&border_color=1E293B&count_private=true" alt="Raj's GitHub Stats" />
&nbsp;
<img height="180em" src="https://github-readme-stats-anuraghazra1.vercel.app/api/top-langs/?username=Raj5222&layout=compact&bg_color=0D1117&title_color=00F0FF&icon_color=38BDF8&text_color=E2E8F0&border_color=1E293B" alt="Top Languages" />
</a>
</div>

<br/>

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=20,24&height=90&section=footer" width="100%" />
</div>
`;

  const targetPath = path.resolve(__dirname, '..', 'README.md');
  fs.writeFileSync(targetPath, fullReadme.trim() + '\n', 'utf8');
  console.log('README.md compiled successfully with validated banner XML!');
}

generateReadme().catch(err => {
  console.error('Error generating README:', err);
  process.exit(1);
});
