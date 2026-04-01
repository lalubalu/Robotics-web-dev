/* ============================================================
   BUILD ROBOTICS STUDIO — Application Logic
   ============================================================ */

/* ---- Mock Data ---- */
const MOCK = {
  users: [
    { id:1, name:'Alex Chen',       initials:'AC', role:'lead',     school:'MIT',          points:4850, skills:['Python','ROS2','CAD','ML'],            projects:5, badges:['🏆','⚡','🔥','🎯','🤖'] },
    { id:2, name:'Maya Rodriguez',  initials:'MR', role:'builder',  school:'Stanford',     points:3920, skills:['Arduino','PCB','Fusion360','C++'],      projects:4, badges:['⚡','🔥','🎯'] },
    { id:3, name:'Jordan Kim',      initials:'JK', role:'designer', school:'CalTech',      points:3540, skills:['SolidWorks','CAD','FEA','Prototyping'],  projects:3, badges:['🎨','🔥','🎯'] },
    { id:4, name:'Sam Patel',       initials:'SP', role:'mentor',   school:'CMU',          points:6200, skills:['AI/ML','PyTorch','Computer Vision','Leadership'], projects:8, badges:['🏆','⚡','🔥','🎯','🤖','👑'] },
    { id:5, name:'Riley Zhang',     initials:'RZ', role:'student',  school:'Georgia Tech', points:1840, skills:['Python','ROS2','Sensors'],              projects:2, badges:['⚡','🌱'] },
    { id:6, name:'Casey Morrison',  initials:'CM', role:'builder',  school:'UT Austin',    points:2760, skills:['Electronics','SLAM','Embedded C'],       projects:3, badges:['⚡','🔥'] },
    { id:7, name:'Priya Singh',     initials:'PS', role:'designer', school:'Purdue',       points:2190, skills:['Onshape','GD&T','3D Printing'],         projects:2, badges:['🎨','🌱'] },
    { id:8, name:'Devon Wells',     initials:'DW', role:'student',  school:'Michigan',     points:980,  skills:['Python basics','Arduino'],              projects:1, badges:['🌱'] },
  ],

  projects: [
    { id:1, name:'Autonomous Pathfinder', emoji:'🤖', desc:'A fully autonomous mobile robot using SLAM navigation and computer vision for obstacle detection in dynamic environments.', tags:['ROS2','CV','SLAM','Python'], status:'active',    members:[1,2,5], progress:72, category:'autonomous' },
    { id:2, name:'HydroBot 3000',         emoji:'🌊', desc:'Underwater ROV for marine exploration. Features 6-axis motion control, HD cameras, and real-time telemetry.',              tags:['Electronics','C++','CAD'],    status:'active',    members:[2,3,6], progress:55, category:'mechanical' },
    { id:3, name:'AI Sorting Arm',        emoji:'🦾', desc:'Robotic arm with ML-powered sorting capabilities. Uses YOLOv8 for object detection and classification in real time.',     tags:['ML','PyTorch','ROS','Python'],status:'active',    members:[4,1,7], progress:40, category:'ai'         },
    { id:4, name:'SwarmBots',             emoji:'🐝', desc:'Multi-robot swarm coordination system using emergent behavior algorithms inspired by biological systems.',                 tags:['Python','AI','Sensors'],      status:'planning',  members:[1,5,8], progress:15, category:'autonomous' },
    { id:5, name:'ExoArm Assist',         emoji:'💪', desc:'Assistive exoskeleton arm for rehabilitation. EMG-controlled with haptic feedback and adaptive learning.',                 tags:['Firmware','CAD','ML','C++'],  status:'active',    members:[3,4,6,7], progress:88, category:'biotech'  },
    { id:6, name:'MARS Rover Sim',        emoji:'🚀', desc:'High-fidelity simulation of a Martian surface exploration rover built with ROS2 and Gazebo for competition prep.',        tags:['ROS2','Gazebo','Python'],     status:'completed', members:[1,2,3,4], progress:100, category:'autonomous'},
  ],

  events: [
    { id:1, name:'Regional Robotics Championship', date:new Date(2026,3,12), type:'competition', desc:'Annual regional competition. All active teams must register by April 5th.' },
    { id:2, name:'Python & ROS2 Workshop',          date:new Date(2026,3,3),  type:'workshop',    desc:'Beginner-friendly workshop covering ROS2 basics and Python integration.' },
    { id:3, name:'Weekly Build Challenge',           date:new Date(2026,3,4),  type:'challenge',   desc:'This week: design a gripper that can pick up objects of any shape.' },
    { id:4, name:'Computer Vision Bootcamp',         date:new Date(2026,3,18), type:'workshop',    desc:'Deep dive into OpenCV, YOLO, and real-time object detection.' },
    { id:5, name:'Spring Showcase Demo Day',         date:new Date(2026,3,25), type:'competition', desc:'Present your semester project to judges, alumni, and industry sponsors.' },
    { id:6, name:'Circuit Design Sprint',            date:new Date(2026,3,8),  type:'challenge',   desc:'48-hour PCB design challenge. Winners get featured on the main page!' },
  ],

  resources: [
    { id:1, title:'ROS2 Beginner Complete Guide',          type:'tutorial',  level:'beginner',     desc:'Step-by-step guide to setting up ROS2 Humble and building your first robot nodes.',                topic:'software',     views:1240, icon:'📖' },
    { id:2, title:'YOLOv8 Object Detection Integration',   type:'tutorial',  level:'intermediate', desc:"Integrate YOLO into your robot's vision pipeline with real-time inference on Jetson.",             topic:'ai',           views:890,  icon:'👁️' },
    { id:3, title:'FRC Robot Project Template',            type:'template',  level:'beginner',     desc:'Complete project scaffold for FRC competition robots. Includes Java WPILib setup.',                 topic:'firmware',     views:650,  icon:'📦' },
    { id:4, title:'Fusion360 for Robotics',                type:'video',     level:'beginner',     desc:'Video series covering CAD modeling for robot chassis, arms, and drive systems.',                    topic:'mechanical',   views:2100, icon:'🎥' },
    { id:5, title:'SLAM Navigation Deep Dive',             type:'guide',     level:'advanced',     desc:'Comprehensive guide covering GMapping, Cartographer, and Nav2 in ROS2.',                            topic:'software',     views:430,  icon:'📋' },
    { id:6, title:'PID Tuning Cheatsheet',                 type:'template',  level:'intermediate', desc:'Quick reference for PID controller tuning techniques with common robotics examples.',               topic:'firmware',     views:1560, icon:'⚡' },
    { id:7, title:'Motor Driver Selection Guide',          type:'guide',     level:'beginner',     desc:'How to pick the right motor controller for your application. Covers L298N to ODrive.',              topic:'electronics',  views:780,  icon:'🔌' },
    { id:8, title:'Python Machine Learning for Robots',    type:'tutorial',  level:'intermediate', desc:'Using scikit-learn and PyTorch for robot perception and behavior learning.',                        topic:'ai',           views:1100, icon:'🧠' },
  ],

  messages: {
    'general': [
      { id:1, userId:2, text:"Hey everyone! Just got the HydroBot thrusters mounted — it actually floats now! 🌊",                         time:'9:14 AM', date:'Today'     },
      { id:2, userId:4, text:"Incredible progress! Make sure to run the buoyancy tests before adding more components.",                    time:'9:18 AM', date:'Today'     },
      { id:3, userId:1, text:"Pathfinder completed its first full autonomous run this morning — no crashes! 🎉",                           time:'9:45 AM', date:'Today'     },
      { id:4, userId:5, text:"That's huge!! Can you share the ROS bag file? Would love to analyze the path planning.",                    time:'9:47 AM', date:'Today'     },
      { id:5, userId:3, text:"Reminder: design review for ExoArm is tomorrow at 3pm. Please come with your updated STEP files.",          time:'10:03 AM', date:'Today'    },
    ],
    'ai-team': [
      { id:1, userId:4, text:"New training results are in. mAP jumped from 67% to 81% after adding the augmentation pipeline!",           time:'8:30 AM', date:'Today'     },
      { id:2, userId:1, text:"Wow, that's a big jump. What augmentations did you use?",                                                   time:'8:35 AM', date:'Today'     },
      { id:3, userId:4, text:"Random crop, color jitter, and mosaic. The mosaic made the biggest difference by far.",                     time:'8:37 AM', date:'Today'     },
    ],
    'mechanical': [
      { id:1, userId:3, text:"Updated the chassis CAD. Reduced total weight by 400g using hollow structural tubes.",                      time:'7:55 AM', date:'Today'     },
      { id:2, userId:6, text:"Nice! Will that affect the moment of inertia significantly?",                                               time:'8:01 AM', date:'Today'     },
    ],
    'mentors': [
      { id:1, userId:4, text:"Mentor check-in: all teams are on track for the April showcase. Great work everyone, keep it up!",          time:'Yesterday', date:'Yesterday' },
    ],
    'dm-maya': [
      { id:1, userId:2, text:"Hey! Quick question on the thruster mount — do you have a sec?",                                            time:'2:30 PM', date:'Yesterday' },
      { id:2, userId:1, text:"Yeah for sure! What's up?",                                                                                 time:'2:32 PM', date:'Yesterday' },
    ],
    'dm-jordan': [],
  },
};

/* ---- State ---- */
const state = {
  currentUser: MOCK.users[0],
  currentPage: 'dashboard',
  currentChatRoom: 'general',
  notifOpen: false,
};

/* ============================================================
   LOADING
   ============================================================ */
function runLoader() {
  const bar = document.querySelector('.loader-bar');
  const status = document.querySelector('.loader-status');
  const steps = [
    [20, 'Checking workspace...'],
    [45, 'Loading projects...'],
    [65, 'Fetching members...'],
    [85, 'Almost there...'],
    [100, 'Ready.'],
  ];
  let i = 0;
  const tick = () => {
    if (i < steps.length) {
      const [pct, msg] = steps[i++];
      bar.style.width = pct + '%';
      status.textContent = msg;
      setTimeout(tick, 320 + Math.random() * 180);
    } else {
      setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('landing-page').style.display = '';
        initScrollReveal();
        initCounters();
      }, 300);
    }
  };
  tick();
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function initCounters() {
  document.querySelectorAll('.count-up').forEach(el => {
    const target = parseInt(el.dataset.target);
    const dur = 1800;
    const start = Date.now();
    const suffix = el.dataset.suffix || '';
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ============================================================
   NAVIGATION (Landing → App)
   ============================================================ */
function showLanding() {
  document.getElementById('app').classList.remove('active');
  document.getElementById('landing-page').style.display = '';
  window.scrollTo(0, 0);
}

function launchApp() {
  document.getElementById('landing-page').style.display = 'none';
  document.getElementById('app').classList.add('active');
  navigateTo('dashboard');
  setTimeout(() => {
    animateProgressBars();
    initCounters();
  }, 200);
  showToast('success', `Welcome back, ${state.currentUser.name.split(' ')[0]}!`, '47 members are online right now.');
}

function navigateTo(page) {
  document.querySelectorAll('.sidebar-nav-item').forEach(el => el.classList.toggle('active', el.dataset.page === page));
  document.querySelectorAll('.app-page').forEach(el => el.classList.toggle('active', el.id === 'page-' + page));

  const titles = {
    dashboard: 'Dashboard', projects: 'Project Hub', profiles: 'Members',
    chat: 'Chat', calendar: 'Calendar', resources: 'Resources',
    leaderboard: 'Leaderboard', about: 'About',
  };
  const titleEl = document.getElementById('topbar-title');
  if (titleEl) titleEl.textContent = titles[page] || page;
  state.currentPage = page;

  if (window.innerWidth <= 768) document.querySelector('.app-sidebar')?.classList.remove('open');
  if (page === 'dashboard') setTimeout(animateProgressBars, 200);
  if (page === 'leaderboard') setTimeout(initSkillBars, 200);
}

/* ============================================================
   PROGRESS BARS
   ============================================================ */
function animateProgressBars() {
  document.querySelectorAll('.prog-fill[data-width]').forEach(bar => {
    setTimeout(() => { bar.style.width = bar.dataset.width; }, 80);
  });
}

/* ============================================================
   CHAT
   ============================================================ */
function switchChatRoom(roomId) {
  state.currentChatRoom = roomId;
  document.querySelectorAll('.chat-room-row').forEach(el => el.classList.toggle('active', el.dataset.room === roomId));

  const names = {
    'general':'# general', 'ai-team':'# ai-team',
    'mechanical':'# mechanical', 'mentors':'# mentors',
    'dm-maya':'Maya Rodriguez', 'dm-jordan':'Jordan Kim',
  };
  const metaMap = {
    'general':'General discussion · 247 members',
    'ai-team':'AI/ML team channel · 3 members',
    'mechanical':'Mechanical design channel · 4 members',
    'mentors':'Mentors only channel · 5 mentors',
    'dm-maya':'Direct message · Maya Rodriguez',
    'dm-jordan':'Direct message · Jordan Kim',
  };

  const nameEl = document.getElementById('chat-room-name');
  if (nameEl) nameEl.textContent = names[roomId] || roomId;

  const el = document.querySelector('.chat-right-meta');
  if (el) el.textContent = metaMap[roomId] || '';

  renderMessages(roomId);

  const badge = document.querySelector(`[data-room="${roomId}"] .chat-room-badge`);
  if (badge) badge.remove();
}

function renderMessages(roomId) {
  const container = document.getElementById('chat-messages');
  if (!container) return;
  const messages = MOCK.messages[roomId] || [];
  container.innerHTML = '';
  let lastDate = '';

  messages.forEach(msg => {
    const user = MOCK.users.find(u => u.id === msg.userId);
    if (!user) return;
    const isOwn = msg.userId === state.currentUser.id;
    const avatarColors = { 1:'#e55b2d', 2:'#16a34a', 3:'#7c3aed', 4:'#2563eb', 5:'#0891b2', 6:'#d97706', 7:'#db2777', 8:'#64748b' };

    if (msg.date !== lastDate) {
      lastDate = msg.date;
      const d = document.createElement('div');
      d.className = 'chat-date-label';
      d.textContent = msg.date;
      container.appendChild(d);
    }

    const el = document.createElement('div');
    el.className = `chat-msg${isOwn ? ' own' : ''}`;
    el.innerHTML = `
      <div class="chat-msg-av" style="background:${avatarColors[user.id]||'#64748b'}">${user.initials}</div>
      <div class="chat-msg-body">
        ${!isOwn ? `<div class="chat-msg-sender">${user.name}</div>` : ''}
        <div class="chat-msg-bubble">${msg.text}</div>
        <div class="chat-msg-time">${msg.time}</div>
      </div>`;
    container.appendChild(el);
  });

  if (messages.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-3);font-size:.875rem">No messages yet. Start the conversation!</div>`;
  }

  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input?.value.trim();
  if (!text) return;

  const room = state.currentChatRoom;
  if (!MOCK.messages[room]) MOCK.messages[room] = [];

  MOCK.messages[room].push({
    id: Date.now(),
    userId: state.currentUser.id,
    text,
    time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
    date: 'Today',
  });

  input.value = '';
  input.style.height = 'auto';
  renderMessages(room);

  // Simulated reply
  if (['general','ai-team'].includes(room)) {
    const replies = [
      "That's great progress!",
      "Totally agree — let's sync on this.",
      "Nice work, keep it going! 🚀",
      "Can you share the details in the project channel?",
      "Good call. I'll take a look.",
    ];
    const responder = MOCK.users.find(u => u.id !== state.currentUser.id);
    if (responder) {
      setTimeout(() => {
        MOCK.messages[room].push({
          id: Date.now() + 1,
          userId: responder.id,
          text: replies[Math.floor(Math.random() * replies.length)],
          time: new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
          date: 'Today',
        });
        if (state.currentChatRoom === room) renderMessages(room);
      }, 1800 + Math.random() * 1200);
    }
  }
}

/* ============================================================
   CALENDAR
   ============================================================ */
let calendarDate = new Date(2026, 3, 1);

function renderCalendar() {
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthEl = document.getElementById('cal-month');
  if (monthEl) monthEl.textContent = `${months[calendarDate.getMonth()]} ${calendarDate.getFullYear()}`;

  const firstDay = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 0).getDate();
  const today = new Date();
  const cells = document.getElementById('calendar-cells');
  if (!cells) return;
  cells.innerHTML = '';

  const prevDays = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) {
    const c = document.createElement('div');
    c.className = 'cal-cell other-month';
    c.innerHTML = `<div class="cal-num">${prevDays - i}</div>`;
    cells.appendChild(c);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today.getDate() && calendarDate.getMonth() === today.getMonth() && calendarDate.getFullYear() === today.getFullYear();
    const c = document.createElement('div');
    c.className = `cal-cell${isToday ? ' today' : ''}`;

    const dayEvents = MOCK.events.filter(e =>
      e.date.getDate() === d && e.date.getMonth() === calendarDate.getMonth()
    );

    const dots = dayEvents.map(e => `<div class="cal-event-pip ${e.type}">${e.name}</div>`).join('');
    c.innerHTML = `<div class="cal-num">${d}</div><div class="cal-event-dots">${dots}</div>`;
    c.addEventListener('click', () => {
      if (dayEvents.length) showDayEvents(dayEvents[0]);
    });
    cells.appendChild(c);
  }

  const total = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  for (let i = 1; i <= total - firstDay - daysInMonth; i++) {
    const c = document.createElement('div');
    c.className = 'cal-cell other-month';
    c.innerHTML = `<div class="cal-num">${i}</div>`;
    cells.appendChild(c);
  }
}

function changeMonth(dir) {
  calendarDate.setMonth(calendarDate.getMonth() + dir);
  renderCalendar();
}

function showDayEvents(event) {
  openModal('event-modal');
  document.getElementById('modal-event-title').textContent = event.name;
  document.getElementById('modal-event-desc').textContent = event.desc;
  const typeEl = document.getElementById('modal-event-type');
  typeEl.textContent = event.type;
  typeEl.className = `chip chip-${event.type === 'competition' ? 'accent' : event.type === 'workshop' ? 'blue' : 'green'}`;
  document.getElementById('modal-event-date').textContent = event.date.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' });
}

/* ============================================================
   MODALS
   ============================================================ */
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

function openNewProjectModal() { openModal('new-project-modal'); }

function submitNewProject() {
  const name = document.getElementById('new-proj-name')?.value.trim();
  const desc = document.getElementById('new-proj-desc')?.value.trim();
  const cat = document.getElementById('new-proj-category')?.value;
  if (!name) { showToast('warning', 'Required', 'Please enter a project name.'); return; }

  const emojis = { autonomous:'🤖', mechanical:'⚙️', ai:'🧠', electronics:'⚡', biotech:'💪', software:'💻' };
  MOCK.projects.unshift({
    id: MOCK.projects.length + 1, name,
    desc: desc || 'A new Build Robotics Studio project.',
    emoji: emojis[cat] || '🚀',
    tags: [cat], status: 'planning',
    members: [state.currentUser.id], progress: 0, category: cat,
  });

  closeModal('new-project-modal');
  renderProjects('all');
  showToast('success', 'Project created!', `"${name}" is now live in the hub.`);

  if (document.getElementById('new-proj-name')) document.getElementById('new-proj-name').value = '';
  if (document.getElementById('new-proj-desc')) document.getElementById('new-proj-desc').value = '';
}

function openProjectDetail(proj) {
  openModal('project-detail-modal');
  const members = proj.members.map(id => MOCK.users.find(u => u.id === id)).filter(Boolean);
  const avatarColors = { 1:'#e55b2d', 2:'#16a34a', 3:'#7c3aed', 4:'#2563eb', 5:'#0891b2', 6:'#d97706', 7:'#db2777', 8:'#64748b' };

  document.getElementById('modal-proj-title').textContent = proj.name;
  document.getElementById('modal-proj-emoji').textContent = proj.emoji;
  document.getElementById('modal-proj-desc').textContent = proj.desc;

  const statusEl = document.getElementById('modal-proj-status');
  const statusClass = { active:'chip-green', planning:'chip-blue', completed:'chip-neutral' };
  statusEl.textContent = proj.status;
  statusEl.className = `chip ${statusClass[proj.status] || 'chip-neutral'}`;

  document.getElementById('modal-proj-progress').textContent = proj.progress + '%';
  const bar = document.getElementById('modal-proj-progress-bar');
  bar.style.width = '0';
  setTimeout(() => { bar.style.width = proj.progress + '%'; }, 80);

  document.getElementById('modal-proj-tags').innerHTML = proj.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('modal-proj-members').innerHTML = members.map(m => `
    <div style="display:flex;align-items:center;gap:.625rem;padding:.375rem 0">
      <div style="width:28px;height:28px;border-radius:50%;background:${avatarColors[m.id]||'#64748b'};display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:700;color:#fff;flex-shrink:0">${m.initials}</div>
      <div>
        <div style="font-size:.8125rem;font-weight:600;color:var(--text-1)">${m.name}</div>
        <div style="font-size:.6875rem;color:var(--text-3)">${m.school} · ${m.role}</div>
      </div>
    </div>`).join('');
}

/* ============================================================
   PROJECTS
   ============================================================ */
function renderProjects(filter) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  const data = filter === 'all' ? MOCK.projects : MOCK.projects.filter(p => p.status === filter || p.category === filter);
  const avatarColors = { 1:'#e55b2d', 2:'#16a34a', 3:'#7c3aed', 4:'#2563eb', 5:'#0891b2', 6:'#d97706', 7:'#db2777', 8:'#64748b' };

  grid.innerHTML = data.map(proj => {
    const avatars = proj.members.slice(0,4).map(id => {
      const u = MOCK.users.find(u => u.id === id);
      return u ? `<div class="member-avatar-xs" style="background:${avatarColors[id]||'#64748b'}">${u.initials}</div>` : '';
    }).join('');

    const statusMap = { active:'status-active', planning:'status-planning', completed:'status-completed' };
    const statusText = { active:'Active', planning:'Planning', completed:'Completed' };

    return `
    <div class="project-card reveal" onclick="openProjectDetail(MOCK.projects.find(p=>p.id===${proj.id}))">
      <div class="project-card-top">${proj.emoji}
        <span class="project-status ${statusMap[proj.status]||''}" style="position:absolute;top:.75rem;right:.75rem">${statusText[proj.status]||proj.status}</span>
      </div>
      <div class="project-card-body">
        <div class="project-card-name">${proj.name}</div>
        <div class="project-card-desc">${proj.desc}</div>
        <div class="project-tags">${proj.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div style="margin-bottom:.875rem">
          <div style="display:flex;justify-content:space-between;margin-bottom:.3rem">
            <span style="font-size:.6875rem;color:var(--text-3)">Progress</span>
            <span style="font-family:var(--font-mono);font-size:.6875rem;color:var(--text-2)">${proj.progress}%</span>
          </div>
          <div class="prog-bar"><div class="prog-fill" data-width="${proj.progress}%" style="width:0"></div></div>
        </div>
        <div class="project-card-footer">
          <div style="display:flex;align-items:center">
            <div class="member-stack">${avatars}</div>
            <span class="member-count-label">${proj.members.length} member${proj.members.length!==1?'s':''}</span>
          </div>
          <button class="btn btn-sm btn-outline" onclick="event.stopPropagation();joinProject(${proj.id})">
            ${proj.members.includes(state.currentUser.id) ? '✓ Joined' : '+ Join'}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');

  setTimeout(() => { initScrollReveal(); animateProgressBars(); }, 80);
}

function filterProjects(filter) {
  document.querySelectorAll('#projects-filter-bar .filter-tab').forEach(c => c.classList.toggle('active', c.dataset.filter === filter));
  renderProjects(filter);
}

function joinProject(id) {
  const proj = MOCK.projects.find(p => p.id === id);
  if (!proj || proj.members.includes(state.currentUser.id)) return;
  proj.members.push(state.currentUser.id);
  renderProjects('all');
  showToast('success', 'Joined!', `You joined "${proj.name}"`);
}

/* ============================================================
   NOTIFICATIONS
   ============================================================ */
function toggleNotifications() {
  state.notifOpen = !state.notifOpen;
  document.getElementById('notif-panel')?.classList.toggle('open', state.notifOpen);
}

function markAllRead() {
  document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
  document.getElementById('notif-pip')?.remove();
  showToast('info', 'Cleared', 'All notifications marked as read.');
  state.notifOpen = false;
  document.getElementById('notif-panel')?.classList.remove('open');
}

/* ============================================================
   LEADERBOARD SKILL BARS
   ============================================================ */
function initSkillBars() {
  document.querySelectorAll('.skill-bar-fill[data-width]').forEach(bar => {
    setTimeout(() => { bar.style.width = bar.dataset.width; }, 150);
  });
}

/* ============================================================
   PROFILE
   ============================================================ */
function openProfile(userId) {
  const user = MOCK.users.find(u => u.id === userId);
  if (!user) return;
  const colors = { 1:'#e55b2d', 2:'#16a34a', 3:'#7c3aed', 4:'#2563eb', 5:'#0891b2', 6:'#d97706', 7:'#db2777', 8:'#64748b' };
  const roleLabels = { lead:'chip-accent', builder:'chip-blue', designer:'chip-neutral', mentor:'chip-green', student:'chip-neutral' };

  openModal('profile-modal');
  const initEl = document.getElementById('modal-profile-initials');
  initEl.style.background = colors[user.id] || '#64748b';
  initEl.textContent = user.initials;

  document.getElementById('modal-profile-name').textContent = user.name;
  const roleEl = document.getElementById('modal-profile-role');
  roleEl.textContent = user.role;
  roleEl.className = `chip ${roleLabels[user.role] || 'chip-neutral'}`;
  document.getElementById('modal-profile-school').textContent = user.school;
  document.getElementById('modal-profile-points').textContent = user.points.toLocaleString();
  document.getElementById('modal-profile-skills').innerHTML = user.skills.map(s => `<span class="profile-skill">${s}</span>`).join('');
  document.getElementById('modal-profile-badges').innerHTML = user.badges.join(' ');
}

/* ============================================================
   RESOURCES FILTER
   ============================================================ */
function filterResources(topic) {
  document.querySelectorAll('.res-cat').forEach(c => c.classList.toggle('active', c.dataset.topic === topic));
  document.querySelectorAll('.resource-card').forEach(card => {
    card.style.display = topic === 'all' || card.dataset.topic === topic ? '' : 'none';
  });
}

/* ============================================================
   RSVP
   ============================================================ */
function rsvpEvent() {
  showToast('success', 'RSVP confirmed!', "You're registered. Check your calendar.");
  closeModal('event-modal');
}

/* ============================================================
   SIDEBAR TOGGLE (mobile)
   ============================================================ */
function toggleSidebar() {
  document.querySelector('.app-sidebar')?.classList.toggle('open');
}

/* ============================================================
   TOAST
   ============================================================ */
function showToast(type, title, message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icons = { success:'✓', info:'i', warning:'!', error:'✕' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">${icons[type] || 'i'}</div>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-msg">${message}</div>` : ''}
    </div>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 250);
  }, 4000);
}

/* ============================================================
   LIVE ACTIVITY SIMULATION
   ============================================================ */
function startLiveUpdates() {
  const updates = [
    () => showToast('info', 'Live update', 'Maya Rodriguez pushed new code to HydroBot'),
    () => showToast('info', 'New member', 'Devon Wells just joined the studio'),
    () => showToast('success', 'Milestone', 'ExoArm Assist reached 88% progress'),
    () => showToast('info', 'Reminder', 'Circuit Design Sprint starts in 1 hour'),
  ];
  let i = 0;
  setTimeout(() => {
    const iv = setInterval(() => {
      if (document.getElementById('app')?.classList.contains('active')) {
        updates[i % updates.length]();
        i++;
      }
      if (i >= updates.length) clearInterval(iv);
    }, 14000);
  }, 10000);
}

/* ============================================================
   DOM READY
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  runLoader();

  // Close notifications on outside click
  document.addEventListener('click', e => {
    if (state.notifOpen && !e.target.closest('#notif-panel') && !e.target.closest('#notif-btn')) {
      state.notifOpen = false;
      document.getElementById('notif-panel')?.classList.remove('open');
    }
  });

  // Chat textarea
  const chatInput = document.getElementById('chat-input');
  if (chatInput) {
    chatInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    chatInput.addEventListener('input', () => {
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
    });
  }

  // Nav scroll effect
  const nav = document.querySelector('.site-nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.style.boxShadow = window.scrollY > 10 ? '0 1px 0 var(--border)' : 'none';
  }, { passive: true });

  // Init project rendering
  renderProjects('all');

  // Start live updates after user enters the app
  startLiveUpdates();
});
