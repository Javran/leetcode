/**
 * @param {number[][]} intervals
 * @return {number}
 */
const intersectionSizeTwo = xs => {
  /*
     note: made a mistake earlier to think the set has to be consecutive,
     which is **not** the case.
   */
  xs.sort((u, v) =>
    // for all [l,r], asc by r, then desc by l
    u[1] !== v[1] ? u[1] - v[1] : v[0] - u[0]
  )

  let ans = 0
  /*
     sometimes we don't want to count a number twice
     maintaining a sliding window as [lB, rB] allow us to do so.
     the small set goes from left to right, starting at impossible position
   */
  let lB = -2, rB = -1
  for (let i = 0; i < xs.length; ++i) {
    const [l,r] = xs[i]
    if (l <= lB)
      // already included
      continue
    if (l > rB) {
      // no overlap at all
      ans += 2
      rB = r
      lB = r-1
    } else {
      // lB < l <= rB  need one more
      ans += 1
      lB = rB
      rB = r
    }
  }
  return ans
}

console.log(
  intersectionSizeTwo(
    [[2,10],[3,7],[3,15],[4,11],[6,12],[6,16],[7,8],[7,11],[7,15],[11,12]]
  )
)
