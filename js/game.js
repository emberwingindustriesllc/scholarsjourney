// Main Game Controller — screens, state, battles, rewards, final exam, save/load, multi-world

const SAVE_KEY = 'satquest_save';

const ACADEMY_BADGES = [
  { id: 'gym1', icon: '🥉', name: 'Bronze', academy: 'Algebra Academy' },
  { id: 'gym2', icon: '🥈', name: 'Silver', academy: 'Geometry Academy' },
  { id: 'gym3', icon: '🥇', name: 'Gold', academy: 'Reading Academy' },
  { id: 'gym4', icon: '💎', name: 'Platinum', academy: 'Writing Academy' },
  { id: 'gym5', icon: '🔴', name: 'Ruby', academy: 'Trigonometry Academy' },
  { id: 'gym6', icon: '🔵', name: 'Sapphire', academy: 'Data Academy' },
  { id: 'gym7', icon: '💚', name: 'Emerald', academy: 'Vocabulary Academy' },
  { id: 'gym8', icon: '👑', name: 'Crown', academy: 'Calculus Academy' }
];

const POTION_PRICES = [
  { name: '🧪 Energy Drink', effect: 'Full heal', cost: 100 },
  { name: '📚 Flash Cards', effect: '+50 pts', cost: 150 },
  { name: '🎯 Lucky Pencil', effect: 'Hint next battle', cost: 200 },
  { name: '⚡ Turbo Study', effect: '+100 pts', cost: 300 }
];

class Game {
  constructor() {
    this.player = this.createDefaultPlayer();
    this.map = null;
    this.currentScreen = 'title';
    this.currentBattle = null;
    this.hasSave = this.checkSave();
    this.init();
  }

  createDefaultPlayer() {
    return {
      name: 'SCHOLAR',
      level: 1,
      score: 0,
      gold: 500,
      badges: [],
      stats: { math: 0, reading: 0, writing: 0 },
      battlesWon: 0,
      totalAnswered: 0,
      correctAnswers: 0,
      potions: [],
      hintActive: false,
      playerX: 5,
      playerY: 4,
      currentWorld: 'scholars_beach'
    };
  }

  init() {
    this.renderTitleScreen();
  }

  checkSave() {
    try {
      return localStorage.getItem(SAVE_KEY) !== null;
    } catch (e) {
      return false;
    }
  }

  saveGame() {
    try {
      const saveData = {
        player: this.player,
        currentWorldId: this.player.currentWorld,
        map: this.map ? {
          playerX: this.map.playerX,
          playerY: this.map.playerY,
          defeatedAcademies: Array.from(this.map.defeatedAcademies),
          stepsUntilEncounter: this.map.stepsUntilEncounter
        } : null
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
      this.hasSave = true;
      this.addLog('Game saved!');
      this.showMessageNotification('Game saved successfully!');
    } catch (e) {
      this.showMessageNotification('Failed to save game.');
    }
  }

  loadGame() {
    try {
      const saveData = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!saveData) return false;

      this.player = { ...this.createDefaultPlayer(), ...saveData.player };
      this.currentWorld = WORLDS.find(w => w.id === this.player.currentWorld) || WORLDS[0];
      if (saveData.map) {
        this.map = new GameMap(
          this.player, this.currentWorld,
          (trainer) => this.startBattle(trainer),
          () => this.healAtCenter(),
          () => this.openShop(),
          () => this.startFinalExam(),
          () => this.showWorldMenu()
        );
        this.map.playerX = saveData.map.playerX;
        this.map.playerY = saveData.map.playerY;
        this.map.defeatedAcademies = new Set(saveData.map.defeatedAcademies);
        this.map.stepsUntilEncounter = saveData.map.stepsUntilEncounter;
      } else {
        this.map = new GameMap(
          this.player, this.currentWorld,
          (trainer) => this.startBattle(trainer),
          () => this.healAtCenter(),
          () => this.openShop(),
          () => this.startFinalExam(),
          () => this.showWorldMenu()
        );
      }
      this.addLog('Game loaded!');
      this.addLog('Welcome back, Scholar!');
      this.renderMapScreen();
      return true;
    } catch (e) {
      this.showMessageNotification('Failed to load game.');
      return false;
    }
  }

  deleteSave() {
    try {
      localStorage.removeItem(SAVE_KEY);
      this.hasSave = false;
    } catch (e) {}
  }

  showMessageNotification(msg) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = msg;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
  }

  renderTitleScreen() {
    this.currentScreen = 'title';
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = `
      <div class="title-screen">
        <div class="title-logo">SAT MASTERS</div>
        <div class="title-subtitle">A Scholar's Journey to Test-Day Victory</div>
        <div class="title-menu">
          <button class="menu-btn primary" onclick="game.startNewGame()">New Journey</button>
          ${this.hasSave ? '<button class="menu-btn" onclick="game.loadGame()">Continue</button>' : ''}
          <button class="menu-btn" onclick="game.showHowToPlay()">How to Play</button>
          <button class="menu-btn" onclick="game.showCredits()">Credits</button>
        </div>
      </div>
    `;
    this.updateHUD();
  }

  showHowToPlay() {
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = `
      <div class="title-screen">
        <div class="title-logo" style="font-size:28px">How to Play</div>
        <div style="max-width:600px;padding:20px;font-size:15px;line-height:1.8;color:var(--text-light)">
          <p>🗺️ <b>Explore the map</b> — Click adjacent tiles to walk around</p>
          <p>⚔️ <b>Battle challengers</b> — Answer SAT questions to deal damage</p>
          <p>🏋️ <b>Challenge 8 Academies</b> — Each academy master specializes in a topic</p>
          <p>🏥 <b>Visit the Rest Stop</b> — Heal your HP for free</p>
          <p>🏪 <b>Shop</b> — Buy items with gold earned from battles</p>
          <p>🏰 <b>Final Exam</b> — Unlock after earning all 8 academy badges</p>
          <p>💾 <b>Save / Load</b> — Progress auto-saves; use Continue on title</p>
          <p style="margin-top:20px;color:var(--accent-gold)">Tip: Correct answers deal more damage. Wrong answers let the enemy attack!</p>
        </div>
        <div class="title-menu">
          <button class="menu-btn" onclick="game.renderTitleScreen()">Back</button>
        </div>
      </div>
    `;
  }

  showCredits() {
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = `
      <div class="title-screen">
        <div class="title-logo" style="font-size:28px">Credits</div>
        <div style="max-width:500px;padding:20px;font-size:15px;line-height:1.8;text-align:center;color:var(--text-light)">
          <p style="font-size:20px;color:var(--accent-gold);margin-bottom:15px">SAT Masters</p>
          <p>An educational SAT-prep adventure</p>
          <p style="margin-top:20px">Built with HTML, CSS, and JavaScript</p>
          <p>Questions based on official SAT practice materials</p>
          <p style="margin-top:20px;color:var(--text-muted)">Made for students preparing for the SAT</p>
        </div>
        <div class="title-menu">
          <button class="menu-btn" onclick="game.renderTitleScreen()">Back</button>
        </div>
      </div>
    `;
  }

  startNewGame() {
    this.deleteSave();
    this.player = this.createDefaultPlayer();
    this.currentWorld = WORLDS[0];
    this.createMapForWorld(this.currentWorld);
    this.addLog('Your journey begins!');
    this.addLog('Explore the world and battle challengers to prepare for the SAT!');
    this.addLog('Click adjacent tiles to walk. Find academies to earn badges!');
    this.addLog('Visit train stations to travel to new worlds!');
    this.renderMapScreen();
  }

  createMapForWorld(world) {
    this.currentWorld = world;
    this.player.currentWorld = world.id;
    this.map = new GameMap(
      this.player, world,
      (t) => this.startBattle(t),
      () => this.healAtCenter(),
      () => this.openShop(),
      () => this.startFinalExam(),
      () => this.showWorldMenu()
    );
  }

  showWorldMenu() {
    this.currentScreen = 'worldmenu';
    const canvas = document.getElementById('game-canvas');
    const connections = WORLD_CONNECTIONS[this.currentWorld.id] || [];
    const availableWorlds = connections.map(id => WORLDS.find(w => w.id === id)).filter(Boolean);

    canvas.innerHTML = `
      <div class="title-screen">
        <div class="title-logo" style="font-size:28px">🚉 Train Station</div>
        <div style="margin:15px 0;font-size:14px;color:var(--text-muted)">Travel from <b style="color:var(--accent-gold)">${this.currentWorld.name}</b></div>
        <div class="title-menu" style="width:400px">
          ${availableWorlds.map(w => `
            <button class="menu-btn" onclick="game.travelToWorld('${w.id}')">
              🚂 ${w.name}
              <br><small style="color:var(--text-muted);font-size:10px">${w.description}</small>
            </button>
          `).join('')}
          <button class="menu-btn" onclick="game.renderMapScreen()">Stay Here</button>
        </div>
      </div>
    `;
    if (typeof sound !== 'undefined' && sound.playClick) sound.playClick();
  }

  travelToWorld(targetWorldId) {
    const targetWorld = WORLDS.find(w => w.id === targetWorldId);
    if (!targetWorld) return;
    if (typeof trainSystem !== 'undefined') {
      trainSystem.showTrainScreen(this.currentWorld.id, targetWorldId, () => {
        this.createMapForWorld(targetWorld);
        this.addLog(`Arrived at ${targetWorld.name}!`);
        this.saveGame();
        this.renderMapScreen();
      });
    } else {
      this.createMapForWorld(targetWorld);
      this.renderMapScreen();
    }
  }

  renderMapScreen() {
    this.currentScreen = 'map';
    if (this.map) {
      this.map.render();
    }
    this.updateHUD();
  }

  updateHUD() {
    document.getElementById('player-name').textContent = this.player.name;
    document.getElementById('player-level').textContent = `Lv. ${this.player.level}`;
    document.getElementById('player-score').textContent = `${this.player.score} pts`;
    document.getElementById('player-gold').textContent = `💰 ${this.player.gold}`;
    document.getElementById('badge-count').textContent = `🏅 ${this.player.badges.length}/8`;

    // Update stat bars
    ['math', 'reading', 'writing'].forEach(cat => {
      const val = Math.min(100, this.player.stats[cat]);
      const bar = document.getElementById(`stat-${cat}`);
      const label = document.getElementById(`stat-${cat}-val`);
      if (bar) bar.style.width = `${val}%`;
      if (label) label.textContent = `${val}%`;
    });

    // Update badges grid
    const badgesGrid = document.getElementById('badges-grid');
    if (badgesGrid) {
      badgesGrid.innerHTML = ACADEMY_BADGES.map(badge => {
        const earned = this.player.badges.includes(badge.id);
        return `<div class="badge ${earned ? 'earned' : ''}" title="${badge.name} - ${badge.academy}">${badge.icon}</div>`;
      }).join('');
    }
  }

  addLog(msg) {
    const logEntries = document.getElementById('log-entries');
    if (logEntries) {
      const entry = document.createElement('div');
      entry.className = 'log-entry';
      entry.textContent = msg;
      logEntries.insertBefore(entry, logEntries.firstChild);
      while (logEntries.children.length > 50) {
        logEntries.removeChild(logEntries.lastChild);
      }
    }
  }

  startBattle(trainer) {
    this.currentScreen = 'battle';
    this.currentBattle = new Battle(
      this.player,
      trainer,
      (result) => this.handleBattleWin(trainer, result),
      (result) => this.handleBattleLose(trainer, result)
    );
    if (trainer.isGym && typeof sound !== 'undefined' && sound.playGymBattle) {
      sound.playGymBattle();
    } else if (typeof sound !== 'undefined' && sound.playBattleStart) {
      sound.playBattleStart();
    }
    this.renderBattleScreen(trainer);
  }

  renderBattleScreen(trainer) {
    const canvas = document.getElementById('game-canvas');
    const battle = this.currentBattle;
    const question = battle.getRandomQuestion();

    canvas.innerHTML = `
      <div class="battle-screen">
        <div class="battle-field">
          <div class="challenger-display">
            <div class="challenger-sprite">${this.player.sprite || '🧙‍♂️'}</div>
            <div class="challenger-info">
              <div class="challenger-name">${this.player.name}</div>
              <div class="hp-bar-container">
                <div class="hp-bar-fill ${this.getHPClass(battle.getPlayerHP())}" style="width:${battle.getPlayerHP()}%"></div>
              </div>
              <div style="font-size:10px;color:#666">${battle.getPlayerHP()} HP</div>
            </div>
          </div>
          <div class="vs-badge">VS</div>
          <div class="challenger-display">
            <div class="challenger-sprite">${trainer.sprite}</div>
            <div class="challenger-info">
              <div class="challenger-name">${trainer.name}</div>
              <div class="challenger-subtitle">${trainer.isGym ? '⭐ Subject Master ⭐' : 'Rival Scholar'}</div>
              <div class="hp-bar-container">
                <div class="hp-bar-fill ${this.getHPClass(battle.getEnemyHP())}" style="width:${battle.getEnemyHP()}%"></div>
              </div>
              <div style="font-size:10px;color:#666">${battle.getEnemyHP()} HP</div>
            </div>
          </div>
        </div>
        <div class="battle-bottom">
          <div class="battle-dialog">
            <span style="color:var(--accent-gold);font-weight:bold">${trainer.name}</span> wants to battle!
            <br><span style="color:var(--text-muted);font-size:12px">Question ${battle.getQuestionsAnswered() + 1} of ${battle.getMaxQuestions()}</span>
          </div>
          <div class="question-card">
            <div>
              <span class="question-category ${question.cat}">${question.cat.toUpperCase()}</span>
              <span class="question-category diff">Difficulty ${'★'.repeat(question.diff)}${'☆'.repeat(5 - question.diff)}</span>
            </div>
            <div class="question-text">${question.q}</div>
            <div class="answer-options">
              ${question.opts.map((opt, i) => `
                <button class="answer-btn" onclick="game.submitAnswer(${i})">${opt}</button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getHPClass(hp) {
    if (hp > 60) return '';
    if (hp > 30) return 'medium';
    return 'low';
  }

  submitAnswer(answerIndex) {
    if (!this.currentBattle || this.currentBattle.battleOver) return;

    const question = this.currentBattle.getCurrentQuestion();
    if (!question) return;

    const result = this.currentBattle.playerAttack(question, answerIndex);

    if (typeof sound !== 'undefined') {
      if (result.correct && sound.playCorrect) sound.playCorrect();
      else if (!result.correct && sound.playWrong) sound.playWrong();
    }

    // Apply hint if active
    if (this.player.hintActive) {
      this.player.hintActive = false;
      this.addLog('Lucky Pencil used! Bonus points!');
      this.player.score += 25;
    }

    // Update player stats
    this.player.totalAnswered++;
    if (result.correct) {
      this.player.correctAnswers++;
      const cat = question.cat;
      this.player.stats[cat] = Math.min(100, this.player.stats[cat] + 5);
    }

    this.showBattleResult(question, answerIndex, result);
  }

  showBattleResult(question, selectedIndex, result) {
    const canvas = document.getElementById('game-canvas');
    const trainer = this.currentBattle.trainer;
    const battle = this.currentBattle;
    const outcome = battle.isBattleOver();

    canvas.innerHTML = `
      <div class="battle-screen">
        <div class="battle-field">
          <div class="trainer-display">
            <div class="trainer-sprite">${this.player.sprite || '🧙‍♂️'}</div>
            <div class="trainer-info">
              <div class="trainer-name">${this.player.name}</div>
              <div class="hp-bar-container">
                <div class="hp-bar-fill ${this.getHPClass(battle.getPlayerHP())}" style="width:${battle.getPlayerHP()}%"></div>
              </div>
              <div style="font-size:10px;color:#666">${battle.getPlayerHP()} HP</div>
            </div>
          </div>
          <div class="vs-badge">VS</div>
          <div class="trainer-display">
            <div class="trainer-sprite">${trainer.sprite}</div>
            <div class="trainer-info">
              <div class="trainer-name">${trainer.name}</div>
              <div class="trainer-subtitle">${trainer.isGym ? '⭐ Subject Master ⭐' : 'Rival Scholar'}</div>
              <div class="hp-bar-container">
                <div class="hp-bar-fill ${this.getHPClass(battle.getEnemyHP())}" style="width:${battle.getEnemyHP()}%"></div>
              </div>
              <div style="font-size:10px;color:#666">${battle.getEnemyHP()} HP</div>
            </div>
          </div>
        </div>
        <div class="battle-bottom">
          <div class="battle-dialog">
            ${result.correct
              ? `<span style="color:var(--accent-green);font-weight:bold">✅ Correct!</span> You dealt <span style="color:var(--accent-gold)">${result.damage}</span> damage!`
              : `<span style="color:var(--accent-red);font-weight:bold">❌ Wrong!</span> The answer was "<b>${result.correctAnswer}</b>". Enemy dealt <span style="color:var(--accent-red)">${result.damage}</span> damage!`
            }
          </div>
          <div class="question-card">
            <div class="explanation-box">
              <b>💡 Explanation:</b> ${result.explanation}
            </div>
            <div style="display:flex;gap:10px;justify-content:center;padding:10px 0">
              <button class="menu-btn" style="min-width:200px;font-size:18px;padding:14px 28px;border:3px solid var(--accent-gold)" onclick="game.nextBattleTurn()">Continue ➡️</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Add keyboard listener for Enter/Space to continue
    this._continueHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.nextBattleTurn();
      }
    };
    document.addEventListener('keydown', this._continueHandler);

    if (result.correct) {
      this.addLog(`✅ Correct! Dealt ${result.damage} damage.`);
    } else {
      this.addLog(`❌ Wrong. Took ${result.damage} damage.`);
    }

    this.updateHUD();
  }

  nextBattleTurn() {
    const battle = this.currentBattle;
    const outcome = battle.isBattleOver();

    if (outcome === 'win') {
      this.handleBattleWin(battle.trainer, { damage: 0 });
    } else if (outcome === 'lose') {
      this.handleBattleLose(battle.trainer, { damage: 0 });
    } else {
      this.renderBattleScreen(battle.trainer);
    }
  }

  handleBattleWin(trainer, result) {
    this.player.battlesWon++;
    const reward = trainer.reward || 100;
    this.player.gold += reward;
    this.player.score += reward * 2;
    this.player.level = Math.min(50, Math.floor(this.player.battlesWon / 3) + 1);

    this.addLog(`🏆 Victory against ${trainer.name}! Earned ${reward} gold.`);

    // Auto-save after academy battle
    if (trainer.isGym) {
      this.saveGame();
    }

    if (typeof sound !== 'undefined') {
      if (trainer.isGym && sound.playBadge) sound.playBadge();
      else if (sound.playVictory) sound.playVictory();
    }

    if (trainer.isGym) {
      this.player.badges.push(trainer.gymId);
      if (this.map) this.map.markAcademyDefeated(trainer.gymId);
      this.showBadgeReward(trainer);
    } else {
      this.showVictoryScreen(trainer, reward);
    }

    this.updateHUD();
  }

  handleBattleLose(trainer, result) {
    this.addLog(`Lost to ${trainer.name}. Train harder and try again!`);
    if (typeof sound !== 'undefined' && sound.playDefeat) sound.playDefeat();
    this.showDefeatScreen(trainer);
    this.updateHUD();
  }

  showBadgeReward(trainer) {
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = `
      <div class="reward-screen">
        <div class="reward-badge">${trainer.badge}</div>
        <div class="reward-title">${trainer.badgeName} Earned!</div>
        <div class="reward-desc">
          You defeated <b>${trainer.name}</b> at <b>${trainer.name.replace(/\\s/g, '')} Academy</b>!<br>
          <span style="color:var(--accent-gold)">+${trainer.reward} gold</span> |
          <span style="color:var(--accent-green)">+${trainer.reward * 2} pts</span>
        </div>
        <div style="text-align:center;margin-top:10px">
          <p style="color:var(--text-muted);font-size:14px">Academy Badges: ${this.player.badges.length}/8</p>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:10px">
            ${ACADEMY_BADGES.map(b => `<span style="font-size:28px;opacity:${this.player.badges.includes(b.id) ? 1 : 0.25}">${b.icon}</span>`).join('')}
          </div>
          ${this.player.badges.length >= 8
            ? '<p style="color:var(--accent-purple);margin-top:15px;font-size:18px">🏰 The Final Exam Tower is now open!</p>'
            : `<p style="color:var(--text-muted);margin-top:10px">Find ${8 - this.player.badges.length} more academies to unlock the Final Exam!</p>`
          }
        </div>
        <button class="menu-btn primary" onclick="game.renderMapScreen()">Continue Journey</button>
      </div>
    `;
    this.addLog(`Earned ${trainer.badgeName}!`);
  }

  showVictoryScreen(trainer, reward) {
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = `
      <div class="reward-screen">
        <div class="reward-badge">⭐</div>
        <div class="reward-title">Victory!</div>
        <div class="reward-desc">
          You defeated <b>${trainer.name}</b>!<br>
          <span style="color:var(--accent-gold)">+${reward} gold</span> |
          <span style="color:var(--accent-green)">+${reward * 2} pts</span>
        </div>
        <button class="menu-btn primary" onclick="game.renderMapScreen()">Continue</button>
      </div>
    `;
  }

  showDefeatScreen(trainer) {
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = `
      <div class="reward-screen">
        <div class="reward-badge">💀</div>
        <div class="reward-title" style="color:var(--accent-red)">Defeated!</div>
        <div class="reward-desc">
          <b>${trainer.name}</b> got the best of you this time.<br>
          Study the explanations and try again!
        </div>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:15px">
          <button class="menu-btn primary" onclick="game.renderMapScreen()">Return to Map</button>
        </div>
      </div>
    `;
  }

  healAtCenter() {
    this.currentBattle = null;
    this.player.hp = 100;
    this.addLog('Visited the Rest Stop. Fully healed!');
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = `
      <div class="reward-screen">
        <div class="reward-badge">🏥</div>
        <div class="reward-title">Rest Stop</div>
        <div class="reward-desc">Your HP has been fully restored!<br>Ready for your next battle?</div>
        <button class="menu-btn primary" onclick="game.renderMapScreen()">Continue</button>
      </div>
    `;
  }

  openShop() {
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = `
      <div class="title-screen">
        <div class="title-logo" style="font-size:28px">🏪 Potion Shop</div>
        <div style="margin:20px 0;font-size:16px;color:var(--accent-gold)">Your Gold: 💰 ${this.player.gold}</div>
        <div class="title-menu" style="width:420px">
          ${POTION_PRICES.map((item, i) => `
            <button class="menu-btn" onclick="game.buyItem(${i})" ${this.player.gold < item.cost ? 'disabled style="opacity:0.4"' : ''}>
              ${item.name} — ${item.cost}g
              <br><small style="color:var(--text-muted)">${item.effect}</small>
            </button>
          `).join('')}
          <button class="menu-btn" onclick="game.saveGame()">💾 Save Game</button>
          <button class="menu-btn" onclick="game.renderMapScreen()">Leave Shop</button>
        </div>
      </div>
    `;
  }

  buyItem(index) {
    const item = POTION_PRICES[index];
    if (this.player.gold >= item.cost) {
      this.player.gold -= item.cost;
      if (index === 0) {
        this.player.hp = 100;
        this.addLog('Bought Energy Drink. HP restored!');
      } else if (index === 1) {
        this.player.score += 50;
        this.addLog('Bought Flash Cards. +50 points!');
      } else if (index === 2) {
        this.player.hintActive = true;
        this.addLog('Bought Lucky Pencil. Next battle gets +25 pts!');
      } else if (index === 3) {
        this.player.score += 100;
        this.addLog('Bought Turbo Study. +100 points!');
      }
      this.updateHUD();
      this.openShop();
    }
  }

  startFinalExam() {
    if (this.player.badges.length < 8) {
      const canvas = document.getElementById('game-canvas');
      canvas.innerHTML = `
        <div class="title-screen">
          <div class="title-logo" style="font-size:28px">🏰 Final Exam Tower</div>
          <div style="margin:20px 0;font-size:16px;color:var(--accent-red)">
            You need all 8 academy badges to enter!<br>
            Current: ${this.player.badges.length}/8 badges
          </div>
          <div style="display:flex;gap:6px;justify-content:center;margin:15px 0">
            ${ACADEMY_BADGES.map(b => `<span style="font-size:24px;opacity:${this.player.badges.includes(b.id) ? 1 : 0.2}">${b.icon}</span>`).join('')}
          </div>
          <div class="title-menu">
            <button class="menu-btn primary" onclick="game.renderMapScreen()">Return to Map</button>
          </div>
        </div>
      `;
      return;
    }

    this.currentScreen = 'exam';
    const canvas = document.getElementById('game-canvas');
    canvas.innerHTML = `
      <div class="exam-screen">
        <div class="exam-title">THE FINAL EXAM</div>
        <div class="exam-subtitle">
          You've earned all 8 badges and proven your knowledge!<br>
          Now face the ultimate challenge — a full SAT simulation.
        </div>
        <div class="exam-stats">
          <div class="exam-stat">
            <div class="exam-stat-value">${this.player.stats.math}%</div>
            <div class="exam-stat-label">Math</div>
          </div>
          <div class="exam-stat">
            <div class="exam-stat-value">${this.player.stats.reading}%</div>
            <div class="exam-stat-label">Reading</div>
          </div>
          <div class="exam-stat">
            <div class="exam-stat-value">${this.player.stats.writing}%</div>
            <div class="exam-stat-label">Writing</div>
          </div>
          <div class="exam-stat">
            <div class="exam-stat-value">${this.player.score}</div>
            <div class="exam-stat-label">Total Pts</div>
          </div>
        </div>
        <div class="title-menu" style="margin-top:20px">
          <button class="menu-btn primary" onclick="game.startExamBattle()">Begin Final Exam</button>
          <button class="menu-btn" onclick="game.renderMapScreen()">Not Yet — Keep Training</button>
        </div>
      </div>
    `;
  }

  startExamBattle() {
    this.currentScreen = 'battle';
    const examTrainer = {
      name: 'The College Board',
      sprite: '📝',
      hp: 150,
      damage: 12,
      questionsToWin: 8,
      categories: ['math', 'reading', 'writing'],
      diffRange: [3, 5],
      isGym: true,
      gymId: 'final',
      badge: '👑',
      badgeName: 'SAT Master',
      reward: 1000
    };

    this.currentBattle = new Battle(
      this.player,
      examTrainer,
      (result) => this.handleExamWin(examTrainer, result),
      (result) => this.handleBattleLose(examTrainer, result)
    );
    this.renderBattleScreen(examTrainer);
  }

  handleExamWin(trainer, result) {
    this.player.badges.push('final');
    this.player.gold += 1000;
    this.player.score += 2000;
    this.deleteSave();

    const canvas = document.getElementById('game-canvas');
    const accuracy = Math.round(this.player.correctAnswers / Math.max(1, this.player.totalAnswered) * 100);
    canvas.innerHTML = `
      <div class="exam-screen" style="background:linear-gradient(180deg,#1a0a2e 0%,#4a1a6b 100%)">
        <div class="exam-title">🎉 CONGRATULATIONS! 🎉</div>
        <div class="exam-subtitle">
          You have defeated the Final Exam and earned the <b style="color:var(--accent-gold)">👑 SAT Master</b> badge!<br><br>
          Your dedication and hard work have paid off.<br>
          You are now fully prepared for test day!
        </div>
        <div class="exam-stats">
          <div class="exam-stat">
            <div class="exam-stat-value">${this.player.score}</div>
            <div class="exam-stat-label">Final Score</div>
          </div>
          <div class="exam-stat">
            <div class="exam-stat-value">${this.player.battlesWon}</div>
            <div class="exam-stat-label">Battles Won</div>
          </div>
          <div class="exam-stat">
            <div class="exam-stat-value">${accuracy}%</div>
            <div class="exam-stat-label">Accuracy</div>
          </div>
        </div>
        <div class="title-menu" style="margin-top:20px">
          <button class="menu-btn primary" onclick="game.renderTitleScreen()">Play Again</button>
        </div>
      </div>
    `;
    this.addLog('👑 VICTORY! You conquered the Final Exam!');
    this.updateHUD();
  }
}

// Initialize game
let game;
window.addEventListener('DOMContentLoaded', () => {
  game = new Game();
});
