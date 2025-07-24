
// src/app/global-success/unit-1/components/SoundEffects.ts
// CREATED: 2025-01-27 - Sound effects using Tone.js library

import * as Tone from 'tone';

export class SoundEffects {
  private synths: {
    start: Tone.Synth;
    win: Tone.PolySynth;
    lose: Tone.Synth;
    streak: Tone.Synth;
    timeout: Tone.Synth;
  } | null = null;

  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    try {
      // Start audio context
      await Tone.start();
      
      this.synths = {
        start: new Tone.Synth({ 
          oscillator: { type: 'fatsawtooth' }, 
          envelope: { attack: 0.1, decay: 0.2, sustain: 0.1, release: 0.3 } 
        }).toDestination(),
        
        win: new Tone.PolySynth(Tone.Synth, { 
          oscillator: { type: 'triangle' } 
        }).toDestination(),
        
        lose: new Tone.Synth({ 
          oscillator: { type: 'square' }, 
          envelope: { attack: 0.2, decay: 0.5, sustain: 0, release: 0.5 } 
        }).toDestination(),
        
        streak: new Tone.Synth({ 
          oscillator: { type: 'sine' } 
        }).toDestination(),
        
        timeout: new Tone.Synth({ 
          // @ts-ignore
          oscillator: { type: 'noise' }, 
          envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 } 
        }).toDestination(),
      };

      this.initialized = true;
    } catch (error) {
      console.warn('Failed to initialize sound effects:', error);
    }
  }

  playSoundEffect(type: 'start' | 'win' | 'lose' | 'streak' | 'timeout', value = 0) {
    if (!this.synths) return;

    const now = Tone.now();
    
    switch (type) {
      case 'start':
        this.synths.start.triggerAttackRelease('C4', '8n', now);
        break;
      case 'win':
        this.synths.win.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '8n', now);
        break;
      case 'lose':
        this.synths.lose.triggerAttackRelease('C3', '4n', now);
        break;
      case 'streak':
        this.synths.streak.triggerAttackRelease(220 + value * 20, '16n', now);
        break;
      case 'timeout':
        this.synths.timeout.triggerAttackRelease('8n', now);
        break;
    }
  }

  playWordSound(word: string, difficulty: string) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      
      let volumeLevel = 1.0;
      if (difficulty === 'medium') volumeLevel = 0.7;
      if (difficulty === 'hard') volumeLevel = 0.4;
      utterance.volume = volumeLevel;
      
      window.speechSynthesis.speak(utterance);
    }
  }

  dispose() {
    if (this.synths) {
      Object.values(this.synths).forEach(synth => synth.dispose());
      this.synths = null;
    }
    this.initialized = false;
  }
}

// Singleton instance
export const soundEffects = new SoundEffects();