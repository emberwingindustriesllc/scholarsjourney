/* SoundManager – Web Audio API sound effects for sat-mon */

class SoundManager {
  constructor() {
    this.ctx = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported');
    }
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  tone(freq, duration, type = 'sine', vol = 0.2, delay = 0) {
    if (!this.ctx) return;
    this.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, this.ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + duration);
    osc.connect(gain).connect(this.ctx.destination);
    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + duration);
  }

  playClick() { this.tone(800, 0.08, 'sine', 0.3); }

  playCorrect() {
    this.tone(523, 0.15, 'sine', 0.2);
    this.tone(659, 0.15, 'sine', 0.2, 0.1);
    this.tone(784, 0.3, 'sine', 0.2, 0.2);
  }

  playWrong() {
    this.tone(300, 0.25, 'sawtooth', 0.2);
    this.tone(200, 0.35, 'sawtooth', 0.2, 0.15);
  }

  playBattleStart() {
    this.tone(100, 0.8, 'sawtooth', 0.15);
    this.tone(200, 0.6, 'sawtooth', 0.1, 0.2);
    this.tone(400, 0.4, 'sawtooth', 0.08, 0.5);
  }

  playBadge() {
    this.tone(523, 0.15, 'sine', 0.2);
    this.tone(659, 0.15, 'sine', 0.2, 0.12);
    this.tone(784, 0.15, 'sine', 0.2, 0.24);
    this.tone(1047, 0.4, 'sine', 0.2, 0.36);
  }

  playVictory() {
    this.tone(523, 0.3, 'sine', 0.2);
    this.tone(659, 0.3, 'sine', 0.2, 0.1);
    this.tone(784, 0.3, 'sine', 0.2, 0.2);
    this.tone(1047, 0.5, 'sine', 0.25, 0.3);
  }

  playDefeat() {
    this.tone(400, 0.5, 'sine', 0.2);
    this.tone(300, 0.5, 'sine', 0.2, 0.3);
    this.tone(200, 0.8, 'sine', 0.2, 0.6);
  }

  playStep() { this.tone(200, 0.05, 'sine', 0.15); }

  playAcademyBattle() {
    this.tone(150, 0.5, 'sawtooth', 0.2);
    this.tone(200, 0.4, 'sawtooth', 0.15, 0.2);
    this.tone(250, 0.3, 'sawtooth', 0.12, 0.4);
    this.tone(300, 0.3, 'sawtooth', 0.1, 0.6);
  }
}

const sound = new SoundManager();

document.addEventListener('click', () => { sound.init(); sound.resume(); }, { once: true });
document.addEventListener('keydown', () => { sound.init(); sound.resume(); }, { once: true });
