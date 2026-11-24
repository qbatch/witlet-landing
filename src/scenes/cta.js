/**
 * Final CTA. A slow aurora (CSS keyframes on three soft gradients, paused
 * off-screen) sits behind the download card. Reduced motion: no drift.
 */
import { flagVisibility } from '../lib/motion.js';

export function init(root) {
  const stopFlag = flagVisibility(root);
  return () => stopFlag();
}
