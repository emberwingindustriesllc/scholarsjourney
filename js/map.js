// Map System — world-based rendering, player movement, encounters
// Each world from worlds.js provides a 12x10 tileMap with themed terrain
// Tile types: 0=grass, 1=path, 2=building, 3=water, 4=academy, 5=rest stop,
// 6=shop, 7=final tower, 8=tree, 9=flower, 10=rock, 11=bridge, 12=house,
// 13=sign, 14=gate, 15=mountain, 16=train track, 17=train station,
// 18=sand, 19=snow, 20=crystal, 21=cloud

const TILE_TYPES = {
  0:  { class: 'grass',    icon: '',     label: '' },
  1:  { class: 'path',     icon: '',     label: '' },
  2:  { class: 'building', icon: '🏫',  label: 'Academy' },
  3:  { class: 'water',    icon: '🌊',  label: '' },
  4:  { class: 'gym',      icon: '⚔️',  label: 'ACADEMY' },
  5:  { class: 'building', icon: '🏥',  label: 'Rest Stop' },
  6:  { class: 'building', icon: '🏪',  label: 'Shop' },
  7:  { class: 'gym',      icon: '🏰',  label: 'FINAL EXAM' },
  8:  { class: 'tree',     icon: '🌲',  label: '' },
  9:  { class: 'flower',   icon: '🌸',  label: '' },
  10: { class: 'rock',     icon: '🪨',  label: '' },
  11: { class: 'bridge',   icon: '🌉',  label: '' },
  12: { class: 'house',    icon: '🏠',  label: '' },
  13: { class: 'sign',     icon: '🪧',  label: '' },
  14: { class: 'gate',     icon: '⛩️',  label: '' },
  15: { class: 'mountain', icon: '🏔️', label: '' },
  16: { class: 'path',     icon: '🛤️',  label: '' },
  17: { class: 'station',  icon: '🚉',  label: 'Station' },
  18: { class: 'sand',     icon: '',     label: '' },
  19: { class: 'snow',     icon: '',     label: '' },
  20: { class: 'crystal',  icon: '💎',  label: '' },
  21: { class: 'cloud',    icon: '☁️',  label: '' }
};

const DEFAULT_ACADEMIES = [
  { x: 0, y: 0, id: 'gym1', name: 'Algebra Academy', challenger: 'Victory Vic', sprite: '🏋️', hp: 50, damage: 6, questionsToWin: 4, categories: ['math'], diffRange: [1, 2], badge: '🥉', badgeName: 'Bronze Badge', reward: 200 },
  { x: 10, y: 0, id: 'gym2', name: 'Geometry Academy', challenger: 'Geometry Gina', sprite: '📐', hp: 60, damage: 8, questionsToWin: 4, categories: ['math'], diffRange: [1, 3], badge: '🥈', badgeName: 'Silver Badge', reward: 300 },
  { x: 0, y: 7, id: 'gym3', name: 'Reading Academy', challenger: 'Literary Larry', sprite: '📚', hp: 70, damage: 9, questionsToWin: 5, categories: ['reading'], diffRange: [1, 3], badge: '🥇', badgeName: 'Gold Badge', reward: 400 },
  { x: 11, y: 7, id: 'gym4', name: 'Writing Academy', challenger: 'Grammar Grace', sprite: '✍️', hp: 80, damage: 10, questionsToWin: 5, categories: ['writing'], diffRange: [1, 3], badge: '💎', badgeName: 'Platinum Badge', reward: 500 },
  { x: 0, y: 3, id: 'gym5', name: 'Trigonometry Academy', challenger: 'Trig Tony', sprite: '📊', hp: 90, damage: 11, questionsToWin: 5, categories: ['math'], diffRange: [2, 4], badge: '🔴', badgeName: 'Ruby Badge', reward: 600 },
  { x: 11, y: 3, id: 'gym6', name: 'Data Academy', challenger: 'Data Dana', sprite: '📈', hp: 100, damage: 12, questionsToWin: 6, categories: ['math'], diffRange: [2, 4], badge: '🔵', badgeName: 'Sapphire Badge', reward: 700 },
  { x: 5, y: 9, id: 'gym7', name: 'Vocabulary Academy', challenger: 'Vocab Vanessa', sprite: '📖', hp: 110, damage: 13, questionsToWin: 6, categories: ['reading', 'writing'], diffRange: [3, 5], badge: '💚', badgeName: 'Emerald Badge', reward: 800 },
  { x: 10, y: 9, id: 'gym8', name: 'Calculus Academy', challenger: 'Calculus Carl', sprite: '∫', hp: 120, damage: 14, questionsToWin: 6, categories: ['math', 'reading', 'writing'], diffRange: [3, 5], badge: '👑', badgeName: 'Crown Badge', reward: 1000 }
];

const DEFAULT_WILD_TRAINERS = [
  { name: 'Rival Randy', sprite: '😤', hp: 40, damage: 6, questionsToWin: 3, categories: ['math'], diffRange: [1, 2], reward: 100 },
  { name: 'Quiz Mistress Quinn', sprite: '👩‍🏫', hp: 50, damage: 7, questionsToWin: 3, categories: ['reading', 'writing'], diffRange: [1, 3], reward: 150 },
  { name: 'Scholar Steve', sprite: '🤓', hp: 60, damage: 8, questionsToWin: 4, categories: ['math', 'reading', 'writing'], diffRange: [2, 4], reward: 200 },
  { name: 'Fraction Fred', sprite: '🥧', hp: 35, damage: 5, questionsToWin: 3, categories: ['math'], diffRange: [1, 2], reward: 80 },
  { name: 'Essay Emma', sprite: '📝', hp: 45, damage: 6, questionsToWin: 3, categories: ['writing'], diffRange: [1, 3], reward: 120 },
  { name: 'Comma Chris', sprite: '✂️', hp: 40, damage: 6, questionsToWin: 3, categories: ['writing'], diffRange: [1, 2], reward: 100 },
  { name: 'Algebra Alice', sprite: '🔢', hp: 55, damage: 8, questionsToWin: 4, categories: ['math'], diffRange: [2, 4], reward: 180 },
  { name: 'Graph Greg', sprite: '📊', hp: 50, damage: 7, questionsToWin: 3, categories: ['math'], diffRange: [2, 3], reward: 140 }
];

class GameMap {
  constructor(player, world, onEncounter, onHeal, onShop, onFinalExam, onWorldChange) {
    this.player = player;
    this.world = world;
    this.playerX = world.station ? world.station.x : 5;
    this.playerY = world.station ? world.station.y : 4;
    this.onEncounter = onEncounter;
    this.onHeal = onHeal;
    this.onShop = onShop;
    this.onFinalExam = onFinalExam;
    this.onWorldChange = onWorldChange;
    this.defeatedAcademies = new Set();
    this.stepsUntilEncounter = 0;
    this.moveCooldown = false;
    this.tileMap = world.tileMap;
    this.academies = world.academies || DEFAULT_ACADEMIES;
  }

  render() {
    const container = document.getElementById('game-canvas');
    const mapScreen = document.createElement('div');
    mapScreen.className = 'map-screen';

    const grid = document.createElement('div');
    grid.className = 'map-grid';

    for (let y = 0; y < this.tileMap.length; y++) {
      for (let x = 0; x < this.tileMap[y].length; x++) {
        const tile = document.createElement('div');
        const tileType = TILE_TYPES[this.tileMap[y][x]] || TILE_TYPES[0];
        tile.className = `map-tile ${tileType.class}`;

        if (this.tileMap[y][x] === 4) {
          const acad = this.academies.find(a => a.x === x && a.y === y);
          if (acad && this.defeatedAcademies.has(acad.id)) {
            tile.classList.add('defeated');
          }
        }

        if (this.tileMap[y][x] === 0) {
          const seed = (x * 7 + y * 13) % 10;
          if (seed < 2) tile.classList.add('grass-alt');
        }

        if (x === this.playerX && y === this.playerY) {
          tile.classList.add('player-pos');
          tile.innerHTML = '<span class="player-sprite">🧙‍♂️</span>';
        } else {
          tile.textContent = tileType.icon;
        }

        if (tileType.label) {
          const label = document.createElement('span');
          label.className = 'map-label';
          label.textContent = tileType.label;
          tile.appendChild(label);
        }

        tile.addEventListener('click', () => this.handleTileClick(x, y));
        grid.appendChild(tile);
      }
    }

    mapScreen.appendChild(grid);

    const legend = document.createElement('div');
    legend.className = 'map-legend';
    legend.innerHTML = '<span>⚔️ Academy</span><span>🏥 Heal</span><span>🏪 Shop</span><span>🚉 Station</span><span>🏔️ Mountain</span>';
    mapScreen.appendChild(legend);

    container.innerHTML = '';
    container.appendChild(mapScreen);
  }

  handleTileClick(x, y) {
    if (this.moveCooldown) return;

    const dx = Math.abs(x - this.playerX);
    const dy = Math.abs(y - this.playerY);

    if (dx + dy !== 1) {
      this.showMessage('Click an adjacent tile to move!');
      return;
    }

    const tileType = this.tileMap[y][x];
    if (tileType === 3) {
      this.showMessage("Can't walk on water!");
      return;
    }
    if (tileType === 8 || tileType === 10 || tileType === 15) {
      const blockMsg = tileType === 15 ? 'A mountain blocks the path!' : tileType === 8 ? 'A tree blocks the path!' : 'A rock blocks the path!';
      this.showMessage(blockMsg);
      return;
    }

    this.playerX = x;
    this.playerY = y;
    this.moveCooldown = true;
    setTimeout(() => { this.moveCooldown = false; }, 250);

    if (tileType === 4) {
      const acad = this.academies.find(a => a.x === x && a.y === y);
      if (acad && !this.defeatedAcademies.has(acad.id)) {
        this.showMessage(`${acad.challenger} wants to battle!`);
        setTimeout(() => this.startAcademyBattle(acad), 500);
        return;
      } else if (acad) {
        this.showMessage(`${acad.name} — Badge already earned!`);
      }
    }

    if (tileType === 5) {
      setTimeout(() => this.onHeal(), 400);
      return;
    }

    if (tileType === 6) {
      setTimeout(() => this.onShop(), 400);
      return;
    }

    if (tileType === 17) {
      setTimeout(() => this.onWorldChange(), 400);
      return;
    }

    if (tileType === 7) {
      setTimeout(() => this.onFinalExam(), 400);
      return;
    }

    if (tileType === 0 || tileType === 1 || tileType === 18 || tileType === 19 || tileType === 21) {
      this.stepsUntilEncounter++;
      const threshold = 5 + Math.floor(Math.random() * 5);
      if (this.stepsUntilEncounter >= threshold) {
        this.stepsUntilEncounter = 0;
        const rate = this.world.wildEncounterRate || 0.1;
        if (Math.random() < rate + 0.3) {
          setTimeout(() => this.startWildBattle(), 400);
          return;
        }
      }
    }

    this.render();
  }

  startAcademyBattle(acad) {
    this.onEncounter({
      name: acad.challenger,
      sprite: acad.sprite,
      hp: acad.hp,
      damage: acad.damage,
      questionsToWin: acad.questionsToWin,
      categories: acad.categories,
      diffRange: acad.diffRange,
      isGym: true,
      gymId: acad.id,
      badge: acad.badge,
      badgeName: acad.badgeName,
      reward: acad.reward
    });
  }

  startWildBattle() {
    const trainers = DEFAULT_WILD_TRAINERS;
    const trainer = trainers[Math.floor(Math.random() * trainers.length)];
    this.onEncounter({ ...trainer, isGym: false });
  }

  markAcademyDefeated(gymId) {
    this.defeatedAcademies.add(gymId);
    this.render();
  }

  showMessage(msg) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2500);
  }
}