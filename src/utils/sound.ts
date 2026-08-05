// Pentatonic Scale (C Major Pentatonic): C4, D4, E4, G4, A4, C5, D5, E5, G5, A5, C6, D6, E6
export const PENTATONIC_FREQUENCIES = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  1046.50, // C6
  1174.66, // D6
  1318.51, // E6
];

class PentatonicSoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMuted(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  /**
   * Play a bell-like pentatonic tone
   */
  public playNote(freqIndex: number, duration: number = 0.5, type: OscillatorType = 'sine'): number {
    if (this.isMuted) return 0;
    try {
      this.initCtx();
      if (!this.ctx) return 0;

      const idx = Math.abs(freqIndex) % PENTATONIC_FREQUENCIES.length;
      const freq = PENTATONIC_FREQUENCIES[idx];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Envelope: gentle attack, exponential decay
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.35, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Add a subtle second harmonic for warmth
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.exponentialRampToValueAtTime(0.08, now + 0.03);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(this.ctx.destination);
      gain2.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration);
      osc2.stop(now + duration);

      return freq;
    } catch {
      // Audio fallback safeguard
      return 0;
    }
  }

  /**
   * Play a two-note chord on connection
   */
  public playConnectionChord(index1: number, index2: number): number[] {
    const freq1 = this.playNote(index1, 0.6, 'sine');
    const freq2 = this.playNote(index1 + 2, 0.7, 'triangle');
    return [freq1, freq2];
  }

  /**
   * Play back the composed victory melody in a fast, joyful loop
   */
  public playVictoryMelody(freqs: number[], onFinish?: () => void) {
    if (this.isMuted || freqs.length === 0) {
      if (onFinish) setTimeout(onFinish, 1500);
      return;
    }

    this.initCtx();
    const activeFreqs = freqs.filter((f) => f > 0);
    const melody = activeFreqs.length > 0 ? activeFreqs : [261.63, 329.63, 392.0, 523.25, 659.25];

    let step = 0;
    const speedMs = 180; // Fast, joyful rhythm
    const totalLoops = 2;
    const totalSteps = melody.length * totalLoops;

    const interval = setInterval(() => {
      if (step >= totalSteps) {
        clearInterval(interval);
        if (onFinish) onFinish();
        return;
      }

      const currentFreq = melody[step % melody.length];
      const octaveShift = step >= melody.length ? 1.5 : 1.0;

      try {
        if (this.ctx) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(currentFreq * octaveShift, this.ctx.currentTime);

          const now = this.ctx.currentTime;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.35);
        }
      } catch {
        // Safe catch
      }

      step++;
    }, speedMs);
  }

  /**
   * Play chirp sound for Living Charm
   */
  public playCharmChirp(pitchMult: number = 1.0) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 * pitchMult, now);
      osc.frequency.exponentialRampToValueAtTime(880 * pitchMult, now + 0.15);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.3, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Safe catch
    }
  }
}

export const soundEngine = new PentatonicSoundEngine();
