/**
 * @param {number[]} ratings
 * @return {number}
 */
const candy = ratings => {
  const cs = new Int32Array(ratings.length)
  for (let i = 1; i < ratings.length; ++i) {
    if (ratings[i] > ratings[i-1]) {
      cs[i] = cs[i-1]+1
    }
  }
  for (let i = ratings.length-2; i >= 0; --i) {
    if (ratings[i] > ratings[i+1]) {
      cs[i] = Math.max(cs[i+1]+1, cs[i])
    }
  }
  return cs.reduce((x,y) => x+y, 0) + ratings.length
}

console.assert(candy([1,0,2]) === 5)
console.assert(candy([1,2,2]) === 4)
console.assert(candy([1,3,4,5,2]) === 11)
