// Worlds System — multi-world data for SAT Masters: Scholar's Journey
// 6 distinct themed worlds, each a 12x10 grid using the map.js tile-type system.
// Tile numbers match map.js (0–17); new types added here:
// 18=sand, 19=snow, 20=crystal, 21=cloud
// CSS classes for tile types: grass, path, water, tree, mountain, rock, bridge,
// building, gym, house, sign, sand, snow, crystal, cloud.

const WORLD_TILE_TYPES = {
  0:  { class: 'grass',    icon: '',     label: '' },
  1:  { class: 'path',     icon: '',     label: '' },
  2:  { class: 'building', icon: '🏫',  label: 'Academy' },
  3:  { class: 'water',    icon: '🌊',  label: '' },
  4:  { class: 'gym',      icon: '⚔️',  label: 'ACADEMY' },
  5:  { class: 'building', icon: '🏥',  label: 'Rest Stop' },
  6:  { class: 'building', icon: '🏪',  label: 'Shop' },
  7:  { class: 'gym',      icon: '🏰',  label: 'FINAL EXAM' },
  8:  { class: 'tree',     icon: '🌲',  label: '' },
  9:  { class: 'tree',     icon: '🌸',  label: '' },
  10: { class: 'rock',     icon: '🪨',  label: '' },
  11: { class: 'bridge',   icon: '🌉',  label: '' },
  12: { class: 'house',    icon: '🏠',  label: '' },
  13: { class: 'sign',     icon: '🪧',  label: '' },
  14: { class: 'building', icon: '⛩️',  label: '' },
  15: { class: 'mountain', icon: '🏔️',  label: '' },
  16: { class: 'path',     icon: '🛤️',  label: '' },
  17: { class: 'building', icon: '🚉',  label: 'Station' },
  18: { class: 'sand',     icon: '',     label: '' },
  19: { class: 'snow',     icon: '',     label: '' },
  20: { class: 'crystal',  icon: '💎',  label: '' },
  21: { class: 'cloud',    icon: '☁️',  label: '' }
};

// ── 1. Scholar's Beach (sandy coast, ocean, palm trees, lighthouse; easy) ──
const SCHOLARS_BEACH = {
  id: 'scholars_beach',
  name: "Scholar's Beach",
  description: 'A sunny sandy coast with gentle ocean waves, swaying palm trees, and a tall lighthouse overlooking the sea. Perfect for beginning scholars.',
  difficulty: 'easy',
  colorTheme: { primary: '#f4d03f', secondary: '#85c1e9', background: '#fef9e7', accent: '#1abc9c' },
  tileMap: [
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 18, 18, 18, 18, 1, 1, 18, 18, 18, 8, 3],
    [3, 18, 8, 18, 1, 1, 1, 1, 18, 1, 1, 3],
    [3, 1, 1, 1, 1, 14, 1, 1, 1, 18, 18, 3],
    [3, 18, 1, 8, 1, 1, 1, 8, 1, 1, 18, 3],
    [3, 18, 1, 1, 1, 5, 1, 1, 1, 18, 18, 3],
    [3, 1, 1, 18, 1, 1, 1, 1, 1, 1, 1, 3],
    [3, 18, 1, 1, 1, 4, 1, 1, 1, 8, 18, 3],
    [3, 1, 1, 18, 1, 1, 1, 12, 1, 1, 1, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
  ],
  connections: ['central_village'],
  academies: [
    { x: 5, y: 7, id: 'beach_gym1', name: 'Lighthouse Academy', challenger: 'Sandy Sam', sprite: '🏖️', hp: 45, damage: 5, questionsToWin: 3, categories: ['math'], diffRange: [1, 2], badge: '🐚', badgeName: 'Shell Badge', reward: 150 },
    { x: 7, y: 8, id: 'beach_gym2', name: 'Palm Academy', challenger: 'Palmyra Pam', sprite: '🌴', hp: 55, damage: 6, questionsToWin: 4, categories: ['reading'], diffRange: [1, 2], badge: '🌺', badgeName: 'Hibiscus Badge', reward: 200 }
  ],
  wildEncounterRate: 0.08,
  station: { x: 5, y: 2 }
};

// ── 2. Whispering Forest (dense green woods, waterfall, stone gate; easy-medium) ──
const WHISPERING_FOREST = {
  id: 'whispering_forest',
  name: 'Whispering Forest',
  description: 'A dense, mysterious forest filled with towering trees, a cascading waterfall, and an ancient stone gate. The whispers of past scholars guide your path.',
  difficulty: 'easy-medium',
  colorTheme: { primary: '#27ae60', secondary: '#145a32', background: '#eafaf1', accent: '#7dcea0' },
  tileMap: [
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    [8, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 8],
    [8, 0, 1, 1, 1, 8, 8, 1, 1, 1, 0, 8],
    [8, 1, 1, 3, 3, 11, 3, 3, 1, 1, 1, 8],
    [8, 0, 1, 3, 3, 3, 3, 3, 1, 8, 0, 8],
    [8, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 8],
    [8, 1, 1, 8, 0, 0, 0, 8, 1, 1, 1, 8],
    [8, 0, 1, 1, 1, 4, 1, 1, 1, 0, 0, 8],
    [8, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 8],
    [8, 8, 8, 14, 8, 8, 8, 8, 8, 8, 8, 8]
  ],
  connections: ['central_village', 'frostpeak_mountains'],
  academies: [
    { x: 5, y: 7, id: 'forest_gym1', name: 'Waterfall Academy', challenger: 'River Rita', sprite: '💧', hp: 65, damage: 8, questionsToWin: 4, categories: ['math', 'reading'], diffRange: [1, 3], badge: '🍃', badgeName: 'Leaf Badge', reward: 300 },
    { x: 1, y: 8, id: 'forest_gym2', name: 'Stone Gate Academy', challenger: 'Moss Marvin', sprite: '🌿', hp: 75, damage: 9, questionsToWin: 5, categories: ['writing'], diffRange: [2, 3], badge: '🍄', badgeName: 'Mushroom Badge', reward: 350 }
  ],
  wildEncounterRate: 0.12,
  station: { x: 5, y: 5 }
};

// ── 3. Central Village (castle, houses, shops, fountain; medium) ──
  const CENTRAL_VILLAGE = {
  id: 'central_village',
  name: 'Central Village',
  description: 'The bustling heart of the SAT realm. A grand castle towers over cozy houses, lively shops, and a sparkling fountain. All paths lead here.',
  difficulty: 'medium',
  colorTheme: { primary: '#8e44ad', secondary: '#5b2c6f', background: '#f5eef8', accent: '#af7ac5' },
  tileMap: [
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15],
    [15, 12, 12, 1, 0, 0, 0, 0, 1, 12, 12, 15],
    [15, 12, 1, 1, 1, 14, 1, 1, 1, 1, 12, 15],
    [15, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 15],
    [15, 1, 0, 0, 3, 3, 3, 3, 0, 0, 1, 15],
    [15, 1, 0, 0, 3, 3, 3, 3, 0, 0, 1, 15],
    [15, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 15],
    [15, 12, 1, 1, 1, 4, 1, 1, 1, 1, 12, 15],
    [15, 12, 12, 1, 0, 0, 0, 0, 1, 12, 12, 15],
    [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
  ],
  connections: ['scholars_beach', 'whispering_forest', 'frostpeak_mountains', 'crystal_canyon', 'celestial_isles'],
  academies: [
    { x: 5, y: 7, id: 'village_gym1', name: 'Castle Academy', challenger: 'Sir Calculus', sprite: '🏰', hp: 85, damage: 10, questionsToWin: 5, categories: ['math', 'reading'], diffRange: [2, 4], badge: '🏵️', badgeName: 'Crest Badge', reward: 450 },
    { x: 3, y: 2, id: 'village_gym2', name: 'Fountain Academy', challenger: 'Wendy Words', sprite: '⛲', hp: 90, damage: 11, questionsToWin: 5, categories: ['reading', 'writing'], diffRange: [2, 4], badge: '🔔', badgeName: 'Bell Badge', reward: 500 }
  ],
  wildEncounterRate: 0.10,
  station: { x: 8, y: 2 }
};

// ── 4. Frostpeak Mountains (snow, cave entrance; hard) ──
const FROSTPEAK_MOUNTAINS = {
  id: 'frostpeak_mountains',
  name: 'Frostpeak Mountains',
  description: 'Treacherous snow-covered peaks hiding icy caves and ancient secrets. Only the bravest scholars survive the cold and earn the frost badges.',
  difficulty: 'hard',
  colorTheme: { primary: '#5dade2', secondary: '#2e86c1', background: '#ebf5fb', accent: '#aed6f1' },
  tileMap: [
    [15, 15, 19, 19, 15, 15, 15, 15, 19, 19, 15, 15],
    [15, 19, 19, 1, 19, 19, 19, 19, 1, 19, 19, 15],
    [19, 19, 1, 1, 1, 19, 19, 1, 1, 1, 19, 19],
    [19, 1, 1, 19, 19, 15, 15, 19, 19, 1, 1, 19],
    [1, 1, 19, 15, 15, 10, 10, 15, 15, 19, 1, 1],
    [1, 19, 19, 15, 10, 3, 3, 10, 15, 19, 19, 1],
    [19, 19, 1, 1, 1, 3, 3, 1, 1, 1, 19, 19],
    [19, 1, 1, 19, 1, 4, 1, 19, 1, 1, 1, 19],
    [19, 19, 1, 19, 19, 1, 19, 19, 1, 19, 19, 19],
    [15, 15, 19, 19, 15, 15, 15, 15, 19, 19, 15, 15]
  ],
  connections: ['whispering_forest', 'central_village', 'crystal_canyon'],
  academies: [
    { x: 5, y: 7, id: 'frost_gym1', name: 'Cave Academy', challenger: 'Glacier Greg', sprite: '🧊', hp: 100, damage: 13, questionsToWin: 5, categories: ['math'], diffRange: [3, 5], badge: '❄️', badgeName: 'Frost Badge', reward: 650 },
    { x: 9, y: 3, id: 'frost_gym2', name: 'Summit Academy', challenger: 'Blizzard Bea', sprite: '⛄', hp: 110, damage: 14, questionsToWin: 6, categories: ['math', 'reading'], diffRange: [3, 5], badge: '🧊', badgeName: 'Ice Badge', reward: 700 }
  ],
  wildEncounterRate: 0.15,
  station: { x: 3, y: 2 }
};

// ── 5. Crystal Canyon (purple crystals, mine; very hard) ──
const CRYSTAL_CANYON = {
  id: 'crystal_canyon',
  name: 'Crystal Canyon',
  description: 'A dazzling canyon of shimmering purple crystals and deep mine tunnels. The gems hold ancient knowledge, but only for those who can master the hardest questions.',
  difficulty: 'very hard',
  colorTheme: { primary: '#9b59b6', secondary: '#6c3483', background: '#f4ecf7', accent: '#c39bd3' },
  tileMap: [
    [20, 20, 10, 10, 20, 20, 20, 20, 10, 10, 20, 20],
    [20, 10, 1, 10, 20, 20, 20, 20, 10, 1, 10, 20],
    [10, 1, 1, 1, 10, 10, 10, 1, 1, 1, 1, 10],
    [10, 1, 10, 10, 20, 20, 20, 10, 10, 1, 1, 10],
    [20, 1, 10, 20, 20, 20, 20, 20, 10, 1, 1, 20],
    [20, 20, 10, 20, 3, 3, 3, 20, 10, 1, 20, 20],
    [20, 20, 1, 10, 3, 3, 3, 10, 1, 1, 20, 20],
    [10, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 10],
    [10, 1, 20, 20, 1, 1, 1, 20, 20, 1, 10, 10],
    [20, 20, 10, 10, 20, 20, 20, 20, 10, 10, 20, 20]
  ],
  connections: ['central_village', 'frostpeak_mountains', 'celestial_isles'],
  academies: [
    { x: 5, y: 7, id: 'crystal_gym1', name: 'Mine Academy', challenger: 'Crystal Kira', sprite: '💎', hp: 130, damage: 16, questionsToWin: 6, categories: ['math', 'reading', 'writing'], diffRange: [3, 5], badge: '🔮', badgeName: 'Amethyst Badge', reward: 850 },
    { x: 3, y: 8, id: 'crystal_gym2', name: 'Crystal Spire Academy', challenger: 'Prism Pete', sprite: '🔷', hp: 140, damage: 17, questionsToWin: 7, categories: ['math', 'reading'], diffRange: [4, 5], badge: '💠', badgeName: 'Diamond Badge', reward: 900 }
  ],
  wildEncounterRate: 0.18,
  station: { x: 3, y: 2 }
};

// ── 6. Celestial Isles (floating islands, moon gate; final exam area) ──
const CELESTIAL_ISLES = {
  id: 'celestial_isles',
  name: 'Celestial Isles',
  description: 'Mystical floating islands suspended in the clouds, connected by moon gates. This is where the final SAT exam awaits the most accomplished scholars.',
  difficulty: 'final',
  colorTheme: { primary: '#2c3e50', secondary: '#1a252f', background: '#ebedef', accent: '#85929e' },
  tileMap: [
    [21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21],
    [21, 0, 0, 1, 21, 21, 21, 1, 0, 0, 21, 21],
    [21, 0, 1, 1, 1, 21, 1, 1, 1, 0, 21, 21],
    [21, 1, 1, 14, 1, 21, 1, 14, 1, 1, 1, 21],
    [21, 1, 1, 1, 1, 21, 1, 1, 1, 1, 1, 21],
    [21, 21, 21, 1, 1, 7, 1, 1, 21, 21, 21, 21],
    [21, 1, 1, 1, 1, 21, 1, 1, 1, 1, 1, 21],
    [21, 1, 1, 14, 1, 21, 1, 14, 1, 1, 1, 21],
    [21, 0, 1, 1, 1, 21, 1, 1, 1, 0, 21, 21],
    [21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21]
  ],
  connections: ['central_village', 'crystal_canyon'],
  academies: [
    { x: 5, y: 5, id: 'celestial_final', name: 'Moon Gate Academy', challenger: 'Principal Proctor', sprite: '🌙', hp: 160, damage: 20, questionsToWin: 8, categories: ['math', 'reading', 'writing'], diffRange: [5, 5], badge: '🌟', badgeName: 'Celestial Badge', reward: 1500 }
  ],
  wildEncounterRate: 0.05,
  station: { x: 3, y: 6 }
};

// ── Exports ──
const WORLDS = [
  SCHOLARS_BEACH,
  WHISPERING_FOREST,
  CENTRAL_VILLAGE,
  FROSTPEAK_MOUNTAINS,
  CRYSTAL_CANYON,
  CELESTIAL_ISLES
];

const WORLD_CONNECTIONS = {
  scholars_beach:       ['central_village'],
  whispering_forest:     ['central_village', 'frostpeak_mountains'],
  central_village:       ['scholars_beach', 'whispering_forest', 'frostpeak_mountains', 'crystal_canyon', 'celestial_isles'],
  frostpeak_mountains:   ['whispering_forest', 'central_village', 'crystal_canyon'],
  crystal_canyon:        ['central_village', 'frostpeak_mountains', 'celestial_isles'],
  celestial_isles:       ['central_village', 'crystal_canyon']
};
