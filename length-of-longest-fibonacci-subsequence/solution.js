/**
 * @param {number[]} A
 * @return {number}
 */
const lenLongestFibSubseq = ARaw => {
  /*
     idea: try all pairs as the first two numbers in the seq,
     for the rest of it we can do binary search
     time complexity could be O(n*n*log n)
     but since fibonacci number grows so fast that only few of them (~40)
     could fit the range <= 10^9, we can effectively replace log n with 40
     so we have: O(n*n*log n) ==> O(n*n*40)
   */
  const A = Uint32Array.from(ARaw)
  const sortedIndex = (l,r,v) => {
    while (l < r) {
      const mid = (l+r+1) >>> 1
      if (A[mid] <= v) {
        l = mid
      } else {
        r = mid-1
      }
    }
    return l
  }

  let ans = 0
  const findFib = (i,j) => {
    let m = A[i], n = A[j], r = m + n
    let lowerInd = j+1
    let count = 2
    while (m < n && n < r) {
      let ind = sortedIndex(lowerInd,A.length-1,r)
      if (A[ind] === r) {
        ++count
        lowerInd = ind+1
      } else {
        break
      }
      m = n
      n = r
      r = m + n
    }
    return count >= 3 ? count : 0
  }
  for (let i = 0; i < A.length; ++i) {
    for (let j = i+1; j < A.length; ++j) {
      const cur = findFib(i,j)
      if (cur > ans)
        ans = cur
    }
  }
  return ans
}

console.log(lenLongestFibSubseq([1,2,3,4,5,6,7,8]))
console.log(lenLongestFibSubseq([1,3,7,11,12,14,18]))
