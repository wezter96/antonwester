import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  new Lenis({ autoRaf: true, lerp: 0.09, anchors: true });
}
