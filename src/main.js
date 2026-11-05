import './styles/tokens.css';
import './styles/base.css';
import './styles/stage.css';

import { initScroll } from './engine/scroll.js';
import { initMasterTimeline, masterTimeline } from './engine/timeline.js';
import { initDeviceBreakpoints } from './engine/device.js';
import { initDebugHud } from './engine/hud.js';
import { createButterfly, bindButterflyToTimeline } from './engine/wings.js';

import { initScene01 } from './scenes/scene01.js';
import { initScene02 } from './scenes/scene02.js';
import { initScene03 } from './scenes/scene03.js';

// Initialize core engine and modular scenes
document.addEventListener('DOMContentLoaded', () => {
  initScroll();
  initMasterTimeline();
  initDeviceBreakpoints();
  initDebugHud();

  // 1. Initialize Butterfly 1 controller (idle float + velocity-coupled wings)
  const butterfly1 = createButterfly('#butterfly-1');

  // 2. Attach modular scene animations to the master timeline
  initScene01(masterTimeline);
  initScene02(masterTimeline);
  initScene03(masterTimeline);

  // 3. Bind butterfly injured/normal state transitions to timeline scrubbing
  if (butterfly1) {
    bindButterflyToTimeline(butterfly1, masterTimeline, 1.65);
  }

  console.log('BloodPulse website engine initialized [Phase 2: Scenes 1-3]. Press "D" to toggle Debug HUD.');
});
