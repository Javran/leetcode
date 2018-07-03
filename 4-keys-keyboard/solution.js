/**
 * @param {number} N
 * @return {number}
 */
const maxA = N => {
  const f = new Int32Array(N+1)
  f[1] = 1
  for (let i = 2; i <= N; ++i) {
    // case 1: press 'a' to add one val
    let val = f[i-1]+1
    // case 2:
    // ctrl+a, ctrl+c, (ctrl+v) multiple times
    // at least 3 operations
    for (let j = 3; i >= j; ++j) {
      // paste (j-2) times, together with f[i-j] 'A's already
      const alt = f[i-j]*(j-1)
      if (alt > val)
        val = alt
    }
    f[i] = val
  }
  return f[N]
}

console.log(maxA(7))
