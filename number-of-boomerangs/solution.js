/**
 * @param {number[][]} points
 * @return {number}
 */
const numberOfBoomerangs = points => {
  /*
     idea:

     to count # of boomerangs, the trick is to count by middle points.
     imagine that every coordinate on the map has a bucket,
     so what we do is to take every possible pair of points p1 p2
     and put them into buckets:
     for coordinate p1 we put p2 there, and for coord p2 we put p1 there,
     then as we scan through all buckets, for each bucket on coord c we can identify
     the group in which all point share the same distance to c,
     then (size of c) * (size of c-1) is the # of boomerangs we have whose point c
     is the middle point.
     note that a normal process of counting pairs would do n*(n-1)/2 for n,
     but here, since we have ensured that i < j, we rest half of the results are also
     what we need, so there is no need of doing the division.

     extra optimizations:

     - square root are monotonic, for the purpose of groupping, there is no need
       of performing the actual square root function.
     - we don't actually care about the coordinates in the bucket as long as we keep track
       of the squared distance, that suggests maintaining counters are good enough.

     all of the analysis above lead to pMaps below:

     pMaps[<coord>][<distSq>] = <count>

     means there are <count> boomerangs whose middle point is <coord> and their two legs
     both have a length of Math.sqrt(<distSq>)

   */
  const toKey = (x,y) => `${x},${y}`
  const pMaps = new Map()
  for (let i = 0; i < points.length; ++i) {
    const [x,y] = points[i]
    pMaps.set(toKey(x,y), new Map())
  }

  for (let i = 0; i < points.length; ++i) {
    const [x1,y1] = points[i]
    const key1 = toKey(x1,y1)
    const m1 = pMaps.get(key1)
    for (let j = i+1; j < points.length; ++j) {
      const [x2,y2] = points[j]
      const key2 = toKey(x2,y2)
      const m2 = pMaps.get(key2)
      const distSq = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
      // update m1
      let oldV1 = m1.has(distSq) ? m1.get(distSq) : 0
      m1.set(distSq, oldV1+1)

      // update m2
      let oldV2 = m2.has(distSq) ? m2.get(distSq) : 0
      m2.set(distSq, oldV2+1)
    }
  }
  let ans = 0
  for (let distMs of pMaps.values()) {
    for (let m of distMs.values()) {
      if (m > 1)
        ans += m * (m-1)
    }
  }
  return ans
}

const {cTestFunc} = require('leetcode-zwischenzug')
const f = cTestFunc(numberOfBoomerangs)
f([[0,0],[1,0],[2,0],[1,1]])(8)

const xs = []
for (let i = 0; i < 20; ++i)
  for (let j = 0; j < 20; ++j)
    xs.push([i,j])
f(xs)(536184)
