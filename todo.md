# TODO - Pathfinder Game Enhancement

## Current Task: Add Tone.js and Fix Nightmare Mode Logic

### Phase 1: Research & Analysis
- [x] Analyze current PronunciationStep5.tsx structure
- [x] Research Tone.js integration for web games
- [x] Check package.json for current dependencies (Tone.js v15.1.22 already installed)
- [x] Analyze SoundEffects.ts implementation
- [x] Investigate PathfindingUtils.ts for nightmare mode logic
- [x] Check PathfinderGameCell.tsx for visual feedback

### Phase 2: Tone.js Integration
- [x] Tone.js already installed via pnpm
- [x] Enhanced sound system with Tone.js (added reverb, distortion, filter effects)
- [x] Added dynamic background music for each difficulty level
- [x] Added interactive sound effects (correct, incorrect, nightmare, ambient)
- [x] Added audio feedback for correct/incorrect moves
- [x] Improved speech synthesis with difficulty-based adjustments

### Phase 3: Nightmare Mode Logic Fix
- [x] Fixed nightmare mode trap cell logic (removed confusing trap cells with correct words)
- [x] Enhanced visual feedback in PathfinderGameCell
- [x] Updated click handling logic with proper sound effects
- [x] Verified path validation logic - now only correct path has correct words

### Phase 4: Testing & Polish
- [x] Fixed initialization error in setDifficulty method
- [x] Added proper async/await for sound initialization
- [x] Added error handling for audio effects
- [x] Fixed Tone.js timing conflicts with throttling
- [x] Removed visual hints that revealed the correct path
- [ ] Test all difficulty levels
- [ ] Verify audio performance
- [ ] Test nightmare mode extensively
- [ ] Code review and cleanup

## Key Changes Made:

### 1. Enhanced SoundEffects.ts:
- Added background music loops for each difficulty
- Added new sound effects: correct, incorrect, nightmare, ambient
- Added audio effects: reverb, distortion, filter
- Improved speech synthesis with difficulty-based volume and rate
- Added methods: startBackgroundMusic(), stopBackgroundMusic(), setDifficulty()

### 2. Fixed PathfindingUtils.ts:
- **CRITICAL FIX**: Removed trap cells that had correct words but isPath: false
- Now nightmare mode only has correct words on the actual path
- All other cells have distractor words (wrong sound)

### 3. Updated PronunciationStep5.tsx:
- Integrated new sound effects
- Added proper difficulty setting for audio
- Enhanced feedback for correct/incorrect moves
- Improved nightmare mode death sound

### 4. Enhanced PathfinderGameCell.tsx:
- Added visual indicators for nightmare mode
- Better distinction between correct and incorrect sound cells

## Bug Fixes:

### 5. Fixed Audio Initialization Error:
- **Issue**: `Cannot set properties of undefined (setting 'value')` when calling setDifficulty()
- **Root Cause**: Audio effects not initialized before trying to set properties
- **Solution**: 
  - Added proper initialization checks in setDifficulty()
  - Made handleSelectDifficulty and handleCellClick async
  - Added error handling with try-catch blocks
  - Ensured soundEffects.initialize() is called before any audio operations

### 6. Fixed Tone.js Timing Conflicts:
- **Issue**: `Start time must be strictly greater than previous start time`
- **Root Cause**: Multiple sound effects triggered too quickly
- **Solution**:
  - Added 50ms throttling between sound effects
  - Increased delay between sequential notes (0.05s → 0.1s)
  - Added small delay (0.01s) to all sound triggers

### 7. Removed Visual Cheating:
- **Issue**: Green borders showed correct path, making game too easy
- **Root Cause**: Visual hints revealed isPath=true cells
- **Solution**:
  - Removed all visual indicators for correct/incorrect paths
  - Players must now rely purely on audio feedback
  - Game is now properly challenging