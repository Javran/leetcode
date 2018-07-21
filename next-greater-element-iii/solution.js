const MAX = 2 ** 31 - 1

/**
 * @param {number} n
 * @return {number}
 */
const nextGreaterElement = n => {
  /*
     for input n = 0 we might return -1,
     but since n is guaranteed to be positive, we are good.
   */
  const ds = []
  // note that ds is now from least significant to most.
  while (n > 0) {
    ds.push(n % 10)
    n = Math.floor(n / 10)
  }
  let i = 0
  // find the non-decreasing sequence (from low digits to high)
  while (i+1 < ds.length && ds[i] <= ds[i+1])
    ++i
  if (i+1 === ds.length)
    return -1
  // swap prefix digit (one that decreases) with a larger one in the non-decreasing seq
  for (let j = 0; j <= i; ++j) {
    if (ds[j] > ds[i+1]) {
      const tmp = ds[j]
      ds[j] = ds[i+1]
      ds[i+1] = tmp
      break
    }
  }
  // reverse non-decreasing part
  for (let l = 0, r = i; l < r; ++l, --r) {
    const tmp = ds[l]
    ds[l] = ds[r]
    ds[r] = tmp
  }
  // now back to normal order
  ds.reverse()
  const ans = ds.reduce((acc,d) => acc*10 + d ,0)
  // see if it's in range. note that we can do this because js numbers can store
  // much larger ints than signed int32.
  return ans > MAX ? -1 : ans
}

console.assert(nextGreaterElement(46872) === 47268)
console.assert(nextGreaterElement(2147483647) === -1)
console.assert(nextGreaterElement(2147483476) === 2147483647)
console.assert(nextGreaterElement(54322) === -1)
