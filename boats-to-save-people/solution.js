/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
const numRescueBoats = (people, limit) => {
  /*
     idea:

     - data range is limited, do freq count.
     - figure out whether we can squeeze two ppl in one boat from one end to the other
     - pMax keep track of max index i such that pplCount[i] !== 0,
       during the process we'll constantly reduce its value
       so we don't have to find max i where pplCount[i] !== 0 over and over again
   */
  const pplCount = new Uint16Array(50000+1)
  let pMax = -Infinity
  for (let i = 0; i < people.length; ++i) {
    const p = people[i]
    if (pMax < p)
      pMax = p
    ++pplCount[p]
  }
  let ans = 0
  for (let i = 1; i <= pMax; ++i) {
    while (pplCount[i] !== 0) {
      // weight of the other
      let j = Math.min(pMax, limit - i)
      if (j < i) {
        // i is already the minimal one available
        // j < i suggests that each of them would need an individual one
        ans += pplCount[i]
        pplCount[i] = 0
        break
      }
      while (i < j && pplCount[j] === 0) {
        --j
      }
      if (i === j) {
        // simply pair them together
        ans += Math.ceil(pplCount[i] / 2)
        pplCount[i] = 0
      } else {
        // i < j and pplCount[j] > 0
        const tmp = Math.min(pplCount[i], pplCount[j])
        pplCount[i] -= tmp
        pplCount[j] -= tmp
        ans += tmp
      }
    }
    while (pplCount[pMax] === 0 && pMax > i)
      --pMax
  }
  return ans
}

const {consoleTest} = require('leetcode-zwischenzug')
const f = consoleTest(numRescueBoats)
f([1,2], 3)(1)
f([3,2,2,1], 3)(3)
f([3,5,3,4], 5)(4)
