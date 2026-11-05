import './styles/tokens.css';
import './styles/base.css';
import './styles/stage.css';

import { initScroll } from './engine/scroll.js';
import { initMasterTimeline, masterTimeline } from './engine/timeline.js';
import { initDeviceBreakpoints } from './engine/device.js';
import { initDebugHud } from './engine/hud.js';
import {
  createButterfly,
  bindButterflyToTimeline,
  registerNamedButterfly,
} from './engine/wings.js';

import { initScene01 } from './scenes/scene01.js';
import { initScene02 } from './scenes/scene02.js';
import { initScene03 } from './scenes/scene03.js';
import { initScene04 } from './scenes/scene04.js';
import { initScene05 } from './scenes/scene05.js';

// Initialize core engine and modular scenes
document.addEventListener('DOMContentLoaded', () => {
  initScroll();
  initMasterTimeline();
  initDeviceBreakpoints();
  initDebugHud();

  // 1. Initialize Butterfly 1 (Victim) and Butterfly 2 (Witness)
  const butterfly1 = createButterfly('#butterfly-1');
  const butterfly2 = createButterfly('#butterfly-2');

  registerNamedButterfly('butterfly1', butterfly1);
  registerNamedButterfly('butterfly2', butterfly2);

  // 2. Attach modular scene animations to the master timeline
  initScene01(masterTimeline);
  initScene02(masterTimeline);
  initScene03(masterTimeline);
  initScene04(masterTimeline);
  initScene05(masterTimeline);

  // 3. Bind butterfly 1 injured/normal state transitions to timeline scrubbing
  if (butterfly1) {
    bindButterflyToTimeline(butterfly1, masterTimeline, 1.65);
  }

  console.log('BloodPulse website engine initialized [Phase 3: Scenes 4-5]. Press "D" to toggle Debug HUD.');
});
