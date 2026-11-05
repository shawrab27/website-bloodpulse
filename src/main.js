import './styles/tokens.css';
import './styles/base.css';
import './styles/stage.css';

import { initScroll } from './engine/scroll.js';
import { initMasterTimeline } from './engine/timeline.js';
import { initDeviceBreakpoints } from './engine/device.js';
import { initDebugHud } from './engine/hud.js';

// Initialize core engine
document.addEventListener('DOMContentLoaded', () => {
  initScroll();
  initMasterTimeline();
  initDeviceBreakpoints();
  initDebugHud();

  console.log('BloodPulse website engine initialized [Phase 0]. Press "D" to toggle Debug HUD.');
});
