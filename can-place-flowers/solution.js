/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
const canPlaceFlowers = (xs, n) => {
  // note that a greedy strategy won't get us into a non-optimal solution,
  // so what we need to do is just to plant flowers at first available locations
  // until we have n flowers or when we reach the end
  let plantCount = 0
  for (let i = 0; i < xs.length && n > plantCount; ++i) {
    if (
      xs[i] === 0 &&
      (
        // no flower on left side
        i === 0 ||
        xs[i-1] === 0
      ) && (
        // no flower on right side
        (i+1 >= xs.length) ||
        (i+1 < xs.length && xs[i+1] === 0)
      )
    ) {
      xs[i] = 1
      ++plantCount
    }
  }
  return n <= plantCount
}

console.assert(canPlaceFlowers([1,0,0,0,1],1) === true)
console.assert(canPlaceFlowers([1,0,0,0,1],2) === false)
console.assert(canPlaceFlowers([1,0,0,0,0,0,1],2) === true)
console.assert(canPlaceFlowers([1,0,0,0,0,0,1],3) === false)
console.assert(canPlaceFlowers([0,0,0,0,0,0],3) === true)
console.assert(canPlaceFlowers([0,1,0,1,0,0],1) === true)
console.assert(canPlaceFlowers([0,1,0,1,0,0],2) === false)
console.assert(canPlaceFlowers([0,1,0,1,0,1],1) === false)
console.assert(canPlaceFlowers([0,0,0],2) === true)
