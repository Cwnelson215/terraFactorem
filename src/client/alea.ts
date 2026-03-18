/**
 * Alea PRNG — fast, seedable, good distribution.
 * Returns a function that produces random numbers in [0, 1).
 */
export default function alea(seed: number): () => number {
  let s0 = mash(seed);
  let s1 = mash(seed);
  let s2 = mash(seed);
  let c = 1;

  function mash(data: number): number {
    let n = 0xefc8249d;
    const str = data.toString();
    for (let i = 0; i < str.length; i++) {
      n += str.charCodeAt(i);
      let h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000;
    }
    return (n >>> 0) * 2.3283064365386963e-10;
  }

  return function () {
    const t = 2091639 * s0 + c * 2.3283064365386963e-10;
    s0 = s1;
    s1 = s2;
    s2 = t - (c = t | 0);
    return s2;
  };
}
