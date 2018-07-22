/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const threeSumClosest = (nums, target) => {
  /*
     idea: w.l.o.g. we assume 3 nums we are taking are nums[i], nums[j], nums[k],
     in which 0 <= i < j < k < N.

     fix i, and search j, k in range [i+1 .. N-1], which can apply 2-sum technique
     to shrink search space in O(n) (see below)

   */
  const N = nums.length
  nums.sort((x,y) => x - y)
  // since every input has exactly one solution,
  // it's safe to say that the length is at least 3
  let ans = nums[0] + nums[1] + nums[2]
  const search = (lInit, rInit, target) => {
    // note: target shadows the outside variable, which is intentional
    // find the leftmost index i such that target <= nums[i]
    // if no such index exist, we return rInit
    let l = lInit, r = rInit
    while (l < r) {
      const mid = (l+r) >>> 1
      if (target <= nums[mid]) {
        r = mid
      } else {
        l = mid+1
      }
    }
    return r
  }

  for (let i = 0; i + 2 < N && ans !== target; ++i) {
    const v0 = nums[i]
    const target1 = target - v0
    // find two values in nums[i+1 .. N-1] that is closest to target1
    // it actually doesn't matter if we just use r = N-1,
    // but we can do a bit better by using binary search to find a reasonable
    // upper bound for r before we proceed.
    let l = i+1, r = search(l+1, N-1, target1 - nums[l])
    while (l < r) {
      /*
         2-sum technique: for an inclusive range l..r:

         let's say S = nums[l] + nums[r] and we aim for some target T.

         - we either find the answer as nums[l], nums[r], in which case S === T and we can stop further attempts
         - or we shrink it by 1 every time depending on relation between S and T:
           + S > T, we need to decrease S, this can be done by --r
           + S < T, we need to increase S, this can be done by ++l

         this indeed covers the search space, because every time we exclude either current nums[l] or nums[r]
         from the search space. in either way, nums[?] can no longer be one part of the solution in reduced search space.
      */
      const s1 = nums[l] + nums[r]
      const curSum = v0 + s1
      if (Math.abs(curSum - target) < Math.abs(ans - target)) {
        ans = curSum
      }
      if (s1 === target1) {
        break
      } else if (s1 > target1) {
        --r
      } else {
        // s1 < target
        ++l
      }
    }
  }
  return ans
}

console.log(threeSumClosest([-1, 2, 1, -4], 1))
const {randomIntGenBetween} = require('leetcode-zwischenzug')
const genTest = () => {
  const g = randomIntGenBetween(-20000, 20000)
  const xs = []
  for (let i = 0; i < 200; ++i)
    xs.push(g())
  return xs
}

const xs = [6448,8664,16474,-19900,-7134,-17900,-7063,2398,-3617,6577,-16118,-3075,-11242,19930,4708,16596,5231,-15633,7969,-18269,4578,9382,16255,11438,-10165,-5806,-2514,16970,-5562,101,-5592,-12984,-11108,8589,10543,8028,971,-3958,10572,-13410,-4610,-19158,-5698,-935,3464,-1344,-7551,14912,7531,8802,16914,-14030,-14991,17884,-8990,11822,4302,-9898,-5489,-6073,12638,12638,10819,2079,13936,-14406,18532,-14604,-46,16645,3604,-1880,-16766,-9256,14379,-15346,-3839,8479,3573,-16734,-13134,-11993,-2920,19122,5146,8570,-3754,-5777,3655,10919,-4186,-2320,19585,-8075,-10677,-12216,4410,-7611,-4737,8941,2785,7465,3346,-16873,-3339,-3313,7518,-14403,8481,17627,-16122,14548,-9646,-13832,15267,11621,369,-11944,3048,13342,7988,-10962,-7392,-19882,7572,13426,1911,-10394,11925,13733,14613,11103,-18782,11715,-2327,-5622,-7004,-1322,-12224,5117,-7480,-12029,-660,9918,-12542,-2730,-10110,-10623,-17909,1270,18191,-10719,16491,18563,-5388,-16121,12454,-15755,-8865,-18513,19025,-17150,7820,9071,12561,9056,-814,3728,12906,-14805,13309,5886,-12893,2551,-8797,-18552,-5712,-8140,-12977,-15695,-2022,5659,15704,-12455,-7908,-1417,17279,-15046,4622,-9759,11089,-10101,2854,-1755,-9001,-5208,5790,-5930,543,-9637]
console.log(threeSumClosest(xs, 58121))
