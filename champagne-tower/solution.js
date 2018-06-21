/**
 * @param {number} poured
 * @param {number} query_row
 * @param {number} query_glass
 * @return {number}
 */
const champagneTower = (poured, rowInd, colInd) => {
  /*
     idea: assume that every cup has infinity capa at first,
     and simulate row by row: during simulation
     overflow will be taken into account by overwritten old Array
     and produce next level.
     in this program we always keep last row in "overflow" state
     but all previous ones simulated (so capa of 1 is respected)

     there are of course some chances of optimzation:

     - if next row is all zero, there is no point simulating any more
       and we can return 0.
     - note that the row is symmetric, so we can save half of the work

     but I think current one is good enough so won't go any further
   */
  const simulate = xs => {
    const ys = new Array(xs.length)
    const zs = new Array(xs.length+1).fill(0)
    for (let i = 0; i < xs.length; ++i) {
      if (xs[i] > 1) {
        ys[i] = xs[i] - 1
        xs[i] = 1
      } else {
        ys[i] = 0
      }
    }
    for (let i = 0; i < xs.length; ++i) {
      const half = ys[i] / 2
      zs[i] += half
      zs[i+1] += half
    }
    return zs
  }
  let cur = [poured], prev
  for (let i = 0; i < rowInd+1; ++i) {
    const next = simulate(cur)
    prev = cur
    cur = next
  }
  return prev[colInd]
}

console.log(champagneTower(9,3,0))
