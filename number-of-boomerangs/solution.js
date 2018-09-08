/**
 * @param {number[][]} points
 * @return {number}
 */
const numberOfBoomerangs = points => {
  // pMaps[<coord>][<distSq>] = int
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
