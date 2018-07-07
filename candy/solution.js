/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy = ratings => {
  // everyone gets at least 1 candy, but there's no need
  // to actually fill the array with 1s, we'll do it before returning
  const cs = new Int32Array(ratings.length)
  // just fulfilling the requirement from left side,
  // by observation, I can say we cannot do anything better (less candies I mean)
  for (let i = 1; i < ratings.length; ++i) {
    if (ratings[i] > ratings[i-1]) {
      cs[i] = cs[i-1]+1
    }
  }
  // scan from right side, filling the other part of the slope
  for (let i = ratings.length-2; i >= 0; --i) {
    if (ratings[i] > ratings[i+1]) {
      // careful though, don't overwrite greater with less, otherwise
      // this will certainly break
      cs[i] = Math.max(cs[i+1]+1, cs[i])
    }
  }
  // don't forget that everyone needs one candy
  return cs.reduce((x,y) => x+y, 0) + ratings.length
}

console.assert(candy([1,0,2]) === 5)
console.assert(candy([1,2,2]) === 4)
console.assert(candy([1,3,4,5,2]) === 11)
