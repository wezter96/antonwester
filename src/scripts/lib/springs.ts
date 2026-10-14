export const LENS = { amplitude: 22, spread: 0.006 } as const;
export const RIPPLE = { stiffness: 0.045, damping: 0.07, coupling: 0.22, min: -30, max: 25, impulse: 26 } as const;

export function lensAt(pointerX: number, centerX: number, width: number): number {
  const d = (pointerX - centerX) / width;
  return LENS.amplitude * Math.exp(-(d * d) / LENS.spread);
}

export const approach = (current: number, target: number, rate = 0.085): number => current + (target - current) * rate;

export interface Ripple { r: Float64Array; v: Float64Array }
export const createRipple = (n: number): Ripple => ({ r: new Float64Array(n), v: new Float64Array(n) });

export function kickRipple(state: Ripple, centers: readonly number[], x: number, sigma: number, strength: number = RIPPLE.impulse): void {
  centers.forEach((c, i) => {
    const d = (x - c) / sigma;
    state.v[i] += strength * Math.exp(-d * d);
  });
}

/** Advances the wave one frame and returns its energy. */
export function stepRipple(state: Ripple): number {
  const { r, v } = state;
  const n = r.length;
  for (let i = 0; i < n; i++) {
    const left = i > 0 ? r[i - 1] : r[i];
    const right = i < n - 1 ? r[i + 1] : r[i];
    v[i] += -RIPPLE.stiffness * r[i] - RIPPLE.damping * v[i] + RIPPLE.coupling * (left + right - 2 * r[i]);
  }
  let energy = 0;
  for (let i = 0; i < n; i++) {
    r[i] = Math.min(RIPPLE.max, Math.max(RIPPLE.min, r[i] + v[i]));
    energy += Math.abs(r[i]) + Math.abs(v[i]);
  }
  return energy;
}
