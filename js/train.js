// Train System — travel between worlds with animated train
class TrainSystem {
  constructor() {
    this.animating = false;
    this.styleInjected = false;
  }

  showTrainScreen(fromWorldId, toWorldId, onComplete) {
    this.playTrainSound();
    const canvas = document.getElementById('game-canvas');
    if (!canvas) return;

    const fromWorld = typeof WORLDS !== 'undefined' ? WORLDS.find(w => w.id === fromWorldId) : null;
    const toWorld = typeof WORLDS !== 'undefined' ? WORLDS.find(w => w.id === toWorldId) : null;
    const fromName = fromWorld ? fromWorld.name : fromWorldId;
    const toName = toWorld ? toWorld.name : toWorldId;

    const bg = toWorld && toWorld.colorTheme
      ? `linear-gradient(135deg, ${toWorld.colorTheme.primary}, ${toWorld.colorTheme.secondary})`
      : 'linear-gradient(135deg,#2a2a2a,#4a4a4a)';

    canvas.innerHTML = `
      <div class="train-screen" style="background:${bg}">
        <div class="train-route-info"><span>${fromName}</span> ➡️ <span>${toName}</span></div>
        <div class="train-scene">
          <div class="train-tracks"></div>
          <div class="train-sprite">🚂</div>
        </div>
        <div class="train-progress-container"><div class="train-progress-bar" style="width:0%"></div></div>
        <div class="train-status">Traveling to ${toName}...</div>
      </div>`;

    this._injectStyles();
    this._animateTrain(toName, onComplete);
  }

  playTrainSound() {
    if (typeof sound !== 'undefined' && sound.tone) {
      sound.tone(150, 0.3, 'sawtooth', 0.15);
      sound.tone(200, 0.3, 'sawtooth', 0.12, 0.15);
      sound.tone(150, 0.3, 'sawtooth', 0.15, 0.3);
      sound.tone(200, 0.3, 'sawtooth', 0.12, 0.45);
    }
  }

  showTrainUI() {
    this._injectStyles();
  }

  _injectStyles() {
    if (this.styleInjected) return;
    this.styleInjected = true;
    const s = document.createElement('style');
    s.textContent = `
      .train-screen{position:relative;width:100%;height:100%;min-height:400px;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
      .train-route-info{position:absolute;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,.7);color:#fff;padding:8px 20px;border-radius:20px;font-size:14px;z-index:2}
      .train-scene{position:relative;width:100%;height:200px}
      .train-tracks{position:absolute;bottom:40px;left:0;right:0;height:4px;background:linear-gradient(90deg,#666,#888,#666)}
      .train-sprite{position:absolute;bottom:44px;left:-60px;font-size:48px}
      .train-progress-container{width:80%;max-width:500px;height:16px;background:rgba(255,255,255,.2);border-radius:8px;overflow:hidden;margin-top:15px}
      .train-progress-bar{height:100%;background:linear-gradient(90deg,#4CAF50,#8BC34A);border-radius:8px;transition:width .05s linear}
      .train-status{color:#fff;font-size:16px;margin-top:10px}
      .train-arrive-btn{margin-top:15px;padding:12px 30px;font-size:16px;background:linear-gradient(135deg,#4CAF50,#45a049);color:#fff;border:none;border-radius:25px;cursor:pointer;box-shadow:0 4px 15px rgba(76,175,80,.3)}
    `;
    document.head.appendChild(s);
  }

  _animateTrain(toWorldName, onComplete) {
    const sprite = document.querySelector('.train-sprite');
    const bar = document.querySelector('.train-progress-bar');
    const status = document.querySelector('.train-status');
    if (!sprite || !bar) return;

    const duration = 3000;
    const start = Date.now();
    this.animating = true;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const w = sprite.parentElement.offsetWidth;
      sprite.style.left = (eased * (w + 60) - 60) + 'px';
      bar.style.width = (p * 100) + '%';
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        this.animating = false;
        status.textContent = `Arrived at ${toWorldName}!`;
        const btn = document.createElement('button');
        btn.className = 'train-arrive-btn';
        btn.textContent = 'Arrive';
        btn.onclick = () => {
          if (typeof sound !== 'undefined' && sound.playClick) sound.playClick();
          if (onComplete) onComplete();
        };
        document.getElementById('game-canvas').appendChild(btn);
      }
    };
    requestAnimationFrame(tick);
  }
}

const trainSystem = new TrainSystem();
