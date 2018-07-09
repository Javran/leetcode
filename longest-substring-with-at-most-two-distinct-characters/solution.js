/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstringTwoDistinct = s => {
  if (s.length === 0)
    return 0
  let startInd = 0
  let chInfo1 = {
    code: s.codePointAt(0),
    count: 1,
    lastInd: 0,
  }
  let endInd = startInd
  // expand the window
  while (
    endInd+1 < s.length &&
    s.codePointAt(endInd+1) === chInfo1.code
  ) {
    ++endInd
    ++chInfo1.count
    chInfo1.lastInd = endInd
  }
  if (endInd+1 === s.length)
    // only one distinct char, already done
    return s.length
  // try to contain 2nd char
  ++endInd
  let chInfo2 = {
    code: s.codePointAt(endInd),
    count: 1,
    lastInd: endInd,
  }
  let ans = 0
  while (true) {
    // expand window as much as we can
    while (endInd+1 < s.length) {
      const code = s.codePointAt(endInd+1)
      if (code === chInfo1.code || code === chInfo2.code) {
        ++endInd
        if (code === chInfo1.code) {
          ++chInfo1.count
          chInfo1.lastInd = endInd
        } else {
          ++chInfo2.count
          chInfo2.lastInd = endInd
        }
      } else {
        break
      }
    }
    const winSize = chInfo1.count + chInfo2.count
    if (winSize > ans)
      ans = winSize
    if (endInd+1 === s.length)
      break
    if (chInfo1.lastInd < chInfo2.lastInd) {
      const tmp = chInfo1
      chInfo1 = chInfo2
      chInfo2 = tmp
    }
    /*
       INVARIANT: chInfo1.lastInd > chInfo2.lastInd,
       namely chInfo1 is the "frontline".
     */
    // move forward, drop chInfo2
    ++endInd
    const code = s.codePointAt(endInd)
    // remove outside-of-window count for chInfo1
    for (let i = startInd; i < chInfo2.lastInd; ++i) {
      if (s.codePointAt(i) === chInfo1.code) {
        --chInfo1.count
      }
    }
    startInd = chInfo2.lastInd + 1
    chInfo2 = {
      code,
      lastInd: endInd,
      count: 1,
    }
  }
  return ans
}

console.assert(lengthOfLongestSubstringTwoDistinct("") === 0)
console.assert(lengthOfLongestSubstringTwoDistinct("a") === 1)
console.assert(lengthOfLongestSubstringTwoDistinct("a".repeat(40)) === 40)
console.assert(lengthOfLongestSubstringTwoDistinct("eceba") === 3)
console.assert(lengthOfLongestSubstringTwoDistinct("ccaabbb") === 5)
console.assert(lengthOfLongestSubstringTwoDistinct("ccaabbbcccc") === 7)
console.assert(lengthOfLongestSubstringTwoDistinct("abaccc") === 4)
