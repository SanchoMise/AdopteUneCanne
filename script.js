/* ═══════════════════════════════════════════
   DONNÉES PRODUITS
═══════════════════════════════════════════ */
const CANNES = {
  republicaine: {
    nom: 'La Républicaine',
    collection: 'Collection Institutionnelle',
    matiere: 'Chêne des forêts domaniales · Poignée tricolore laquée',
    desc: 'Issue des chênes centenaires du domaine de Fontainebleau. Poignée tricolore laquée, gravée en lettres dorées : Liberté · Égalité · Sénilité. Recommandée pour les déplacements officiels et les réunions de famille où l\'autorité doit se voir.',
    prix: 189,
  },
  souveraine: {
    nom: 'La Souveraine',
    collection: 'Collection Institutionnelle',
    matiere: 'Hêtre du Massif Central · Livrée bleu Élysée',
    desc: 'Teintée dans l\'exact numéro Pantone des portes du Palais de l\'Élysée (vérification effectuée sur site à nos frais). Embout antidérapant certifié NF P98-405 alinéa 3. Convient aux parquets cirés et aux couloirs du pouvoir.',
    prix: 215,
  },
  resistante: {
    nom: 'La Résistante',
    collection: 'Collection Corrèze',
    matiere: 'Châtaignier de Corrèze · Grip caoutchouc Clermont-Ferrand',
    desc: 'Section renforcée brevet INPI n°FR2026-00341 pour tenir tête aux petits-enfants agités, aux chiens de voisins et aux décisions gouvernementales inopportunes. Grip caoutchouc vulcanisé à Clermont-Ferrand depuis 1898.',
    prix: 172,
  },
  presidentielle: {
    nom: 'La Présidentielle',
    collection: 'Collection Prestige',
    matiere: 'Ébène FSC · Poignée or 18 carats · Coq gaulois gravé laser',
    desc: 'Notre pièce de référence. Ébène certifié FSC. Poignée plaquée or 18 carats. Gravure laser du coq gaulois sur le fût. Livrée dans un écrin de velours rouge avec certificat d\'authenticité signé (fac-similé — l\'original est occupé ailleurs).',
    prix: 489,
  },
  sensuelle: {
    nom: 'La Sensuelle',
    collection: 'Collection Ardèche',
    matiere: 'Sycomore · Pommeau cuir de veau naturel tanné',
    desc: 'Pommeau ergonomique recouvert de cuir de veau pleine fleur tanné en Ardèche, dont la forme, disons, anatomiquement inspirée, a été validée par le Comité d\'Éthique de la Poignée Républicaine (séance à huis clos, procès-verbal disponible sous conditions). Pour celui qui tient toujours bien en main les situations.',
    prix: 267,
  },
};

let reductionActive = 0;


/* ═══════════════════════════════════════════
   INIT — dates
═══════════════════════════════════════════ */
(function initTextes() {
  const mois = ['janvier','février','mars','avril','mai','juin',
                 'juillet','août','septembre','octobre','novembre','décembre'];
  const auj = new Date();
  const dateStr = `${auj.getDate()} ${mois[auj.getMonth()]} ${auj.getFullYear()}`;
  ['date-jorf', 'date-courrier'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = dateStr;
  });

  const bonNum = document.getElementById('bon-numero');
  if (bonNum) bonNum.textContent = Math.random().toString(36).substring(2,8).toUpperCase();

  const codeActe = document.getElementById('code-acte');
  if (codeActe) {
    const codes = ['PENAGR-7742-B','AMELI-XXL-003','MNSP-2026-VRIL','DGS-CONF-0069','HCMR-TURG-42'];
    codeActe.textContent = codes[Math.floor(Math.random() * codes.length)];
  }
  const dateValidite = document.getElementById('date-validite-penis');
  if (dateValidite) {
    const absurdes = [
      "jusqu'à ce que ça aille mieux",
      "29 février 2025 (non renouvelable)",
      "à la saint-glinglin, millésime 2026",
      "1er janvier 2099 ou épuisement des stocks"
    ];
    dateValidite.textContent = absurdes[Math.floor(Math.random() * absurdes.length)];
  }
})();


/* ═══════════════════════════════════════════
   PANEL DÉTAIL
═══════════════════════════════════════════ */
function ouvrirPanel(id) {
  const c = CANNES[id];
  if (!c) return;

  // Copier le SVG de la carte dans le panel
  const carteSvg = document.querySelector(`[data-id="${id}"] .canne-svg`);
  const panelSvg = document.getElementById('panel-svg');
  panelSvg.innerHTML = carteSvg ? carteSvg.innerHTML : '';

  // Si prestige, fond doré sur l'image panel
  const panelImg = document.getElementById('panel-img');
  panelImg.style.background = id === 'presidentielle'
    ? 'linear-gradient(135deg,#f5efe0,#e8d9b0)'
    : '';

  document.getElementById('panel-breadcrumb-nom').textContent = c.nom;
  document.getElementById('panel-nom').textContent = c.nom;
  document.getElementById('panel-collection').textContent = c.collection;
  document.getElementById('panel-matiere-texte').textContent = c.matiere;
  document.getElementById('panel-desc').textContent = c.desc;

  // Prix
  const base = c.prix;
  const prixVal = document.getElementById('panel-prix-val');
  const prixBarre = document.getElementById('panel-prix-barre');
  const prixReduit = document.getElementById('panel-prix-reduit');

  if (reductionActive > 0) {
    const reduit = (base * (1 - reductionActive / 100)).toFixed(2).replace('.', ',');
    prixVal.style.display = 'none';
    prixBarre.textContent = base.toFixed(2).replace('.', ',') + ' €';
    prixBarre.style.display = 'inline';
    prixReduit.textContent = reduit + ' €';
    prixReduit.classList.add('visible');
  } else {
    prixVal.textContent = base.toFixed(2).replace('.', ',') + ' €';
    prixVal.style.display = 'inline';
    prixBarre.style.display = 'none';
    prixReduit.classList.remove('visible');
  }

  const overlay = document.getElementById('panel-overlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Swipe down pour fermer
  initSwipeClose();
}

function fermerPanel(e) {
  if (e && e.target !== document.getElementById('panel-overlay')) return;
  _fermerPanel();
}
function _fermerPanel() {
  document.getElementById('panel-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Swipe down to dismiss
function initSwipeClose() {
  const panel = document.getElementById('panel');
  let startY = 0;
  const onStart = (e) => { startY = (e.touches ? e.touches[0] : e).clientY; };
  const onEnd = (e) => {
    const endY = (e.changedTouches ? e.changedTouches[0] : e).clientY;
    if (endY - startY > 60) _fermerPanel();
    panel.removeEventListener('touchstart', onStart);
    panel.removeEventListener('touchend', onEnd);
  };
  panel.addEventListener('touchstart', onStart, { passive: true });
  panel.addEventListener('touchend', onEnd, { passive: true });
}

function copierUrl() {
  navigator.clipboard?.writeText(window.location.href).catch(() => {});
}


/* ═══════════════════════════════════════════
   CARTE À GRATTER
═══════════════════════════════════════════ */
(function initScratch() {
  const canvas = document.getElementById('scratch-canvas');
  if (!canvas) return;

  // Canvas prend la largeur de son parent
  function resizeCanvas() {
    const w = canvas.parentElement.offsetWidth;
    canvas.width = w;
    canvas.height = 180;
    drawGold();
  }

  const ctx = canvas.getContext('2d');
  function drawGold() {
    const W = canvas.width, H = canvas.height;
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0,   '#d4a017');
    grad.addColorStop(0.3, '#f0c040');
    grad.addColorStop(0.6, '#c9a227');
    grad.addColorStop(1,   '#b8860b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(180,140,0,0.25)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 50; i++) {
      const x = Math.random()*W, y = Math.random()*H;
      ctx.beginPath(); ctx.moveTo(x,y);
      ctx.lineTo(x + Math.random()*18-9, y + Math.random()*7-3.5);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(130,90,0,0.55)';
    ctx.font = `bold 13px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('✦ GRATTEZ ICI ✦', W/2, H/2 - 9);
    ctx.font = '11px Arial, sans-serif';
    ctx.fillText('Révélez votre bon républicain', W/2, H/2 + 10);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const GUIDES = [
    { seuil: 0.05, texte: 'Continuez à gratter, Monsieur Guérineau…' },
    { seuil: 0.20, texte: 'Vous brûlez. La République a quelque chose pour vous.' },
    { seuil: 0.40, texte: 'Encore un effort. Le bon se mérite.' },
    { seuil: 0.58, texte: 'Presque… la République retient son souffle.' },
    { seuil: 0.68, texte: 'Encore trois coups de doigt, Monsieur Guérineau.' },
  ];

  let isDrawing = false;
  let doigtShown = false, bonusShown = false;
  let lastGuide = -1;
  const guideEl = document.getElementById('scratch-guide');
  const fillEl = document.getElementById('scratch-progress-fill');
  const pctEl  = document.getElementById('scratch-pct');

  function getRatio() {
    const W = canvas.width, H = canvas.height;
    const data = ctx.getImageData(0, 0, W, H).data;
    let t = 0;
    for (let i = 3; i < data.length; i += 64) { if (data[i] < 128) t++; }
    return t / (W * H / 16);
  }

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, Math.min(canvas.width * 0.065, 24), 0, Math.PI*2);
    ctx.fill();
    const ratio = getRatio();

    // Barre de progression
    if (fillEl) {
      const pct = Math.min(ratio * 100, 100);
      fillEl.style.width = pct + '%';
      if (pctEl) pctEl.textContent = Math.round(pct) + ' %';
      if (pct >= 70) {
        fillEl.classList.add('pret');
        if (pctEl) pctEl.classList.add('pret');
      }
    }

    // Doigt d'honneur dès les premiers grattages
    if (!doigtShown && ratio > 0.08) {
      doigtShown = true;
      document.getElementById('reveal-doigt').classList.add('visible');
    }

    // Texte guide progressif
    for (let i = GUIDES.length - 1; i >= 0; i--) {
      if (ratio >= GUIDES[i].seuil && i !== lastGuide) {
        lastGuide = i;
        if (guideEl) guideEl.textContent = GUIDES[i].texte;
        break;
      }
    }

    // Popup à 70%
    if (!bonusShown && ratio > 0.70) {
      bonusShown = true;
      if (guideEl) guideEl.textContent = '';
      setTimeout(showPopupAmeli, 800);
    }
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const src = e.touches ? e.touches[0] : e;
    return [(src.clientX - rect.left)*sx, (src.clientY - rect.top)*sy];
  }

  canvas.addEventListener('mousedown',  (e) => { isDrawing = true;  scratch(...getPos(e)); });
  canvas.addEventListener('mousemove',  (e) => { if (isDrawing) scratch(...getPos(e)); });
  canvas.addEventListener('mouseup',    ()  => { isDrawing = false; });
  canvas.addEventListener('mouseleave', ()  => { isDrawing = false; });
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true;  scratch(...getPos(e)); }, { passive: false });
  canvas.addEventListener('touchmove',  (e) => { e.preventDefault(); if (isDrawing) scratch(...getPos(e)); },  { passive: false });
  canvas.addEventListener('touchend',   ()  => { isDrawing = false; });
})();


/* ═══════════════════════════════════════════
   PRIX
═══════════════════════════════════════════ */
function updatePrix(pct) {
  reductionActive = pct;
  document.querySelectorAll('.carte').forEach((carte) => {
    const base = parseFloat(carte.querySelector('[data-prix]')?.dataset.prix);
    if (!base) return;
    const reduit = (base * (1 - pct/100)).toFixed(2).replace('.', ',') + ' €';
    const baseEl = carte.querySelector('.carte-prix-base');
    const reduitEl = carte.querySelector('.carte-prix-reduit');
    if (baseEl) baseEl.style.textDecoration = 'line-through';
    if (reduitEl) { reduitEl.textContent = reduit; reduitEl.classList.add('visible'); }
  });
}


/* ═══════════════════════════════════════════
   POPUP AMELI
═══════════════════════════════════════════ */
function showPopupAmeli() {
  document.getElementById('popup-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function fermerPopup(e) {
  if (e.target !== document.getElementById('popup-overlay')) return;
  fermerPopupBtn();
}
function fermerPopupBtn() {
  document.getElementById('popup-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
