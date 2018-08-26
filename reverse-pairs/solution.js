/**
 * @param {number[]} nums
 * @return {number}
 */
const reversePairs = nums => {
  /*
     idea: well I'm quite sure in i < j and xs[i] > xs[j]*2 the `*2` business
     is just a way to screw you over and doesn't serve any practical purpose.

     when negative numbers are involved, this "important reverse pair" will still exist,
     for example:

     [-3,-2,-1], there is an important pair (-3,-2). so the standard way of using merge sort to
     count reverse pair will not work.

     back to the topic though. given sorted array L = xs[l .. mid] and R= xs[mid+1 .. r],
     it will also do if we can count how many important reverse pairs
     we can form using one element from L and another from R.

     TODO: need revisiting later.
   */
  if (nums.length < 2) {
    return 0
  }
  const N = nums.length
  const xs = new Int32Array(nums)
  const tmp = new Int32Array(N)
  let ans = 0
  const mergeSort = (l,r) => {
    if (l >= r) {
      return
    }
    const mid = (l+r) >>> 1
    mergeSort(l,mid)
    mergeSort(mid+1,r)
    // note that we separate merging and counting
    // because a sorted array could contain important reverse pairs

    // counting will take some extra steps in O(n), so the overall time complexity for this algorithm
    // is still O(n*log(n))

    // counting
    {
      let j = mid+1
      /*
         count for every xs[i]
         imagine we "insert" L = xs[l] .. xs[mid] into R = xs[mid+1] .. xs[r],
         then every xs[i] from L can form important reverse pairs elements in range xs[i-1] < e < xs[i]
       */
      for (let i = l; i <= mid; ++i) {
        while (j <= r && xs[i] > xs[j]*2)
          ++j
        ans += j - (mid+1)
      }
    }
    // merging
    let i = l, j = mid+1, k = l
    while (i <= mid && j <= r) {
      if (xs[i] <= xs[j]) {
        tmp[k] = xs[i]
        ++i
        ++k
      } else {
        tmp[k] = xs[j]
        ++j
        ++k
      }
    }
    while (i <= mid) {
      tmp[k] = xs[i]
      ++i
      ++k
    }
    while (j <= r) {
      tmp[k] = xs[j]
      ++j
      ++k
    }
    for (let ii = l; ii <= r; ++ii)
      xs[ii] = tmp[ii]
  }
  mergeSort(0,N-1)
  return ans
}

const {consoleTest, genList} = require('leetcode-zwischenzug')
const f = consoleTest(reversePairs)
f([-3,-2,-1])(1)
f([1,9,2,8,3,7,4,6,6,5,1])(12)
f([0,2,6,5,4,8,8,8,8,2])(6)
f([0,8,5,3,5,8,0,7,7,1,0,2,1,7,9,4,10,4,7,1])(50)
f([-6,0,0,-9,-9,-1,3,-3,10,5,6,-10,-9,0,-7,1,-5,7,-5,9])(90)
f([57,-29,84,-21,-51,-12,90,-15,-63,-88,-20,-69,40,-78,83,99,31,-77,-62,-35,-73,-83,76,-71,26,-93,-38,-87,89,-72,-92,89,-45,-12,-52,55,8,25,65,-76,-32,-16,18,21,-57,-60,0,-27,8,21,-44,15,-6,97,5,-35,-88,87,58,-73,12,21,70,-57,-49,64,-81,-97,-78,-76,98,-25,-66,-65,82,-54,-51,-72,-46,-83,-81,-41,78,-19,-69,53,82,-95,63,-58,20,98,-27,-32,79,8,45,-3,-49,-33])(2810)
f([46,34,13,49,74,48,18,75,56,29,22,73,30,38,85,81,97,53,53,47,71,94,67,73,3,13,72,78,90,6,26,98,28,39,99,21,81,100,93,76,76,58,53,17,38,59,16,98,26,50,39,44,44,14,12,84,82,8,57,39,89,12,51,25,14,42,75,87,98,65,44,69,11,47,12,98,91,83,33,96,62,29,98,66,38,10,76,54,36,5,80,67,60,0,86,79,61,34,95,10,83,6,87,79,87,29,6,13,48,24,14,86,42,32,90,50,11,24,49,10,1,20,55,6,39,45,5,12,67,61,27,91,91,61,37,94,83,81,21,92,66,63,75,58,18,72,35,15,61,75,29,3,70,52,13,56,60,53,85,47,23,92,48,60,54,42,34,31,8,39,32,82,96,65,23,81,60,33,35,72,33,97,92,10,25,97,81,96,47,20,59,98,59,71,100,67,79,20,12,22])(4799)
