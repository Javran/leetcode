const TR = 0b0001
const TL = 0b0010
const BL = 0b0100
const BR = 0b1000

/**
 * @param {number[][]} rectangles
 * @return {boolean}
 */
const isRectangleCover = rects => {
  /*
     idea:

     to see if the rectangle is exactly covered,

     we want to verify that:

     (1) there is no gap in the large rectangle
     (2) there is no overlap in the large rectangle

     verifying (1) is simple: if sum of area of small rectangles does not match
     that of the large rectangle, there are definitely gaps or overlaps.

     now we worry about how to detect overlaps.

     note that every rectangle provides us with 4 points, namely its 4 corners.
     if we view the problem from the point of, well, these points:

     1|0
     -P-
     3|2

     say now we are looking at a specific point P, for this to be an exact cover:

     - every area (i.e.: 0,1,2,3) has to be occupied at most once,
       otherwise there's a overlapped corner in that area
     - if 4 of there areas are occupied, it's ok
     - if 3 of these areas are occupied, we'll miss one corner, so it won't be an exact cover
     - if 2 of these areas are occupied:

       ok:    not ok: (opposite corners are occupied)
       X|     X|
       -P-    -P-
       X|      |X

     - if exactly one area is occupied, it must be one of 4 corners
       of the rectangle, we'll verify accordingly.

   */

  let minX = +Infinity, maxX = -Infinity
  let minY = +Infinity, maxY = -Infinity
  let area = 0
  const points = new Map()
  /*
     points is string of `x,y` to a value of 0b0000 .. 0b1111:

     0b0010(TL) | 0b0001(TR)
     -----------+-----------
     0b0100(BL) | 0b1000(BR)
   */
  const update = (x,y,mask) => {
    let oldVal
    const key = `${x},${y}`
    if (points.has(key)) {
      oldVal = points.get(key)
    } else {
      oldVal = 0
    }

    if (mask & oldVal) {
      // overlap detected
      return false
    }

    points.set(key, oldVal | mask)
    return true
  }

  for (let i = 0; i < rects.length; ++i) {
    const [loX, loY, hiX, hiY] = rects[i]
    if (loX < minX)
      minX = loX
    if (hiX > maxX)
      maxX = hiX
    if (loY < minY)
      minY = loY
    if (hiY > maxY)
      maxY = hiY
    area += (hiX - loX) * (hiY - loY)
    if (!(
      update(loX, loY, BL) &&
      update(loX, hiY, TL) &&
      update(hiX, loY, BR) &&
      update(hiX, hiY, TR)
    ))
      return false
  }
  // checking shapes
  const pairs = [...points.entries()]
  let cornerCount = 0
  for (let i = 0; i < pairs.length; ++i) {
    const [rawKey, val] = pairs[i]
    const popCount =
      Number(Boolean(val & TR)) +
      Number(Boolean(val & TL)) +
      Number(Boolean(val & BL)) +
      Number(Boolean(val & BR))
    // INVARIANT: 1 <= popCount <= 4
    /*
       - popCount = 1: only 4 corners
       - popCount = 2: no opposite cover.
       - popCount = 3: definitely not ok
       - popCount = 4: ok

     */
    if (popCount === 2) {
      if (val === 0b0101 || val === 0b1010)
        return false
    }
    if (popCount === 3)
      return false
    if (popCount === 1) {
      ++cornerCount
      const [x,y] = rawKey.split(',').map(Number)
      if (val === BL) {
        if (!(x === minX && y === minY))
          return false
      }
      if (val === TL) {
        if (!(x === minX && y === maxY))
          return false
      }
      if (val === BR) {
        if (!(x === maxX && y === minY))
          return false
      }
      if (val === TR) {
        if (!(x === maxX && y === maxY))
          return false
      }
    }
  }
  return cornerCount === 4 && area === (maxX - minX) * (maxY - minY)
}

const {cTestFunc} = require('leetcode-zwischenzug')

const f = cTestFunc(isRectangleCover)
f([
  [1,1,3,3],
  [3,1,4,2],
  [3,2,4,4],
  [1,3,2,4],
  [2,3,3,4],
])(true)

f([
  [1,1,2,3],
  [1,3,2,4],
  [3,1,4,2],
  [3,2,4,4],
])(false)

f([
  [1,1,3,3],
  [3,1,4,2],
  [1,3,2,4],
  [3,2,4,4],
])(false)

f([
  [1,1,3,3],
  [3,1,4,2],
  [1,3,2,4],
  [2,2,4,4],
])(false)
