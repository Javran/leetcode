/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
const minRefuelStops = (target, startFuel, stations) => {
  const N = stations.length
  // f[i]: how far we can reach using i stations
  const f = new Int32Array(N+1)
  f[0] = startFuel
  for (let i = 0; i < N; ++i) {
    const [loc, fuel] = stations[i]
    // desc due to the fact that station i can be used only once.
    for (let t = i; t >= 0; --t) {
      if (f[t] >= loc && f[t] + fuel > f[t+1]) {
        f[t+1] = f[t] + fuel
      }
    }
  }
  // we want to find the minimum f[i] s.t. f[i] >= target
  for (let i = 0; i <= N; ++i)
    if (f[i] >= target)
      return i
  return f.findIndex(x => x >= target)
}

console.log(minRefuelStops(100, 10, [[10,60],[20,30],[30,30],[60,40]]))
