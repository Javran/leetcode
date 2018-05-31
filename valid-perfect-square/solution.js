/**
 * @param {number} num
 * @return {boolean}
 */
const isPerfectSquare = n => {
  // well I guess Math.floor should be legit.
  if (n < 0 || n !== Math.floor(n))
    return false
  // n must now be non-negative integer
  if (n < 4)
    return n <= 1
  let l = 2, r = n
  while (l <= r) {
    const u = Math.floor((l+r)/2)
    const v = u+1
    if (u*u <= n && n < v*v) {
      return u*u === n
    }
    if (u*u < n) {
      l = u+1
    } else {
      r = u-1
    }
  }
  return false
}

for (let i = 0; i <= 10000; ++i) {
  const r = Math.floor(Math.sqrt(i))
  console.assert(isPerfectSquare(i) === (r*r === i))
}

