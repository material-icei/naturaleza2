/* =========================================================
   EXPLORADORES DEL CUERPO HUMANO · 2.º grado
   Lógica de la aplicación (JavaScript puro, sin librerías).

   ÍNDICE
   1. Contenidos (órganos, sistemas, módulos, medallas)  ← fácil de editar
   2. Progreso guardado (localStorage)
   3. Ilustraciones SVG (cuerpo, órganos, Doc)
   4. Utilidades (pantalla, arrastrar, festejos)
   5. Pantallas (portada, mapa, módulo, medallas, diploma)
   6. Actividades (lecciones y juegos)
   7. Inicio
   ========================================================= */
'use strict';

/* =========================================================
   1. CONTENIDOS
   ========================================================= */

const ORGANS = {
  corazon: {
    name: 'Corazón', art: 'el corazón',
    where: 'En el pecho, entre los dos pulmones.',
    does: 'Bombea la sangre a todo el cuerpo.',
    short: 'Bombea la sangre a todo el cuerpo.',
    fun: 'Tu corazón tiene casi el tamaño de tu puño. ¡Y nunca deja de latir!',
    riddle: 'Trabajo sin parar, impulso la sangre por tu cuerpo y estoy en tu pecho. ¿Quién soy?',
    clue: 'Hago «pum, pum» y lo podés sentir si apoyás la mano en el pecho.',
    system: 'circ'
  },
  pulmones: {
    name: 'Pulmones', art: 'los pulmones',
    where: 'En el pecho, uno a cada lado del corazón.',
    does: 'Reciben el oxígeno del aire que respiramos.',
    short: 'Nos ayudan a respirar.',
    fun: 'Cuando entra el aire, tus pulmones se inflan como dos globos.',
    riddle: 'Somos dos. Nos inflamos como globos cuando entra el aire. ¿Quiénes somos?',
    clue: 'Gracias a nosotros podés respirar.',
    system: 'resp'
  },
  cerebro: {
    name: 'Cerebro', art: 'el cerebro',
    where: 'Dentro de la cabeza.',
    does: 'Recibe la información de los sentidos y coordina los movimientos del cuerpo.',
    short: 'Coordina nuestro cuerpo.',
    fun: 'Tu cerebro sigue trabajando mientras dormís. ¡Por eso soñás!',
    riddle: 'Vivo en tu cabeza. Te ayudo a pensar, imaginar y recordar. ¿Quién soy?',
    clue: 'Dirijo todo lo que hace tu cuerpo.',
    system: 'nerv'
  },
  estomago: {
    name: 'Estómago', art: 'el estómago',
    where: 'En la panza, debajo de los pulmones.',
    does: 'Guarda los alimentos y los descompone en partes más pequeñas.',
    short: 'Descompone los alimentos.',
    fun: 'Cuando tenés hambre, tu estómago hace ruiditos. ¡Te está avisando!',
    riddle: 'Recibo la comida que tragás y la deshago en partes pequeñitas. ¿Quién soy?',
    clue: 'Cuando tenés hambre, hago ruiditos.',
    system: 'dig'
  },
  intestino: {
    name: 'Intestino', art: 'el intestino',
    where: 'En la panza, debajo del estómago.',
    does: 'Absorbe los nutrientes y el agua de los alimentos.',
    short: 'Absorbe los nutrientes.',
    fun: 'Está todo enrollado. Si lo estiraras, ¡mediría varios metros!',
    riddle: 'Soy muy largo y estoy enrollado en tu panza. Tomo los nutrientes de la comida. ¿Quién soy?',
    clue: 'Estoy justo debajo del estómago.',
    system: 'dig'
  }
};
const ORGAN_IDS = Object.keys(ORGANS);

const SYSTEMS = {
  circ: { name: 'Sistema circulatorio', emoji: '🩸', color: '#e63946', organs: ['corazon'],
    text: 'El corazón bombea la sangre. La sangre viaja por todo el cuerpo y le lleva oxígeno y nutrientes.' },
  resp: { name: 'Sistema respiratorio', emoji: '🌬️', color: '#3b9ae1', organs: ['pulmones'],
    text: 'Cuando respirás, el aire entra a los pulmones. Ellos toman el oxígeno que tu cuerpo necesita.' },
  dig: { name: 'Sistema digestivo', emoji: '🍎', color: '#f08a24', organs: ['estomago', 'intestino'],
    text: 'El estómago descompone los alimentos. Después, el intestino absorbe los nutrientes y el agua.' },
  nerv: { name: 'Sistema nervioso', emoji: '⚡', color: '#8e5cf7', organs: ['cerebro'],
    text: 'El cerebro recibe la información de los sentidos y coordina todo lo que hace tu cuerpo.' }
};
const TEAM_TEXT = 'Los pulmones toman el oxígeno. El corazón lo reparte con la sangre. El estómago y el intestino nos dan la energía de los alimentos. ¡Y el cerebro dirige a todo el equipo!';

const PARTS = {
  cabeza: { name: 'Cabeza', emoji: '🙂',
    text: 'En la cabeza están los ojos, la nariz, los oídos y la boca.', use: 'La necesitás para pensar, imaginar y decidir.' },
  tronco: { name: 'Tronco', emoji: '👕',
    text: 'Es la parte del medio. Está unido a la cabeza, a los brazos y a las piernas.', use: 'Adentro guarda órganos muy importantes.' },
  extrem: { name: 'Extremidades', emoji: '💪',
    text: 'Son los brazos y las piernas.', use: 'Gracias a ellas podés moverte y agarrar objetos.' }
};

const HABITS = [
  { id: 'alim', emoji: '🥗', name: 'Alimentación saludable', color: '#35c46a', text: 'Comer variado te da energía para crecer, jugar y aprender.' },
  { id: 'fruta', emoji: '🍎', name: 'Frutas y verduras', color: '#ef5b5b', text: 'Tienen vitaminas que te ayudan a crecer sano y fuerte. ¡Comelas todos los días!' },
  { id: 'hig', emoji: '🧼', name: 'Higiene', color: '#3b9ae1', text: 'Lavate las manos, cepillate los dientes y bañate. Así alejás a los gérmenes.' },
  { id: 'mov', emoji: '⚽', name: 'Actividad física', color: '#ff8a3d', text: 'Correr, saltar y jugar hace más fuertes tu corazón, tus pulmones y tus músculos.' },
  { id: 'desc', emoji: '😴', name: 'Descanso y agua', color: '#8e5cf7', text: 'Dormí bien cada noche y tomá mucha agua. Así tu cuerpo recupera energía.' }
];

/* Módulos del mapa de aventuras y sus actividades (en orden) */
const MODULES = [
  { id: 'm1', title: 'Conocemos nuestro cuerpo', emoji: '🧍', color: '#14b8a6', lead: 'Cabeza, tronco y extremidades', acts: ['m1_explora', 'm1_partes', 'm1_uso'] },
  { id: 'm2', title: 'Los órganos principales', emoji: '🫀', color: '#ff5d8f', lead: 'Corazón, pulmones, cerebro, estómago e intestino', acts: ['m2_explora', 'm2_donde', 'm2_unir', 'm2_quien', 'm2_mision'] },
  { id: 'm3', title: 'Los sistemas del cuerpo', emoji: '⚙️', color: '#7c5cff', lead: 'Los órganos trabajan en equipo', acts: ['m3_explora', 'm3_sistema', 'm3_vf'] },
  { id: 'm4', title: 'Cuidamos nuestro cuerpo', emoji: '🍎', color: '#ff8a3d', lead: 'Hábitos para crecer sanos y fuertes', acts: ['m4_explora', 'm4_juego'] }
];

/* Medallas (por actividades) e insignias (por módulo) */
const MEDALS = [
  { id: 'explorador', kind: 'medalla', emoji: '🧭', name: 'Explorador del cuerpo', how: 'Nombrá las partes del cuerpo', test: s => s.done.m1_partes },
  { id: 'detective', kind: 'medalla', emoji: '🕵️', name: 'Detective de los órganos', how: 'Completá «¿Quién soy?»', test: s => s.done.m2_quien },
  { id: 'guardian', kind: 'medalla', emoji: '❤️', name: 'Guardián del corazón', how: 'Completá «¿A qué sistema pertenece?»', test: s => s.done.m3_sistema },
  { id: 'respiracion', kind: 'medalla', emoji: '🌬️', name: 'Experto en respiración', how: 'Completá «Verdadero o falso»', test: s => s.done.m3_vf },
  { id: 'saludable', kind: 'medalla', emoji: '🥇', name: 'Campeón saludable', how: 'Completá «Cuidamos nuestro cuerpo»', test: s => s.done.m4_juego },
  { id: 'super', kind: 'medalla', emoji: '🔬', name: 'Supercientífico', how: 'Completá todas las actividades', test: s => allDone() },
  ...MODULES.map((m, i) => ({ id: 'ins_' + m.id, kind: 'insignia', emoji: m.emoji, name: 'Módulo ' + (i + 1), how: m.title, test: s => moduleDone(m) }))
];

const PRAISE = ['¡Excelente!', '¡Muy bien!', '¡Genial!', '¡Así se hace!', '¡Bravo!', '¡Qué bien pensaste!', '¡Sos un gran explorador!'];
const RETRY = ['¡Casi!', 'Probá otra vez.', '¡No pasa nada!', 'Vamos de nuevo.'];

/* =========================================================
   2. PROGRESO GUARDADO (localStorage)
   ========================================================= */

const STORAGE_KEY = 'exploradoresCuerpoHumano_v1';
let state = loadState();

function loadState() {
  const base = { stars: 0, done: {}, medals: {} };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === 'object') return Object.assign(base, saved);
  } catch (e) { /* sin almacenamiento: se juega igual, pero no se guarda */ }
  return base;
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* nada */ }
}
const ALL_ACTS = MODULES.flatMap(m => m.acts);
function moduleDone(m) { return m.acts.every(a => state.done[a]); }
function moduleUnlocked(i) { return i === 0 || moduleDone(MODULES[i - 1]); }
function allDone() { return ALL_ACTS.every(a => state.done[a]); }
function doneCount() { return ALL_ACTS.filter(a => state.done[a]).length; }

/* =========================================================
   3. ILUSTRACIONES SVG
   Cada órgano se dibuja en un cuadro de 100 x 100.
   ========================================================= */

function face(x1, y1, x2, y2, sx, sy) {
  const eye = (x, y) => `<circle cx="${x}" cy="${y}" r="4" fill="#3a2a2a"/><circle cx="${x + 1.4}" cy="${y - 1.4}" r="1.4" fill="#fff"/>`;
  return `<g class="face">${eye(x1, y1)}${eye(x2, y2)}
    <path d="M${sx - 6} ${sy} q6 7 12 0" fill="none" stroke="#3a2a2a" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="${x1 - 5}" cy="${y1 + 8}" r="3.4" fill="#ff5d8f" opacity=".35"/><circle cx="${x2 + 5}" cy="${y2 + 8}" r="3.4" fill="#ff5d8f" opacity=".35"/></g>`;
}

const ORGAN_ART = {
  corazon: `
    <path d="M37 40 V12" stroke="#5b8def" stroke-width="11" stroke-linecap="round" fill="none"/>
    <path d="M37 40 V12" stroke="#a9c6ff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>
    <path d="M54 36 V20 q0 -13 13 -13 q12 0 12 12 v5" stroke="#c9283a" stroke-width="12" stroke-linecap="round" fill="none"/>
    <path d="M54 36 V20 q0 -13 13 -13 q12 0 12 12 v5" stroke="#ff8a8a" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>
    <path d="M50 34 C40 22 14 26 14 50 C14 72 38 86 54 96 C70 84 88 70 86 48 C85 28 62 22 50 34Z" fill="url(#gHeart)" stroke="#8f1524" stroke-width="2"/>
    <path d="M50 38 C45 54 52 72 54 92" stroke="#8f1524" stroke-width="2.2" fill="none" opacity=".35" stroke-linecap="round"/>
    <ellipse cx="29" cy="44" rx="6" ry="11" fill="#fff" opacity=".4" transform="rotate(24 29 44)"/>
    ${face(38, 58, 64, 58, 51, 68)}`,
  pulmones: `
    <rect x="44.5" y="2" width="11" height="32" rx="5" fill="#f6d5c3" stroke="#d9a78d" stroke-width="1.6"/>
    <path d="M45 10h10M45 17h10M45 24h10" stroke="#d9a78d" stroke-width="1.6"/>
    <path d="M40 24 C22 26 8 52 8 76 C8 92 18 95 30 91 C42 87 44 80 44 66 V34 C44 28 43 24 40 24Z" fill="url(#gLung)" stroke="#c44e69" stroke-width="2"/>
    <path d="M60 24 C78 26 92 52 92 76 C92 92 82 95 70 91 C58 87 56 80 56 66 V34 C56 28 57 24 60 24Z" fill="url(#gLung)" stroke="#c44e69" stroke-width="2"/>
    <path d="M50 32 L35 48 M35 48 L24 54 M35 48 L32 64 M50 32 L65 48 M65 48 L76 54 M65 48 L68 64" stroke="#f6d5c3" stroke-width="4.5" stroke-linecap="round" fill="none"/>
    <ellipse cx="20" cy="50" rx="4" ry="10" fill="#fff" opacity=".4" transform="rotate(22 20 50)"/>
    <ellipse cx="72" cy="42" rx="3.5" ry="8" fill="#fff" opacity=".35" transform="rotate(-30 72 42)"/>
    ${face(20, 72, 34, 72, 27, 80)}${face(66, 72, 80, 72, 73, 80)}`,
  cerebro: `
    <path d="M52 66 q2 16 9 26" stroke="#e9a3ad" stroke-width="10" stroke-linecap="round" fill="none"/>
    <ellipse cx="72" cy="72" rx="15" ry="10" fill="#e88aa0" stroke="#c9607a" stroke-width="2"/>
    <path d="M60 70h24M62 75h20M64 66h16" stroke="#c9607a" stroke-width="1.5" opacity=".6"/>
    <path d="M20 58 C8 54 6 36 18 28 C20 14 38 8 48 14 C58 4 80 10 82 24 C96 28 98 50 86 58 C86 68 72 74 62 68 C52 76 36 74 32 66 C26 68 20 64 20 58Z" fill="url(#gBrain)" stroke="#c9607a" stroke-width="2"/>
    <g fill="none" stroke="#cf6a86" stroke-width="2.6" stroke-linecap="round" opacity=".8">
      <path d="M22 38 q8 -8 16 0 t14 2"/><path d="M34 22 q6 9 14 2"/><path d="M54 20 q10 -4 14 6 q-8 6 -2 12"/>
      <path d="M72 30 q10 2 12 13"/><path d="M26 56 q8 6 14 0"/><path d="M62 62 q8 4 16 -4"/>
    </g>
    <ellipse cx="28" cy="26" rx="5" ry="9" fill="#fff" opacity=".45" transform="rotate(40 28 26)"/>
    ${face(42, 46, 62, 46, 52, 54)}`,
  estomago: `
    <path d="M56 3 V24" stroke="#e98a6e" stroke-width="11" stroke-linecap="round" fill="none"/>
    <path d="M56 3 V24" stroke="#ffc9b3" stroke-width="4" stroke-linecap="round" fill="none" opacity=".7"/>
    <path d="M19 68 q-11 -2 -11 -13" stroke="#e98a6e" stroke-width="10" stroke-linecap="round" fill="none"/>
    <path d="M50 20 C70 14 90 30 86 54 C82 78 58 92 36 88 C22 86 12 76 14 66 C16 60 24 60 28 66 C34 74 46 70 48 56 C50 42 42 28 50 20Z" fill="url(#gStom)" stroke="#bf5238" stroke-width="2"/>
    <path d="M60 30 q16 8 12 28 M40 80 q20 0 32 -14" stroke="#bf5238" stroke-width="2.2" fill="none" opacity=".35" stroke-linecap="round"/>
    <ellipse cx="60" cy="27" rx="9" ry="4" fill="#fff" opacity=".4" transform="rotate(14 60 27)"/>
    ${face(58, 46, 76, 46, 67, 56)}`,
  intestino: `
    <path d="M22 88 V30 Q22 14 38 14 H62 Q78 14 78 30 V80 Q78 90 66 90 H58" stroke="#c96a55" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M22 88 V30 Q22 14 38 14 H62 Q78 14 78 30 V80 Q78 90 66 90 H58" stroke="#ee9c86" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <path d="M22 88 V30 Q22 14 38 14 H62 Q78 14 78 30 V80 Q78 90 66 90 H58" stroke="#c96a55" stroke-width="14" stroke-dasharray="1.5 9" fill="none" opacity=".45"/>
    <path d="M19 84 V30 Q19 17 34 16" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity=".45"/>
    <path d="M36 34 H62 q6 0 6 6 t-6 6 H40 q-6 0 -6 6 t6 6 H60 q6 0 6 6 t-6 6 H42 q-6 0 -6 6 t6 5 H52" stroke="#d9728c" stroke-width="12" stroke-linecap="round" fill="none"/>
    <path d="M36 34 H62 q6 0 6 6 t-6 6 H40 q-6 0 -6 6 t6 6 H60 q6 0 6 6 t-6 6 H42 q-6 0 -6 6 t6 5 H52" stroke="#f9bccb" stroke-width="8" stroke-linecap="round" fill="none"/>
    ${face(43, 50, 59, 50, 51, 58)}`
};

/* Órgano suelto (para tarjetas y botones) */
function organSVG(id) {
  return `<svg class="organ-svg" viewBox="-4 -4 108 108" aria-label="${ORGANS[id].name}">${ORGAN_ART[id]}</svg>`;
}

/* Dónde va cada órgano dentro del cuerpo: [x, y, escala] */
const ORGAN_POS = {
  cerebro: [114, 22, 0.72], pulmones: [105, 162, 0.9], corazon: [141, 198, 0.42],
  estomago: [148, 250, 0.48], intestino: [112, 294, 0.76]
};

/* Cuerpo completo.
   opciones: organs (ver órganos), wide (deja lugar a carteles), slots (carteles para completar) */
function bodySVG(o = {}) {
  const organs = o.organs !== false;
  const vb = o.wide ? '-176 0 652 620' : '0 0 300 620';
  const skin = 'url(#gSkin)';
  const organG = id => {
    const [x, y, s] = ORGAN_POS[id];
    return `<g class="organ" data-organ="${id}" transform="translate(${x} ${y}) scale(${s})">
      <g class="organ-in">${ORGAN_ART[id]}</g><rect width="100" height="100" fill="transparent"/></g>`;
  };
  const slots = (o.slots || []).map(s => {
    const w = 164, h = 48, left = s.x < 150;
    const sx = left ? s.x + w : s.x, sy = s.y + h / 2;
    const lines = s.to.map(p => `<path class="leader" d="M${sx} ${sy} L${p[0]} ${p[1]}"/><circle class="leader-dot" cx="${p[0]}" cy="${p[1]}" r="5"/>`).join('');
    return `${lines}<g data-drop="${s.id}"><rect class="slot" x="${s.x}" y="${s.y}" width="${w}" height="${h}" rx="14"/>
      <text class="slot-t" x="${s.x + w / 2}" y="${sy}">?</text></g>`;
  }).join('');

  return `<svg class="body-svg ${o.cls || ''}" viewBox="${vb}" aria-label="Cuerpo humano">
    <g class="part" data-part="extrem">
      <path d="M102 176 Q72 232 62 318" stroke="${skin}" stroke-width="27" stroke-linecap="round" fill="none"/>
      <path d="M198 176 Q228 232 238 318" stroke="${skin}" stroke-width="27" stroke-linecap="round" fill="none"/>
      <path d="M102 176 Q72 232 62 318 M198 176 Q228 232 238 318" stroke="#f4b98f" stroke-width="27" stroke-linecap="round" fill="none" opacity=".55"/>
      <circle cx="61" cy="326" r="16" fill="#f7c7a3"/><circle cx="239" cy="326" r="16" fill="#f7c7a3"/>
      <path d="M121 420 V556 M179 420 V556" stroke="#f6c39d" stroke-width="32" stroke-linecap="round" fill="none"/>
      <path d="M113 420 V550 M171 420 V550" stroke="#ffe2c9" stroke-width="8" stroke-linecap="round" fill="none" opacity=".7"/>
      <ellipse cx="114" cy="580" rx="27" ry="14" fill="#ff8a3d"/><ellipse cx="186" cy="580" rx="27" ry="14" fill="#ff8a3d"/>
      <path d="M92 584 h44 M164 584 h44" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      ${organs ? '' : `<path d="M102 176 Q90 198 84 222 M198 176 Q210 198 216 222" stroke="url(#gShirt)" stroke-width="33" stroke-linecap="round" fill="none"/>`}
    </g>
    <g class="part" data-part="tronco">
      <path d="M98 160 Q150 148 202 160 L208 376 Q150 388 92 376 Z" fill="${organs ? 'url(#gInside)' : 'url(#gShirt)'}" stroke="${organs ? '#f0b48c' : '#0e8577'}" stroke-width="3" stroke-linejoin="round"/>
      ${organs ? '' : `<path d="M132 156 Q150 172 168 156" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><text x="150" y="270" text-anchor="middle" font-size="44">⭐</text>`}
      <path d="M92 366 H208 L212 436 H158 L150 404 L142 436 H88 Z" fill="url(#gShorts)" stroke="#2f5cb8" stroke-width="3" stroke-linejoin="round"/>
    </g>
    <g class="part" data-part="cabeza">
      <rect x="135" y="134" width="30" height="26" rx="8" fill="#f1b78d"/>
      <ellipse cx="150" cy="76" rx="63" ry="62" fill="#6b4226"/>
      <circle cx="91" cy="96" r="11" fill="#f7c7a3"/><circle cx="209" cy="96" r="11" fill="#f7c7a3"/>
      <ellipse cx="150" cy="86" rx="56" ry="60" fill="${skin}"/>
      ${organs ? '' : `<path d="M96 70 Q104 26 150 26 Q196 26 204 70 Q176 44 150 56 Q124 44 96 70Z" fill="#6b4226"/>`}
      <circle cx="130" cy="108" r="5.5" fill="#3a2a2a"/><circle cx="170" cy="108" r="5.5" fill="#3a2a2a"/>
      <circle cx="132" cy="106" r="1.8" fill="#fff"/><circle cx="172" cy="106" r="1.8" fill="#fff"/>
      <path d="M134 124 q16 14 32 0" fill="none" stroke="#3a2a2a" stroke-width="3.2" stroke-linecap="round"/>
      <circle cx="116" cy="120" r="7" fill="#ff5d8f" opacity=".3"/><circle cx="184" cy="120" r="7" fill="#ff5d8f" opacity=".3"/>
    </g>
    ${organs ? `
    <g class="vessels" stroke="#e63946" stroke-width="3.5">
      <path d="M160 204 V150"/><path d="M158 210 Q112 186 74 300"/><path d="M166 210 Q206 186 228 300"/>
      <path d="M158 236 V372 L124 540"/><path d="M164 372 L178 540"/>
    </g>
    <g class="nerves" stroke="#f5b400" stroke-width="3.5">
      <path d="M150 92 V372"/><path d="M150 176 Q104 190 70 304"/><path d="M150 176 Q196 190 230 304"/>
      <path d="M150 372 L122 544"/><path d="M150 372 L180 544"/>
    </g>
    ${organG('cerebro')}${organG('pulmones')}${organG('intestino')}${organG('estomago')}${organG('corazon')}` : ''}
    ${slots}
  </svg>`;
}

/* Doc, el científico que acompaña */
function docSVG() {
  return `<svg class="doc-svg" viewBox="0 0 130 170" aria-label="Doc">
    <rect x="44" y="146" width="16" height="20" rx="6" fill="#3b6fd6"/><rect x="68" y="146" width="16" height="20" rx="6" fill="#3b6fd6"/>
    <path d="M34 100 Q22 122 26 140" stroke="#fff" stroke-width="16" stroke-linecap="round" fill="none"/>
    <circle cx="26" cy="144" r="8" fill="#f7c7a3"/>
    <g class="doc-arm"><path d="M94 100 Q110 90 114 66" stroke="#fff" stroke-width="16" stroke-linecap="round" fill="none"/><circle cx="115" cy="60" r="9" fill="#f7c7a3"/></g>
    <path d="M32 94 Q64 80 96 94 L100 152 H28 Z" fill="#fff" stroke="#cfd8e3" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M52 88 L64 108 L76 88 Z" fill="#14b8a6"/>
    <path d="M64 108 V150" stroke="#cfd8e3" stroke-width="2.5"/>
    <circle cx="70" cy="122" r="2.6" fill="#7c5cff"/><circle cx="70" cy="136" r="2.6" fill="#7c5cff"/>
    <rect x="38" y="118" width="16" height="14" rx="3" fill="#eef1f6" stroke="#cfd8e3" stroke-width="2"/>
    <path d="M42 118 v-7 M48 118 v-9" stroke="#ff8a3d" stroke-width="3" stroke-linecap="round"/>
    <path d="M30 44 Q26 8 64 10 Q102 8 98 44 Q88 26 64 30 Q40 26 30 44Z" fill="#4a2c17"/>
    <circle cx="64" cy="54" r="33" fill="url(#gSkin)"/>
    <path d="M32 46 Q36 14 64 16 Q94 14 96 46 Q84 30 70 34 Q50 26 32 46Z" fill="#4a2c17"/>
    <circle cx="51" cy="56" r="11" fill="#fff" fill-opacity=".6" stroke="#2b2d42" stroke-width="3"/>
    <circle cx="77" cy="56" r="11" fill="#fff" fill-opacity=".6" stroke="#2b2d42" stroke-width="3"/>
    <path d="M62 56 h4" stroke="#2b2d42" stroke-width="3"/>
    <circle cx="51" cy="57" r="3.6" fill="#2b2d42"/><circle cx="77" cy="57" r="3.6" fill="#2b2d42"/>
    <path d="M54 72 q10 9 20 0" fill="none" stroke="#2b2d42" stroke-width="3" stroke-linecap="round"/>
    <circle cx="40" cy="68" r="5" fill="#ff5d8f" opacity=".3"/><circle cx="88" cy="68" r="5" fill="#ff5d8f" opacity=".3"/>
  </svg>`;
}

/* =========================================================
   4. UTILIDADES
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const screenEl = $('#screen');
const overlayEl = $('#overlay');
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/* Escala el escenario de 1366x768 a la ventana, sin scroll */
let SCALE = 1;
function fitStage() {
  SCALE = Math.min(window.innerWidth / 1366, window.innerHeight / 768);
  $('#stage').style.setProperty('--scale', SCALE);
}
window.addEventListener('resize', fitStage);

function updateHud(pop) {
  const n = doneCount(), total = ALL_ACTS.length;
  $('#hudStarN').textContent = state.stars;
  $('#hudFill').style.width = (n / total * 100) + '%';
  $('#hudCount').textContent = `${n} de ${total} actividades`;
  if (pop) { const h = $('#hudStars'); h.classList.remove('pop'); void h.offsetWidth; h.classList.add('pop'); }
}

function openModal(html) { overlayEl.innerHTML = html; overlayEl.hidden = false; }
function closeModal() { overlayEl.hidden = true; overlayEl.innerHTML = ''; }

function confettiHTML() {
  const bits = ['⭐', '🎉', '🎊', '💛', '💜', '🧡', '💚', '✨'];
  let h = '';
  for (let i = 0; i < 36; i++) {
    h += `<i style="left:${Math.random() * 100}%;animation-duration:${1.8 + Math.random() * 2.2}s;animation-delay:${Math.random() * .8}s">${pick(bits)}</i>`;
  }
  return `<div class="confetti">${h}</div>`;
}

/* Arrastrar y soltar con mouse o dedo.
   También funciona tocando primero la ficha y después el lugar. */
function makeDnD(root, onDrop) {
  let selected = null;
  const unselect = () => { if (selected) selected.classList.remove('sel'); selected = null; };
  $$('.drag', root).forEach(d => {
    let sx = 0, sy = 0, moved = false, active = false;
    d.addEventListener('pointerdown', e => {
      active = true; moved = false; sx = e.clientX; sy = e.clientY;
      try { d.setPointerCapture(e.pointerId); } catch (err) { /* nada */ }
      d.classList.add('dragging');
    });
    d.addEventListener('pointermove', e => {
      if (!active) return;
      const dx = (e.clientX - sx) / SCALE, dy = (e.clientY - sy) / SCALE;
      if (Math.abs(dx) + Math.abs(dy) > 8) moved = true;
      if (moved) d.style.transform = `translate(${dx}px, ${dy}px) scale(1.06)`;
    });
    const end = e => {
      if (!active) return;
      active = false; d.classList.remove('dragging');
      if (moved) {
        d.style.visibility = 'hidden';
        const under = document.elementFromPoint(e.clientX, e.clientY);
        d.style.visibility = ''; d.style.transform = '';
        const zone = under && under.closest('[data-drop]');
        unselect();
        if (zone && root.contains(zone)) onDrop(d, zone);
      } else if (selected === d) { unselect(); } else { unselect(); selected = d; d.classList.add('sel'); }
    };
    d.addEventListener('pointerup', end);
    d.addEventListener('pointercancel', end);
  });
  root.addEventListener('click', e => {
    const zone = e.target.closest('[data-drop]');
    if (zone && selected) { const d = selected; unselect(); onDrop(d, zone); }
  });
}

/* =========================================================
   5. PANTALLAS
   ========================================================= */

function showHome() {
  screenEl.innerHTML = `
    <div class="home">
      <div class="home-text">
        <h1>¡EXPLORADORES <span>DEL CUERPO HUMANO!</span></h1>
        <p class="sub">¿Estás listo para descubrir cómo funciona tu cuerpo?</p>
        <button class="btn big primary" id="btnStart">🚀 ¡COMENZAR A EXPLORAR!</button>
        <div class="home-row">
          <button class="btn" id="btnMap">🗺️ Mapa de aventuras</button>
          <div class="pill">⭐ ${state.stars} ${state.stars === 1 ? 'estrella' : 'estrellas'}</div>
        </div>
        <button class="link" id="btnReset">↺ Reiniciar progreso</button>
      </div>
      <div class="home-body">${bodySVG({ organs: true })}</div>
      <div class="home-doc">
        <div class="bubble">¡Hola! Soy <b>Doc</b>. ¡Vamos a explorar el cuerpo humano juntos!</div>
        ${docSVG()}
      </div>
    </div>`;
  $('#btnStart').onclick = showMap;
  $('#btnMap').onclick = showMap;
  $('#btnReset').onclick = askReset;
}

function askReset() {
  openModal(`<div class="modal">
    <div class="huge">🤔</div><h2>¿Empezar de nuevo?</h2>
    <p>Se van a borrar tus estrellas y medallas.</p>
    <div class="btns"><button class="btn" id="noReset">No, volver</button><button class="btn primary" id="yesReset">Sí, borrar todo</button></div>
  </div>`);
  $('#noReset').onclick = closeModal;
  $('#yesReset').onclick = () => {
    state = { stars: 0, done: {}, medals: {} };
    saveState(); updateHud(); closeModal(); showHome();
  };
}

function showMap() {
  const pos = [[470, 110], [730, 340], [990, 110], [1220, 340]];
  const next = MODULES.findIndex((m, i) => moduleUnlocked(i) && !moduleDone(m));
  const nodes = MODULES.map((m, i) => {
    const open = moduleUnlocked(i), done = moduleDone(m);
    const n = m.acts.filter(a => state.done[a]).length;
    return `<button class="node ${open ? '' : 'locked'} ${done ? 'done' : ''} ${i === next ? 'next' : ''}" data-mod="${i}"
        style="left:${pos[i][0]}px;top:${pos[i][1]}px;--c:${m.color}">
      <div class="circle">${open ? m.emoji : '🔒'}</div>
      <div class="name">${i + 1}. ${m.title}<small>${open ? `${n} de ${m.acts.length} ✔` : 'Bloqueado'}</small></div>
    </button>`;
  }).join('');
  const tip = allDone() ? '¡Completaste todo! Ya podés ver tu diploma.'
    : `Tocá el módulo ${next + 1} para seguir la aventura.`;
  screenEl.innerHTML = `
    <div class="map">
      <h2>🗺️ Mapa de aventuras</h2>
      <svg class="map-path" viewBox="0 0 1366 704"><path d="M470 190 C560 190 620 420 730 420 S900 190 990 190 S1130 420 1220 420"
        fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round"/><path d="M470 190 C560 190 620 420 730 420 S900 190 990 190 S1130 420 1220 420"
        fill="none" stroke="#b9c3da" stroke-width="6" stroke-dasharray="4 18" stroke-linecap="round"/></svg>
      ${nodes}
      <div class="map-doc">
        <div class="bubble" id="mapBubble">${tip}</div>${docSVG()}
        <div style="text-align:center;margin-top:18px">
          <button class="btn ${allDone() ? 'green' : ''}" id="btnDiploma">${allDone() ? '🎓 Mi diploma' : '🔒 Diploma'}</button>
        </div>
      </div>
    </div>`;
  $$('.node').forEach(b => b.onclick = () => {
    const i = +b.dataset.mod;
    if (moduleUnlocked(i)) return showModule(i);
    b.classList.remove('oops'); void b.offsetWidth; b.classList.add('oops');
    $('#mapBubble').textContent = `Primero completá el módulo ${i}. ¡Vos podés!`;
  });
  $('#btnDiploma').onclick = () => {
    if (allDone()) return showDiploma();
    $('#mapBubble').textContent = 'El diploma se abre cuando completes los 4 módulos.';
  };
}

function showModule(i) {
  const m = MODULES[i];
  const tiles = m.acts.map(id => {
    const a = ACTS[id];
    return `<button class="tile ${state.done[id] ? 'done' : ''}" data-act="${id}" style="--c:${a.learn ? '#3b9ae1' : m.color}">
      <div class="ic">${a.emoji}</div><div class="t">${a.title}</div>
      <div class="k">${a.learn ? '📖 Aprender' : '🎮 Jugar'}</div></button>`;
  }).join('');
  screenEl.innerHTML = `
    <div class="mod">
      <button class="btn small back" id="modBack">⬅ Mapa</button>
      <h2>${m.emoji} ${m.title}</h2>
      <p class="lead">${m.lead}</p>
      <div class="tiles">${tiles}</div>
    </div>`;
  $('#modBack').onclick = showMap;
  $$('.tile').forEach(t => t.onclick = () => startAct(t.dataset.act));
}

function showMedals() {
  const card = m => `<div class="medal ${state.medals[m.id] ? '' : 'off'}"><span class="oe">${m.emoji}</span>${m.name}<small>${m.how}</small></div>`;
  openModal(`<div class="modal">
    <h2>🏅 Mis medallas</h2>
    <div class="medals" style="grid-template-columns:repeat(6,150px)">${MEDALS.filter(m => m.kind === 'medalla').map(card).join('')}</div>
    <h3>Insignias de los módulos</h3>
    <div class="medals" style="grid-template-columns:repeat(4,160px)">${MEDALS.filter(m => m.kind === 'insignia').map(card).join('')}</div>
    <div class="btns"><button class="btn primary" id="closeMedals">¡Listo!</button></div>
  </div>`);
  $('#closeMedals').onclick = closeModal;
}

function showDiploma() {
  const today = new Date().toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  screenEl.innerHTML = `
    <div class="diploma-wrap">
      <div class="diploma">
        <div class="d1">🎓 DIPLOMA 🎓</div>
        <div class="d3">Doc y los Exploradores del Cuerpo Humano nombran a</div>
        <div class="line"></div>
        <div class="d3">como</div>
        <div class="d2">EXPERTO EN EL<br>CUERPO HUMANO</div>
        <div class="d4">⭐ ${state.stars} estrellas &nbsp; ${MEDALS.filter(m => m.kind === 'medalla').map(m => m.emoji).join(' ')}</div>
        <div class="dl">${today}<br>¡Felicitaciones!</div>
        <div class="dd">${docSVG()}</div>
      </div>
      <div class="diploma-btns">
        <button class="btn small" id="dipMap">🗺️ Mapa</button>
        <button class="btn small primary" id="dipPrint">🖨️ Imprimir</button>
      </div>
    </div>`;
  $('#dipMap').onclick = showMap;
  $('#dipPrint').onclick = () => window.print();
}

/* =========================================================
   6. ACTIVIDADES
   Cada actividad recibe "ctx" con:
     ctx.main        → zona donde se dibuja
     ctx.say(texto)  → Doc habla
     ctx.good()      → respuesta correcta: suma una estrella
     ctx.bad(pista)  → respuesta incorrecta: Doc da una pista (nunca resta)
     ctx.dots(i, n)  → indicador de rondas
     ctx.ready()     → muestra el botón «¡Terminé!» (lecciones)
     ctx.finish()    → actividad completada
   ========================================================= */

let current = null; // actividad en curso

function startAct(id) {
  const a = ACTS[id];
  const modIndex = MODULES.findIndex(m => m.acts.includes(id));
  const token = {}; current = token;
  let earned = 0;
  screenEl.innerHTML = `
    <div class="act">
      <div class="act-head">
        <button class="btn small" id="actBack">⬅ Volver</button>
        <h2>${a.emoji} ${a.title}</h2><div class="dots" id="dots"></div>
      </div>
      <div class="act-side">
        <div class="bubble" id="docBubble"></div>
        <div class="doc" id="doc">${docSVG()}</div>
      </div>
      <div class="act-main" id="actMain"></div>
    </div>`;
  $('#actBack').onclick = () => { current = null; showModule(modIndex); };

  const bubble = $('#docBubble'), doc = $('#doc');
  const say = (html, cls = '') => {
    bubble.className = 'bubble ' + cls; bubble.innerHTML = html;
    void bubble.offsetWidth; bubble.classList.add('flash');
  };
  const ctx = {
    main: $('#actMain'),
    alive: () => current === token,
    say,
    good(msg) {
      earned++; state.stars++; saveState(); updateHud(true);
      say(`⭐ ${msg || pick(PRAISE)}`, 'ok');
      doc.classList.remove('happy'); void doc.offsetWidth; doc.classList.add('happy');
    },
    bad(hint) { say(`${pick(RETRY)} <br>💡 <b>Pista:</b> ${hint}`, 'hint'); },
    dots(i, n) {
      $('#dots').innerHTML = Array.from({ length: n }, (_, k) => `<i class="${k < i ? 'on' : k === i ? 'now' : ''}"></i>`).join('');
    },
    later(fn, ms) { setTimeout(() => { if (ctx.alive()) fn(); }, ms); },
    ready() {
      if ($('.done-btn')) return;
      const b = document.createElement('button');
      b.className = 'btn green done-btn'; b.textContent = '✅ ¡Terminé!';
      b.onclick = () => ctx.finish();
      $('.act-side').appendChild(b);
      say('¡Ya exploraste todo! Tocá <b>¡Terminé!</b> cuando quieras.', 'ok');
    },
    finish() {
      if (!ctx.alive()) return;
      current = null;
      const modWasDone = moduleDone(MODULES[modIndex]), wasAll = allDone();
      state.done[id] = true;
      const fresh = MEDALS.filter(m => !state.medals[m.id] && m.test(state));
      fresh.forEach(m => state.medals[m.id] = true);
      saveState(); updateHud();
      const modNow = moduleDone(MODULES[modIndex]) && !modWasDone;
      const allNow = allDone() && !wasAll;
      openModal(`<div class="modal">${confettiHTML()}
        <div class="huge">${allNow ? '🏆' : '🎉'}</div>
        <h2>${allNow ? '¡Completaste toda la aventura!' : modNow ? '¡Módulo superado!' : '¡Actividad completada!'}</h2>
        <p>${earned ? `Ganaste <b>${earned} ⭐</b> en esta actividad.` : '¡Muy buen trabajo!'}</p>
        ${fresh.map(m => `<div class="new-medal"><span class="oe">${m.emoji}</span>${m.kind === 'insignia' ? 'Insignia: ' + m.how : 'Medalla: ' + m.name}</div>`).join('')}
        <div class="btns">
          <button class="btn" id="endAgain">🔁 Otra vez</button>
          <button class="btn primary" id="endNext">${allNow ? '🎓 Ver mi diploma' : 'Seguir ➡'}</button>
        </div></div>`);
      $('#endAgain').onclick = () => { closeModal(); startAct(id); };
      $('#endNext').onclick = () => {
        closeModal();
        if (allNow) showDiploma(); else if (modNow) showMap(); else showModule(modIndex);
      };
    }
  };
  say(a.intro);
  a.run(ctx);
}

/* ---------- Moldes de juego reutilizables ---------- */

/* Preguntas con opciones. rounds: [{ q, emoji, options:[{id,label,emoji|organ,cls}], answer, hint, ok }] */
function playQuiz(ctx, rounds, optClass = '') {
  let i = 0;
  const next = () => {
    if (i >= rounds.length) return ctx.finish();
    const r = rounds[i]; let locked = false;
    ctx.dots(i, rounds.length);
    ctx.main.innerHTML = `<div class="col-fill" style="height:100%;justify-content:center;gap:34px">
      <div class="prompt">${r.emoji ? `<span class="qe">${r.emoji}</span>` : ''}${r.q}</div>
      <div class="opts">${r.options.map(o => `<button class="opt ${optClass} ${o.cls || ''}" data-id="${o.id}">
        ${o.organ ? `<div class="os">${organSVG(o.organ)}</div>` : o.emoji ? `<span class="oe">${o.emoji}</span>` : ''}${o.label}</button>`).join('')}</div>
    </div>`;
    $$('.opt', ctx.main).forEach(b => b.onclick = () => {
      if (locked || b.classList.contains('wrong')) return;
      if (b.dataset.id === String(r.answer)) {
        locked = true; b.classList.add('right'); ctx.good(r.ok);
        i++; ctx.later(next, 1500);
      } else { b.classList.add('wrong'); ctx.bad(r.hint); }
    });
  };
  next();
}

/* Completar carteles sobre el cuerpo arrastrando palabras */
function playLabels(ctx, cfg) {
  const ids = cfg.slots.map(s => s.id);
  ctx.main.innerHTML = `<div class="row">
    <div class="col-body" style="width:650px">${bodySVG({ organs: cfg.organs, wide: true, slots: cfg.slots })}</div>
    <div class="chips" style="margin:auto">${shuffle(ids).map(id => `<div class="chip drag" data-id="${id}">${cfg.words[id]}</div>`).join('')}</div>
  </div>`;
  let left = ids.length;
  makeDnD(ctx.main, (chip, zone) => {
    if (zone.classList.contains('filled')) return;
    if (chip.dataset.id === zone.dataset.drop) {
      zone.classList.add('filled'); $('text', zone).textContent = cfg.words[chip.dataset.id];
      chip.remove(); ctx.good();
      if (--left === 0) ctx.later(() => ctx.finish(), 1300);
    } else {
      chip.classList.remove('oops'); void chip.offsetWidth; chip.classList.add('oops');
      ctx.bad(cfg.hints[chip.dataset.id]);
    }
  });
}

/* Elegir todas las tarjetas correctas. rounds: [{ q, cards:[{emoji,label,good,why}] }] */
function playPick(ctx, rounds) {
  let i = 0;
  const next = () => {
    if (i >= rounds.length) return ctx.finish();
    const r = rounds[i]; ctx.dots(i, rounds.length);
    let left = r.cards.filter(c => c.good).length;
    const cards = shuffle(r.cards);
    ctx.say(r.say);
    ctx.main.innerHTML = `<div class="col-fill" style="height:100%;justify-content:center;gap:24px">
      <div class="prompt">${r.q}</div>
      <div class="grid4">${cards.map((c, k) => `<button class="pick" data-k="${k}"><span class="oe">${c.emoji}</span>${c.label}</button>`).join('')}</div>
    </div>`;
    $$('.pick', ctx.main).forEach(b => b.onclick = () => {
      const c = cards[+b.dataset.k];
      if (b.classList.contains('right') || b.classList.contains('wrong')) return;
      if (c.good) {
        b.classList.add('right'); ctx.good(c.why);
        if (--left === 0) { i++; ctx.later(next, 1700); }
      } else { b.classList.add('wrong'); ctx.bad(c.why); }
    });
  };
  next();
}

/* ---------- Lista de actividades ---------- */

const ACTS = {

  /* ===== MÓDULO 1 ===== */
  m1_explora: {
    title: 'Exploramos el cuerpo', emoji: '🔎', learn: true,
    intro: 'Nuestro cuerpo se divide en <b>cabeza, tronco y extremidades</b>. ¡Tocá cada parte!',
    run(ctx) {
      const seen = {};
      ctx.main.innerHTML = `<div class="row">
        <div class="col-body" style="width:330px">${bodySVG({ organs: false, cls: 'pick-parts' })}</div>
        <div class="col-fill panel"><div class="empty-info" id="info">👈 Tocá una parte del cuerpo</div>
          <div class="seen">${Object.keys(PARTS).map(k => `<span data-s="${k}">${PARTS[k].name}</span>`).join('')}</div></div>
      </div>`;
      $$('.part', ctx.main).forEach(p => p.onclick = () => {
        const k = p.dataset.part, d = PARTS[k];
        $$('.part', ctx.main).forEach(x => x.classList.toggle('sel', x === p));
        const info = $('#info'); info.className = 'info'; info.style.animation = 'none'; void info.offsetWidth; info.style.animation = '';
        info.innerHTML = `<div class="pic emoji">${d.emoji}</div><h3>${d.name}</h3>
          <div class="fact"><span class="e">📍</span><span>${d.text}</span></div>
          <div class="fact cur"><span class="e">💡</span><span>${d.use}</span></div>`;
        if (!seen[k]) { seen[k] = true; $(`[data-s="${k}"]`, ctx.main).classList.add('on'); ctx.good(`¡Descubriste: ${d.name.toLowerCase()}!`); }
        if (Object.keys(seen).length === 3) ctx.later(() => ctx.ready(), 1800);
      });
    }
  },

  m1_partes: {
    title: 'Las partes del cuerpo', emoji: '🏷️',
    intro: 'Arrastrá cada palabra hasta su cartel. También podés tocar la palabra y después el cartel.',
    run(ctx) {
      playLabels(ctx, {
        organs: false,
        slots: [
          { id: 'cabeza', x: 308, y: 50, to: [[206, 78]] },
          { id: 'tronco', x: -172, y: 232, to: [[98, 262]] },
          { id: 'extrem', x: 308, y: 372, to: [[240, 300], [192, 480]] }
        ],
        words: { cabeza: 'Cabeza', tronco: 'Tronco', extrem: 'Extremidades' },
        hints: {
          cabeza: 'La cabeza está arriba de todo.',
          tronco: 'El tronco es la parte del medio.',
          extrem: 'Las extremidades son los brazos y las piernas.'
        }
      });
    }
  },

  m1_uso: {
    title: '¿Qué parte uso?', emoji: '🤸',
    intro: 'Leé la pregunta y tocá la parte del cuerpo correcta.',
    run(ctx) {
      const P = {
        cabeza: { id: 'cabeza', label: 'Cabeza', emoji: '🙂' }, piernas: { id: 'piernas', label: 'Piernas', emoji: '🦵' },
        manos: { id: 'manos', label: 'Manos', emoji: '✋' }, brazos: { id: 'brazos', label: 'Brazos', emoji: '💪' },
        ojos: { id: 'ojos', label: 'Ojos', emoji: '👀' }, nariz: { id: 'nariz', label: 'Nariz', emoji: '👃' },
        oidos: { id: 'oidos', label: 'Oídos', emoji: '👂' }, boca: { id: 'boca', label: 'Boca', emoji: '👄' }
      };
      const mk = (q, emoji, answer, others, hint) => ({ q, emoji, answer, hint, options: shuffle([answer, ...others].map(k => P[k])) });
      playQuiz(ctx, shuffle([
        mk('¿Qué parte del cuerpo uso para <em>pensar</em>?', '💭', 'cabeza', ['piernas', 'manos', 'brazos'], 'Es la parte que está arriba de todo.'),
        mk('¿Qué parte del cuerpo uso para <em>correr</em>?', '🏃', 'piernas', ['cabeza', 'oidos', 'nariz'], 'Son extremidades y dan los pasos.'),
        mk('¿Qué parte del cuerpo uso para <em>pintar</em>?', '🎨', 'manos', ['piernas', 'nariz', 'oidos'], 'Con ellas agarrás el pincel.'),
        mk('¿Qué parte del cuerpo uso para <em>abrazar</em>?', '🤗', 'brazos', ['ojos', 'boca', 'piernas'], 'Están unidos al tronco, uno de cada lado.'),
        mk('¿Qué parte del cuerpo uso para <em>mirar</em>?', '🖼️', 'ojos', ['oidos', 'manos', 'nariz'], 'Están en la cabeza y son dos.'),
        mk('¿Qué parte del cuerpo uso para <em>escuchar</em>?', '🎵', 'oidos', ['ojos', 'boca', 'manos'], 'Están a los costados de la cabeza.')
      ]));
    }
  },

  /* ===== MÓDULO 2 ===== */
  m2_explora: {
    title: 'Exploramos los órganos', emoji: '🔎', learn: true,
    intro: 'Dentro del cuerpo hay <b>órganos</b>. ¡Tocá cada uno para conocerlo!',
    run(ctx) {
      const seen = {};
      ctx.main.innerHTML = `<div class="row">
        <div class="col-body" style="width:330px">${bodySVG({ organs: true })}</div>
        <div class="col-fill panel"><div class="empty-info" id="info">👈 Tocá un órgano del cuerpo</div>
          <div class="seen">${ORGAN_IDS.map(k => `<span data-s="${k}">${ORGANS[k].name}</span>`).join('')}</div></div>
      </div>`;
      $$('.organ', ctx.main).forEach(g => g.onclick = () => {
        const k = g.dataset.organ, d = ORGANS[k];
        $$('.organ', ctx.main).forEach(x => x.classList.toggle('lit', x === g));
        $('.body-svg', ctx.main).classList.add('sys-on');
        const info = $('#info'); info.className = 'info'; info.style.animation = 'none'; void info.offsetWidth; info.style.animation = '';
        info.innerHTML = `<div style="display:flex;align-items:center;gap:20px"><div class="pic" style="margin:0">${organSVG(k)}</div>
            <div><h3>${d.name}</h3><div style="font-size:21px;color:#5c6079">${SYSTEMS[d.system].emoji} ${SYSTEMS[d.system].name}</div></div></div>
          <div class="fact"><span class="e">📍</span><span><b>¿Dónde está?</b> ${d.where}</span></div>
          <div class="fact"><span class="e">⚙️</span><span><b>¿Qué hace?</b> ${d.does}</span></div>
          <div class="fact cur"><span class="e">💡</span><span><b>¿Sabías que…?</b> ${d.fun}</span></div>`;
        if (!seen[k]) { seen[k] = true; $(`[data-s="${k}"]`, ctx.main).classList.add('on'); ctx.good(`¡Descubriste ${d.art}!`); }
        if (Object.keys(seen).length === ORGAN_IDS.length) ctx.later(() => ctx.ready(), 1800);
      });
    }
  },

  m2_donde: {
    title: '¿Dónde está el órgano?', emoji: '📍',
    intro: 'Mirá el cuerpo y tocá el órgano que te pido.',
    run(ctx) {
      const order = shuffle(ORGAN_IDS); let i = 0, locked = false;
      ctx.main.innerHTML = `<div class="row">
        <div class="col-body" style="width:330px">${bodySVG({ organs: true })}</div>
        <div class="col-fill" style="justify-content:center"><div class="prompt" id="ask"></div></div>
      </div>`;
      const ask = () => {
        if (i >= order.length) return ctx.finish();
        locked = false; ctx.dots(i, order.length);
        $$('.organ', ctx.main).forEach(x => x.classList.remove('found'));
        const d = ORGANS[order[i]];
        $('#ask').innerHTML = `<span class="qe">👆</span>Tocá <em>${d.art}</em>`;
      };
      $$('.organ', ctx.main).forEach(g => g.onclick = () => {
        if (locked) return;
        const d = ORGANS[order[i]];
        if (g.dataset.organ === order[i]) {
          locked = true; g.classList.add('found'); ctx.good(`¡Sí! Es ${d.art}.`);
          i++; ctx.later(ask, 1500);
        } else {
          g.classList.remove('oops'); void g.getBoundingClientRect(); g.classList.add('oops');
          ctx.bad(`Ese es ${ORGANS[g.dataset.organ].art}. ${d.name}: ${d.where.toLowerCase()}`);
        }
      });
      ask();
    }
  },

  m2_unir: {
    title: 'Unir con flechas', emoji: '🔗',
    intro: 'Uní cada órgano con su función. Tocá el órgano y después lo que hace.',
    run(ctx) {
      ctx.main.innerHTML = `<div class="match">
        <svg class="lines"><defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill="#35c46a"/></marker></defs></svg>
        <div class="colm">${shuffle(ORGAN_IDS).map(k => `<button class="m-card m-left" data-id="${k}"><div class="os">${organSVG(k)}</div>${ORGANS[k].name}<span class="pin"></span></button>`).join('')}</div>
        <div class="colm">${shuffle(ORGAN_IDS).map(k => `<button class="m-card m-right" data-id="${k}"><span class="pin"></span>${ORGANS[k].short}</button>`).join('')}</div>
      </div>`;
      const box = $('.match', ctx.main), svg = $('.lines', ctx.main);
      const NS = 'http://www.w3.org/2000/svg';
      let sel = null, rubber = null, left = ORGAN_IDS.length;
      const pinPos = card => {
        const b = box.getBoundingClientRect(), p = $('.pin', card).getBoundingClientRect();
        return [(p.left + p.width / 2 - b.left) / SCALE, (p.top + p.height / 2 - b.top) / SCALE];
      };
      const line = (x1, y1, x2, y2, color) => {
        const l = document.createElementNS(NS, 'line');
        l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2);
        l.setAttribute('stroke', color); l.setAttribute('stroke-width', 7); l.setAttribute('stroke-linecap', 'round');
        svg.appendChild(l); return l;
      };
      const select = card => { $$('.m-left', box).forEach(c => c.classList.toggle('sel', c === card)); sel = card; };
      const tryMatch = right => {
        if (!sel || right.classList.contains('ok')) return;
        if (sel.dataset.id === right.dataset.id) {
          const a = pinPos(sel), b = pinPos(right);
          line(a[0], a[1], b[0] - 10, b[1], '#35c46a').setAttribute('marker-end', 'url(#arrow)');
          sel.classList.add('ok'); right.classList.add('ok'); select(null); ctx.good();
          if (--left === 0) ctx.later(() => ctx.finish(), 1400);
        } else {
          right.classList.remove('oops'); void right.offsetWidth; right.classList.add('oops');
          ctx.bad(`${ORGANS[sel.dataset.id].name}: ${ORGANS[sel.dataset.id].where.toLowerCase()} Pensá qué hace ahí.`);
        }
      };
      $$('.m-left', box).forEach(c => c.addEventListener('pointerdown', e => {
        if (c.classList.contains('ok')) return;
        select(c);
        const a = pinPos(c);
        rubber = line(a[0], a[1], a[0], a[1], '#ffc93c');
        const move = ev => {
          const b = box.getBoundingClientRect();
          rubber.setAttribute('x2', (ev.clientX - b.left) / SCALE); rubber.setAttribute('y2', (ev.clientY - b.top) / SCALE);
        };
        const up = ev => {
          window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up);
          if (rubber) { rubber.remove(); rubber = null; }
          const under = document.elementFromPoint(ev.clientX, ev.clientY);
          const right = under && under.closest('.m-right');
          if (right) tryMatch(right);
        };
        window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
      }));
      $$('.m-right', box).forEach(c => c.addEventListener('click', () => {
        if (!sel) return ctx.say('Primero tocá un <b>órgano</b> de la izquierda.', 'hint');
        tryMatch(c);
      }));
    }
  },

  m2_quien: {
    title: '¿Quién soy?', emoji: '🕵️',
    intro: 'Leé la pista y descubrí de qué órgano se trata.',
    run(ctx) {
      const options = ORGAN_IDS.map(k => ({ id: k, label: ORGANS[k].name, organ: k }));
      playQuiz(ctx, shuffle(ORGAN_IDS).map(k => ({
        q: `«${ORGANS[k].riddle}»`, emoji: '❓', answer: k, hint: ORGANS[k].clue,
        ok: `¡Sí! Es ${ORGANS[k].art}.`, options: shuffle(options)
      })));
    }
  },

  m2_mision: {
    title: 'Completar la misión', emoji: '🚀',
    intro: '¡Misión! Arrastrá cada nombre hasta su órgano.',
    run(ctx) {
      const words = {}, hints = {};
      ORGAN_IDS.forEach(k => { words[k] = ORGANS[k].name; hints[k] = `${ORGANS[k].name}: ${ORGANS[k].where.toLowerCase()}`; });
      playLabels(ctx, {
        organs: true, words, hints,
        slots: [
          { id: 'cerebro', x: -172, y: 34, to: [[124, 54]] },
          { id: 'pulmones', x: -172, y: 196, to: [[116, 220]] },
          { id: 'intestino', x: -172, y: 316, to: [[124, 336]] },
          { id: 'corazon', x: 308, y: 170, to: [[170, 218]] },
          { id: 'estomago', x: 308, y: 262, to: [[188, 272]] }
        ]
      });
    }
  },

  /* ===== MÓDULO 3 ===== */
  m3_explora: {
    title: 'Exploramos los sistemas', emoji: '🔎', learn: true,
    intro: 'Los órganos forman <b>sistemas</b>. ¡Tocá cada sistema para ver cómo trabaja!',
    run(ctx) {
      const seen = {}, keys = Object.keys(SYSTEMS);
      ctx.main.innerHTML = `<div class="row">
        <div class="sys-btns">${keys.map(k => `<button class="sys-btn" data-k="${k}" style="--c:${SYSTEMS[k].color}"><span class="oe">${SYSTEMS[k].emoji}</span>${SYSTEMS[k].name}</button>`).join('')}
          <button class="sys-btn" data-k="team" style="--c:#35c46a" disabled><span class="oe">🤝</span>¡Trabajan en equipo!</button></div>
        <div class="col-body" style="width:300px">${bodySVG({ organs: true })}</div>
        <div class="col-fill panel"><div class="empty-info" id="info">👈 Elegí un sistema</div></div>
      </div>`;
      const body = $('.body-svg', ctx.main);
      $$('.sys-btn', ctx.main).forEach(b => b.onclick = () => {
        const k = b.dataset.k, team = k === 'team';
        const s = team ? { name: '¡Trabajan en equipo!', emoji: '🤝', color: '#35c46a', organs: ORGAN_IDS, text: TEAM_TEXT } : SYSTEMS[k];
        $$('.sys-btn', ctx.main).forEach(x => x.classList.toggle('sel', x === b));
        body.classList.add('sys-on');
        body.classList.toggle('show-circ', k === 'circ' || team);
        body.classList.toggle('show-nerv', k === 'nerv');
        $$('.organ', ctx.main).forEach(g => g.classList.toggle('lit', s.organs.includes(g.dataset.organ)));
        const info = $('#info'); info.className = 'info'; info.style.animation = 'none'; void info.offsetWidth; info.style.animation = '';
        info.innerHTML = `<h3 style="color:${s.color}">${s.emoji} ${s.name}</h3>
          <div style="display:flex;gap:14px;justify-content:center">${s.organs.map(o => `<div style="width:${team ? 74 : 130}px;text-align:center;font-size:${team ? 15 : 20}px;font-weight:600"><div style="height:${team ? 74 : 130}px">${organSVG(o)}</div>${ORGANS[o].name}</div>`).join('')}</div>
          <div class="fact"><span class="e">⚙️</span><span>${s.text}</span></div>`;
        if (!seen[k]) { seen[k] = true; b.classList.add('seen-it'); ctx.good(team ? '¡Todos los sistemas trabajan juntos!' : `¡Conociste el ${s.name.toLowerCase()}!`); }
        if (keys.every(x => seen[x])) $('[data-k="team"]', ctx.main).disabled = false;
        if (seen.team) ctx.later(() => ctx.ready(), 1800);
        else if (keys.every(x => seen[x])) ctx.later(() => ctx.say('Ahora tocá <b>¡Trabajan en equipo!</b> 🤝'), 1800);
      });
    }
  },

  m3_sistema: {
    title: '¿A qué sistema pertenece?', emoji: '🧩',
    intro: 'Arrastrá cada órgano hasta su sistema. También podés tocar el órgano y después el sistema.',
    run(ctx) {
      const keys = Object.keys(SYSTEMS);
      ctx.main.innerHTML = `<div class="col-fill" style="height:100%;justify-content:center;gap:40px">
        <div class="zones">${keys.map(k => `<div class="zone" data-drop="${k}" style="--c:${SYSTEMS[k].color}">
          <div class="ze">${SYSTEMS[k].emoji}</div><div class="zn">${SYSTEMS[k].name}</div><div class="got"></div></div>`).join('')}</div>
        <div class="chips h" style="justify-content:center">${shuffle(ORGAN_IDS).map(k => `<div class="chip org drag" data-id="${k}"><div class="os">${organSVG(k)}</div>${ORGANS[k].name}</div>`).join('')}</div>
      </div>`;
      let left = ORGAN_IDS.length;
      const tip = {
        corazon: 'El corazón mueve la sangre. ¿Qué sistema tiene una gota de sangre?',
        pulmones: 'Los pulmones reciben el aire que respiramos.',
        cerebro: 'El cerebro manda señales rapidísimas, como un rayo.',
        estomago: 'El estómago trabaja con los alimentos que comemos.',
        intestino: 'El intestino absorbe los nutrientes de los alimentos.'
      };
      makeDnD(ctx.main, (chip, zone) => {
        const k = chip.dataset.id;
        if (ORGANS[k].system === zone.dataset.drop) {
          const d = document.createElement('div'); d.innerHTML = organSVG(k);
          $('.got', zone).appendChild(d); zone.classList.add('yes'); chip.remove();
          ctx.good(`¡Sí! ${ORGANS[k].name}: ${SYSTEMS[ORGANS[k].system].name.toLowerCase()}.`);
          if (--left === 0) ctx.later(() => ctx.finish(), 1500);
        } else {
          chip.classList.remove('oops'); void chip.offsetWidth; chip.classList.add('oops');
          ctx.bad(tip[k]);
        }
      });
    }
  },

  m3_vf: {
    title: 'Verdadero o falso', emoji: '✅',
    intro: 'Leé la frase y decidí: ¿es verdadera o falsa?',
    run(ctx) {
      const S = [
        ['El corazón bombea la sangre a todo el cuerpo.', true, 'Pensá en el «pum, pum» de tu pecho.'],
        ['Los pulmones están en la cabeza.', false, 'Los pulmones están en el pecho.'],
        ['El cerebro coordina nuestros movimientos.', true, 'El cerebro dirige todo el cuerpo.'],
        ['El estómago nos ayuda a respirar.', false, 'Respiramos con los pulmones.'],
        ['El intestino absorbe los nutrientes de los alimentos.', true, 'El intestino pertenece al sistema digestivo.'],
        ['Tenemos dos pulmones.', true, 'Hay uno a cada lado del corazón.'],
        ['El corazón pertenece al sistema digestivo.', false, 'El corazón pertenece al sistema circulatorio.'],
        ['El cerebro pertenece al sistema nervioso.', true, 'El sistema nervioso coordina el cuerpo.']
      ];
      playQuiz(ctx, shuffle(S).map(([q, ans, hint]) => ({
        q, emoji: '🤔', answer: ans ? 'v' : 'f', hint,
        ok: ans ? '¡Correcto! Es verdadero.' : `¡Correcto! Es falso. ${hint}`,
        options: [{ id: 'v', label: '👍 Verdadero', cls: 't' }, { id: 'f', label: '👎 Falso', cls: 'f' }]
      })), 'tf');
    }
  },

  /* ===== MÓDULO 4 ===== */
  m4_explora: {
    title: 'Hábitos saludables', emoji: '🔎', learn: true,
    intro: 'Para que el cuerpo funcione bien, hay que <b>cuidarlo</b>. ¡Tocá cada tarjeta!',
    run(ctx) {
      const seen = {};
      ctx.main.innerHTML = `<div class="col-fill" style="height:100%;gap:24px">
        <div class="habits">${HABITS.map(h => `<button class="habit" data-id="${h.id}" style="--c:${h.color}"><span class="oe">${h.emoji}</span>${h.name}</button>`).join('')}</div>
        <div class="panel" style="flex:1;display:flex"><div class="empty-info" id="info">👆 Tocá una tarjeta</div></div>
      </div>`;
      $$('.habit', ctx.main).forEach(b => b.onclick = () => {
        const h = HABITS.find(x => x.id === b.dataset.id);
        $$('.habit', ctx.main).forEach(x => x.classList.toggle('sel', x === b));
        const info = $('#info'); info.className = 'info'; info.style.animation = 'none'; void info.offsetWidth; info.style.animation = '';
        info.style.justifyContent = 'center';
        info.innerHTML = `<div style="display:flex;align-items:center;gap:30px;padding:0 20px">
          <div class="pic emoji" style="margin:0;flex:none">${h.emoji}</div>
          <div><h3 style="color:${h.color}">${h.name}</h3><p style="font-size:30px;line-height:1.3;margin:10px 0 0">${h.text}</p></div></div>`;
        if (!seen[h.id]) { seen[h.id] = true; b.classList.add('seen-it'); ctx.good(); }
        if (Object.keys(seen).length === HABITS.length) ctx.later(() => ctx.ready(), 1800);
      });
    }
  },

  m4_juego: {
    title: 'Cuidamos nuestro cuerpo', emoji: '💪',
    intro: 'Elegí todo lo que ayuda a cuidar tu cuerpo.',
    run(ctx) {
      playPick(ctx, [
        { say: 'Tocá los <b>5 alimentos</b> que te ayudan a crecer sano y fuerte.', q: '🍽️ ¿Qué alimentos son saludables?', cards: [
          { emoji: '🍎', label: 'Manzana', good: true, why: '¡Las frutas tienen vitaminas!' },
          { emoji: '🥕', label: 'Zanahoria', good: true, why: '¡Las verduras te hacen fuerte!' },
          { emoji: '🍌', label: 'Banana', good: true, why: '¡Las frutas dan energía!' },
          { emoji: '🥦', label: 'Brócoli', good: true, why: '¡Las verduras te hacen fuerte!' },
          { emoji: '💧', label: 'Agua', good: true, why: '¡Tu cuerpo necesita agua!' },
          { emoji: '🍬', label: 'Caramelos', good: false, why: 'Las golosinas son solo para de vez en cuando.' },
          { emoji: '🥤', label: 'Gaseosa', good: false, why: 'Tiene mucha azúcar. Mejor tomar agua.' },
          { emoji: '🍟', label: 'Papas fritas', good: false, why: 'Son solo para de vez en cuando.' }
        ] },
        { say: 'Ahora tocá los <b>5 hábitos</b> que cuidan tu cuerpo.', q: '🌟 ¿Qué hábitos cuidan tu cuerpo?', cards: [
          { emoji: '🧼', label: 'Lavarme las manos', good: true, why: '¡Así alejás a los gérmenes!' },
          { emoji: '🪥', label: 'Cepillarme los dientes', good: true, why: '¡Dientes limpios y sanos!' },
          { emoji: '⚽', label: 'Jugar y moverme', good: true, why: '¡Moverte fortalece tu corazón!' },
          { emoji: '😴', label: 'Dormir bien', good: true, why: '¡Descansar te da energía!' },
          { emoji: '🚿', label: 'Bañarme', good: true, why: '¡La higiene cuida tu cuerpo!' },
          { emoji: '📱', label: 'Pantallas todo el día', good: false, why: 'Tu cuerpo necesita moverse y jugar.' },
          { emoji: '🌙', label: 'Acostarme muy tarde', good: false, why: 'Tu cuerpo necesita dormir bien.' },
          { emoji: '🍭', label: 'Comer muchas golosinas', good: false, why: 'Mejor elegir frutas y verduras.' }
        ] }
      ]);
    }
  }
};

/* =========================================================
   7. INICIO
   ========================================================= */

$('#hudHome').onclick = () => { current = null; showHome(); };
$('#hudMap').onclick = () => { current = null; showMap(); };
$('#hudMedals').onclick = showMedals;
$('#hudStars').onclick = showMedals;

fitStage();
updateHud();
showHome();
