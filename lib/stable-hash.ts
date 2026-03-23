/** Deterministic pseudo-random values from a string (SSR-safe). */
export function stableInt(id: string, min: number, max: number): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) {
    h = (Math.imul(31, h) + id.charCodeAt(i)) | 0;
  }
  const range = max - min + 1;
  return min + (Math.abs(h) % range);
}
