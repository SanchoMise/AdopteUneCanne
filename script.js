/* ═══════════════════════════════════════════
   DONNÉES PRODUITS
═══════════════════════════════════════════ */
const CANNES = {
  republicaine: {
    nom: 'La Républicaine',
    collection: 'Collection Institutionnelle',
    matiere: 'Chêne des forêts domaniales · Poignée tricolore laquée',
    desc: 'Issue des chênes centenaires du domaine de Fontainebleau. Poignée tricolore laquée. Gravée en lettres dorées : Liberté · Égalité · Sénilité. Recommandée pour les déplacements officiels et les réunions de famille où l\'autorité doit se voir.',
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
    desc: 'Notre pièce de référence absolue. Ébène certifié FSC. Poignée plaquée or 18 carats. Gravure laser du coq gaulois sur le fût — animal choisi pour sa capacité à faire beaucoup de bruit dès l\'aube sans que personne ne lui ait rien demandé. Livrée dans un écrin de velours rouge avec certificat d\'authenticité signé. Le modèle de ceux qui avancent dans la vie avec le sentiment d\'avoir toujours eu raison. Vous vous reconnaîtrez.',
    prix: 489,
  },
  sensuelle: {
    nom: 'La Sensuelle',
    collection: 'Collection Nouvelle-Aquitaine',
    matiere: 'Sycomore · Pommeau cuir naturel tanné',
    desc: 'Pommeau recouvert de peau de bite — provenance certifiée, donneur consentant, région Nouvelle-Aquitaine (appellation non contrôlée). Forme anatomiquement fidèle, validée par scanner 3D au CHU de Bordeaux dans le cadre d\'un protocole de recherche dont nous préférons taire l\'intitulé exact. Grip incomparable par temps humide. Pour celui qui, toute sa vie, en a tenu des plus petites sans se plaindre.',
    prix: 269,
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
  _canneEnCours = id;

  // Image en background-image : méthode la plus fiable sur iOS Safari
  const fileMap = {
    republicaine:   'Canne-Republicaine',
    souveraine:     'Canne-Souveraine',
    resistante:     'Canne-Resistante',
    presidentielle: 'Canne-Presidentielle',
    sensuelle:      'Canne-Sensuelle',
  };
  const src = `assets/${fileMap[id]}.png`;
  const panelImg = document.getElementById('panel-img');
  panelImg.style.backgroundImage = `url('${src}')`;
  panelImg.style.backgroundSize  = 'contain';
  panelImg.style.backgroundPosition = 'center';
  panelImg.style.backgroundRepeat = 'no-repeat';
  panelImg.style.backgroundOrigin = 'content-box';
  if (id === 'presidentielle') {
    panelImg.style.backgroundColor = '#e8d9b0';
  } else {
    panelImg.style.backgroundColor = '';
  }

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
  requestAnimationFrame(() => {
    document.getElementById('panel').scrollTop = 0;
  });
  document.body.style.overflow = 'hidden';
}

function fermerPanel(e) {
  if (e && e.target !== document.getElementById('panel-overlay')) return;
  _fermerPanel();
}
function _fermerPanel() {
  document.getElementById('panel-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Swipe down to dismiss — listener unique, pas d'empilement
(function initSwipeClose() {
  const panel = document.getElementById('panel');
  let startY = 0;
  panel.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
  }, { passive: true });
  panel.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientY - startY;
    // Ne fermer que si swipe vers le bas ET on est en haut du scroll
    if (delta > 70 && panel.scrollTop === 0) _fermerPanel();
  }, { passive: true });
})();

let _canneEnCours = null;

function partagerCanne() {
  const url = window.location.href;
  const nom = _canneEnCours ? CANNES[_canneEnCours]?.nom : 'une canne';
  const fallback = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => alert('Lien copié !')).catch(() => prompt('Copiez ce lien :', url));
    } else {
      prompt('Copiez ce lien :', url);
    }
  };
  if (navigator.share) {
    navigator.share({
      title: `Adopte une Canne — ${nom}`,
      text: `La République recommande ${nom} pour l'heureux grand-père de la Nafion.`,
      url,
    }).catch((err) => {
      if (err.name !== 'AbortError') fallback();
    });
  } else {
    fallback();
  }
}

let _paiementTimer = null;

function ouvrirPaiement() {
  const c = _canneEnCours ? CANNES[_canneEnCours] : null;
  if (!c) return;
  document.getElementById('cb-article-nom').textContent = c.nom;
  document.getElementById('cb-article-prix').textContent = c.prix.toFixed(2).replace('.', ',') + ' €';
  document.getElementById('cb-numero').value = '';
  document.getElementById('cb-expiry').value = '';
  document.getElementById('cb-cvv').value = '';
  document.getElementById('cb-nom').value = '';
  // Affiche le formulaire, cache le succès
  document.getElementById('paiement-formulaire').classList.add('visible');
  document.getElementById('paiement-succes').classList.remove('visible');
  document.getElementById('popup-paiement').classList.add('open');
  // Reset scroll du contenu
  requestAnimationFrame(() => {
    const scroll = document.querySelector('.popup-cb-scroll');
    if (scroll) scroll.scrollTop = 0;
  });
  // Gag : le paiement « passe » tout seul après 2 s, sans rien cliquer
  clearTimeout(_paiementTimer);
  _paiementTimer = setTimeout(validerPaiement, 2000);
}
function fermerPaiement(e) {
  if (e.target !== document.getElementById('popup-paiement')) return;
  fermerPaiementBtn();
}
function fermerPaiementBtn() {
  clearTimeout(_paiementTimer);
  document.getElementById('popup-paiement').classList.remove('open');
}
function validerPaiement() {
  clearTimeout(_paiementTimer);
  const ref = 'RF-' + Math.random().toString(36).substring(2,8).toUpperCase() + '-2026';
  document.getElementById('succes-ref').textContent = ref;
  document.getElementById('paiement-formulaire').classList.remove('visible');
  document.getElementById('paiement-succes').classList.add('visible');
}
function formatCB(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = v.replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(input) {
  let v = input.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 3) v = v.substring(0,2) + ' / ' + v.substring(2);
  input.value = v;
}


/* ═══════════════════════════════════════════
   CARTE À GRATTER
═══════════════════════════════════════════ */
const scratch = (function initScratch() {
  const canvas = document.getElementById('scratch-canvas');
  if (!canvas) return {};

  const ctx = canvas.getContext('2d');
  const SEUIL_POPUP  = 0.50;
  const VISUAL_SCALE = 1 / SEUIL_POPUP; // 50% réel = 100% visuel

  const fillEl    = document.getElementById('scratch-progress-fill');
  const pctEl     = document.getElementById('scratch-pct');
  const btnRejouer = document.getElementById('btn-rejouer');
  const doigtEl   = document.getElementById('reveal-doigt');

  // ── État réinitialisable ──────────────────
  let isDrawing  = false;
  let doigtShown = false;
  let bonusShown = false;

  function drawGold() {
    ctx.globalCompositeOperation = 'source-over';
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
    ctx.font = 'bold 13px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ GRATTEZ ICI ✦', W/2, H/2 - 9);
    ctx.font = '11px Arial, sans-serif';
    ctx.fillText('Révélez votre bon républicain', W/2, H/2 + 10);
  }

  function resizeCanvas() {
    const w = canvas.parentElement.offsetWidth;
    canvas.width  = w;
    canvas.height = 180;
    drawGold();
  }

  function reset() {
    doigtShown = false;
    bonusShown = false;
    doigtEl.classList.remove('visible');
    if (fillEl) { fillEl.style.width = '0%'; fillEl.classList.remove('pret'); }
    if (pctEl)  { pctEl.textContent = '0 %'; pctEl.classList.remove('pret'); }
    if (btnRejouer) btnRejouer.style.display = 'none';
    drawGold();
  }

  function getRatio() {
    const W = canvas.width, H = canvas.height;
    const data = ctx.getImageData(0, 0, W, H).data;
    let t = 0;
    for (let i = 3; i < data.length; i += 64) { if (data[i] < 128) t++; }
    return t / (W * H / 16);
  }

  function doScratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, Math.min(canvas.width * 0.065, 24), 0, Math.PI*2);
    ctx.fill();
    const ratio = getRatio();

    // Barre de progression (50% réel = 100% visuel)
    const visualPct = Math.min(ratio * VISUAL_SCALE * 100, 100);
    if (fillEl) {
      fillEl.style.width = visualPct + '%';
      if (visualPct >= 100) fillEl.classList.add('pret');
    }
    if (pctEl) {
      pctEl.textContent = Math.round(visualPct) + ' %';
      if (visualPct >= 100) pctEl.classList.add('pret');
    }

    // Doigt d'honneur
    if (!doigtShown && ratio > 0.06) {
      doigtShown = true;
      doigtEl.classList.add('visible');
    }

    // Popup à 50%
    if (!bonusShown && ratio >= SEUIL_POPUP) {
      bonusShown = true;
      if (btnRejouer) btnRejouer.style.display = 'block';
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

  canvas.addEventListener('mousedown',  (e) => { isDrawing = true;  doScratch(...getPos(e)); });
  canvas.addEventListener('mousemove',  (e) => { if (isDrawing) doScratch(...getPos(e)); });
  canvas.addEventListener('mouseup',    ()  => { isDrawing = false; });
  canvas.addEventListener('mouseleave', ()  => { isDrawing = false; });
  canvas.addEventListener('touchstart', (e) => { e.preventDefault(); isDrawing = true;  doScratch(...getPos(e)); }, { passive: false });
  canvas.addEventListener('touchmove',  (e) => { e.preventDefault(); if (isDrawing) doScratch(...getPos(e)); },  { passive: false });
  canvas.addEventListener('touchend',   ()  => { isDrawing = false; });

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  return { reset };
})();


/* ═══════════════════════════════════════════
   REJOUER
═══════════════════════════════════════════ */
function rejouerScratch() {
  scratch.reset();
}

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
  const overlay = document.getElementById('popup-overlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    const corps = overlay.querySelector('.popup-corps');
    if (corps) corps.scrollTop = 0;
    const ameli = overlay.querySelector('.popup-ameli');
    if (ameli) ameli.scrollTop = 0;
  });
}
function fermerPopup(e) {
  if (e.target !== document.getElementById('popup-overlay')) return;
  fermerPopupBtn();
}
function fermerPopupBtn() {
  document.getElementById('popup-overlay').classList.remove('open');
  document.body.style.overflow = '';
}
