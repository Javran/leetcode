/**
 * @param {number} n
 * @return {number}
 */
const numSquares = n => {
  // solution: textbook backpack
  if (n <= 1)
    return n <= 0 ? 0 : 1
  // f[x] = minimum number to reach x (-1 = unreachable)
  const f = new Int16Array(n+1).fill(-1)
  const upBound = Math.round(Math.sqrt(n))
  // it doesn't make sense but it makes impl a bit easier
  f[0] = 0
  for (let i = 1; i <= n; ++i) {
    for (let j = 1; j <= upBound; ++j) {
      const sq = j*j
      if (
        i-sq >= 0 && f[i-sq] !== -1 &&
        (f[i] === -1 || f[i-sq] + 1 < f[i])
      ) {
        f[i] = f[i-sq] + 1
      }
    }
  }
  return f[n]
}

console.log(numSquares(12))
