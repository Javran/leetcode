/**
 * @param {number[]} piles
 * @param {number} H
 * @return {number}
 */
const minEatingSpeed = (piles, H) => {
  /*
     note that the time taken to fully consume a pile is just
     ceil(piles[i] / K), when K is fixed, we can figure out if we can
     consume all piles in H in O(n).
     also note that if K is a possible solution that gives us enough time,
     we won't consider any value greater than that so the search space shrinks.
     given this monotonic nature of K, we just need binary search to deal with it.
   */
  const N = piles.length
  let maxPile = piles[0]
  for (let i = 1; i < N; ++i)
    if (piles[i] > maxPile)
      maxPile = piles[i]
  let l = 1, r = maxPile
  const testK = K => {
    let hours = 0
    // we can stop as soon as we find out that we don't have enough time
    for (let i = 0; i < N && hours <= H; ++i) {
      hours += Math.ceil(piles[i] / K)
    }
    return hours <= H
  }
  while (l < r) {
    const mid = (l+r) >>> 1
    if (testK(mid)) {
      r = mid
    } else {
      l = mid+1
    }
  }
  return r
}

console.log(minEatingSpeed([3,6,7,11], 8))
console.log(minEatingSpeed([30,11,23,4,20], 5))
console.log(minEatingSpeed([30,11,23,4,20], 6))
