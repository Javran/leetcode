/**
 * @param {string} S
 * @param {character} C
 * @return {number[]}
 */
const shortestToChar = (S, C) => {
  const n = S.length
  // record result from left and right
  // take the min of valid ones.
  const ansL = new Int16Array(n).fill(-1)
  const ansR = new Int16Array(n).fill(-1)
  const code = C.codePointAt(0)
  for (let i = 0; i < n; ++i) {
    if (S.codePointAt(i) === code) {
      ansL[i] = 0
    } else {
      if (i-1 >= 0 && ansL[i-1] !== -1)
        ansL[i] = ansL[i-1] + 1
    }
  }

  for (let j = n-1; j >= 0; --j) {
    if (S.codePointAt(j) === code) {
      ansR[j] = 0
    } else {
      if (j+1 < n && ansR[j+1] !== -1)
        ansR[j] = ansR[j+1] + 1
    }
  }

  const ans = new Array(n)
  for (let i = 0; i < n; ++i) {
    const l = ansL[i], r = ansR[i]
    if (l === -1) {
      ans[i] = r
    } else if (r === -1) {
      ans[i] = l
    } else {
      ans[i] = l < r ? l : r
    }
  }
  return ans
}

console.log(shortestToChar("loveleetcode", "e"))
