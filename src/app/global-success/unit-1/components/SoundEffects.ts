
// src/app/global-success/unit-1/components/SoundEffects.ts
// UPDATED: 2025-01-27 - Enhanced sound effects with Tone.js for interactive pathfinder game

import * as Tone from 'tone';

export class SoundEffects {
  private synths: {
    start: Tone.Synth;
    win: Tone.PolySynth;
    lose: Tone.Synth;
    streak: Tone.Synth;
    timeout: Tone.Synth;
    correct: Tone.Synth;
    incorrect: Tone.Synth;
    nightmare: Tone.Synth;
    ambient: Tone.Synth;
  } | null = null;

  private backgroundMusic: {
    easy: Tone.Loop | null;
    medium: Tone.Loop | null;
    hard: Tone.Loop | null;
    nightmare: Tone.Loop | null;
  } = {
    easy: null,
    medium: null,
    hard: null,
    nightmare: null
  };

  private effects: {
    reverb: Tone.Reverb;
    distortion: Tone.Distortion;
    filter: Tone.Filter;
  } | null = null;

  private initialized = false;
  private currentDifficulty: string = 'medium';
  private lastSoundTime: number = 0;

  async initialize() {
    if (this.initialized) return;

    try {
      // Start audio context
      await Tone.start();
      
      // Initialize effects
      this.effects = {
        reverb: new Tone.Reverb(2).toDestination(),
        distortion: new Tone.Distortion(0.4).toDestination(),
        filter: new Tone.Filter(800, 'lowpass').toDestination()
      };

      // Initialize synths with effects routing
      this.synths = {
        start: new Tone.Synth({ 
          oscillator: { type: 'fatsawtooth' }, 
          envelope: { attack: 0.1, decay: 0.2, sustain: 0.1, release: 0.3 } 
        }).connect(this.effects.reverb),
        
        win: new Tone.PolySynth(Tone.Synth, { 
          oscillator: { type: 'triangle' },
          envelope: { attack: 0.1, decay: 0.3, sustain: 0.2, release: 0.8 }
        }).connect(this.effects.reverb),
        
        lose: new Tone.Synth({ 
          oscillator: { type: 'square' }, 
          envelope: { attack: 0.2, decay: 0.5, sustain: 0, release: 0.5 } 
        }).connect(this.effects.distortion),
        
        streak: new Tone.Synth({ 
          oscillator: { type: 'sine' },
          envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 0.4 }
        }).connect(this.effects.filter),
        // @ts-ignore
        timeout: new Tone.NoiseSynth({
          noise: { type: 'brown' },
          envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }
        }).connect(this.effects.distortion),

        correct: new Tone.Synth({
          oscillator: { type: 'triangle' },
          envelope: { attack: 0.05, decay: 0.2, sustain: 0.1, release: 0.3 }
        }).toDestination(),

        incorrect: new Tone.Synth({
          oscillator: { type: 'sawtooth' },
          envelope: { attack: 0.1, decay: 0.3, sustain: 0, release: 0.2 }
        }).connect(this.effects.distortion),

        nightmare: new Tone.Synth({
          oscillator: { type: 'square' },
          envelope: { attack: 0.01, decay: 0.1, sustain: 0.5, release: 1.0 }
        }).connect(this.effects.distortion),

        ambient: new Tone.Synth({
          oscillator: { type: 'sine' },
          envelope: { attack: 2.0, decay: 1.0, sustain: 0.8, release: 3.0 }
        }).connect(this.effects.reverb)
      };

      // Initialize background music loops
      this.initializeBackgroundMusic();

      this.initialized = true;
    } catch (error) {
      console.warn('Failed to initialize sound effects:', error);
    }
  }

  private initializeBackgroundMusic() {
    if (!this.synths) return;

    // Easy mode - peaceful melody
    this.backgroundMusic.easy = new Tone.Loop((time) => {
      const notes = ['C4', 'E4', 'G4', 'C5'];
      const note = notes[Math.floor(Math.random() * notes.length)];
      this.synths!.ambient.triggerAttackRelease(note, '2n', time);
    }, '2n');

    // Medium mode - slightly more intense
    this.backgroundMusic.medium = new Tone.Loop((time) => {
      const notes = ['A3', 'C4', 'E4', 'A4'];
      const note = notes[Math.floor(Math.random() * notes.length)];
      this.synths!.ambient.triggerAttackRelease(note, '4n', time);
    }, '4n');

    // Hard mode - tense atmosphere
    this.backgroundMusic.hard = new Tone.Loop((time) => {
      const notes = ['F3', 'Ab3', 'C4', 'F4'];
      const note = notes[Math.floor(Math.random() * notes.length)];
      this.synths!.ambient.triggerAttackRelease(note, '8n', time);
    }, '8n');

    // Nightmare mode - chaotic and intense
    this.backgroundMusic.nightmare = new Tone.Loop((time) => {
      const notes = ['C3', 'Eb3', 'Gb3', 'A3', 'C4'];
      const note = notes[Math.floor(Math.random() * notes.length)];
      this.synths!.nightmare.triggerAttackRelease(note, '16n', time);
    }, '16n');
  }

  playSoundEffect(type: 'start' | 'win' | 'lose' | 'streak' | 'timeout' | 'correct' | 'incorrect' | 'nightmare', value = 0) {
    if (!this.synths) return;

    // Throttle sound effects to prevent timing conflicts
    const currentTime = Date.now();
    if (currentTime - this.lastSoundTime < 50) return; // 50ms throttle
    this.lastSoundTime = currentTime;

    const now = Tone.now() + 0.01; // Add small delay to prevent timing conflicts
    
    switch (type) {
      case 'start':
        this.synths.start.triggerAttackRelease('C4', '8n', now);
        this.startBackgroundMusic(this.currentDifficulty);
        break;
      case 'win':
        this.stopBackgroundMusic();
        // Victory fanfare
        this.synths.win.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '8n', now);
        this.synths.win.triggerAttackRelease(['E4', 'G4', 'B4', 'E5'], '8n', now + 0.2);
        this.synths.win.triggerAttackRelease(['G4', 'B4', 'D5', 'G5'], '4n', now + 0.4);
        break;
      case 'lose':
        this.stopBackgroundMusic();
        // Dramatic loss sound
        this.synths.lose.triggerAttackRelease('C3', '4n', now);
        this.synths.lose.triggerAttackRelease('Bb2', '4n', now + 0.1);
        this.synths.lose.triggerAttackRelease('Ab2', '2n', now + 0.2);
        break;
      case 'streak':
        // Dynamic streak sound based on streak count
        const baseFreq = 440;
        const streakFreq = baseFreq + (value * 50);
        this.synths.streak.triggerAttackRelease(streakFreq, '16n', now);
        if (value >= 3) {
          // Extra celebration for high streaks
          this.synths.streak.triggerAttackRelease(streakFreq * 1.5, '16n', now + 0.1);
        }
        break;
      case 'timeout':
        this.synths.timeout.triggerAttackRelease('8n', now);
        break;
      case 'correct':
        // Pleasant correct sound
        this.synths.correct.triggerAttackRelease('E4', '16n', now);
        this.synths.correct.triggerAttackRelease('G4', '16n', now + 0.1);
        break;
      case 'incorrect':
        // Harsh incorrect sound
        this.synths.incorrect.triggerAttackRelease('F3', '8n', now);
        break;
      case 'nightmare':
        // Special nightmare mode sound
        this.synths.nightmare.triggerAttackRelease('C2', '4n', now);
        this.synths.nightmare.triggerAttackRelease('Eb2', '4n', now + 0.1);
        this.synths.nightmare.triggerAttackRelease('Gb2', '2n', now + 0.2);
        break;
    }
  }

  playWordSound(word: string, difficulty: string) {
    // Play a subtle tone before speech
    if (this.synths) {
      const toneFreq = difficulty === 'nightmare' ? 200 : 300;
      this.synths.correct.triggerAttackRelease(toneFreq, '32n');
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      
      let volumeLevel = 1.0;
      let rate = 1.0;
      
      switch (difficulty) {
        case 'easy':
          volumeLevel = 1.0;
          rate = 0.8;
          break;
        case 'medium':
          volumeLevel = 0.8;
          rate = 0.9;
          break;
        case 'hard':
          volumeLevel = 0.6;
          rate = 1.0;
          break;
        case 'nightmare':
          volumeLevel = 0.4;
          rate = 1.2;
          break;
      }
      
      utterance.volume = volumeLevel;
      utterance.rate = rate;
      
      window.speechSynthesis.speak(utterance);
    }
  }

  startBackgroundMusic(difficulty: string) {
    this.currentDifficulty = difficulty;
    this.stopBackgroundMusic(); // Stop any existing music
    
    const musicLoop = this.backgroundMusic[difficulty as keyof typeof this.backgroundMusic];
    if (musicLoop) {
      musicLoop.start();
    }
  }

  stopBackgroundMusic() {
    Object.values(this.backgroundMusic).forEach(loop => {
      if (loop) {
        loop.stop();
      }
    });
  }

  setDifficulty(difficulty: string) {
    this.currentDifficulty = difficulty;
    
    // Adjust effects based on difficulty - only if initialized
    if (this.effects && this.initialized) {
      try {
        switch (difficulty) {
          case 'easy':
            // @ts-ignore
            if (this.effects.reverb.roomSize) this.effects.reverb.roomSize.value = 0.3;
            if (this.effects.filter.frequency) this.effects.filter.frequency.value = 1000;
            break;
          case 'medium':
            // @ts-ignore
            if (this.effects.reverb.roomSize) this.effects.reverb.roomSize.value = 0.5;
            if (this.effects.filter.frequency) this.effects.filter.frequency.value = 800;
            break;
          case 'hard':
            // @ts-ignore
            if (this.effects.reverb.roomSize) this.effects.reverb.roomSize.value = 0.7;
            if (this.effects.filter.frequency) this.effects.filter.frequency.value = 600;
            break;
          case 'nightmare':
            // @ts-ignore
            if (this.effects.reverb.roomSize) this.effects.reverb.roomSize.value = 0.9;
            if (this.effects.filter.frequency) this.effects.filter.frequency.value = 400;
            if (this.effects.distortion.distortion !== undefined) this.effects.distortion.distortion = 0.8;
            break;
        }
      } catch (error) {
        console.warn('Failed to adjust audio effects:', error);
      }
    }
  }

  dispose() {
    this.stopBackgroundMusic();
    
    if (this.synths) {
      Object.values(this.synths).forEach(synth => synth.dispose());
      this.synths = null;
    }
    
    if (this.effects) {
      Object.values(this.effects).forEach(effect => effect.dispose());
      this.effects = null;
    }
    
    Object.keys(this.backgroundMusic).forEach(key => {
      const loop = this.backgroundMusic[key as keyof typeof this.backgroundMusic];
      if (loop) {
        loop.dispose();
        this.backgroundMusic[key as keyof typeof this.backgroundMusic] = null;
      }
    });
    
    this.initialized = false;
  }
}

// Singleton instance
export const soundEffects = new SoundEffects();