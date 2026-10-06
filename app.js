/**
 * COMPETRA - Skill Intelligence Platform
 * Frontend Application Module
 * 
 * Features:
 * - User profile management with dynamic switching
 * - Dark mode with persistent preferences
 * - Real-time dashboard with profile-specific data
 * - Responsive UI with professional styling
 * - Backend API integration for data persistence
 * 
 * Version: 1.0.0
 */

// ==========================================
// DATE/TIME DISPLAY
// ==========================================

/**
/**
 * Update date display with current system date
 * Format: DAY_NAME, DD MONTH YEAR
 */
function updateDateDisplay() {
  const dateDisplay = document.getElementById('dateDisplay');
  if (!dateDisplay) return;

  const now = new Date();
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
  
  const dayName = days[now.getDay()];
  const date = String(now.getDate()).padStart(2, '0');
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  
  dateDisplay.textContent = `${dayName}, ${date} ${month} ${year}`;
}

// Initialize date display and auto-update every 60 seconds
updateDateDisplay();
setInterval(updateDateDisplay, 60000);

// ==========================================
// DARK MODE
// ==========================================

/**
 * Initialize dark mode based on user preference
 * Reads from localStorage and applies saved setting
 */
function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  if (isDarkMode) {
    enableDarkMode();
  }
  
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
}

function toggleDarkMode() {
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  if (isDarkMode) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
}

function enableDarkMode() {
  document.documentElement.classList.add('dark-mode');
  document.body.classList.add('dark-mode');
  
  // Apply dark mode to all major elements
  document.querySelectorAll('.sidebar, .topbar, .panel, .nav-item, .primary-button, .outline-button, .text-button, .sync-card, .metric-card, .profile-menu, .notification-menu, .icon-button, .profile-copy, .focus-banner, .intro-copy, .crumb, .page-intro h1').forEach(el => {
    el.classList.add('dark-mode');
  });
  
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) toggle.textContent = '☀️';
  
  localStorage.setItem('darkMode', 'true');
}

function disableDarkMode() {
  document.documentElement.classList.remove('dark-mode');
  document.body.classList.remove('dark-mode');
  
  // Remove dark mode from all elements
  document.querySelectorAll('.sidebar, .topbar, .panel, .nav-item, .primary-button, .outline-button, .text-button, .sync-card, .metric-card, .profile-menu, .notification-menu, .icon-button, .profile-copy, .focus-banner, .intro-copy, .crumb, .page-intro h1').forEach(el => {
    el.classList.remove('dark-mode');
  });
  
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) toggle.textContent = '🌙';
  
  localStorage.setItem('darkMode', 'false');
}

// ============= STARTUP ANIMATION ============= 
function hideStartupScreen() {
  const startupScreen = document.getElementById('startupScreen');
  if (startupScreen) {
    startupScreen.classList.add('hidden');
    setTimeout(() => {
      startupScreen.style.display = 'none';
    }, 800);
  }
}

// Auto-hide startup screen after 2.3 seconds
setTimeout(hideStartupScreen, 2300);

const navItems = document.querySelectorAll('.nav-item[data-view]');
const views = document.querySelectorAll('.view');
const pageTitle = document.getElementById('pageTitle');
const titleMap = { overview: 'Overview', pathways: 'My pathways', competencies: 'Competencies', studio: 'Assessment studio' };

const profiles = {
  shaurya: {
    initials: 'SS',
    name: 'Shaurya Salke',
    role: 'CEO',
    score: 74,
    learningHours: 18.5,
    skillsInMotion: 12,
    skillsCount: 24,
    streak: 7,
    focus: 'Python for Data Analysis',
    completion: 68,
    greeting: 'Good morning, Shaurya',
    intro: 'Your next step towards a future-ready statistical workforce.',
    secondaryFocus: 'Build confidence in Python for Data Analysis',
    focusText: 'One focused pathway. Three small wins. Keep your momentum going.',
    activeSkills: ['Python', 'SDG data', '+2 more'],
    radar: { Statistical: 81, Behavioural: 76, Technical: 58, 'Digital governance': 42 },
    pathwayTitle: 'Python for Data Analysis',
    pathwayIntro: 'Recommended because your role uses data pipelines and your current technical score is 58.',
    pathwayHeroMeta: 'Module 7 of 10 · 68% complete',
    pathwayCourseTitle: 'Python for Data Analysis',
    pathwayAllLabel: 'Three focused routes shaped by your role, goals and competency profile.',
    gaps: [
      { domain: 'Cloud computing', target: 70, current: 34, points: 36 },
      { domain: 'Python for data analysis', target: 75, current: 58, points: 17 },
      { domain: 'Data visualization', target: 72, current: 61, points: 11 }
    ],
    // Bar chart data (mini-bars heights as percentages)
    barChartData: [44, 52, 49, 65, 61, 75, 82, 96],
    // Streak data (0-8 = previous days, 9 = today)
    streakDays: [true, true, true, true, true, true, false, false, true],
    // Trend data for metric cards
    scoreTrend: 8.4,
    hoursTrend: 12.5,
    skillsTrend: 6.2,
    streakTrend: 3.1,
    lastReview: 68,
    // Competency bars for overview panel
    competencyBars: [
      { label: 'Technical', score: 58, color: 'blue', percentage: 58 },
      { label: 'Statistical', score: 81, color: 'green', percentage: 81 },
      { label: 'Digital governance', score: 42, color: 'orange', percentage: 42 },
      { label: 'Behavioural', score: 76, color: 'purple', percentage: 76 }
    ],
    // Pathway hero widget (featured pathway)
    pathwayHeroCompletion: 68,
    // Pathway cards data (for overview panel and full pathways page)
    pathwayCards: [
      {
        icon: 'blue',
        symbol: '⌬',
        title: 'Python for Data Analysis',
        source: 'iGOT KARMAYOGI',
        meta: '68% complete',
        description: '8 modules · 4h 20m remaining',
        progress: 68
      },
      {
        icon: 'yellow',
        symbol: '▥',
        title: 'Designing Quality Surveys',
        source: 'NSSTA · TPAC 2026',
        meta: 'Recommended',
        description: '6 modules · 3h 10m total',
        progress: 12
      },
      {
        icon: 'coral',
        symbol: '⌁',
        title: 'Communicating Data Stories',
        source: 'iGOT KARMAYOGI',
        meta: 'New match',
        description: '5 modules · 2h 45m total',
        progress: 0
      }
    ],
    // Notifications for this profile
    notifications: [
      {
        icon: 'course',
        title: 'Keep your learning streak',
        description: 'Python for Data Analysis · Module 7 is waiting for you',
        time: '2 hours ago',
        unread: true,
        viewTarget: 'pathways'
      },
      {
        icon: 'new',
        title: 'New course match found',
        description: 'Government Data Privacy was added to your pathway',
        time: 'Yesterday',
        unread: true,
        viewTarget: 'pathways'
      },
      {
        icon: 'programme',
        title: 'NSSTA programme update',
        description: 'TPAC 2026 registration window opens next week',
        time: '3 days ago',
        unread: false,
        viewTarget: 'pathways'
      }
    ]
  },
  ananya: {
    initials: 'AS',
    name: 'Ananya Sen',
    role: 'Senior Statistical Officer',
    score: 81,
    learningHours: 22.2,
    skillsInMotion: 16,
    skillsCount: 24,
    streak: 12,
    focus: 'Preparing Official Statistics Quality Dashboard',
    completion: 79,
    greeting: 'Good morning, Ananya',
    intro: 'Your statistical quality and reporting pathway is ready.',
    secondaryFocus: 'Quality data reporting and survey governance',
    focusText: 'Your reporting cycle needs stronger survey inference quality.',
    activeSkills: ['Quality', 'Surveys', '+3 more'],
    radar: { Statistical: 87, Behavioural: 78, Technical: 73, 'Digital governance': 52 },
    pathwayTitle: 'Preparing Official Statistics Quality Dashboard',
    pathwayIntro: 'Recommended because your role demands survey quality analytics and reporting confidence.',
    pathwayHeroMeta: 'Module 5 of 12 · 79% complete',
    pathwayCourseTitle: 'Quality Dashboard Reporting',
    pathwayAllLabel: 'Three focused routes shaped by your reporting and survey quality priorities.',
    gaps: [
      { domain: 'Survey sampling', target: 86, current: 69, points: 17 },
      { domain: 'Metadata standards', target: 78, current: 61, points: 17 },
      { domain: 'Data visualization', target: 72, current: 63, points: 9 }
    ],
    // Bar chart data (higher scores)
    barChartData: [58, 67, 71, 76, 79, 81, 85, 87],
    // Streak data (12 day streak - all true)
     streakDays: [true, true, true, true, true, true, true, true, true],
     // Trend data for metric cards
     scoreTrend: 11.2,
     hoursTrend: 18.3,
     skillsTrend: 14.5,
     streakTrend: 8.9,
     lastReview: 71,
     // Competency bars for overview panel
     competencyBars: [
       { label: 'Technical', score: 73, color: 'blue', percentage: 73 },
       { label: 'Statistical', score: 87, color: 'green', percentage: 87 },
       { label: 'Digital governance', score: 52, color: 'orange', percentage: 52 },
       { label: 'Behavioural', score: 78, color: 'purple', percentage: 78 }
     ],
     // Pathway hero widget
     pathwayHeroCompletion: 79,
     // Pathway cards data
     pathwayCards: [
       {
         icon: 'green',
         symbol: '◎',
         title: 'Quality Dashboard Reporting',
         source: 'iGOT KARMAYOGI',
         meta: '79% complete',
         description: '7 modules · 3h 15m remaining',
         progress: 79
       },
       {
         icon: 'coral',
         symbol: '⌁',
         title: 'Survey Quality Assurance',
         source: 'NSSTA · TPAC 2026',
         meta: 'Recommended',
         description: '8 modules · 4h 30m total',
         progress: 25
       },
       {
         icon: 'mint-icon',
         symbol: '◎',
         title: 'Data Governance Framework',
         source: 'iGOT KARMAYOGI',
         meta: 'Advanced',
         description: '6 modules · 3h total',
         progress: 15
       }
     ],
     // Notifications for Ananya
     notifications: [
       {
         icon: 'course',
         title: 'Quality dashboard ready',
         description: 'Module 5 of Quality Dashboard Reporting is now available',
         time: '1 hour ago',
         unread: true,
         viewTarget: 'pathways'
       },
       {
         icon: 'new',
         title: 'Survey methodology update',
         description: 'NSSTA released new sampling framework guidelines',
         time: '2 days ago',
         unread: true,
         viewTarget: 'pathways'
       },
       {
         icon: 'programme',
         title: 'Official Statistics Conference',
         description: 'Register now for the annual conference - Ends September 15',
         time: '5 days ago',
         unread: false,
         viewTarget: 'pathways'
       }
     ]
  },
  ravi: {
    initials: 'RK',
    name: 'Ravi Kulkarni',
    role: 'Data Quality Lead',
    score: 76,
    learningHours: 14.0,
    skillsInMotion: 10,
    skillsCount: 24,
    streak: 5,
    focus: 'Government Data Privacy',
    completion: 64,
    greeting: 'Good morning, Ravi',
    intro: 'Your next quality improvement plan is ready.',
    secondaryFocus: 'Improve data quality and privacy compliance',
    focusText: 'Prioritize secure data use and quality feedback loops.',
    activeSkills: ['Privacy', 'Quality', '+1 more'],
    radar: { Statistical: 73, Behavioural: 72, Technical: 70, 'Digital governance': 61 },
    pathwayTitle: 'Government Data Privacy',
    pathwayIntro: 'Recommended because your role leads quality assurance and privacy-sensitive data flows.',
    pathwayHeroMeta: 'Module 2 of 8 · 64% complete',
    pathwayCourseTitle: 'Government Data Privacy',
    pathwayAllLabel: 'Three focused routes shaped by your data privacy and quality operations profile.',
    gaps: [
      { domain: 'Privacy compliance', target: 82, current: 57, points: 25 },
      { domain: 'Data stewardship', target: 74, current: 58, points: 16 },
      { domain: 'Cloud security', target: 78, current: 60, points: 18 }
    ],
    // Bar chart data (moderate scores)
    barChartData: [35, 42, 48, 52, 58, 62, 65, 70],
    // Streak data (5 day streak - broken pattern)
    streakDays: [false, true, false, true, true, true, false, false, true],
    // Trend data for metric cards
    scoreTrend: 7.8,
    hoursTrend: 9.4,
    skillsTrend: 5.3,
    streakTrend: 2.1,
    lastReview: 70,
    // Competency bars for overview panel
    competencyBars: [
      { label: 'Technical', score: 70, color: 'blue', percentage: 70 },
      { label: 'Statistical', score: 73, color: 'green', percentage: 73 },
      { label: 'Digital governance', score: 61, color: 'orange', percentage: 61 },
      { label: 'Behavioural', score: 72, color: 'purple', percentage: 72 }
    ],
    // Pathway hero widget
    pathwayHeroCompletion: 64,
    // Pathway cards data
    pathwayCards: [
      {
        icon: 'mint-icon',
        symbol: '◎',
        title: 'Government Data Privacy',
        source: 'iGOT KARMAYOGI',
        meta: '64% complete',
        description: '6 modules · 2h 40m remaining',
        progress: 64
      },
      {
        icon: 'blue',
        symbol: '⌬',
        title: 'Data Quality Standards',
        source: 'NSSTA · TPAC 2026',
        meta: 'Recommended',
        description: '5 modules · 2h 30m total',
        progress: 20
      },
      {
        icon: 'yellow',
        symbol: '▥',
        title: 'Cloud Security Basics',
        source: 'iGOT KARMAYOGI',
        meta: 'New',
        description: '4 modules · 1h 45m total',
        progress: 5
      }
    ],
    // Notifications for Ravi
    notifications: [
      {
        icon: 'course',
        title: 'Privacy compliance module ready',
        description: 'Government Data Privacy · Module 3 is waiting for you',
        time: '3 hours ago',
        unread: true,
        viewTarget: 'pathways'
      },
      {
        icon: 'new',
        title: 'Data security alert',
        description: 'New encryption protocols available for data protection',
        time: '1 day ago',
        unread: true,
        viewTarget: 'pathways'
      },
      {
        icon: 'programme',
        title: 'Quality audit scheduled',
        description: 'Annual data quality audit is scheduled for September 20',
        time: '1 week ago',
        unread: false,
        viewTarget: 'pathways'
      }
    ]
  }
};

function injectProfileSwitcher() {
  const topActions = document.querySelector('.top-actions');
  if (!topActions || topActions.querySelector('#profileMenu')) return;
  const profileSwitcher = document.createElement('div');
  profileSwitcher.className = 'profile-switcher';
  profileSwitcher.innerHTML = `<button class="profile-button" id="profileButton" type="button" aria-haspopup="true" aria-expanded="false" aria-controls="profileMenu">
    <span class="profile-avatar" id="profileAvatar">SS</span>
    <span class="profile-copy">
      <span class="profile-name" id="profileName">Shaurya Salke</span>
      <span class="profile-role" id="profileRole">CEO</span>
    </span>
    <span class="profile-chevron" id="profileChevron">⌄</span>
  </button>
  <div class="profile-menu" id="profileMenu" role="menu" aria-hidden="true">
    <div class="profile-menu-head"><span class="section-kicker">PROFILE SWITCHER</span><span class="profile-menu-count">3 users</span></div>
    <button class="profile-option active" type="button" data-profile="shaurya">
      <span class="profile-option-avatar">SS</span><span class="profile-option-copy"><b>Shaurya Salke</b><small>CEO</small></span><span class="profile-option-score">74 / 100</span>
    </button>
    <button class="profile-option" type="button" data-profile="ananya">
      <span class="profile-option-avatar">AS</span><span class="profile-option-copy"><b>Ananya Sen</b><small>Senior Statistical Officer</small></span><span class="profile-option-score">81 / 100</span>
    </button>
    <button class="profile-option" type="button" data-profile="ravi">
      <span class="profile-option-avatar">RK</span><span class="profile-option-copy"><b>Ravi Kulkarni</b><small>Data Quality Lead</small></span><span class="profile-option-score">76 / 100</span>
    </button>
  </div>`;
  topActions.appendChild(profileSwitcher);
};

injectProfileSwitcher();

const profileButton = document.getElementById('profileButton');
const profileMenu = document.getElementById('profileMenu');
const profileName = document.getElementById('profileName');
const profileRole = document.getElementById('profileRole');
const profileAvatar = document.getElementById('profileAvatar');

function renderProfile(key = 'shaurya') {
  const profile = profiles[key] || profiles.shaurya;
  if (profileName) profileName.textContent = profile.name;
  if (profileRole) profileRole.textContent = profile.role;
  if (profileAvatar) profileAvatar.textContent = profile.initials;

  if (document.querySelector('#overview .page-intro h1')) {
    document.querySelector('#overview .page-intro h1').innerHTML = `${profile.greeting}<span class="accent-dot">.</span>`;
  }
  if (document.querySelector('#overview .intro-copy')) {
    document.querySelector('#overview .intro-copy').textContent = profile.intro;
  }
  if (document.querySelector('#overview .focus-banner strong em')) {
    document.querySelector('#overview .focus-banner strong em').textContent = profile.focus;
  }
  if (document.querySelector('#overview .focus-banner p')) {
    document.querySelector('#overview .focus-banner p').textContent = profile.focusText;
  }
  if (document.querySelector('#overview .progress-number')) {
    document.querySelector('#overview .progress-number').innerHTML = `${profile.completion}<span>%</span>`;
  }
  if (document.querySelector('#overview .progress-track span')) {
    document.querySelector('#overview .progress-track span').style.width = `${profile.completion}%`;
  }

  const cards = Array.from(document.querySelectorAll('#overview .metric-card'));
  if (cards.length >= 4) {
    const hoursWhole = Math.floor(profile.learningHours);
    const hoursFraction = String(Math.round((profile.learningHours - hoursWhole) * 10));
    cards[0].querySelector('.metric-value').innerHTML = `${profile.score}<span>/100</span>`;
    cards[1].querySelector('.metric-value').innerHTML = `${hoursWhole}<span>.${hoursFraction}h</span>`;
    cards[2].querySelector('.metric-value').innerHTML = `${profile.skillsInMotion}<span>/${profile.skillsCount}</span>`;
    cards[3].querySelector('.metric-value').innerHTML = `${String(profile.streak).padStart(2,'0')}<span> days</span>`;

   // Update trend badges
   const trends = Array.from(document.querySelectorAll('#overview .metric-top .trend'));
   if (trends.length >= 3) {
     trends[0].innerHTML = `↑ ${profile.scoreTrend}%`;
     trends[1].innerHTML = `↑ ${profile.hoursTrend}%`;
     trends[2].innerHTML = `↑ ${profile.skillsTrend}%`;
   }

   // Update last review text
   const lastReviewSmall = cards[0].querySelector('small');
   if (lastReviewSmall && profile.lastReview) {
     lastReviewSmall.textContent = `vs. ${profile.lastReview} in your last review`;
   }

   const skills = cards[2].querySelector('.skill-pills');
   if (skills) skills.innerHTML = (profile.activeSkills || []).map(skill => `<span>${skill}</span>`).join('');

   // Update mini-bars chart for competency score (card 0)
   const miniBars = cards[0].querySelector('.mini-bars');
   if (miniBars && profile.barChartData) {
    miniBars.innerHTML = profile.barChartData.map((height, index) => {
      const isCurrent = index === profile.barChartData.length - 1;
      return `<i style="height:${height}%"${isCurrent ? ' class="current"' : ''}></i>`;
    }).join('');
   }

   // Update hour-line progress for learning hours (card 1)
   const hourLine = cards[1].querySelector('.hour-line span');
   if (hourLine) {
    const goalHours = 25;
    const progressPercent = Math.min((profile.learningHours / goalHours) * 100, 100);
     hourLine.style.width = `${progressPercent}%`;
    }

    // Update streak dots for streak card (card 3)
    const streakDots = cards[3].querySelector('.streak-dots');
    if (streakDots && profile.streakDays) {
     streakDots.innerHTML = profile.streakDays.map((isActive, index) => {
       const isToday = index === profile.streakDays.length - 1;
       if (isToday) {
         return `<i class="today"${isActive ? '' : ' style="opacity:0.3"'}></i>`;
       } else {
         return `<i${isActive ? ' style="opacity:1"' : ''}></i>`;
       }
     }).join('');
    }
  }

  const pathwaysIntro = document.querySelector('#pathways .intro-copy');
  if (pathwaysIntro) pathwaysIntro.textContent = profile.pathwayAllLabel;

  const pathwayHero = document.querySelector('#pathways .pathway-hero h2');
  if (pathwayHero) pathwayHero.textContent = profile.pathwayTitle;

  const pathwayHeroIntro = document.querySelector('#pathways .pathway-hero p');
  if (pathwayHeroIntro) pathwayHeroIntro.textContent = profile.pathwayIntro;

  const pathwayMeta = document.querySelector('#pathways .hero-meta');
  if (pathwayMeta) pathwayMeta.textContent = profile.pathwayHeroMeta;

  const pathwayCourseTitle = document.querySelector('#pathways .wide-card:nth-child(1) h3');
  if (pathwayCourseTitle) pathwayCourseTitle.textContent = profile.pathwayCourseTitle;

  const competencyRows = document.querySelectorAll('#competencies .competency-row b');
  const scoreMap = profile.radar || {};
  const competencyRowsScore = Array.from(competencyRows);
  if (competencyRowsScore.length >= 2) {
    competencyRowsScore[0].textContent = scoreMap.Statistical ?? 81;
    competencyRowsScore[1].textContent = scoreMap.Technical ?? 58;
  }

  const radarLabelsDom = Array.from(document.querySelectorAll('#competencies .radar-label'));
  const radarDomainOrder = ['Statistical', 'Behavioural', 'Technical', 'Digital governance'];
  radarDomainOrder.forEach((domain, index) => {
    const score = profile.radar[domain] ?? 0;
    const label = radarLabelsDom[index];
    if (!label) return;
    label.innerHTML = `${domain}<br><b>${score}</b>`;
    label.dataset.domain = domain;
    label.dataset.score = score;
    label.dataset.target = index === 0 ? 85 : index === 1 ? 80 : index === 2 ? 75 : 70;
  });

  const competencyScore = document.querySelector('#competencies .score-badge');
  if (competencyScore) competencyScore.textContent = `${profile.score} / 100`;

  const gapRows = Array.from(document.querySelectorAll('#competencies .gap-item'));
  if (gapRows.length >= 1) {
    const selected = profile.gaps || profiles.shaurya.gaps;
    selected.forEach((item, index) => {
      const row = gapRows[index];
      if (!row) return;
      const strong = row.querySelector('strong');
      const small = row.querySelector('small');
      const gapPercent = row.querySelector('.gap-percent');
      if (strong) strong.textContent = item.domain;
      if (small) small.textContent = `Role target: ${item.target} · Current: ${item.current}`;
      if (gapPercent) gapPercent.textContent = `${item.points} pts`;
    });
  }

  // Update competency bars in overview panel
  const competencyRowsOverview = Array.from(document.querySelectorAll('#overview .gaps-panel .competency-row'));
  if (competencyRowsOverview.length >= 4 && profile.competencyBars) {
   profile.competencyBars.forEach((bar, index) => {
     const row = competencyRowsOverview[index];
     if (row) {
       const span = row.querySelector('span');
       const barElement = row.querySelector('.bar i');
       const score = row.querySelector('b');
       if (span) span.textContent = bar.label;
       if (barElement) {
         barElement.style.width = `${bar.percentage}%`;
         barElement.className = bar.color;
       }
       if (score) score.textContent = bar.score;
     }
   });
  }

  // Update pathway cards in overview panel (dashboard grid)
  const pathwayItems = Array.from(document.querySelectorAll('#overview .pathway-list .pathway-item'));
  if (pathwayItems.length >= 3 && profile.pathwayCards) {
   profile.pathwayCards.forEach((card, index) => {
     const item = pathwayItems[index];
     if (item) {
       const icon = item.querySelector('.path-icon');
       const meta = item.querySelector('.path-meta');
       const title = item.querySelector('h3');
       const desc = item.querySelector('p');
       const progress = item.querySelector('.slim-progress span');
        
       if (icon) {
         icon.textContent = card.symbol;
         icon.className = `path-icon ${card.icon}`;
       }
       if (meta) {
         meta.innerHTML = `<span>${card.source}</span><b>${card.meta}</b>`;
       }
       if (title) title.textContent = card.title;
       if (desc) desc.textContent = card.description;
       if (progress) progress.style.width = `${card.progress}%`;
     }
   });
  }

  // Update pathway cards in full pathways page
  const wideCards = Array.from(document.querySelectorAll('#pathways .wide-pathway-grid .wide-card'));
  if (wideCards.length >= 3 && profile.pathwayCards) {
   profile.pathwayCards.forEach((card, index) => {
     const wideCard = wideCards[index];
     if (wideCard) {
       const icon = wideCard.querySelector('.wide-icon');
       const source = wideCard.querySelector('.card-source');
       const title = wideCard.querySelector('h3');
       const desc = wideCard.querySelector('p');
        
       if (icon) {
         icon.textContent = card.symbol;
         icon.className = `wide-icon ${card.icon}`;
       }
       if (source) source.textContent = card.source;
       if (title) title.textContent = card.title;
       if (desc) desc.textContent = card.description;
     }
   });
  }

  // Update pathway hero completion ring
  const heroRing = document.querySelector('#pathways .hero-ring strong');
  if (heroRing && profile.pathwayHeroCompletion) {
   heroRing.textContent = profile.pathwayHeroCompletion;
  }

  // Update notifications for this profile
  const notificationItems = Array.from(document.querySelectorAll('.notification-item'));
  if (notificationItems.length >= 3 && profile.notifications) {
    profile.notifications.forEach((notif, index) => {
      const item = notificationItems[index];
      if (item) {
        const title = item.querySelector('.notification-copy strong');
        const description = item.querySelector('.notification-copy small');
        const time = item.querySelector('.notification-copy em');
        
        if (title) title.textContent = notif.title;
        if (description) description.textContent = notif.description;
        if (time) time.textContent = notif.time;
        
        // Update unread status
        if (notif.unread) {
          item.classList.add('unread');
        } else {
          item.classList.remove('unread');
        }
      }
    });
  }

  if (typeof competencyStats !== 'undefined') {
    competencyStats.r1.score = scoreMap.Statistical ?? 81;
    competencyStats.r1.target = 85;
    competencyStats.r2.score = scoreMap.Behavioural ?? 76;
    competencyStats.r2.target = 80;
    competencyStats.r3.score = scoreMap.Technical ?? 58;
    competencyStats.r3.target = 75;
    competencyStats.r4.score = scoreMap['Digital governance'] ?? 42;
    competencyStats.r4.target = 70;
  }

  document.querySelectorAll('#profileMenu .profile-option').forEach(item => item.classList.toggle('active', item.dataset.profile === key));
}

if (profileButton && profileMenu) {
  profileButton.addEventListener('click', event => {
    event.stopPropagation();
    const isOpen = profileMenu.classList.toggle('open');
    profileMenu.setAttribute('aria-hidden', String(!isOpen));
    profileButton.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('click', event => {
    if (!profileSwitcherContains(event.target)) {
      profileMenu.classList.remove('open');
      profileMenu.setAttribute('aria-hidden', 'true');
      profileButton.setAttribute('aria-expanded', 'false');
    }
  });
}

function profileSwitcherContains(target) {
  return profileMenu && profileButton && (profileMenu.contains(target) || profileButton.contains(target));
}

document.querySelectorAll('#profileMenu .profile-option').forEach(option => {
  option.addEventListener('click', () => {
    const selected = option.dataset.profile;
    renderProfile(selected);
    profileMenu.classList.remove('open');
    profileMenu.setAttribute('aria-hidden', 'true');
    profileButton?.setAttribute('aria-expanded', 'false');
    if (profileName) profileName.textContent = profiles[selected].name;
  });
});

// REMOVED: Was immediately hiding startup screen with !important styles
// Now using CSS animations instead - see hideStartupScreen() function at line 59

// REMOVED: Was hiding startup screen on DOMContentLoaded
// Startup animation now runs via CSS with 2.3 second timeout (see line 70)

const iconPaths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  route: '<path d="M5 19 19 5M11 5h8v8"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="m16.5 7.5 3-3"/>',
  sparkles: '<path d="m12 3-1.2 4.8L6 9l4.8 1.2L12 15l1.2-4.8L18 9l-4.8-1.2L12 3ZM19 15l-.6 2.4L16 18l2.4.6L19 21l.6-2.4L22 18l-2.4-.6L19 15ZM5 15l-.5 2L3 17.5l1.5.5L5 20l.5-2 1.5-.5-1.5-.5L5 15Z"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5M5 20h14"/>',
  check: '<path d="m5 12 4 4L19 6"/>'
};

function icon(name, className = '') {
  return `<svg class="ui-icon ${className}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name]}</svg>`;
}

document.querySelectorAll('.nav-item .nav-icon').forEach(element => {
  const map = { '◈': 'grid', '↗': 'route', '◌': 'target', '✦': 'sparkles', '▤': 'grid', '⌁': 'route' };
  element.innerHTML = icon(map[element.textContent.trim()] || 'grid');
});
document.querySelectorAll('.row-arrow, .circle-arrow').forEach(element => { element.innerHTML = icon('arrowUpRight'); });
document.querySelectorAll('.chevron').forEach(element => { element.innerHTML = icon('chevronDown'); });
document.querySelectorAll('.icon-button').forEach(element => { element.childNodes[0].textContent = ''; element.insertAdjacentHTML('afterbegin', icon('bell')); });
document.querySelectorAll('.upload-orb').forEach(element => { element.textContent = ''; element.insertAdjacentHTML('afterbegin', icon('upload')); });
document.querySelectorAll('.drop-icon').forEach(element => { element.textContent = ''; element.insertAdjacentHTML('afterbegin', icon('plus')); });
document.querySelectorAll('.primary-button span:first-child').forEach(element => {
  if (element.textContent.trim() === '✦') { element.textContent = ''; element.insertAdjacentHTML('afterbegin', icon('sparkles')); }
});
document.querySelectorAll('.banner-orbit, .streak-icon, .answer-note > span').forEach(element => {
  element.textContent = '';
  element.insertAdjacentHTML('afterbegin', icon('sparkles'));
});
document.querySelectorAll('.sync-arrow').forEach(element => {
  element.textContent = '';
  element.insertAdjacentHTML('afterbegin', icon('arrowUpRight'));
});
document.querySelectorAll('.path-icon, .wide-icon').forEach(element => {
  const name = element.classList.contains('yellow') ? 'grid' : element.classList.contains('coral') ? 'route' : element.classList.contains('mint-icon') ? 'target' : 'target';
  element.textContent = '';
  element.insertAdjacentHTML('afterbegin', icon(name));
});
document.querySelectorAll('.evidence-icon').forEach(element => {
  const name = element.classList.contains('quiz') ? 'sparkles' : element.classList.contains('course') ? 'grid' : 'check';
  element.textContent = '';
  element.insertAdjacentHTML('afterbegin', icon(name));
});

const competencyStats = {
  r1: { domain: 'Statistical', score: 81, target: 85, level: 'Strong foundation', detail: 'Survey design, sampling and official statistics', action: 'Deepen SDG indicators and metadata standards' },
  r2: { domain: 'Behavioural', score: 76, target: 80, level: 'On track', detail: 'Communication, leadership and project delivery', action: 'Practice communicating data stories' },
  r3: { domain: 'Technical', score: 58, target: 75, level: 'Growing capability', detail: 'Python, SQL, visualization and data workflows', action: 'Continue Python for Data Analysis' },
  r4: { domain: 'Digital governance', score: 42, target: 70, level: 'Priority focus', detail: 'Privacy, cybersecurity and government cloud', action: 'Start Government Data Privacy pathway' }
};
document.querySelectorAll('.radar-label').forEach(label => {
  const stats = competencyStats[[...label.classList].find(name => competencyStats[name])];
  if (!stats) return;
  label.tabIndex = 0;
  label.setAttribute('aria-label', `${stats.domain}: ${stats.score} out of 100, role target ${stats.target}. ${stats.level}. ${stats.action}`);
  label.dataset.domain = stats.domain;
  label.dataset.score = stats.score;
  label.dataset.target = stats.target;
});
const radarChart = document.querySelector('.radar-chart');
if (radarChart) {
  const radarTooltip = document.createElement('div');
  radarTooltip.className = 'radar-tooltip';
  radarTooltip.setAttribute('role', 'status');
  radarTooltip.setAttribute('aria-live', 'polite');
  radarChart.appendChild(radarTooltip);
  let pinnedLabel = null;
  const showRadarStats = label => {
    const gap = Number(label.dataset.target) - Number(label.dataset.score);
    const stats = competencyStats[[...label.classList].find(name => competencyStats[name])];
    const statusClass = gap >= 20 ? 'priority' : gap > 5 ? 'growing' : 'strong';
    radarTooltip.innerHTML = `<div class="radar-tooltip-title"><strong>${stats.domain}</strong><b class="radar-status ${statusClass}">${stats.level}</b></div><span class="radar-score"><b>${stats.score}</b><i>/100</i><small>role target ${stats.target}</small></span><div class="radar-gap"><i style="width:${Math.min(stats.score, 100)}%"></i></div><p>${stats.detail}</p><em>${gap > 0 ? `${gap} pts to close` : 'Target achieved'}</em><small class="radar-action">Next: ${stats.action}</small>`;
    radarTooltip.classList.add('visible');
  };
  const hideRadarStats = () => radarTooltip.classList.remove('visible');
  document.querySelectorAll('.radar-label').forEach(label => {
    label.addEventListener('mouseenter', () => showRadarStats(label));
    label.addEventListener('focus', () => showRadarStats(label));
    label.addEventListener('mouseleave', () => { if (pinnedLabel !== label) hideRadarStats(); });
    label.addEventListener('blur', () => { if (pinnedLabel !== label) hideRadarStats(); });
    label.addEventListener('click', event => {
      event.stopPropagation();
      if (pinnedLabel === label) {
        pinnedLabel = null;
        label.classList.remove('selected');
        hideRadarStats();
        return;
      }
      document.querySelectorAll('.radar-label.selected').forEach(item => item.classList.remove('selected'));
      pinnedLabel = label;
      label.classList.add('selected');
      showRadarStats(label);
    });
  });
  radarChart.addEventListener('click', () => {
    if (!pinnedLabel) return;
    pinnedLabel.classList.remove('selected');
    pinnedLabel = null;
    hideRadarStats();
  });
}

function showView(id) {
  views.forEach(view => view.classList.toggle('active-view', view.id === id));
  navItems.forEach(item => item.classList.toggle('active', item.dataset.view === id));
  pageTitle.textContent = titleMap[id] || 'Overview';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
navItems.forEach(item => item.addEventListener('click', () => showView(item.dataset.view)));
document.querySelectorAll('[data-view-target]').forEach(button => button.addEventListener('click', () => showView(button.dataset.viewTarget)));

const fileInput = document.getElementById('fileInput');
const fileLabel = document.getElementById('fileLabel');
const dropzone = document.getElementById('dropzone');
const emptyPreview = document.getElementById('emptyPreview');
const generatedQuiz = document.getElementById('generatedQuiz');
const previewTitle = document.getElementById('previewTitle');
const generateBtn = document.getElementById('generateBtn');

const studioSettings = document.createElement('div');
studioSettings.className = 'llm-settings';
studioSettings.innerHTML = `<div class="llm-setting-head"><span class="section-kicker">MODEL CONNECTION</span><span class="llm-status" id="llmStatus">Not connected</span></div><label>Gemini API key<input id="geminiKey" type="password" placeholder="Paste your Gemini API key" autocomplete="off" /></label><p>Used only in this browser session. Get a key from Google AI Studio.</p><label>Learning material<textarea id="materialText" rows="6" placeholder="Paste the text you want the AI to study..."></textarea></label>`;
document.querySelector('.upload-head')?.after(studioSettings);
const geminiKey = document.getElementById('geminiKey');
const materialText = document.getElementById('materialText');
const llmStatus = document.getElementById('llmStatus');
if (geminiKey) geminiKey.value = sessionStorage.getItem('statwise_gemini_key') || '';
if (geminiKey?.value) llmStatus.textContent = 'Key ready';

function readLearningMaterial() {
  if (materialText?.value.trim()) return Promise.resolve(materialText.value.trim());
  const file = fileInput.files[0];
  if (file?.type === 'text/plain' || file?.name.toLowerCase().endsWith('.txt')) return file.text();
  return Promise.resolve('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function renderGeneratedQuiz(quiz) {
  const questions = Array.isArray(quiz.questions) ? quiz.questions : [];
  generatedQuiz.innerHTML = questions.map((item, questionIndex) => `<article class="generated-question"><div class="quiz-meta"><span>QUESTION ${String(questionIndex + 1).padStart(2, '0')} / ${questions.length}</span><b>${escapeHtml(item.difficulty || 'Adaptive')}</b></div><h3>${escapeHtml(item.question || 'Question unavailable')}</h3><div class="answer-options">${(item.options || []).map((option, optionIndex) => `<button type="button" data-correct="${optionIndex === Number(item.answerIndex)}"><i>${String.fromCharCode(65 + optionIndex)}</i> ${escapeHtml(option)}</button>`).join('')}</div><div class="answer-note"><span>${icon('sparkles')}</span><p><strong>Why this is correct</strong><br>${escapeHtml(item.explanation || 'Review the source material for the reasoning behind this answer.')}</p></div></article>`).join('');
  generatedQuiz.classList.add('visible');
}

// Known-good Gemini model IDs, tried in order until one succeeds. Google
// periodically retires model versions, and free-tier keys have zero quota
// for "pro" models, so a single hardcoded name can 404 or hit a quota wall.
const GEMINI_MODEL_CANDIDATES = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-flash-latest'];

async function generateWithGemini(material) {
  const key = geminiKey.value.trim();
  const questionCount = Number(document.querySelector('.settings-row select:last-child')?.value.match(/\d+/)?.[0] || 10);
  const difficulty = document.querySelector('.settings-row select:nth-of-type(2)')?.value || 'Adaptive';
  const prompt = `You create rigorous learning assessments for India's Official Statistical System. Read the learning material below and generate exactly ${questionCount} multiple-choice questions at ${difficulty} difficulty. Cover distinct concepts, avoid ambiguity, and use only information supported by the material. Return JSON only.\n\nLearning material:\n${material.slice(0, 30000)}`;
  const responseSchema = {
    type: 'OBJECT',
    properties: {
      title: { type: 'STRING' },
      questions: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            question: { type: 'STRING' },
            options: { type: 'ARRAY', items: { type: 'STRING' } },
            answerIndex: { type: 'INTEGER' },
            explanation: { type: 'STRING' },
            difficulty: { type: 'STRING' }
          },
          required: ['question', 'options', 'answerIndex', 'explanation']
        }
      }
    },
    required: ['title', 'questions']
  };

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  let lastError;
  for (const model of GEMINI_MODEL_CANDIDATES) {
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { temperature: 0.25, responseMimeType: 'application/json', responseSchema } })
      });
      if (response.ok) {
        const payload = await response.json();
        const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error('Gemini returned no quiz content');
        return JSON.parse(text);
      }

      const errorBody = await response.json().catch(() => ({}));
      lastError = new Error(`Gemini request failed (${response.status}): ${errorBody.error?.message || response.statusText}`);

      if (response.status === 404 || response.status === 429) break; // model unavailable/over quota for this key, try next model
      if (response.status === 503 && attempt < maxAttempts) {
        await sleep(attempt * 1500); // brief backoff, then retry same model
        continue;
      }
      if (response.status !== 503) throw lastError; // non-retryable error
    }
  }
  throw lastError || new Error('No Gemini model available for this API key');
}

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) fileLabel.textContent = file.name;
});
['dragenter', 'dragover'].forEach(eventName => dropzone.addEventListener(eventName, event => {
  event.preventDefault();
  dropzone.classList.add('dragging');
}));
['dragleave', 'drop'].forEach(eventName => dropzone.addEventListener(eventName, event => {
  event.preventDefault();
  dropzone.classList.remove('dragging');
}));
dropzone.addEventListener('drop', event => {
  const file = event.dataTransfer.files[0];
  if (file) fileLabel.textContent = file.name;
});

generatedQuiz.addEventListener('click', event => {
  const option = event.target.closest('.answer-options button');
  if (!option) return;
  option.parentElement.querySelectorAll('button').forEach(item => item.classList.remove('selected'));
  option.classList.add('selected');
  showToast(option.dataset.correct === 'true' ? 'Correct answer selected' : 'Answer selected');
});

const toast = document.createElement('div');
toast.className = 'toast';
document.body.appendChild(toast);
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

document.querySelectorAll('.nav-item:not([data-view])').forEach(item => {
  item.addEventListener('click', () => {
    showView('pathways');
    showToast(`${item.textContent.trim()} opened`);
  });
});

const notificationButton = document.querySelector('.icon-button');
const notificationMenu = document.getElementById('notificationMenu');
const notificationDot = document.querySelector('.notification-dot');

function closeNotifications() {
  if (!notificationMenu || !notificationButton) return;
  notificationMenu.classList.remove('open');
  notificationMenu.setAttribute('aria-hidden', 'true');
  notificationButton.setAttribute('aria-expanded', 'false');
}

notificationButton?.addEventListener('click', event => {
  event.stopPropagation();
  const isOpen = notificationMenu?.classList.toggle('open');
  notificationMenu?.setAttribute('aria-hidden', String(!isOpen));
  notificationButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
});
notificationMenu?.addEventListener('click', event => event.stopPropagation());
document.addEventListener('click', closeNotifications);
document.querySelector('.mark-read')?.addEventListener('click', () => {
  document.querySelectorAll('.notification-item.unread').forEach(item => item.classList.remove('unread'));
  notificationDot?.classList.add('hidden');
  showToast('Notifications marked as read');
});
document.querySelectorAll('.notification-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.remove('unread');
    if (!document.querySelector('.notification-item.unread')) notificationDot?.classList.add('hidden');
    closeNotifications();
    if (item.dataset.viewTarget) showView(item.dataset.viewTarget);
  });
});
document.querySelector('.notification-footer button')?.addEventListener('click', () => {
  closeNotifications();
  showToast('Notification history opened');
});
document.querySelector('.profile')?.addEventListener('click', () => showToast('Profile menu is ready'));
document.querySelector('.help-link')?.addEventListener('click', () => showToast('Help centre opened'));
document.querySelector('.sync-card')?.addEventListener('click', () => showToast('iGOT connection is healthy'));
document.querySelector('.circle-arrow')?.addEventListener('click', () => showView('pathways'));

const supportModal = document.getElementById('supportModal');
const supportForm = document.getElementById('supportForm');
const helpButton = document.querySelector('.help-link');
const supportNameInput = supportForm?.querySelector('input[name="name"]');
if (supportNameInput) supportNameInput.placeholder = 'ENTER YOUR NAME';

function closeSupport() {
  supportModal?.classList.remove('open');
  supportModal?.setAttribute('aria-hidden', 'true');
}

helpButton?.addEventListener('click', () => {
  supportModal?.classList.add('open');
  supportModal?.setAttribute('aria-hidden', 'false');
  supportForm?.querySelector('input')?.focus();
});
document.querySelector('.support-close')?.addEventListener('click', closeSupport);
document.querySelector('.support-cancel')?.addEventListener('click', closeSupport);
supportModal?.addEventListener('click', event => {
  if (event.target === supportModal) closeSupport();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeSupport();
});
supportForm?.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(supportForm);
  const subject = `Statwise support query from ${formData.get('name')}`;
  const body = `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nQuery:\n${formData.get('query')}`;
  window.location.href = `mailto:shauryasalke@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  closeSupport();
  showToast('Opening your email app');
  supportForm.reset();
});

document.querySelectorAll('.row-arrow').forEach(button => {
  button.addEventListener('click', () => {
    const cardTitle = button.closest('.pathway-item, .wide-card')?.querySelector('h3')?.textContent;
    if (button.closest('.pathway-item')) showView('pathways');
    showToast(cardTitle ? `${cardTitle} opened` : 'Pathway opened');
  });
});

document.querySelectorAll('.text-button').forEach(button => {
  button.addEventListener('click', () => {
    if (button.textContent.includes('Last 30 days')) {
      button.innerHTML = 'Last 90 days <span>⌄</span>';
      showToast('Showing the last 90 days');
    } else {
      showToast('Activity history opened');
    }
  });
});

document.querySelector('.more-button')?.addEventListener('click', () => showToast('Competency insights menu opened'));
document.querySelector('.upload-panel .url-field button')?.addEventListener('click', () => {
  const urlInput = document.querySelector('.url-field input');
  if (!urlInput.value.trim()) {
    showToast('Paste a learning resource URL first');
    urlInput.focus();
    return;
  }
  fileLabel.textContent = 'Learning resource linked';
  showToast('Learning resource added');
});

document.querySelectorAll('.answer-options button').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.answer-options button').forEach(item => item.classList.remove('selected'));
    option.classList.add('selected');
    showToast(option.classList.contains('correct') ? 'Correct answer selected' : 'Answer selected');
  });
});

document.querySelectorAll('.page-intro .outline-button, .page-intro .primary-button').forEach(button => {
  if (!button.dataset.viewTarget && button !== generateBtn) {
    button.addEventListener('click', () => showToast(`${button.textContent.trim()} action opened`));
  }
});

document.querySelectorAll('.pathway-hero .primary-button, .gap-detail .outline-button, .evidence-panel .text-button').forEach(button => {
  button.addEventListener('click', () => showToast('This learning action is ready to connect to your workspace'));
});

/**
 * Backend API Integration Functions
 */

// Track the current quiz and user for API operations
let currentQuizState = {
  quizId: null,
  userId: 'shaurya',
  responses: []
};

/**
 * Generate quiz using backend API (alternative to Gemini)
 */
async function generateWithBackendAPI(material) {
  try {
    const questionCount = Number(document.querySelector('.settings-row select:last-child')?.value.match(/\d+/)?.[0] || 10);
    const difficulty = document.querySelector('.settings-row select:nth-of-type(2)')?.value || 'medium';
    const quizType = document.querySelector('.settings-row select:nth-of-type(1)')?.value || 'MCQ';
    
    const response = await apiClient.generateQuiz({
      text: material.slice(0, 30000),
      quiz_type: quizType,
      difficulty: difficulty.toLowerCase(),
      num_questions: questionCount,
      competency_domain: 'General Competencies',
      language: 'en',
      user_id: currentQuizState.userId,
      learner_id: currentQuizState.userId
    });
    
    currentQuizState.quizId = response.quiz_id;
    
    // Transform backend response to match frontend format
    const transformedQuiz = {
      title: 'AI-generated assessment',
      questions: response.questions.map(q => ({
        question: q.question_text,
        options: q.options,
        answerIndex: q.options.indexOf(q.correct_answer),
        explanation: q.explanation,
        difficulty: q.difficulty,
        questionId: q.question_id
      }))
    };
    
    return transformedQuiz;
  } catch (error) {
    console.error('Backend quiz generation failed:', error);
    throw new Error(`Backend quiz generation failed: ${error.message}`);
  }
}

/**
 * Load user profile from backend
 */
async function loadUserProfileFromBackend(userId = 'shaurya') {
  try {
    const profile = await apiClient.getCompetencyProfile(userId);
    
    // Update UI with profile competencies
    if (profile.competencies) {
      const gapRows = Array.from(document.querySelectorAll('#competencies .gap-item'));
      profile.competencies.slice(0, 3).forEach((comp, index) => {
        const row = gapRows[index];
        if (!row) return;
        const strong = row.querySelector('strong');
        const small = row.querySelector('small');
        const gapPercent = row.querySelector('.gap-percent');
        if (strong) strong.textContent = comp.name;
        if (small) small.textContent = `Target: ${comp.target_level} · Current: ${comp.level}`;
        if (gapPercent) gapPercent.textContent = `${Math.round(comp.gap)} pts`;
      });
    }
    
    showToast('Profile loaded from backend');
    return profile;
  } catch (error) {
    console.warn('Failed to load profile from backend:', error);
    return null;
  }
}

/**
 * Upload content file to backend
 */
async function uploadContentToBackend(file, title) {
  try {
    const response = await apiClient.uploadContent(file, title, currentQuizState.userId);
    showToast(`Content "${title}" uploaded successfully (ID: ${response.content_id.slice(0, 8)}...)`);
    return response;
  } catch (error) {
    console.error('Content upload failed:', error);
    throw error;
  }
}

/**
 * Submit quiz responses for evaluation
 */
async function submitQuizToBackend() {
  if (!currentQuizState.quizId) {
    showToast('No active quiz to submit');
    return;
  }
  
  try {
    // Collect selected answers from UI
    const responses = [];
    document.querySelectorAll('.generated-question').forEach((question, index) => {
      const selectedOption = question.querySelector('.answer-options button.selected');
      if (selectedOption) {
        const questionId = question.dataset.questionId || `q${index}`;
        const selectedAnswer = selectedOption.textContent.match(/[A-D]/)?.[0];
        if (selectedAnswer) {
          responses.push({
            question_id: questionId,
            selected_option: selectedAnswer
          });
        }
      }
    });
    
    if (responses.length === 0) {
      showToast('Please select answers before submitting');
      return;
    }
    
    const result = await apiClient.evaluateQuiz(
      currentQuizState.quizId,
      responses,
      currentQuizState.userId
    );
    
    // Show results
    const scorePercentage = Math.round((result.score / responses.length) * 100);
    showToast(`Quiz submitted! Score: ${result.score}/${responses.length} (${scorePercentage}%)`);
    
    // Display feedback
    const feedbackHtml = result.feedback.map(f => `
      <div style="padding: 8px; border-left: 3px solid ${f.is_correct ? '#10b981' : '#ef4444'}; margin: 8px 0;">
        <strong>${f.is_correct ? '✓' : '✗'} Question ${f.question_id.slice(0, 8)}</strong>
        <p>${f.explanation}</p>
      </div>
    `).join('');
    
    console.error('Quiz evaluation error:', error);
    return result;
  } catch (error) {
    console.error('Quiz submission failed:', error);
    showToast(`Quiz submission failed: ${error.message}`);
  }
}

/**
 * Get learning recommendations based on quiz performance
 */
async function getRecommendationsFromBackend() {
  try {
    const recommendations = await apiClient.getRecommendations(currentQuizState.userId);
    
    if (recommendations.recommended_courses) {
      const coursesHtml = recommendations.recommended_courses
        .map(course => `<li><strong>${course.title}</strong> <a href="${course.url}" target="_blank">View ↗</a></li>`)
        .join('');
      showToast(`${recommendations.recommended_courses.length} courses recommended for you`);
      console.info('Recommended courses retrieved successfully');
    }
    
    return recommendations;
  } catch (error) {
    console.warn('Failed to get recommendations:', error);
    return null;
  }
}

/**
 * Enhanced generate button handler with backend integration
 */
const generateClickHandler = async () => {
  if (!geminiKey.value.trim()) {
    showToast('Using backend API for quiz generation...');
  }
  
  const material = await readLearningMaterial();
  if (!material) {
    showToast('Paste learning material or upload a TXT file first');
    materialText.focus();
    return;
  }
  
  sessionStorage.setItem('statwise_gemini_key', geminiKey.value.trim());
  llmStatus.textContent = 'Generating...';
  generateBtn.disabled = true;
  generateBtn.innerHTML = '<span>✦</span> Generating...';
  
  try {
    let quiz;

    // Prefer Gemini when a key is supplied; the backend has no LLM key
    // configured by default and only returns placeholder questions.
    if (geminiKey.value.trim()) {
      quiz = await generateWithGemini(material);
      llmStatus.textContent = 'Gemini connected';
    } else {
      quiz = await generateWithBackendAPI(material);
      llmStatus.textContent = 'Backend connected';
    }
    
    emptyPreview.style.display = 'none';
    previewTitle.textContent = quiz.title || 'AI-generated assessment';
    document.getElementById('questionCount').textContent = `${quiz.questions.length} Qs`;
    renderGeneratedQuiz(quiz);
    generateBtn.innerHTML = '<span>✓</span> Quiz generated';
  } catch (error) {
    llmStatus.textContent = 'Connection error';
    showToast(error.message);
    generateBtn.innerHTML = '<span>✦</span> Try again';
  } finally {
    generateBtn.disabled = false;
  }
};

// Attach the handler to the generate button
generateBtn.addEventListener('click', generateClickHandler);

/**
 * Initialize backend connection on page load
 */
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize dark mode
    initializeDarkMode();
    
    // Try to load user profile
    await loadUserProfileFromBackend(currentQuizState.userId);
  } catch (error) {
    console.warn('Failed to initialize backend:', error);
  }
});
